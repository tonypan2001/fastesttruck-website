"use client";

import { section as sectionEN } from "@/constants/contents";
import { cn } from "@/lib/utils";

type PackagesData = typeof sectionEN.packagesSection;

export default function PackagesSection({ packages }: { packages?: PackagesData }) {
  const data = packages ?? sectionEN.packagesSection;
  return (
    <section id="packages" data-fv className="scroll-section relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="fv-item text-3xl md:text-5xl font-bold text-foreground">
            {data.title}
          </h2>
          <p className="fv-item mt-3 md:mt-4 text-muted-foreground md:text-lg">
            {data.subtitle}
          </p>
        </header>

        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.items.map((pkg) => (
            <article
              key={pkg.name}
              className={cn(
                "fv-item group rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm",
                "hover:shadow-md transition-shadow",
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold text-foreground">{pkg.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
                    {pkg.weightRange}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground min-h-12">{pkg.description}</p>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <div className="text-sm text-muted-foreground">Starting price</div>
                <div className="text-2xl font-bold text-foreground">{pkg.startingPrice}</div>
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
