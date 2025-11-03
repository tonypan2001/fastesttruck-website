import Link from "next/link";
import { section as sectionEN, navigation as navigationEN } from "@/constants/contents";

export function Footer({ footer }: { footer?: typeof sectionEN.footerSection }) {
  const { title, content } = footer ?? sectionEN.footerSection;
  const nav = navigationEN.menuItems || [];
  const contacts = (sectionEN as any).contactSection || {};
  const email: string | undefined = contacts.email;
  const phone: string | undefined = contacts.phone;
  const lineId: string | undefined = contacts.lineId;
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + short blurb */}
          <div>
            <Link href="#home" className="font-semibold text-xl text-foreground">
              {title}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-prose">
              Deliver Faster. Safer. Smarter. Reliable logistics across Thailand with real‑time tracking and professional drivers.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-primary">{phone}</a>
                </li>
              ) : null}
              {lineId ? (
                <li>LINE ID: <span className="text-foreground/90">{lineId}</span></li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 text-center md:text-left">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </div>
    </footer>
  );
}
