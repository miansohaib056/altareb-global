import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  Headphones,
  PackageCheck,
  Truck,
  ClipboardList,
  CheckCircle,
  ShoppingCart,
  ArrowRight,
  Star,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Wholesale Program | Altareb Global",
  description:
    "Partner with Altareb Global for premium Middle Eastern delicacies at wholesale prices. Bulk pricing, dedicated support, and custom orders for businesses.",
  openGraph: {
    title: "Wholesale Program | Altareb Global",
    description:
      "Join our wholesale program for competitive bulk pricing on premium dates, honey, nuts, and specialty items.",
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Bulk Pricing",
    description:
      "Enjoy significant discounts with our tiered wholesale pricing. The more you order, the more you save on our premium product range.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Support",
    description:
      "Your personal account manager ensures seamless ordering, answers questions, and helps you find the right products for your business.",
  },
  {
    icon: PackageCheck,
    title: "Custom Orders & Packaging",
    description:
      "Need private-label packaging or custom assortments? We work with you to create tailored solutions that fit your brand and customers.",
  },
  {
    icon: Truck,
    title: "Priority Fast Shipping",
    description:
      "Wholesale partners enjoy expedited processing and priority shipping to keep your shelves stocked and your customers happy.",
  },
];

const howItWorks = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Apply",
    description:
      "Complete our wholesale application with your business details. We review applications within 1-2 business days.",
  },
  {
    icon: CheckCircle,
    step: "02",
    title: "Get Approved",
    description:
      "Once approved, you receive access to our wholesale catalog with exclusive pricing and product availability.",
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Place Orders",
    description:
      "Order through your dedicated account manager or our wholesale portal. Flexible payment terms available for qualified partners.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Receive & Sell",
    description:
      "Products are shipped with priority handling. We ensure freshness and quality at every step of the supply chain.",
  },
];

const partnerTypes = [
  "Grocery Stores & Supermarkets",
  "Restaurants & Cafes",
  "Catering Companies",
  "Online Retailers",
  "Gift Shops & Specialty Stores",
  "Event Planners",
  "Hotels & Hospitality",
  "Corporate Gifting Companies",
];

export default function WholesaleProgramPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark py-28 sm:py-36">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 60% 30%, rgba(200,169,126,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(200,169,126,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              B2B Partnership
            </span>
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Wholesale <span className="text-gold">Program</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Partner with Altareb Global and bring premium Middle Eastern
              delicacies to your customers at competitive wholesale prices. Built
              for businesses that value quality.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gold-dark"
              >
                Apply for Wholesale
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Why Partner With Us
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Wholesale Benefits
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
              We make it easy and profitable for your business to stock the
              finest Middle Eastern products.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <AnimatedSection key={benefit.title} delay={i * 0.1}>
                <div className="group flex gap-5 rounded-2xl border border-border/50 bg-white p-8 transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <benefit.icon className="size-6 text-gold" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-brand-dark"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Getting Started
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How It Works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
              Becoming a wholesale partner is simple. Follow these steps to get
              started.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.12}>
                <div className="relative rounded-2xl border border-border/50 bg-white p-8 text-center">
                  <span
                    className="text-5xl font-bold text-gold/15"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.step}
                  </span>
                  <div className="mx-auto mt-3 flex size-12 items-center justify-center rounded-full bg-gold/10">
                    <step.icon className="size-5 text-gold" />
                  </div>
                  <h3
                    className="mt-4 text-lg font-bold text-brand-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                    {step.description}
                  </p>
                  {i < howItWorks.length - 1 && (
                    <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-gold/30 lg:block">
                      <ArrowRight className="size-6" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum Order & Partner Types */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection direction="left">
              <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
                Requirements
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight text-brand-dark"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Minimum Order Information
              </h2>
              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-border/50 bg-brand-cream/30 p-6">
                  <h4 className="font-semibold text-brand-dark">
                    Minimum First Order
                  </h4>
                  <p className="mt-1 text-2xl font-bold text-gold">$500</p>
                  <p className="mt-1 text-sm text-brand-dark/50">
                    First wholesale order to establish your account
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-brand-cream/30 p-6">
                  <h4 className="font-semibold text-brand-dark">
                    Recurring Orders
                  </h4>
                  <p className="mt-1 text-2xl font-bold text-gold">$250</p>
                  <p className="mt-1 text-sm text-brand-dark/50">
                    Minimum for subsequent reorders
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-brand-cream/30 p-6">
                  <h4 className="font-semibold text-brand-dark">
                    Payment Terms
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-brand-dark/60">
                    Net 30 payment terms available for qualified businesses after
                    the first three prepaid orders. We accept wire transfer,
                    ACH, and major credit cards.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
                Who We Serve
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight text-brand-dark"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ideal Partners
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
                Our wholesale program is designed for businesses of all sizes
                that want to offer premium Middle Eastern products to their
                customers.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {partnerTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-3 rounded-lg border border-border/30 bg-brand-cream/20 px-4 py-3"
                  >
                    <Star className="size-4 shrink-0 text-gold" />
                    <span className="text-sm font-medium text-brand-dark/70">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Start Today
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Become
              <br />a Wholesale Partner?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Join the growing network of businesses that trust Altareb Global
              for premium Middle Eastern products. Get in touch today and let us
              build something great together.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gold-dark"
              >
                Contact Us to Apply
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:info@altarebglobal.com"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-gold/50 hover:text-gold"
              >
                Email: info@altarebglobal.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
