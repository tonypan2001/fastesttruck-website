"use client";

import { section as sectionEN } from "@/constants/contents";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

type ContactData = {
  title: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  lineId?: string;
};

export function ContactSection({ contact }: { contact?: ContactData }) {
  const data = useMemo<ContactData>(() => {
    const d = (contact as any) ?? (sectionEN as any).contactSection ?? {};
    return {
      title: d.title ?? "Get In Touch",
      subtitle:
        d.subtitle ??
        "Questions, quotes, or partnerships — we’d love to hear from you.",
      email: d.email ?? "prompan.ue@gmail.com",
      phone: d.phone ?? "080-000-0000",
      lineId: d.lineId ?? "your-line-id",
    } as ContactData;
  }, [contact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    // Simple mailto composition for now
    const to = data.email || "";
    const subject = `Inquiry from ${name || "FastestTruck Website"}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitting(true);
    try {
      window.location.href = href;
    } finally {
      setTimeout(() => setSubmitting(false), 400);
    }
  };

  return (
    <section
      id="contact"
      data-fv
      className="scroll-section relative py-16 md:py-24 bg-background"
      aria-label="Contact"
    >
      {/* Background image at 30% opacity with top fade */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/imgs/truck-contact-bg.png)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 md:h-56 bg-linear-to-b from-background to-transparent pointer-events-none"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Contact details (glass card with glow) */}
          <div className="flex">
            <div className="w-full rounded-2xl border border-white/25 dark:border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-sm transition-all duration-300 p-4 md:p-6 hover:border-primary/60 hover:shadow-[0_0_0_2px_rgba(249,115,22,0.35),0_0_28px_rgba(249,115,22,0.35)]">
              <h2 className="fv-item text-3xl md:text-5xl font-bold text-foreground">
                {data.title}
              </h2>
              {data.subtitle ? (
                <p className="fv-item mt-3 md:mt-4 text-muted-foreground md:text-lg max-w-prose">
                  {data.subtitle}
                </p>
              ) : null}

              <ul className="mt-6 space-y-3">
                {data.email ? (
                  <li className="fv-item flex items-center gap-3 text-foreground/90">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      className="hover:text-primary"
                      href={`mailto:${data.email}`}
                    >
                      {data.email}
                    </a>
                  </li>
                ) : null}
                {data.phone ? (
                  <li className="fv-item flex items-center gap-3 text-foreground/90">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      className="hover:text-primary"
                      href={`tel:${data.phone}`}
                    >
                      {data.phone}
                    </a>
                  </li>
                ) : null}
                {data.lineId ? (
                  <li className="fv-item flex items-center gap-3 text-foreground/90">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span>LINE ID: {data.lineId}</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Right: Contact form (glass card with glow) */}
          <div className="fv-item lg:pl-6 flex flex-col">
            <div className="w-full rounded-2xl border border-white/25 dark:border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-sm transition-all duration-300 p-4 md:p-6 hover:border-primary/60 hover:shadow-[0_0_0_2px_rgba(249,115,22,0.35),0_0_28px_rgba(249,115,22,0.35)]">
              <form onSubmit={onSubmit} className="max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08x-xxx-xxxx"
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-foreground mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us a bit about your shipment, timeline, or questions."
                      rows={6}
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Opening mail…" : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
