import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Altareb Global <orders@altarebglobal.com>";

export async function sendOrderConfirmation(to: string, order: {
  orderNumber: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  if (!process.env.RESEND_API_KEY) return;

  const itemsHtml = order.items
    .map((i) => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${i.price.toFixed(2)}</td></tr>`)
    .join("");

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmed - ${order.orderNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1A1A1A;padding:32px;text-align:center">
          <h1 style="color:#C8A97E;margin:0;font-size:24px">ALTAREB GLOBAL</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#1A1A1A;margin:0 0 16px">Thank you for your order!</h2>
          <p style="color:#666;margin:0 0 24px">Your order <strong>${order.orderNumber}</strong> has been confirmed.</p>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#FAF7F2">
                <th style="padding:8px;text-align:left">Item</th>
                <th style="padding:8px;text-align:center">Qty</th>
                <th style="padding:8px;text-align:right">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="margin-top:16px;padding:16px;background:#FAF7F2;border-radius:8px;text-align:right">
            <strong style="font-size:18px;color:#1A1A1A">Total: $${order.total.toFixed(2)}</strong>
          </div>
          <p style="color:#666;margin:24px 0 0;font-size:14px">We'll send you a shipping notification when your order is on its way.</p>
        </div>
        <div style="background:#1A1A1A;padding:16px;text-align:center">
          <p style="color:#999;margin:0;font-size:12px">Altareb Global Corp | 1626 Bronxdale Ave, Bronx, NY 10462</p>
        </div>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Welcome to Altareb Global!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1A1A1A;padding:32px;text-align:center">
          <h1 style="color:#C8A97E;margin:0;font-size:24px">ALTAREB GLOBAL</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#1A1A1A;margin:0 0 16px">Welcome, ${name}!</h2>
          <p style="color:#666;margin:0 0 16px">Thank you for creating an account with Altareb Global. Discover our premium collection of Middle Eastern delicacies.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" style="display:inline-block;background:#C8A97E;color:#fff;padding:12px 32px;text-decoration:none;border-radius:32px;font-weight:bold">Shop Now</a>
        </div>
        <div style="background:#1A1A1A;padding:16px;text-align:center">
          <p style="color:#999;margin:0;font-size:12px">Altareb Global Corp | Pure Origins, Premium Taste</p>
        </div>
      </div>
    `,
  });
}

export async function sendOrderStatusUpdate(to: string, order: {
  orderNumber: string;
  status: string;
  trackingNumber?: string | null;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const statusMessages: Record<string, string> = {
    CONFIRMED: "Your order has been confirmed and is being prepared.",
    PROCESSING: "Your order is being processed.",
    SHIPPED: `Your order has been shipped!${order.trackingNumber ? ` Tracking: ${order.trackingNumber}` : ""}`,
    DELIVERED: "Your order has been delivered. Enjoy!",
    CANCELLED: "Your order has been cancelled.",
  };

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order ${order.orderNumber} - ${order.status}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1A1A1A;padding:32px;text-align:center">
          <h1 style="color:#C8A97E;margin:0;font-size:24px">ALTAREB GLOBAL</h1>
        </div>
        <div style="padding:32px;background:#fff">
          <h2 style="color:#1A1A1A;margin:0 0 16px">Order Update</h2>
          <p style="color:#666;margin:0 0 8px">Order: <strong>${order.orderNumber}</strong></p>
          <p style="color:#666;margin:0 0 24px">${statusMessages[order.status] || `Status: ${order.status}`}</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders" style="display:inline-block;background:#C8A97E;color:#fff;padding:12px 32px;text-decoration:none;border-radius:32px;font-weight:bold">View Order</a>
        </div>
        <div style="background:#1A1A1A;padding:16px;text-align:center">
          <p style="color:#999;margin:0;font-size:12px">Altareb Global Corp | Pure Origins, Premium Taste</p>
        </div>
      </div>
    `,
  });
}
