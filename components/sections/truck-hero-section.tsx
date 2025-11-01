"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TruckHeroSection({ bgUrl }: { bgUrl?: string }) {
  // Fallback image if none provided via constants
  const fallback =
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop";

  return (
    <section
      id="home"
      data-fv
      className={cn(
        "relative min-h-[85svh] md:min-h-[92svh] w-full overflow-hidden",
        "flex items-center",
      )}
      style={{
        backgroundImage: `url(${bgUrl || fallback})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero - Truck Logistics"
    >
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
