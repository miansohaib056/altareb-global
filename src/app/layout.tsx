import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altareb Global | Premium Middle Eastern Delicacies",
  description:
    "Discover the finest premium dates, natural honey, roasted nuts, maamoul, and specialty cakes. Hand-selected Middle Eastern delicacies delivered fresh to your door. Pure Origins, Premium Taste.",
  keywords: [
    "premium dates",
    "Middle Eastern food",
    "natural honey",
    "roasted nuts",
    "maamoul",
    "specialty cakes",
    "halal food",
    "Altareb Global",
  ],
  openGraph: {
    title: "Altareb Global | Premium Middle Eastern Delicacies",
    description:
      "Hand-selected premium dates, natural honey, roasted nuts, and artisan sweets. Pure Origins, Premium Taste.",
    type: "website",
    locale: "en_US",
    siteName: "Altareb Global",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-dark">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
