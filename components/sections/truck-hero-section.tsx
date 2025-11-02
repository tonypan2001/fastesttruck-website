"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TruckHeroSection({
  bgImages,
}: {
  bgImages?: string[];
}) {
  // Collect images from props, ignore empty values; ensure at least one fallback
  const images = useMemo(() => {
    const arr = (bgImages || []).filter(Boolean);
    return arr.length > 0 ? arr : ["/imgs/truck-hero.png"];
  }, [bgImages]);

  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const rafTick = useRef(false);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      6000,
    );
    return () => clearInterval(id);
  }, [images.length]);

  // Parallax background: move slightly on scroll for depth
  useEffect(() => {
    const onScroll = () => {
      if (rafTick.current) return;
      rafTick.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        rafTick.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            style={{
              backgroundImage: `url(${src})`,
              transform: `translateY(${Math.round((i === active ? 0.2 : 0.1) * scrollY)}px)`,
              willChange: "transform, opacity",
            }}
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
              <a href="#packages">Start Shipping Now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll-down button to Packages */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          type="button"
          aria-label="Scroll to packages"
          onClick={() => {
            const el = document.getElementById("packages");
            if (!el) return;
            const navHeight = 80;
            const rect = el.getBoundingClientRect();
            const absoluteTop =
              rect.top + (window.scrollY || window.pageYOffset);
            const targetY = Math.max(0, absoluteTop - navHeight);
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
