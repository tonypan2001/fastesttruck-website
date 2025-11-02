import { navigation as enNavigation, hero as enHero, heroCard as enHeroCard, section as enSection } from "./contents";

export type Lang = "en" | "th";

export type ContentPack = {
  navigation: typeof enNavigation;
  hero: typeof enHero;
  heroCard: typeof enHeroCard;
  section: typeof enSection;
};

// English is the source of truth. Thai can be filled in later.
const en: ContentPack = {
  navigation: enNavigation,
  hero: enHero,
  heroCard: enHeroCard,
  section: enSection,
};

// Thai localized placeholders for main labels and headings
const th: ContentPack = {
  navigation: {
    ...enNavigation,
    menuItems: [
      { label: "หน้าหลัก", href: "#home" },
      { label: "แพ็กเกจ", href: "#packages" },
      { label: "คำรับรอง", href: "#feedback" },
      { label: "ติดต่อ", href: "#contact" },
    ],
  },
  hero: {
    ...enHero,
    heroText: "ที่ซึ่งดีไซน์พบกับการเคลื่อนไหว",
    heroTextWithGradient: "PanStudio",
    heroTextDetail:
      "เราสร้างอินเทอร์เฟซที่คมชัด เข้าถึงได้ ผสานการเคลื่อนไหวและ 3D อย่างพอดี — ปรับจูนเพื่อความเร็ว ความชัดเจน และสัมผัสการใช้งานที่ดี\nพัฒนาด้วย Next.js และ TypeScript พร้อมปรับแต่งประสิทธิภาพเพื่อการใช้งานจริง",
  },
  heroCard: {
    ...enHeroCard,
    heroCardText: "สำรวจเพิ่มเติม",
    heroCardTextDetail: "ค้นพบฟีเจอร์และเทคโนโลยีที่เรามอบให้",
    heroCardBulletPoint: [
      { key: "01", text: "ประสบการณ์ 3D แบบโต้ตอบ" },
      { key: "02", text: "รองรับทุกอุปกรณ์ ทุกขนาดหน้าจอ" },
      { key: "03", text: "ดีไซน์สมัยใหม่ เน้นความใสและลื่นไหล" },
    ],
  },
  section: {
    // carry over the sections in use
    packagesSection: enSection.packagesSection,
    feedbackSection: {
      ...enSection.feedbackSection,
      title: "เสียงจากลูกค้า",
    },
    contactSection: {
      title: "ติดต่อเรา",
      subtitle:
        "สอบถามราคา ตารางวิ่ง หรือรายละเอียดอื่น ๆ ได้เลย เรายินดีช่วยเหลือ",
      email: enSection.contactSection?.email || "prompan.ue@gmail.com",
      phone: enSection.contactSection?.phone || "080-000-0000",
      lineId: enSection.contactSection?.lineId || "your-line-id",
    },
    footerSection: {
      ...enSection.footerSection,
      content: "© 2025 PanStudio — ออกแบบและพัฒนาโดย Prompan Uechanwech",
    },
  },
};

export const contentsByLang: Record<Lang, ContentPack> = { en, th };

export function getContent(lang: Lang | undefined): ContentPack {
  return lang && contentsByLang[lang] ? contentsByLang[lang] : contentsByLang.en;
}
