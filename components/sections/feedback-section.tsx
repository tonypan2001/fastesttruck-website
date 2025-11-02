"use client";

import { section as sectionEN } from "@/constants/contents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function FeedbackSection({ feedback }: { feedback?: typeof sectionEN.feedbackSection }) {
  const data = feedback ?? sectionEN.feedbackSection;
  const items = data?.testimonials ?? [];

  return (
    <section
      id="feedback"
      data-fv
      className="scroll-section relative py-16 md:py-24 flex items-center justify-center bg-background"
    >
      <div className="container px-4 relative z-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          {/* Header (left) */}
          <div>
            <h2 className="fv-item text-4xl md:text-5xl font-bold text-left text-foreground">
              {data.title}
            </h2>
            <p className="fv-item mt-3 md:mt-4 max-w-xl text-left text-muted-foreground">
              {data.subtitle ?? "Real words from teams we partnered with."}
            </p>
          </div>

          {/* Cards (right) */}
          <div className="mt-8 lg:mt-0 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {items.map((t, idx) => (
              <Card
                key={`${t.name}-${idx}`}
                className="backdrop-blur-sm bg-card/80 border-border/60 hover:shadow-md transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <CardHeader className="items-center text-center p-5">
                  <img
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-border/60"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <CardTitle className="mt-2 text-base md:text-lg">{t.name}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    {t.role}{t.company ? ` • ${t.company}` : ""}
                  </CardDescription>
                  <div className="mt-2 flex items-center gap-1" aria-label={`Rating ${t.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < (t.rating || 0)
                            ? "w-4 h-4 text-foreground"
                            : "w-4 h-4 text-muted-foreground"
                        }
                        fill={i < (t.rating || 0) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pb-5 px-5">
                  <blockquote className="text-center text-sm text-muted-foreground italic">
                    “{t.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
