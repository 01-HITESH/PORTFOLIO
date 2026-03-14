export const PERSONAL_INFO = {
  name: "HITESH",
  role: "WEB DEVELOPER",
  tagline: "Crafting elegant web experiences with code and creativity.",
  bio: `I'm a junior web developer with 1 month of experience crafting high-performance web applications that sit at the intersection of design and functionality. I have a passion for building intuitive user interfaces and scalable backend systems

My philosophy: Code is just a tool; the ultimate goal is creating an intuitive, accessible, and enjoyable experience for the user
When I'm not building, I like to learn new technologies or exploring the edges of what's possible with emerging tech.`,
  location: "Bangalore, India",
  email: "05hitesh.m@gmail.com",
  github: "https://github.com/01-HITESH",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resume: "/resume.pdf",
  availability: "Open to opportunities",
};

export const PROJECTS = [
  {
    id: "01",
    title: "portfolio",
    description:
      "Next.js-based portfolio showcasing 1 project with interactive demos, case studies, and a custom CMS. 10 monthly visitors and featured on Product Hunt.",
    longDescription:
      "Built a personal portfolio site from scratch using Next.js and Tailwind CSS. Implemented a custom CMS with Supabase for easy content updates, and optimized performance to achieve 90+ Lighthouse scores.",
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/images/project-1.jpg",
    color: "#e8ff4d",
    demo: "https://demo.example.com",
    github: "https://github.com/01-HITESH",
    featured: true,
    year: "2026",
    category: "Platform",
  },

];

export const SKILLS = {
  frontend: [
    { name: "React / Next.js", level: 98 },
    { name: "TypeScript", level: 95 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Framer Motion", level: 88 },
    { name: "GraphQL", level: 85 },
    { name: "React Native", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 93 },
    { name: "Python / FastAPI", level: 88 },
    { name: "PostgreSQL", level: 90 },
    { name: "Redis", level: 85 },
    { name: "Rust", level: 72 },
    { name: "Solidity", level: 70 },
  ],
  tools: [
    { name: "AWS / GCP", level: 87 },
    { name: "Docker / K8s", level: 84 },
    { name: "CI/CD Pipelines", level: 88 },
    { name: "Figma", level: 82 },
    { name: "Supabase", level: 90 },
    { name: "Terraform", level: 75 },
  ],
};

export const EXPERIENCE = [
  
  {
    id: "1",
    role: "Junior web Developer",
    company: "Aspiron Khuze Technologies Pvt Ltd)",
    companyUrl: "#",
    period: "2025 - Present",
    type: "internship",
    description:
      "Contributed to the development of a client-facing dashboard using React and Node.js, improving user engagement by 15%. Collaborated with a team of 3 developers in an Agile environment, participating in daily stand-ups and code reviews. Implemented RESTful APIs and integrated third-party services, enhancing the functionality of the application.",
    achievements: [
      "Successfully completed a 1-month internship, gaining hands-on experience in full-stack web development and contributing to a live project with real users.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Vanilla JS"],
  },
];

export const STATS = [
  { value: "2", label: " years building" },
  { value: "5", label: "Projects shipped" },
  { value: "10", label: "Users reached" },
  { value: "20", label: "Open source PRs" },
];
