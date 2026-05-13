export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Invalid coupon code" },
        { status: 404 }
      );
    }

    if (!coupon.active) {
      return NextResponse.json(
        { error: "This coupon is no longer active" },
        { status: 400 }
      );
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "This coupon has expired" },
        { status: 400 }
      );
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { error: "This coupon has reached its usage limit" },
        { status: 400 }
      );
    }

    if (subtotal && subtotal < coupon.minOrder) {
      return NextResponse.json(
        {
          error: `Minimum order amount of $${coupon.minOrder} required for this coupon`,
        },
        { status: 400 }
      );
    }

    // Calculate discount amount
    const orderSubtotal = subtotal || 0;
    const discountAmount = coupon.isPercent
      ? orderSubtotal * (coupon.discount / 100)
      : coupon.discount;

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      description: coupon.description,
      discount: coupon.discount,
      isPercent: coupon.isPercent,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      minOrder: coupon.minOrder,
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
