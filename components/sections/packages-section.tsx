"use client";

import { section as sectionEN } from "@/constants/contents";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PackagesData = typeof sectionEN.packagesSection;

export default function PackagesSection({
  packages,
}: {
  packages?: PackagesData;
}) {
  const data = packages ?? sectionEN.packagesSection;
  return (
    <section
      id="packages"
      data-fv
      className="scroll-section relative py-16 md:py-24"
    >
      {/* Section background image at 30% opacity */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url(/imgs/package-section-bg.png)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="fv-item text-3xl md:text-5xl font-bold text-foreground">
            {data.title}
          </h2>
          <p className="fv-item mt-3 md:mt-4 text-muted-foreground md:text-lg">
            {data.subtitle}
          </p>
        </header>

        <div className="fv-item mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.items.map((pkg) => (
            <article
              key={pkg.name}
              className={cn(
                "fv-item group relative overflow-hidden rounded-xl border border-border/60 shadow-sm",
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
          ))}
        </div>

        <p className="fv-item mt-8 text-sm text-muted-foreground text-center">
          {data.footnote}
        </p>
      </div>
    </section>
  );
}
