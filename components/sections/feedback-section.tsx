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
  // Ensure exactly 6 items by repeating/padding
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
    { length: 6 },
    (_, i) => base[i % (base.length || 1)] || placeholder,
  );

  // Pinning + scroll-scrubbing state
  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = pinContainerRef.current;
    if (!container) return;

    const compute = () => {
      const r = container.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(1, r.height - vh); // duration while sticky is pinned

      // Only start scrubbing once the sticky region is actually pinned (r.top <= 0)
      // Progress is how far we've scrolled through the pinned distance (0..1)
      const inPinnedZone = r.top <= 0 && r.bottom >= vh;
      const beforePinned = r.top > 0; // section not yet pinned

      const visible = r.top < vh && r.bottom > 0;
      if (!visible) {
        // Reset when leaving the section entirely
        setProgress(0);
        return;
      }

      if (beforePinned) {
        // Do not start animation before the section pins
        setProgress(0);
        return;
      }

      // When pinned, compute progress based on how far container has scrolled past the top
      const distanceIntoPinned = Math.min(total, Math.max(0, -r.top));
      const pRaw = Math.min(1, distanceIntoPinned / total);

      if (inPinnedZone) {
        // While pinned, scrub both directions (reverse on upward scroll)
        setProgress(pRaw);
        return;
      }

      // After pinned (scrolled past), clamp at 1
      setProgress(1);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute as any);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute as any);
    };
  }, []);

  return (
    <section
      id="feedback"
      data-fv
      className="scroll-section relative bg-background"
    >
      <div ref={pinContainerRef} className="relative h-[160svh] md:h-[200svh]">
        <div className="sticky top-0 h-[100svh] flex items-center justify-center">
          <div className="container px-4 py-12 md:py-24 relative z-10">
            <div className="lg:grid lg:grid-cols-3 lg:gap-6 items-start">
              {/* Header (left) */}
              <div className="mb-6 md:mb-0">
                <h2 className="fv-item text-4xl md:text-5xl font-bold text-left text-foreground">
                  {data.title}
                </h2>
                <p className="fv-item mt-3 md:mt-4 max-w-xl text-left text-muted-foreground">
                  {data.subtitle ?? "Real words from teams we partnered with."}
                </p>

                {/* Truck image scrubs in as you scroll down; reverses when scrolling up while pinned */}
                <ScrubIn className="mt-10 md:mt-20" progress={progress}>
                  <img
                    src="/imgs/truck-slide-anim.png"
                    alt="FastestTruck"
                    width={612}
                    height={408}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto drop-shadow-xl mx-auto md:mx-0 origin-center md:origin-left scale-[1.3] sm:scale-[1.6] lg:scale-[2]"
                  />
                </ScrubIn>
              </div>

              {/* Cards (right) */}
              <div className="mt-8 lg:mt-0 lg:col-span-2 lg:ml-24 xl:ml-32 max-w-xl mx-auto lg:max-w-none lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 justify-center lg:justify-end lg:max-w-[620px] lg:ml-auto">
                  {items.map((t, idx) => (
                <Card
                  key={`${t.name}-${idx}`}
                  className="fv-item w-full backdrop-blur-sm bg-card/80 border-border/60 hover:shadow-md transition-transform duration-300 ease-out hover:-translate-y-1"
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
                              fill={
                                i < (t.rating || 0) ? "currentColor" : "none"
                              }
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
        </div>
      </div>
    </section>
  );
}

function ScrubIn({
  children,
  className,
  progress = 0,
}: {
  children: React.ReactNode;
  className?: string;
  progress?: number; // 0..1
}) {
  const translate = -40 * (1 - progress); // -40px -> 0
  const opacity = Math.max(0, Math.min(1, progress));
  return (
    <div
      className={cn("will-change-transform", className)}
      style={{ transform: `translateX(${translate}px)`, opacity }}
    >
      {children}
    </div>
  );
}
