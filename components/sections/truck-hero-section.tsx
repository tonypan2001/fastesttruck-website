"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export default function TruckHeroSection({ bgImages }: { bgImages?: string[] }) {
  // Collect images from props, ignore empty values; ensure at least one fallback
  const images = useMemo(() => {
    const arr = (bgImages || []).filter(Boolean);
    return arr.length > 0 ? arr : ["/imgs/truck-hero.png"];
  }, [bgImages]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section
      id="home"
      data-fv
      className={cn(
        "relative min-h-[85svh] md:min-h-[92svh] w-full overflow-hidden",
        "flex items-center",
      )}
      aria-label="Hero - Truck Logistics"
    >
      {/* Cross-fading backgrounds */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              i === active ? "opacity-100" : "opacity-0",
            )}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Dark overlay to focus on text */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-3xl text-left text-white">
          <h1 className="fv-item text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Deliver Faster. Safer. Smarter.
          </h1>
          <p className="fv-item mt-4 md:mt-6 text-base md:text-xl text-white/90">
            Your trusted logistics partner — Fastest Truck.
          </p>

          <div className="fv-item mt-8">
            <Button size="lg" asChild className="cursor-pointer">
              <a href="#contact">Start Shipping Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
