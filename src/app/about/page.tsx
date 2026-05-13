import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Leaf,
  Users,
  ShieldCheck,
  Search,
  PackageCheck,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "About Us | Altareb Global",
  description:
    "Learn about Altareb Global — our mission to bring the finest premium Middle Eastern delicacies to your table. Pure Origins, Premium Taste.",
  openGraph: {
    title: "About Us | Altareb Global",
    description:
      "Discover the story behind Altareb Global and our commitment to premium Middle Eastern food.",
  },
};

const values = [
  {
    icon: Award,
    title: "Quality",
    description:
      "Every product is hand-selected to meet our exacting standards. We never compromise on the quality of what we bring to your table.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description:
      "We source directly from trusted growers and producers across the Middle East, preserving traditional flavors and centuries-old craftsmanship.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe food brings people together. We serve families, businesses, and communities who share a love for exceptional Middle Eastern cuisine.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "From farm to table, we prioritize sustainable sourcing and eco-friendly packaging to protect the land that produces these treasures.",
  },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Sourcing",
    description:
      "We travel to the finest growing regions to hand-select dates, honey, nuts, and spices directly from trusted producers.",
  },
  {
    icon: CheckCircle,
    step: "02",
    title: "Quality Control",
    description:
      "Every batch is rigorously inspected and tested to ensure it meets our premium standards for freshness, taste, and purity.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Packaging",
    description:
      "Products are carefully packaged in our New York facility using food-safe, elegant materials that preserve peak freshness.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivery",
    description:
      "Orders are shipped with care using temperature-controlled logistics so every product arrives in perfect condition.",
  },
];

const stats = [
  { value: "2,000+", label: "Happy Customers" },
  { value: "70+", label: "Premium Products" },
  { value: "6", label: "Curated Categories" },
  { value: "10+", label: "Years of Experience" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-dark py-28 sm:py-36">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(200,169,126,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,169,126,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Our Story
            </span>
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pure Origins,
              <br />
              <span className="text-gold">Premium Taste</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Born from a deep love for the rich culinary heritage of the Middle
              East, Altareb Global was founded to bridge the gap between the
              world&apos;s finest producers and discerning food lovers across
              America.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection direction="left">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-cream">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold/10">
                      <Award className="size-8 text-gold" />
                    </div>
                    <p className="mt-4 text-sm text-brand-dark/40">
                      Company Image
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
                Who We Are
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Legacy of Flavor,
                <br />
                Rooted in Tradition
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-dark/60">
                From our home in the Bronx, New York, we curate an exceptional
                collection of Middle Eastern delicacies. Each product we offer
                tells a story of heritage, craftsmanship, and an unwavering
                commitment to quality.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
                Our team personally visits farms and production facilities across
                the region, building lasting relationships with growers who share
                our passion for excellence. The result is a catalog of premium
                dates, natural honey, roasted nuts, traditional maamoul, and
                specialty cakes that are as authentic as they are delicious.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection delay={0}>
              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-sm sm:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold/10">
                  <svg
                    className="size-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <h3
                  className="mt-6 text-2xl font-bold text-brand-dark"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Our Vision
                </h3>
                <p className="mt-4 leading-relaxed text-brand-dark/60">
                  To become America&apos;s most trusted source for premium Middle
                  Eastern delicacies, making the rich flavors and culinary
                  traditions of the region accessible to every household and
                  business that values quality and authenticity.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl border border-gold/10 bg-white p-8 shadow-sm sm:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold/10">
                  <svg
                    className="size-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </span>
                <h3
                  className="mt-6 text-2xl font-bold text-brand-dark"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Our Mission
                </h3>
                <p className="mt-4 leading-relaxed text-brand-dark/60">
                  To deliver the finest handpicked Middle Eastern foods with
                  uncompromising quality, ethical sourcing, and exceptional
                  service. We are committed to honoring the traditions behind
                  every product while making the entire experience seamless and
                  delightful.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              What We Stand For
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Core Values
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
              These guiding principles shape everything we do, from how we source
              our products to how we serve our customers.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-border/50 bg-white p-8 text-center transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <value.icon className="size-6 text-gold" />
                  </div>
                  <h3
                    className="mt-5 text-lg font-bold text-brand-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-brand-dark py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Our Process
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              From Source to Your Table
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Every step in our process is designed to ensure you receive the
              freshest, most authentic Middle Eastern delicacies.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.12} direction="up">
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <span className="text-4xl font-bold text-gold/20">
                    {step.step}
                  </span>
                  <div className="mt-4 flex size-12 items-center justify-center rounded-full bg-gold/10">
                    <step.icon className="size-5 text-gold" />
                  </div>
                  <h3
                    className="mt-4 text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/30 bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.1}
                className="text-center"
              >
                <p
                  className="text-3xl font-bold text-gold sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium tracking-wide text-brand-dark/50 uppercase">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Company Image Placeholder */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              The People Behind the Taste
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Meet Our Team
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-dark/60">
              A dedicated team of food enthusiasts, quality experts, and
              logistics professionals working together to bring you the best.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl bg-brand-cream">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold/10">
                    <Users className="size-8 text-gold" />
                  </div>
                  <p className="mt-4 text-sm text-brand-dark/40">
                    Team Photo Placeholder
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Taste the Difference
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Experience
              <br />
              Premium Quality?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Browse our curated collection of hand-selected Middle Eastern
              delicacies and discover flavors that have been cherished for
              generations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gold-dark"
              >
                Shop Our Collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-gold/50 hover:text-gold"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
