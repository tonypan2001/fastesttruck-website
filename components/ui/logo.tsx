import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  title?: string;
};

export default function Logo({ className, title = "FastestTruck" }: LogoProps) {
  const text = title || "FastestTruck";
  return (
    <span className={cn("logo font-extrabold leading-none select-none", className)} aria-label={text}>
      <span className="block tracking-tight relative">{text}</span>
      <span aria-hidden className="logo-fill absolute inset-0 text-primary tracking-tight">{text}</span>
    </span>
  );
}
