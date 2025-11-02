export const navigation = {
  logo: "FastestTruck",
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "Packages", href: "#packages" },
    { label: "What we do", href: "#what-we-do" },
    { label: "Our Works", href: "#works" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" },
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
  aboutSection: {
    title: "About",
    content:
      "I'm a frontend developer passionate about building clean, interactive, and performance-driven websites. I focus on creating intuitive UIs using modern technologies like Next.js, Tailwind CSS. Currently, I'm expanding my skills in 3D design and other frontend stacks.",
    stats: [
      { value: "4+", label: "Year coding" },
      { value: "5", label: "Core tools" },
      { value: "100", label: "Completed Projects" },
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Blender"],
    quote:
      "I craft clean, interactive UIs with a focus on performance and feel.",
  },
  whatWeDoSection: {
    title: "What we do",
    items: [
      {
        title: "Create Website",
        detail:
          "Design and build modern, fast websites tailored to your brand using Next.js, TypeScript, and performance best practices.",
        imageUrl:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
      },
      {
        title: "Responsive",
        detail:
          "Pixel‑perfect layouts that adapt to any device and screen size, delivering a consistent experience on mobile, tablet, and desktop.",
        imageUrl:
          "https://images.unsplash.com/photo-1625490939776-17cef70ec079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      },
      {
        title: "Deploy & Hosting",
        detail:
          "Production‑ready deployments with CI/CD and optimized hosting on Vercel, Netlify, or your preferred cloud provider.",
        imageUrl:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  worksSection: {
    title: "Our Works",
    items: [
      {
        title: "Portfolio Website",
        detail:
          "A personal portfolio showcasing projects and skills with smooth animations, responsive layout, and fast performance.",
        imageUrl: "/imgs/work1.jpg",
        href: "https://prompanuechanwech.vercel.app/",
      },
      {
        title: "To‑Do List Website",
        detail:
          "Task manager with add/edit/delete, filters, and persistence — clean UI focused on productivity.",
        imageUrl: "/imgs/work2.jpg",
        href: "https://todo-list-app-gamma-rouge.vercel.app/",
      },
      {
        title: "Aircraft Shooting Game",
        detail:
          "Arcade‑style shooter with keyboard controls, scoring, and dynamic effects — built for smooth, responsive gameplay.",
        imageUrl: "/imgs/work3.jpg",
        href: "https://aircraft-warrior.vercel.app/",
      },
      {
        title: "Drawing Freelance Website",
        detail:
          "Service portfolio with artwork gallery, clear offering details, and contact/booking CTA for commissions.",
        imageUrl: "/imgs/work4.jpg",
        href: "https://aomcyne.vercel.app/",
      },
    ],
  },
  skillsSection: {
    title: "Skills & Tools",
    content: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SCSS"],
      },
      {
        label: "Design",
        items: ["Figma", "Blender", "Canva"],
      },
    ],
    // Detailed tech cards (used by the UI)
    techs: [
      {
        name: "Next.js",
        category: "Frontend",
        level: "Advanced",
        years: 3,
        icon: "/icons/nextjs.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
        summary:
          "App Router, server components, route handlers, metadata, and image optimization with strong TypeScript and performance focus.",
      },
      {
        name: "React",
        category: "Frontend",
        level: "Advanced",
        years: 4,
        icon: "/icons/react.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        summary:
          "Hooks, context, suspense, and state management patterns with accessibility and UX best practices.",
      },
      {
        name: "TypeScript",
        category: "Frontend",
        level: "Advanced",
        years: 4,
        icon: "/icons/typescript.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        summary:
          "Strong typing for React/Next projects, generics, utility types, and incremental typing for safety and DX.",
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        level: "Advanced",
        years: 3,
        icon: "/icons/tailwindcss.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        summary:
          "Utility-first styling, design systems, responsive layouts, and animations with clean, consistent UI patterns.",
      },
      {
        name: "SCSS",
        category: "Frontend",
        level: "Intermediate",
        years: 3,
        icon: "/icons/scss.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
        summary:
          "Modular styles, variables/mixins, and layered architectures for maintainable styling when needed.",
      },
      {
        name: "Figma",
        category: "Design",
        level: "Advanced",
        years: 4,
        icon: "/icons/figma.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        summary:
          "Wireframes to hi‑fi mocks, component libraries, and collaborative handoff workflows.",
      },
      {
        name: "Blender",
        category: "Design",
        level: "Intermediate",
        years: 2,
        icon: "/icons/blender.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
        summary:
          "Basic modeling, lighting, and materials for simple 3D assets integrated into web experiences.",
      },
      {
        name: "Canva",
        category: "Design",
        level: "Intermediate",
        years: 4,
        icon: "/icons/canva.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
        summary:
          "Quick branding assets, social graphics, and light compositing to support product visuals.",
      },
    ],
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
    title: "Let's Connect",
    content:
      "Have an idea, a project, or just want to say hi? Feel free to reach out — I'm always open to collaborations and new opportunities.",
    email: "prompan.ue@gmail.com",
    platform: [
      {
        label: "GitHub",
        href: "http://localhost:3000/",
      },
      {
        label: "X (Twitter)",
        href: "http://localhost:3000/",
      },
      {
        label: "LinkedIn",
        href: "http://localhost:3000/",
      },
    ],
  },
  footerSection: {
    title: "FastestTruck",
    content: "© 2025 FastestTruck — Designed & Built by Prompan Uechanwech",
  },
};
