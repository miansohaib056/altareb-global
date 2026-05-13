export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (!metadata?.userId || !metadata?.items) {
        console.error("Missing metadata in checkout session");
        return NextResponse.json(
          { error: "Missing metadata" },
          { status: 400 }
        );
      }

      const userId = metadata.userId;
      const items: { productId: string; quantity: number }[] = JSON.parse(
        metadata.items
      );
      const couponCode = metadata.couponCode || null;

      // Fetch products for order items
      const productIds = items.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });
      const productMap = new Map(products.map((p) => [p.id, p]));

      let subtotal = 0;
      const orderItems = items.map((item) => {
        const product = productMap.get(item.productId)!;
        const lineTotal = product.price * item.quantity;
        subtotal += lineTotal;
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0] || null,
        };
      });

      // Parse address from metadata if available
      let addressId: string | null = null;
      if (metadata.shippingAddress) {
        try {
          const addr = JSON.parse(metadata.shippingAddress);
          if (addr.id) {
            addressId = addr.id;
          } else if (addr.firstName) {
            const address = await prisma.address.create({
              data: {
                userId,
                firstName: addr.firstName,
                lastName: addr.lastName,
                address1: addr.address1,
                address2: addr.address2 || null,
                city: addr.city,
                state: addr.state,
                zip: addr.zip,
                country: addr.country || "US",
                phone: addr.phone || null,
              },
            });
            addressId = address.id;
          }
        } catch {
          // Address parsing failed, continue without it
        }
      }

      const amountTotal = (session.amount_total || 0) / 100;
      const shipping = subtotal >= 100 ? 0 : 9.99;
      const discount = subtotal + shipping - amountTotal;

      // Create order and decrement stock in a transaction
      await prisma.$transaction(async (tx) => {
        // Decrement stock for each product
        for (const item of items) {
          const product = productMap.get(item.productId);
          if (product) {
            await tx.product.update({
              where: { id: item.productId },
              data: {
                stock: { decrement: item.quantity },
                inStock: product.stock - item.quantity > 0,
              },
            });
          }
        }

        // Create the order
        await tx.order.create({
          data: {
            orderNumber: generateOrderNumber(),
            userId,
            addressId,
            subtotal,
            shipping,
            tax: 0,
            discount: discount > 0 ? parseFloat(discount.toFixed(2)) : 0,
            total: amountTotal,
            status: "CONFIRMED",
            paymentMethod: "STRIPE",
            paymentStatus: "PAID",
            stripeSessionId: session.id,
            couponCode,
            items: { create: orderItems },
          },
        });

        // Increment coupon usage if applicable
        if (couponCode) {
          await tx.coupon.update({
            where: { code: couponCode },
            data: { usedCount: { increment: 1 } },
          });
        }
      });

      // Clear user's cart
      await prisma.cartItem.deleteMany({ where: { userId } });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
