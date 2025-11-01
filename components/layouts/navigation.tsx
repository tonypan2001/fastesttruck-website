"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useHoverHighlight } from "@/hooks/useHoverHighlight";
import { navigation } from "@/constants/contents";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { createPortal } from "react-dom";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

export function Navigation({ nav }: { nav?: typeof navigation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const rafTick = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLang: "en" | "th" = pathname?.startsWith("/th") ? "th" : "en";
  const [lang, setLang] = useState<"en" | "th">(currentLang);
  const {
    menuRef,
    rect: hoverRect,
    moveTo,
    hide,
  } = useHoverHighlight({
    stickToActive: true,
    autoHideOnLeave: true,
    transitionMs: 300,
    getActiveEl: () => {
      // หา Button ที่ active จาก label/href ของคุณ
      // สมมติคุณแปะ data-href ให้ปุ่มแต่ละอันด้านล่าง
      const selector = `[data-href="#${activeSection}"]`;
      return (menuRef.current?.querySelector(selector) as HTMLElement) || null;
    },
  });

  // Keep highlight in sync with the active section (click/scroll)
  useEffect(() => {
    const el = document.querySelector(
      `[data-href="#${activeSection}"]`,
    ) as HTMLElement | null;
    if (el) moveTo(el);
  }, [activeSection, moveTo]);

  // removed separate scroll handler to avoid race conditions with highlight updates

  // Stable active section detection (no jitter):
  // pick the last section whose top is above the navbar offset.
  useEffect(() => {
    const navHeight = 80;
    const data = nav ?? navigation;
    const ids = data.menuItems.map((item) => item.href.substring(1));

    const onScrollStable = () => {
      if (rafTick.current) return;
      rafTick.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

        let current = ids[0] || "home";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top - navHeight <= 1) {
            current = id;
          } else {
            break;
          }
        }
        setActiveSection((prev) => (prev === current ? prev : current));
        rafTick.current = false;
      });
    };

    window.addEventListener("scroll", onScrollStable, { passive: true });
    // Initialize on mount
    onScrollStable();
    return () => window.removeEventListener("scroll", onScrollStable);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Auto-close mobile menu on resize to md and above
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  // Keep local lang state in sync with path
  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  // Smooth-scroll only when clicking navbar items (not global wheel)
  const smoothScrollToHash = (href: string) => {
    const id = href.startsWith('#') ? href.slice(1) : href;
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 80;
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + (window.scrollY || window.pageYOffset);
    const targetY = Math.max(0, absoluteTop - navHeight);
    // Update URL without triggering default anchor jump
    history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 composite-layer",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center min-h-16 md:min-h-20">
          {/* Logo */}
          <div className="shrink-0">
            <a
              href="#home"
              className={cn(
                "inline-flex items-center gap-2 group logo-trigger",
                isScrolled ? "text-foreground" : "text-white"
              )}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToHash('#home');
              }}
            >
              <Logo className="text-2xl md:text-3xl" title={(nav ?? navigation).logo} />
              <span className="sr-only">{(nav ?? navigation).logo}</span>
            </a>
          </div>

          {/* Desktop Menu - Center */}
          <div
            ref={menuRef}
            className="relative hidden md:flex items-center gap-1 justify-center justify-self-center"
          >
            {/* Sliding underline (primary color) */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0 bottom-0",
                "h-1.5 bg-primary rounded-full",
                "transition-[transform,width,opacity] duration-200 ease-out",
                hoverRect.visible ? "opacity-100" : "opacity-0",
              )}
              style={{
                transform: `translateX(${hoverRect.x}px)`,
                width: `${hoverRect.w}px`,
                zIndex: 0,
              }}
            />

            {/* เมนูจริง */}
            <div className="relative z-10 flex items-center gap-1">
              {(nav ?? navigation).menuItems.map((item) => (
                <Link
                  key={item.href}
                  data-href={item.href} // ⬅️ ใช้จับ active element
                  href={item.href}
                  onMouseEnter={(e) => moveTo(e.currentTarget)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.href.substring(1));
                    moveTo(e.currentTarget);
                    smoothScrollToHash(item.href);
                  }}
                  className={cn(
                    `relative text-sm transition-colors cursor-pointer px-4 py-3 pb-4`,
                    activeSection === item.href.substring(1)
                      ? (isScrolled ? "text-foreground" : "text-white")
                      : (isScrolled
                          ? "text-foreground/70 hover:text-primary"
                          : "text-white/80 hover:text-primary"),
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector (desktop) - Dropdown */}
          <div className="hidden md:flex items-center justify-self-end">
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-9 px-3 rounded-full inline-flex items-center gap-2",
                    isScrolled ? "text-foreground" : "text-white",
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    {lang === "en" ? "English" : "ไทย"}
                  </span>
                  <span className="lg:hidden uppercase">{lang}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-[80] min-w-40 max-w-[90vw] rounded-md border border-border/50 bg-background p-1 shadow-lg pointer-events-auto overflow-hidden"
                >
                  <DropdownMenu.Item
                    className={cn(
                      "px-2 py-2 rounded-md text-sm flex items-center gap-2 cursor-pointer outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                    )}
                    onSelect={() => {
                      if (currentLang !== "en") router.push("/");
                      setLang("en");
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      className="w-4 h-4 rounded-full object-cover"
                      width={16}
                      height={16}
                      loading="lazy"
                    />
                    English
                    {lang === "en" && <Check className="ml-auto w-4 h-4" />}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className={cn(
                      "px-2 py-2 rounded-md text-sm flex items-center gap-2 cursor-pointer outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                    )}
                    onSelect={() => {
                      if (currentLang !== "th") router.push("/th");
                      setLang("th");
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/th.png"
                      alt="ไทย"
                      className="w-4 h-4 rounded-full object-cover"
                      width={16}
                      height={16}
                      loading="lazy"
                    />
                    ไทย
                    {lang === "th" && <Check className="ml-auto w-4 h-4" />}
                </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Mobile Menu Button (mobile only) */}
          <div className="md:hidden justify-self-end flex items-center col-start-3 row-start-1">
            <Button
              variant="ghost"
              size="lg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "relative w-12 h-12",
                mobileOpen && "z-70 text-white",
                !isScrolled && !mobileOpen && "text-white",
              )}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-9 h-9" /> : <Menu className="w-9 h-9" />}
            </Button>
          </div>
        </div>

        {/* Mobile Fullscreen Menu via Portal (escapes transformed nav) */}
        {mobileOpen &&
          createPortal(
            <div
              id="mobile-menu"
              className="fixed inset-0 z-60 md:hidden text-white bg-primary/70 backdrop-blur-xl backdrop-saturate-150 animate-slide-in-right"
            >
              {/* Close (X) button inside overlay */}
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 text-white/90 hover:text-white hover:bg-white/10 w-12 h-12"
              >
                <X className="w-10 h-10" />
              </Button>

              {/* Centered menu items, full-width hover/active backgrounds */}
              <div className="flex h-full w-full items-center justify-center">
                <nav className="w-full">
                  <ul className="flex flex-col w-full gap-4 text-center">
                    {(nav ?? navigation).menuItems.map((item) => (
                      <li key={item.href} className="w-full">
                        <Button
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full rounded-none justify-center text-xl text-white/90 hover:text-white hover:bg-white/10 py-8 px-6",
                            activeSection === item.href.substring(1) &&
                              "text-white bg-white/10",
                          )}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              smoothScrollToHash(item.href);
                              setActiveSection(item.href.substring(1));
                              setMobileOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Mobile language selector - Dropdown */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <DropdownMenu.Root modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 px-4 rounded-full inline-flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="uppercase">{lang}</span>
                      <ChevronDown className="w-5 h-5 opacity-80" />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="center"
                      sideOffset={8}
                      className="z-[90] min-w-40 max-w-[92vw] rounded-md border border-white/20 bg-white/10 backdrop-blur p-1 shadow-lg text-white pointer-events-auto overflow-hidden"
                    >
                      <DropdownMenu.Item
                        className="px-2 py-2 rounded-md text-sm flex items-center gap-2 cursor-pointer outline-none hover:bg-white/15"
                        onSelect={() => {
                          if (currentLang !== "en") router.push("/");
                          setLang("en");
                          setMobileOpen(false);
                        }}
                      >
                        <img
                          src="https://flagcdn.com/w40/us.png"
                          alt="English"
                          className="w-4 h-4 rounded-full object-cover"
                          width={16}
                          height={16}
                          loading="lazy"
                        />
                        English
                        {lang === "en" && <Check className="ml-auto w-4 h-4" />}
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="px-2 py-2 rounded-md text-sm flex items-center gap-2 cursor-pointer outline-none hover:bg-white/15"
                        onSelect={() => {
                          if (currentLang !== "th") router.push("/th");
                          setLang("th");
                          setMobileOpen(false);
                        }}
                      >
                        <img
                          src="https://flagcdn.com/w40/th.png"
                          alt="ไทย"
                          className="w-4 h-4 rounded-full object-cover"
                          width={16}
                          height={16}
                          loading="lazy"
                        />
                        ไทย
                        {lang === "th" && <Check className="ml-auto w-4 h-4" />}
                    </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </nav>
  );
}
