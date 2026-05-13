"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["1626 Bronxdale Ave", "Bronx, NY 10462"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (860) 617-5480"],
    href: "tel:+18606175480",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@altarebglobal.com"],
    href: "mailto:info@altarebglobal.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 9:00 AM - 5:00 PM", "Sunday: Closed"],
  },
];

const faqs = [
  {
    question: "What are your shipping options and delivery times?",
    answer:
      "We offer standard shipping (5-7 business days) and express shipping (2-3 business days) across the continental United States. Orders over $75 qualify for free standard shipping. All perishable items are shipped with insulated packaging and ice packs to ensure freshness.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "We stand behind the quality of every product. If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos. We will arrange a full refund or replacement. Due to the perishable nature of our products, we cannot accept returns on opened food items unless there is a quality issue.",
  },
  {
    question: "Do you offer wholesale pricing for businesses?",
    answer:
      "Yes, we offer competitive wholesale pricing for restaurants, grocery stores, caterers, and other businesses. Minimum order quantities apply. Please visit our wholesale page or contact us directly at info@altarebglobal.com to learn more about our wholesale program and request a price list.",
  },
  {
    question: "Are your products halal certified?",
    answer:
      "Yes, all of our products are halal. We source from certified producers and maintain strict quality controls throughout our supply chain. Certification details are available on individual product pages and upon request.",
  },
  {
    question: "Can I place a custom or bulk order for events?",
    answer:
      "Absolutely! We love helping make events special with our premium products. Whether it is a wedding, corporate event, or holiday celebration, we can create custom gift packages and bulk orders. Please reach out at least 2 weeks in advance for custom orders so we can ensure availability and freshness.",
  },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark py-28 sm:py-36">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(200,169,126,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(200,169,126,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Contact
            </span>
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get in <span className="text-gold">Touch</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Have a question, feedback, or wholesale inquiry? We&apos;d love to
              hear from you. Our team is here to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3" direction="left">
              <h2
                className="text-2xl font-bold text-brand-dark sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-brand-dark/50">
                Fill out the form below and we&apos;ll respond within 24 hours.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-brand-dark"
                    >
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      placeholder="John Doe"
                      className="h-12 w-full rounded-lg border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/10"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-brand-dark"
                    >
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-lg border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/10"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-brand-dark"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 w-full rounded-lg border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-medium text-brand-dark"
                    >
                      Subject <span className="text-gold">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register("subject")}
                      placeholder="How can we help?"
                      className="h-12 w-full rounded-lg border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/10"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-brand-dark"
                  >
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full resize-none rounded-lg border border-border/60 bg-brand-cream/30 px-4 py-3 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/10"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </AnimatedSection>

            {/* Contact Info Cards */}
            <AnimatedSection
              className="lg:col-span-2"
              direction="right"
              delay={0.2}
            >
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const content = (
                    <div className="flex gap-4 rounded-xl border border-border/50 bg-brand-cream/30 p-6 transition-all duration-300 hover:border-gold/20 hover:shadow-md hover:shadow-gold/5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
                        <item.icon className="size-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-dark">
                          {item.title}
                        </h3>
                        {item.details.map((detail) => (
                          <p
                            key={detail}
                            className="mt-1 text-sm text-brand-dark/60"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="block"
                      >
                        {content}
                      </a>
                    );
                  }

                  return <div key={item.title}>{content}</div>;
                })}
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border/50">
                <div className="flex aspect-[4/3] items-center justify-center bg-brand-cream/50">
                  <div className="text-center">
                    <MapPin className="mx-auto size-8 text-gold/40" />
                    <p className="mt-3 text-sm font-medium text-brand-dark/40">
                      1626 Bronxdale Ave
                    </p>
                    <p className="text-sm text-brand-dark/30">
                      Bronx, NY 10462
                    </p>
                    <a
                      href="https://maps.google.com/?q=1626+Bronxdale+Ave+Bronx+NY+10462"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs font-medium text-gold hover:text-gold-dark"
                    >
                      View on Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <span className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              FAQ
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-brand-dark/60">
              Find answers to common questions about our products, shipping, and
              services.
            </p>
          </AnimatedSection>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="overflow-hidden rounded-xl border border-border/50 bg-white transition-all duration-200 hover:border-gold/20">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-sm font-semibold text-brand-dark">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-gold transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/30 px-6 py-5">
                          <p className="text-sm leading-relaxed text-brand-dark/60">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
