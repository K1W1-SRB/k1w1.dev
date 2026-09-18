export const words = [
  { text: "Websites", icon: "/images/globe.svg" },
  { text: "API`s", icon: "/images/concepts.svg" },
  { text: "Software", icon: "/images/code.svg" },
  { text: "Tools", icon: "/images/window.svg" },
  { text: "Systems", icon: "/images/designs.svg" },
  { text: "Solutions", icon: "/images/ideas.svg" },
  { text: "Cool Stuff", icon: "/images/designs.svg" },
];

export const counterItems = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "+", label: "Satisfied Clients" },
  { value: 5, suffix: "+", label: "Complete Projects" },
  { value: 9000, suffix: "+", label: "Git Commits" },
];

export const navLinks = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

// First entry is the featured project; the rest render as the secondary list.
export const projects = [
  {
    title: "TatNav — booking marketplace for tattoo artists",
    description:
      "A two-sided marketplace connecting people with tattoo artists — browse portfolios, check availability, and book appointments, while artists manage their profile, services, and bookings from an owner portal. Built end-to-end: a Next.js web app, a React Native mobile app for iOS and Android, and a NestJS API, with Stripe payments and Keycloak authentication, deployed on a self-managed Kubernetes cluster.",
    image: "/images/tatnav-promo.png",
    status: "Live",
  },
  {
    title: "TeamTel — Microsoft Teams voice system builder",
    description:
      "Built with my co-founder to simplify creating Microsoft Teams voice systems, with a visual call-flow builder. Paused while other projects take priority, but still on the roadmap to finish.",
    image: "/images/teamtel-promo.png",
    status: "Paused",
  },
  {
    title: "BookGusto — restaurant landing page",
    description:
      "Built the marketing landing page for BookGusto. The wider restaurant management system it was meant to plug into didn't move past that stage.",
    image: "/images/bg-promo.png",
    status: "Landing page",
  },
  {
    title: "FretVault — guitar practice companion",
    description:
      "A university project: a mobile app for guitarists to log gear, tabs, and practice notes. Was meant to open-source it, but never got it fully polished.",
    image: "/images/fretvault-promo.png",
    status: "University project",
  },
];

export const expCards = [
  {
    review:
      "TatNav went from an idea to a live, full-stack marketplace spanning web, mobile, and infrastructure — a genuinely complete product.",
    imgPath: "/images/tatnav-promo.png",
    logoPath: "/images/tatnav-logo.png",
    title: "Founder & Full Stack Developer",
    date: "2025 - Present",
    responsibilities: [
      "Built TatNav end-to-end: a Next.js web app, a NestJS API, and a React Native mobile app for iOS and Android.",
      "Set up Keycloak authentication, Stripe payments, and Cloudflare R2 storage.",
      "Deployed and run the platform on a self-managed Kubernetes cluster with GitOps CI/CD.",
    ],
  },
  {
    review:
      "Sebastian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/BG.png",
    logoPath: "/images/content.png",
    title: "Frontend Developer",
    date: "January 2023",
    responsibilities: [
      "Built the marketing landing page for the BookGusto website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "The wider restaurant management system it was meant to plug into didn't move past that stage.",
    ],
  },
  {
    review:
      "Sebastian's work on TeamTel's call flow builder showed real problem-solving ability, even with the project on hold.",
    imgPath: "/images/Logo transparent.png",
    logoPath: "/images/Teamtel.png",
    title: "Co-founder & Full Stack Developer",
    date: "June 2020 - December 2023 (paused)",
    responsibilities: [
      "Co-founded TeamTel, a platform for building Microsoft Teams voice systems.",
      "Built the CallFlow Builder and contributed to product planning and design.",
      "Development is currently paused while other projects take priority.",
    ],
  },
  {
    review:
      "FretVault was a strong university project — a solid mobile app that showed real product thinking, even if it never made it to open source.",
    imgPath: "/images/fretvault-full.png",
    logoPath: "/images/fretvault.png",
    title: "React Native Developer (University Project)",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built FretVault, a cross-platform React Native app for guitarists to log gear, tabs, and practice notes.",
      "Improved app performance and user experience through code optimization and testing.",
      "Intended to open-source the project afterwards, but never got it fully polished.",
    ],
  },
];
