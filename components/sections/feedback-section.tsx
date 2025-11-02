"use client";

import { section as sectionEN } from "@/constants/contents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function FeedbackSection({
  feedback,
}: {
  feedback?: typeof sectionEN.feedbackSection;
}) {
  const data = feedback ?? sectionEN.feedbackSection;
  const base = data?.testimonials ?? [];
  // Ensure exactly 9 items by repeating/padding
  const placeholder = {
    name: "Happy Customer",
    role: "Business Owner",
    company: "",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop",
    quote: "Reliable service and timely delivery every time!",
  };
  const items = Array.from(
    { length: 9 },
    (_, i) => base[i % (base.length || 1)] || placeholder,
  );

  return (
    <section
      id="feedback"
      data-fv
      className="scroll-section relative py-16 md:py-24 flex items-center justify-center bg-background"
    >
      <div className="container px-4 relative z-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 items-start">
          {/* Header (left) */}
          <div>
            <h2 className="fv-item text-4xl md:text-5xl font-bold text-left text-foreground">
              {data.title}
            </h2>
            <p className="fv-item mt-3 md:mt-4 max-w-xl text-left text-muted-foreground">
              {data.subtitle ?? "Real words from teams we partnered with."}
            </p>

            {/* Truck image that slides in from left on scroll down, hides on scroll up */}
            <SlideInOnScrollLeft className="mt-6">
              <img
                src="/imgs/truck-slide-anim.png"
                alt="FastestTruck"
                width={612}
                height={408}
                loading="lazy"
                decoding="async"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto drop-shadow-xl scale-[2] origin-left"
              />
            </SlideInOnScrollLeft>
          </div>

          {/* Cards (right) */}
          <div className="mt-8 lg:mt-0 lg:col-span-2">
            <div className="grid grid-cols-3 gap-2 md:gap-3 justify-center">
              {items.map((t, idx) => (
                <Card
                  key={`${t.name}-${idx}`}
                  className="w-full backdrop-blur-sm bg-card/80 border-border/60 hover:shadow-md transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={`${t.name} avatar`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-border/60"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 text-left">
                        <CardTitle className="text-sm leading-tight truncate">
                          {t.name}
                        </CardTitle>
                        <CardDescription className="text-[11px] leading-tight truncate">
                          {t.role}
                          {t.company ? ` • ${t.company}` : ""}
                        </CardDescription>
                      </div>
                    </div>
                    <div
                      className="mt-1 flex items-center gap-1"
                      aria-label={`Rating ${t.rating} out of 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < (t.rating || 0)
                              ? "w-3.5 h-3.5 text-primary"
                              : "w-3.5 h-3.5 text-muted-foreground"
                          }
                          fill={i < (t.rating || 0) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <blockquote className="text-center text-[11px] text-muted-foreground italic overflow-hidden">
                      “{t.quote}”
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideInOnScrollLeft({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastY = window.scrollY;

    const inView = (el: Element) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const top = Math.max(0, Math.min(vh, r.top));
      const bottom = Math.max(0, Math.min(vh, r.bottom));
      const visible = Math.max(0, bottom - top);
      const height = Math.max(1, r.height || r.bottom - r.top);
      return visible / height >= 0.2;
    };

    const onScroll = () => {
      const nowY = window.scrollY;
      const scrollingDown = nowY >= lastY;
      lastY = nowY;
      const el = ref.current;
      if (!el) return;
      if (!inView(el)) return; // only react when visible enough
      setShow(scrollingDown);
    };

    // Kick once
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform transition-all duration-700 ease-out",
        show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
