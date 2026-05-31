export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  greeting: "Hi, I'm",
  name: "Riya",
  roles: ["Software Developer", "Full Stack Engineer", "AI/ML Enthusiast", "Angular Developer"],
  tagline: "Building scalable web platforms and AI-powered systems with modern engineering practices.",
  location: "Noida, India",
  email: "riyag0105@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  available: true,
};

export const about = {
  headline: "Engineering at the intersection of product, data, and scale.",
  body: [
    "I'm a software developer at Relinns Technologies, building AI-powered SaaS platforms and integration-heavy systems. I work across the stack — from crafting Angular UIs and React frontends to designing Node.js APIs and Python-based AI pipelines.",
    "My work spans OAuth workflows, Shopify integrations, retrieval-augmented generation (RAG) systems, and scalable component architectures. I care about code that ships reliably and systems that can grow.",
  ],
  stats: [
    { label: "Years coding", value: "4+" },
    { label: "Production apps", value: "10+" },
    { label: "Tech stacks", value: "8" },
    { label: "Open to", value: "Roles" },
  ],
};

export const experiences = [
  {
    id: "relinns-full",
    company: "Relinns Technologies",
    role: "Associate Software Developer",
    period: "Feb 2025 – Present",
    type: "Full-time",
    highlights: [
      "Designed configuration-driven UI system enabling multiple third-party integrations in a no-code AI chatbot platform",
      "Implemented OAuth-based onboarding flows for white-label and SaaS customers",
      "Built Shopify integrations and external invoicing workflows using Fakturownia APIs",
      "Integrated Mixpanel product analytics and improved i18n support across key modules",
      "Refactored state management using Angular Signals and modular store patterns",
      "Managed GCP deployments — hosting, endpoint config, and cache invalidation for production releases",
      "Contributed to internal project management tool used by 200+ users",
    ],
    stack: ["Angular 18", "TypeScript", "Node.js", "GCP", "Mixpanel", "Shopify API"],
  },
  {
    id: "relinns-intern",
    company: "Relinns Technologies",
    role: "Software Developer Intern",
    period: "2024",
    type: "Internship",
    highlights: [
      "Built reusable UI components and contributed to frontend architecture",
      "Led Tailwind CSS migration and service-based refactoring",
      "Implemented real-time task timer with auto-save synchronization",
    ],
    stack: ["Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "appfoster",
    company: "Appfoster Innovations Pvt. Ltd.",
    role: "Associate Software Developer Intern",
    period: "2024",
    type: "Internship",
    highlights: [
      "Developed Laravel-based modules across internal and client-facing applications",
      "Built Shopify Order Limit app using Remix.js, Prisma, GraphQL, and Shopify Admin API",
      "Implemented dynamic product and cart rule enforcement for commerce workflows",
      "Developed interactive forms with live updates and integrated backend rule processing",
    ],
    stack: ["Laravel", "Remix.js", "Prisma", "GraphQL", "Shopify"],
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    color: "violet" as const,
    skills: ["Angular 18", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "HTML/CSS"],
  },
  {
    label: "Backend",
    color: "pink" as const,
    skills: ["Node.js", "Express.js", "Laravel", "Prisma", "REST APIs", "GraphQL"],
  },
  {
    label: "AI / Python",
    color: "cyan" as const,
    skills: ["Python", "Flask", "FAISS", "RAG", "LLM APIs", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    label: "Database & Cloud",
    color: "neutral" as const,
    skills: ["PostgreSQL", "MongoDB", "SQL", "Docker", "GCP", "Postman"],
  },
];

export const projects = [
  {
    id: "rag",
    title: "RAG Analysis Tool",
    subtitle: "AI-powered document intelligence",
    description:
      "A retrieval-augmented document Q&A system supporting PDF and web-based content ingestion. Enables structured document querying with LLM-based responses for efficient information retrieval.",
    highlights: [
      "Vector search using FAISS with semantic similarity ranking",
      "Flask REST API backend with Dockerized deployment",
      "Supports both PDF and live web content ingestion",
    ],
    stack: ["Python", "Flask", "FAISS", "Docker", "LLM APIs"],
    color: "violet" as const,
    github: "#",
    demo: null,
  },
  {
    id: "food",
    title: "Food Ordering App",
    subtitle: "Full-stack commerce platform",
    description:
      "A production-grade full-stack application with authentication, menu browsing, cart management, and order placement. Built with a focus on state management and smooth user experience.",
    highlights: [
      "JWT authentication with protected routes",
      "Redux for cart and order state management",
      "RESTful API with Express and MongoDB",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Redux"],
    color: "pink" as const,
    github: "#",
    demo: null,
  },
];

export const certifications = [
  {
    title: "Professional Certificate in Generative AI and Machine Learning",
    issuer: "IIT Guwahati",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM",
  },
];
