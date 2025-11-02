export const navigation = {
  logo: "FastestTruck",
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "Packages", href: "#packages" },
    { label: "Feedback", href: "#feedback" },
  ],
};

export const hero = {
  heroText: "Where Design Meets Motion",
  heroTextWithGradient: "PanStudio",
  heroTextDetail:
    "We craft crisp, accessible interfaces with subtle 3D and purposeful motion—tuned for speed, clarity, and feel.",
  // Truck website background images (fill with your own in /public/imgs)
  bgImages: ["/imgs/truck-hero.png", "/imgs/truck-hero2.png"],
};

export const heroCard = {
  heroCardText: "Discover More",
  heroCardTextDetail:
    "Explore our innovative features and cutting-edge technology",
  heroCardBulletPoint: [
    { key: "01", text: "Interactive 3D experiences" },
    { key: "02", text: "Responsive across all devices" },
    { key: "03", text: "Modern glassmorphic design" },
  ],
};

export const section = {
  packagesSection: {
    title: "Our Packages",
    subtitle:
      "Choose the perfect plan for your shipping needs — from small parcels to heavy industrial cargo.",
    items: [
      {
        name: "Mini Cargo",
        weightRange: "0–500 kg",
        description: "Ideal for small parcels and online shops",
        startingPrice: "From \u0E3F499",
        imageUrl: "/imgs/package1-card-bg.png",
      },
      {
        name: "Standard Truck",
        weightRange: "500–2,000 kg",
        description: "Best for medium-sized businesses and warehouses",
        startingPrice: "From \u0E3F1,299",
        imageUrl: "/imgs/package2-card-bg.png",
      },
      {
        name: "Heavy Load",
        weightRange: "2,000+ kg",
        description: "For large goods and industrial machinery",
        startingPrice: "From \u0E3F2,999",
        imageUrl: "/imgs/package3-card-bg.png",
      },
    ],
    footnote:
      "Flexible pricing. Professional service. Tailored for every shipment.",
  },
  feedbackSection: {
    title: "Customer Testimonials",
    subtitle: "Trusted by hundreds of businesses across Thailand.",
    testimonials: [
      {
        name: "Somchai T.",
        role: "Online Store Owner",
        company: "",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop",
        quote:
          "Fastest Truck always delivers on time. I can track my shipment easily — great service!",
      },
      {
        name: "Pimchanok L.",
        role: "Construction Materials Company",
        company: "",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
        quote:
          "Professional drivers, fair prices, and reliable communication throughout the route.",
      },
    ],
  },
  contactSection: {
    title: "Contact Us",
    subtitle:
      "Reach out for quotes, schedules, or any questions. We're here to help.",
    email: "prompan.ue@gmail.com",
    phone: "080-000-0000",
    lineId: "your-line-id",
  },
  footerSection: {
    title: "FastestTruck",
    content: "© 2025 FastestTruck — Designed & Built by Prompan Uechanwech",
  },
};
