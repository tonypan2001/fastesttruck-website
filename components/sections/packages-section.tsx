"use client";

import { section as sectionEN } from "@/constants/contents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type PackagesData = typeof sectionEN.packagesSection;

export default function PackagesSection({
  packages,
}: {
  packages?: PackagesData;
}) {
  const data = packages ?? sectionEN.packagesSection;
  // Pin + scrub progress (0..1)
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = pinRef.current;
    if (!el) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(1, r.height - vh);
      const before = r.top > 0;
      const visible = r.top < vh && r.bottom > 0;
      if (!visible) {
        setProgress(0);
        return;
      }
      if (before) {
        setProgress(0);
        return;
      }
      const p = Math.min(1, Math.max(0, -r.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll as any);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll as any);
    };
  }, []);

  return (
    <section
      id="packages"
      data-fv
      className="scroll-section relative"
    >
      {/* Section background image at 30% opacity */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url(/imgs/package-section-bg.png)" }}
      />
      {/* Bottom fade to background color for smooth blend */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-background to-transparent pointer-events-none"
      />
      <div ref={pinRef} className="relative h-[180svh] md:h-[200svh]">
        <div className="sticky top-0 h-[100svh] flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <header className="max-w-3xl mx-auto text-center">
              <h2 className="fv-item text-3xl md:text-5xl font-bold text-foreground">
                {data.title}
              </h2>
              <p className="fv-item mt-3 md:mt-4 text-muted-foreground md:text-lg">
                {data.subtitle}
              </p>
            </header>

            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {data.items.map((pkg, idx) => {
                const start = 0.08 * idx; // stagger start
                const span = 0.35; // duration window per card
                const raw = (progress - start) / span;
                const p = Math.max(0, Math.min(1, raw));
                return (
                  <SlideInRight key={pkg.name} progress={p}>
                    <article
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-border/60 shadow-sm",
                        "hover:shadow-md transition-transform",
                      )}
                    >
                      {/* Background image */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${(pkg as any).imageUrl || ""})`,
                        }}
                      />
                      {/* Base overlay for readability */}
                      <div className="absolute inset-0 bg-black/25" />
                      {/* Fade-in overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative p-6 flex flex-col min-h-[220px] justify-end text-white">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xl font-semibold">{pkg.name}</h3>
                          <span className="inline-flex items-center rounded-full bg-white/20 text-white px-2 py-1 text-xs font-medium">
                            {pkg.weightRange}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-white/85 min-h-12">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="relative px-6 pb-6">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <div className="text-sm text-white/80">Starting price</div>
                            <div className="text-2xl font-bold text-white">
                              {pkg.startingPrice}
                            </div>
                          </div>
                          <Button size="sm" asChild className="shrink-0">
                            <a
                              href="#packages"
                              aria-label={`Learn more about ${pkg.name}`}
                            >
                              Learn More
                            </a>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </SlideInRight>
                );
              })}
            </div>

            <p className="fv-item mt-8 text-sm text-muted-foreground text-center">
              {data.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideInRight({
  children,
  progress = 0,
}: {
  children: React.ReactNode;
  progress?: number; // 0..1
}) {
  const translate = 50 * (1 - progress); // px from right
  const opacity = Math.max(0, Math.min(1, progress));
  return (
    <div
      style={{ transform: `translateX(${translate}px)`, opacity }}
      className="will-change-transform"
    >
      {children}
    </div>
  );
}
