
import { Project, Skill, Experience, Testimonial, BlogPost } from './types';
import React from 'react';

export const PORTFOLIO_OWNER = "Russelle Roxas";
export const PORTFOLIO_ROLE = "Full Stack AI Software Engineer";

// Minimalist Tech Icons
const ReactIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => 
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('circle', { cx: '12', cy: '12', r: '2', stroke: 'currentColor', strokeWidth: '1.5' }),
    React.createElement('ellipse', { cx: '12', cy: '12', rx: '11', ry: '4.2', stroke: 'currentColor', strokeWidth: '1.5' }),
    React.createElement('ellipse', { cx: '12', cy: '12', rx: '11', ry: '4.2', stroke: 'currentColor', strokeWidth: '1.5', transform: 'rotate(60 12 12)' }),
    React.createElement('ellipse', { cx: '12', cy: '12', rx: '11', ry: '4.2', stroke: 'currentColor', strokeWidth: '1.5', transform: 'rotate(-60 12 12)' })
  );

const ThreeJSIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2L2 7v10l10 5 10-5V7L12 2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M2 7l10 5 10-5', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M12 22V12', stroke: 'currentColor', strokeWidth: '1.5' })
  );

const TypeScriptIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('rect', { x: '2', y: '2', width: '20', height: '20', rx: '2', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 8h8M8 12h6M8 16h4', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' })
  );

const NodeIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('circle', { cx: '12', cy: '12', r: '10', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 8h8v8H8z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const FramerIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2L2 7v5l10 5 10-5V7L12 2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M12 12v10l10-5V12', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const ReactNativeIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('circle', { cx: '12', cy: '12', r: '2', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const GitIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('circle', { cx: '9', cy: '7', r: '2', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('circle', { cx: '15', cy: '17', r: '2', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M9 9v6M15 15V9', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' })
  );

const TailwindIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 6c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M18 12c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M6 12c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const ExpressIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M4 8h16M4 12h16M4 16h12', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' })
  );

const MongoIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2C8 2 5 5 5 9c0 4 3 7 7 7s7-3 7-7c0-4-3-7-7-7z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M12 16v6', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' })
  );

const PostgresIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('ellipse', { cx: '12', cy: '12', rx: '8', ry: '6', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 12h8', stroke: 'currentColor', strokeWidth: '1.5' })
  );

const FirebaseIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M4 20l16-8L12 2 4 20z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M12 2v18', stroke: 'currentColor', strokeWidth: '1.5' })
  );

const DotNetIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('circle', { cx: '12', cy: '12', r: '10', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('circle', { cx: '12', cy: '12', r: '4', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const DockerIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('rect', { x: '4', y: '6', width: '4', height: '4', rx: '1', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('rect', { x: '10', y: '6', width: '4', height: '4', rx: '1', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('rect', { x: '16', y: '6', width: '4', height: '4', rx: '1', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('rect', { x: '4', y: '12', width: '4', height: '4', rx: '1', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('rect', { x: '10', y: '12', width: '4', height: '4', rx: '1', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const AWSIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2L2 7v10l10 5 10-5V7L12 2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 12l4-2 4 2-4 2-4-2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const ViteIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2L2 12l10 10 10-10L12 2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 12l4-4 4 4', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' })
  );

const ReduxIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('circle', { cx: '12', cy: '12', r: '3', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M12 2v4M12 18v4M2 12h4M18 12h4', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round' })
  );

const JestIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className },
    React.createElement('path', { d: 'M12 2L2 7v10l10 5 10-5V7L12 2z', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
    React.createElement('path', { d: 'M8 12l2 2 4-4', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' })
  );

export const WEB_APP_PROJECTS: Project[] = [
  {
    id: 104,
    title: "AGILA",
    tagline: "Adaptive · Gamified · Interactive Learning Assessments",
    description:
      "AI-powered gamified learning for students and teachers. Teachers generate questions with AI, schedule weekly tests, and track Bloom's-aligned progress. Students compete on leaderboards, join duo/trio/squad modes, and battle in a ranked turn-based card duel where every card is a question.",
    tags: ["React", "Node.js", "Socket.io", "AI", "Gamification", "EdTech"],
    link: "https://alreria.vercel.app/",
    image: "/projects/agila/cover.png",
    locked: false,
    highlights: [
      "AI question generation for teachers",
      "Weekly tests with live leaderboards & ranking",
      "Co-op modes: Duo, Trio, and Squad of 5",
      "Ranked card duel — turn-based question battles",
      "Bloom's Taxonomy analytics & student insights",
    ],
    about: [
      "AGILA is a gamified learning platform built for classrooms. Teachers use AI to generate questions, organize weekly assessments, and monitor student progress with Bloom's Taxonomy insights.",
      "Students join weekly tests, climb leaderboards, and play competitive or cooperative modes — including duo, trio, and five-player squads.",
      "The standout mode is Ranked Card Duel: a turn-based battle where each card is a question. Players choose which card from their hand to play, challenge their opponent, and fight for ranking.",
    ],
    sections: [
      {
        title: "For Teachers",
        body: "Generate questions with AI, build subject banks, schedule weekly tests, manage students, and review analytics across performance, retention, and Bloom's accuracy.",
      },
      {
        title: "For Students",
        body: "Take weekly lab tests, track personal ranking, join crew challenges, and compete in gamified modes that turn assessments into active play.",
      },
      {
        title: "Ranked Card Duel",
        body: "Two players face off with question cards. On your turn you pick a card from your hand, ask the challenge, and continue until one player claims the match — strategy meets knowledge.",
      },
    ],
    screenshots: [
      "/projects/agila/screenshots/screenshot-1785205690085.png",
      "/projects/agila/screenshots/screenshot-1785205710665.png",
      "/projects/agila/screenshots/screenshot-1785205730306.png",
      "/projects/agila/screenshots/screenshot-1785205739820.png",
      "/projects/agila/screenshots/screenshot-1785205753786.png",
      "/projects/agila/screenshots/screenshot-1785205834529.png",
      "/projects/agila/screenshots/screenshot-1785205869402.png",
      "/projects/agila/screenshots/screenshot-1785205909092.png",
      "/projects/agila/screenshots/screenshot-1785205984310.png",
      "/projects/agila/screenshots/screenshot-1785206015712.png",
      "/projects/agila/screenshots/screenshot-1785206031062.png",
      "/projects/agila/screenshots/screenshot-1785206053792.png",
      "/projects/agila/screenshots/screenshot-1785206107502.png",
      "/projects/agila/screenshots/screenshot-1785206139166.png",
    ],
  },
  {
    id: 105,
    title: "Internship Portal",
    tagline: "Connect · Manage · Grow",
    description:
      "A centralized platform that connects students, companies, and administrators — from discovering internships and posting opportunities to verifying companies and tracking applications.",
    tags: ["React", "Node.js", "MongoDB", "Express", "EdTech", "Portal"],
    link: "https://ecainternship.vercel.app/",
    image: "/projects/internship/cover.png",
    locked: false,
    highlights: [
      "Student portal for profiles, skills, and applications",
      "Company discovery with industry filters",
      "Internship postings and opportunity browsing",
      "Admin dashboard for students, companies, and approvals",
      "Messaging and match workflows between talent and teams",
    ],
    about: [
      "Internship Portal is a multi-role platform built to streamline how students find internships, how companies discover talent, and how administrators manage the full pipeline.",
      "Students build rich profiles with skills, academic info, and readiness status, then explore companies and open postings. Companies publish opportunities and connect with candidates. Admins oversee users, verify organizations, and keep operations moving.",
      "The goal is one place for connection, posting, verification, and growth — instead of scattered spreadsheets and disconnected tools.",
    ],
    sections: [
      {
        title: "For Students",
        body: "Create a complete profile, showcase technical and soft skills, browse companies and internships, track matches, and message recruiters from a dedicated student portal.",
      },
      {
        title: "For Companies",
        body: "Post internship opportunities, explore candidate profiles, and connect with students who fit the role — with a clear path from discovery to outreach.",
      },
      {
        title: "For Administrators",
        body: "Manage students and companies, review pending approvals, verify organizations, whitelist talent, and monitor portal activity from a centralized admin dashboard.",
      },
    ],
    screenshots: [
      "/projects/internship/screenshots/screenshot-1785206896511.png",
      "/projects/internship/screenshots/screenshot-1785206916091.png",
      "/projects/internship/screenshots/screenshot-1785206941235.png",
      "/projects/internship/screenshots/screenshot-1785206977641.png",
      "/projects/internship/screenshots/screenshot-1785206992625.png",
      "/projects/internship/screenshots/screenshot-1785207045639.png",
      "/projects/internship/screenshots/screenshot-1785207062684.png",
    ],
  },
  {
    id: 101,
    title: "Payment NGNair",
    description: "A fintech platform for digital payments, POS management, merchant onboarding, customer operations, inventory tracking, and marketplace workflows.",
    tags: ["Next.js", "NestJS", "GraphQL", "PostgreSQL", "FinTech"],
    link: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    locked: true,
  },
  {
    id: 102,
    title: "May Rights Ba Ako?",
    description: "An AI legal rights analysis app that summarizes submitted cases and surfaces nearby lawyers, attorneys, government offices, and support resources.",
    tags: ["Next.js", "Firebase", "AI", "LegalTech", "Case Analysis"],
    link: "#",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    locked: true,
  },
  {
    id: 103,
    title: "Rekomendito",
    description: "A business finder and recommendation tool built for Byte Forward Hackathon, helping users discover relevant local businesses through smarter search flows.",
    tags: ["React", "Express", "Node.js", "MongoDB", "REST API"],
    link: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    locked: true,
  },
];

export const WEB_DESIGN_PROJECTS: Project[] = [
  {
    id: 201,
    title: "1042 Star Radio FM",
    description: "Radio station website with programming highlights, listen links, and mobile-friendly station branding.",
    tags: ["Media", "Responsive", "Brand", "SEO"],
    link: "https://1042-star-radio-fm.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 202,
    title: "Kystarbeid AS",
    description: "Norwegian diving company site for demanding offshore and underwater operations, with service clarity and professional presentation.",
    tags: ["Diving", "Norway", "Corporate", "Responsive"],
    link: "https://kystarbeid-as.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 203,
    title: "Rokko AS",
    description: "Professional company website with structured content, clear hierarchy, and polished presentation.",
    tags: ["Corporate", "Web Design", "UX", "Mobile"],
    link: "https://rokko-as.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 204,
    title: "Cools North LLC",
    description: "About-focused business page with company story, service context, and accessible responsive design.",
    tags: ["About Page", "Local Business", "Responsive", "SEO"],
    link: "https://cools-north-llc.demo-previews.com/about",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 205,
    title: "MAVV Construction Services",
    description: "Construction services site with project credibility, service sections, and inquiry-friendly layout.",
    tags: ["Construction", "Services", "Lead Flow", "Mobile"],
    link: "https://mavv-construction-services.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 206,
    title: "Solventa AS",
    description: "Business website with modern sections, service clarity, and performance-minded responsive build.",
    tags: ["Business", "Corporate", "Responsive", "SEO"],
    link: "https://solventa-as.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 207,
    title: "Taquitos Way",
    description: "Hospitality-focused site with menu-led content, brand personality, and mobile-first browsing.",
    tags: ["Hospitality", "Food", "Brand", "Mobile"],
    link: "https://taquitos-way.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 208,
    title: "MRDCB",
    description: "Client website with structured service presentation, contact paths, and responsive UI polish.",
    tags: ["Client Site", "Responsive", "UI Design", "SEO"],
    link: "https://mrdcb.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 209,
    title: "Hawk Cooling & Heating",
    description: "HVAC supplies business site with service details, trust cues, and conversion-ready sections.",
    tags: ["HVAC", "Local SEO", "Services", "Responsive"],
    link: "https://hawk-cooling-and-heating-supplies-llc.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1581094794329-cd11f074f1cd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 210,
    title: "PB Fernandez Construction",
    description: "Construction services website with project showcase, service sections, and a professional client-facing layout.",
    tags: ["Construction", "Services", "Responsive", "Lead Flow"],
    link: "https://pb-fernandez-construction.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 211,
    title: "Comfort Zone Gen. Contractor Co.",
    description: "Metro Manila general contractor site with service coverage, trust sections, and mobile-ready presentation.",
    tags: ["Construction", "Metro Manila", "Contractor", "Responsive"],
    link: "https://comfort-zone-gen-contractor-co.demo-previews.com/",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 212,
    title: "Aasebø Betongentreprenør AS",
    description: "Norwegian concrete contractor services page covering full-scope betong work, capabilities, and client-ready service presentation.",
    tags: ["Concrete", "Norway", "Services", "Responsive"],
    link: "https://aaseb-betongentreprenr-as.demo-previews.com/tjenester",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", category: "Frontend", level: 98, icon: ReactIcon },
  { name: "Three.js / WebGL", category: "Frontend", level: 90, icon: ThreeJSIcon },
  { name: "TypeScript", category: "Frontend", level: 95, icon: TypeScriptIcon },
  { name: "Node.js", category: "Backend", level: 88, icon: NodeIcon },
  { name: "Framer Motion", category: "Frontend", level: 92, icon: FramerIcon },
  { name: "React Native", category: "Mobile", level: 85, icon: ReactNativeIcon },
  { name: "Git / GitHub", category: "Tools", level: 90, icon: GitIcon },
  { name: "Tailwind CSS", category: "Frontend", level: 88, icon: TailwindIcon },
  { name: "Express.js", category: "Backend", level: 87, icon: ExpressIcon },
  { name: "MongoDB", category: "Database", level: 82, icon: MongoIcon },
  { name: "PostgreSQL", category: "Database", level: 80, icon: PostgresIcon },
  { name: "Firebase", category: "Backend", level: 85, icon: FirebaseIcon },
  { name: ".NET", category: "Backend", level: 80, icon: DotNetIcon },
  { name: "Docker", category: "Tools", level: 83, icon: DockerIcon },
  { name: "AWS", category: "Cloud", level: 75, icon: AWSIcon },
  { name: "Vite", category: "Tools", level: 90, icon: ViteIcon },
  { name: "Redux / Zustand", category: "Frontend", level: 88, icon: ReduxIcon },
  { name: "Jest / Testing", category: "Tools", level: 85, icon: JestIcon },
];

export const EXPERTISE_CATEGORIES: {
  category: Skill['category'];
  title: string;
  description: string;
}[] = [
  {
    category: 'Frontend',
    title: 'Interface Engineering',
    description: 'Responsive interfaces, motion systems, and performance-minded UI built with modern React ecosystems.',
  },
  {
    category: 'Backend',
    title: 'Server & APIs',
    description: 'Scalable services, authentication flows, and API layers that support real product logic and integrations.',
  },
  {
    category: 'Database',
    title: 'Data Layer',
    description: 'Schema design, query optimization, and reliable persistence across SQL and document stores.',
  },
  {
    category: 'Mobile',
    title: 'Cross-Platform',
    description: 'Mobile experiences that share logic with web while staying native-feeling on device.',
  },
  {
    category: 'Cloud',
    title: 'Cloud & Deploy',
    description: 'Production hosting, cloud primitives, and deployment paths that keep releases repeatable.',
  },
  {
    category: 'Tools',
    title: 'Workflow & Quality',
    description: 'Version control, build tooling, containers, and testing practices that keep delivery steady.',
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 6,
    role: "Software Engineer",
    company: "Payment NGNair - US-Based FinTech Company",
    period: "2025",
    description: "Worked as a Full Stack Developer for Payment NGNair, a fintech platform focused on digital payments, POS management, marketplace solutions, and product distribution systems. Developed scalable web applications and backend services handling customer management, merchant onboarding, transaction processing, inventory tracking, and marketplace operations. Collaborated with cross-functional teams to build secure, high-performance financial solutions with modern web technologies and API-driven architecture. Contributed to improving user experience, system reliability, and real-time transaction workflows for merchants and customers.",
    technologies: ["Next.js", "NestJS", "GraphQL", "TypeScript", "PostgreSQL", "React", "TailwindCSS", "REST API", "Payment Systems", "POS Systems", "Marketplace Systems", "Customer Management", "Product Management", "Git", "Docker", "Full Stack Development"]
  },
  {
    id: 7,
    role: "Web Designer",
    company: "Regen Digital Inc.",
    period: "2025",
    description: "Worked as a Web Designer at Regen Digital Inc., designing business websites for clients across Norway, the United States, Australia, and the Philippines. Created responsive, modern, and SEO-friendly frontend designs tailored to different industries and client requirements, with layouts built to work well on both mobile and desktop. Collaborated with designers, project managers, and developers to deliver high-quality web solutions focused on usability and brand identity. Handled frontend website design and customization for multiple international business projects.",
    technologies: ["React", "Next.js", "JavaScript", "TypeScript", "TailwindCSS", "Responsive Web Design", "Mobile & Desktop Layout", "SEO Optimization", "UI Design", "Git", "Frontend Development"]
  },
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Byte Forward Hackathon National - The Final Pitch (Top 5)",
    period: "2025",
    description: "Advanced to the national finals of Byte Forward Hackathon, reaching Top 5 among competing teams nationwide. Pitched and presented Rekomendito, the business finder tool, demonstrating technical excellence, innovation, and strong problem-solving capabilities. Showcased the application's impact and scalability to a panel of industry judges.",
    technologies: ["React", "Express", "Node.js", "MongoDB", "JavaScript", "REST API", "TailwindCSS", "Git", "Presentation"]
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Byte Forward Hackathon North Luzon Leg (Champion)",
    period: "2025",
    description: "Champion winner at Byte Forward Hackathon North Luzon Leg. Developed Rekomendito, an intelligent business finder tool that helps users discover and connect with local businesses through advanced search algorithms and recommendation systems. Built a robust full-stack application with real-time features and seamless user experience.",
    technologies: ["React", "Express", "Node.js", "MongoDB", "JavaScript", "REST API", "TailwindCSS", "Git"]
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "May Rights Ba Ako? - GDG-HAU Hackathon 2025: Beyond the Limits - The AI Hack",
    period: "2025",
    description: "Built May Rights Ba Ako?, an AI-powered legal rights analysis platform developed for GDG-HAU Hackathon 2025: Beyond the Limits - The AI Hack. The application analyzes user-submitted legal cases, generates clear case summaries, and provides guidance based on the situation described. Implemented Firebase for secure storage and data handling, used Next.js for the full-stack application, and added support for surfacing nearby lawyers, attorneys, government offices, and relevant legal assistance resources based on the user's area.",
    technologies: ["Next.js", "Firebase", "TypeScript", "React", "TailwindCSS", "AI Integration", "LegalTech", "Case Analysis", "Case Summarization", "Firebase Security", "Resource Directory"]
  },
  {
    id: 4,
    role: "Full Stack Developer",
    company: "School Capstone Project - AGILA",
    period: "2024 - 2025",
    description: "Developed AGILA (Adaptive Gamified Interactive Learning Assessment), a comprehensive gamified learning assessment system for school capstone project. Built a platform where students take exams with engaging gamification features including real-time leaderboards, score multipliers, and interactive card game mechanics. Implemented real-time synchronization for competitive elements and adaptive learning paths to enhance student engagement and performance tracking.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JavaScript", "Real-time Systems", "Gamification", "REST API"]
  },
  {
    id: 5,
    role: "Guest Speaker",
    company: "ISTalk - School Tech Event",
    period: "2025",
    description: "Invited as a speaker at ISTalk, a school technology event, to share insights and experiences about technology and hackathons. Presented on hackathon participation strategies, technical skills development, and lessons learned from winning competitions. Engaged with students and inspired them to pursue opportunities in tech and competitive programming.",
    technologies: ["Public Speaking", "Tech Education", "Mentorship", "Knowledge Sharing"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO at TechFlow",
    content: "Alex is a rare breed of developer who understands both the artistic and engineering sides of software. His 3D work is mesmerizing.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Product Director",
    content: "The speed at which Alex ships complex features without compromising on quality is honestly frightening. A 10x engineer.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Lead Designer",
    content: "Working with Alex is a dream. He doesn't just implement designs; he enhances them with animations I didn't even know were possible.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Product Engineering",
    title: "From Hackathon Prototype to Production-Ready App",
    deck: "A practical path for turning fast competition builds into maintainable software.",
    excerpt: "How to preserve the speed of a hackathon while adding the architecture, validation, accessibility, and deployment discipline a real product needs.",
    date: "May 18, 2026",
    readTime: "7 min read",
    tags: ["React", "Node.js", "Product"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Prototype Speed Is Not the Problem",
        paragraphs: [
          "The best hackathon builds usually work because the team protected one clear user loop. They did not try to build a platform. They built a sharp path from problem to result, then made the demo prove that path quickly.",
          "The production mistake is throwing that speed away too early. A prototype already contains valuable decisions: what the user cares about, which screens matter, where the backend needs to be dependable, and which rough edges are acceptable for a first version."
        ]
      },
      {
        heading: "Stabilize the Core Loop First",
        paragraphs: [
          "Before adding new features, I like to map the core workflow as a chain of promises: input, validation, action, feedback, and recovery. Each promise needs a clear owner in the codebase. React owns state and feedback, the API owns validation and data shape, and persistence owns the record of truth.",
          "This is where small decisions matter. Shared types, predictable error responses, loading states, empty states, and basic accessibility make the app feel intentional even before it becomes large."
        ]
      },
      {
        heading: "Turn the Demo Into a Product",
        paragraphs: [
          "A demo proves that an idea can work. A product proves that the idea can survive repeated use. The path between them is not glamorous: remove hardcoded values, replace optimistic assumptions with validation, add logging, test the riskiest flows, and make deployment repeatable.",
          "The goal is not to over-engineer the first release. The goal is to make the next decision easier. A production-ready app is one where the team can keep moving without being punished by yesterday's shortcuts."
        ]
      }
    ]
  },
  {
    id: 2,
    category: "AI Systems",
    title: "Designing AI Features That Feel Useful, Not Decorative",
    deck: "Good AI integrations solve workflow problems before they show off model output.",
    excerpt: "A field guide to scoping Gemini-powered features, grounding responses in product data, and shaping interfaces that keep users in control.",
    date: "May 10, 2026",
    readTime: "6 min read",
    tags: ["AI", "Gemini", "UX"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Start With the Workflow, Not the Model",
        paragraphs: [
          "AI features fail when they are designed as a blank text box with a famous model behind it. Useful AI starts with a specific job: summarize a record, draft a response, classify a request, generate a starting point, or explain a complex state.",
          "The interface should make the model feel like a tool inside the workflow. That means clear context, visible source data, edit controls, and a way to reject or revise the output."
        ]
      },
      {
        heading: "Ground the Output",
        paragraphs: [
          "For Gemini-powered features, grounding is usually more important than clever prompting. The model needs the right project data, constraints, tone, and examples before it can produce something dependable.",
          "I prefer small, explicit prompts that describe the task and include structured context. If the app can pass clean objects instead of vague text blobs, the result becomes easier to test and easier to debug."
        ]
      },
      {
        heading: "Keep the User in Charge",
        paragraphs: [
          "The most trustworthy AI interfaces show their seams. Users should know what was generated, what was pulled from their data, and what still needs review.",
          "A good AI feature reduces effort without removing judgment. The product should make the next action obvious: accept, edit, retry, copy, or inspect the source."
        ]
      }
    ]
  },
  {
    id: 3,
    category: "Frontend Craft",
    title: "Building Interfaces That Stay Fast Under Motion",
    deck: "Animation should clarify state and rhythm without taxing the main thread.",
    excerpt: "Techniques for keeping React, Framer Motion, and Three.js experiences smooth through measured transforms, lazy rendering, and reduced layout churn.",
    date: "Apr 29, 2026",
    readTime: "8 min read",
    tags: ["React", "Motion", "Performance"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Motion Should Explain State",
        paragraphs: [
          "Animation is strongest when it helps the user understand where they are, what changed, and what can happen next. It becomes noise when every element competes for attention.",
          "For React interfaces, I treat motion as part of the information architecture. Page transitions, reveal effects, hover states, and scroll scenes should each have a job."
        ]
      },
      {
        heading: "Prefer Cheap Properties",
        paragraphs: [
          "The browser can animate transforms and opacity much more comfortably than layout-heavy properties. When an effect needs to feel cinematic, I try to build it from translate, scale, opacity, and clip-like composition before reaching for filters or layout changes.",
          "This matters more on portfolio sites because the visual layer is already heavy. Framer Motion and Three.js can coexist, but they need discipline around render frequency, asset size, and scroll listeners."
        ]
      },
      {
        heading: "Measure the Feeling",
        paragraphs: [
          "Smoothness is not only a number, but the numbers help. Frame drops, layout shifts, oversized images, and long JavaScript tasks all show up as a feeling of friction.",
          "The polish pass is where I reduce motion blur, remove unnecessary re-renders, simplify scroll effects, and make sure the interface still feels good on a smaller device."
        ]
      }
    ]
  },
  {
    id: 4,
    category: "Backend Design",
    title: "API Boundaries for Small Teams Moving Quickly",
    deck: "A clean contract can keep a fast build from becoming a fragile build.",
    excerpt: "Patterns for request validation, service boundaries, error responses, and data modeling when a project needs to move quickly without becoming chaotic.",
    date: "Apr 17, 2026",
    readTime: "5 min read",
    tags: ["Express", "MongoDB", "Architecture"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Boundaries Reduce Guesswork",
        paragraphs: [
          "Small teams move faster when the API makes fewer things ambiguous. A route should tell the frontend what shape to send, what shape to expect, and how failure will be represented.",
          "That does not require a massive architecture. It requires consistent naming, validation near the boundary, and response formats that do not surprise the client."
        ]
      },
      {
        heading: "Make Errors Useful",
        paragraphs: [
          "A backend error should help the interface decide what to do next. Is the input invalid? Is the user unauthorized? Is the server temporarily unavailable? Those are different experiences.",
          "When Express APIs return structured error codes and friendly messages, the frontend can display better feedback without parsing vague exception text."
        ]
      },
      {
        heading: "Model the Data Around Behavior",
        paragraphs: [
          "MongoDB and relational databases both reward clear product thinking. The key question is not only what data exists, but how the app reads and changes that data during real workflows.",
          "Good boundaries make the system easier to replace later. If the frontend talks to stable use-case endpoints, the storage layer can evolve without forcing every screen to change."
        ]
      }
    ]
  },
  {
    id: 5,
    category: "3D Web",
    title: "When Three.js Belongs in a Portfolio Experience",
    deck: "3D should create spatial memory, not just visual noise.",
    excerpt: "How to decide when WebGL is worth the complexity, where to place fallbacks, and how to balance spectacle with content readability.",
    date: "Apr 03, 2026",
    readTime: "6 min read",
    tags: ["Three.js", "WebGL", "Design"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Use 3D When It Adds Memory",
        paragraphs: [
          "Three.js belongs in a portfolio when it gives the visitor a stronger sense of place. A subtle environment, interactive object, or spatial transition can make the work feel more memorable than a flat list of cards.",
          "It should still serve the content. If the 3D layer makes text harder to read, delays the first impression, or distracts from the projects, it is no longer helping."
        ]
      },
      {
        heading: "Design the Fallback Early",
        paragraphs: [
          "WebGL experiences need graceful failure paths. Some devices will be underpowered, some browsers will behave differently, and some users simply prefer reduced motion.",
          "A strong implementation has a static visual fallback, conservative asset sizes, and a clear way to pause or reduce expensive animation."
        ]
      },
      {
        heading: "Balance Spectacle and Navigation",
        paragraphs: [
          "The goal is not to prove that the page can render a complex scene. The goal is to make the user curious enough to keep exploring.",
          "The best 3D portfolio details are confident but restrained: visible enough to create identity, quiet enough that projects, experience, and contact paths stay easy to find."
        ]
      }
    ]
  },
  {
    id: 6,
    category: "Delivery Notes",
    title: "What Winning Builds Have in Common",
    deck: "The strongest projects make tradeoffs visible and execution obvious.",
    excerpt: "Lessons from competitive builds: choosing the right scope, demoing the core loop early, and making technical decisions judges and users can understand.",
    date: "Mar 22, 2026",
    readTime: "4 min read",
    tags: ["Hackathon", "Strategy", "Demo"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        heading: "Strong Builds Make the Tradeoff Obvious",
        paragraphs: [
          "Winning builds are rarely the biggest builds. They are the ones where the team chose a painful problem, made the solution legible, and protected the most important workflow from scope creep.",
          "A judge or user should understand the tradeoff quickly: what was ignored, what was solved, and why the selected path creates value."
        ]
      },
      {
        heading: "Demo the Core Loop Early",
        paragraphs: [
          "The demo should not depend on a perfect final hour. I like to have the core loop presentable as early as possible, even if the UI is still rough.",
          "Once the loop works, every improvement becomes clearer: better copy, faster loading, cleaner data, smoother transitions, and a more confident pitch."
        ]
      },
      {
        heading: "Explain the Technical Choices",
        paragraphs: [
          "Technical depth matters, but it needs translation. A stack choice should connect to speed, reliability, user experience, or future scale.",
          "When the team can explain both the product reason and the engineering reason behind a decision, the build feels intentional instead of lucky."
        ]
      }
    ]
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are NOVA, the AI assistant for Russelle Roxas's portfolio. 
Russelle is a Full Stack AI Software Engineer specializing in React, Three.js, and AI integration.
Your goal is to answer questions about Alex's skills, projects, and experience professionally with a minimalist, precise tone.
Keep answers concise (under 3 sentences usually).
Data to reference:
- Skills: React, Three.js, TypeScript, Node.js, Rust.
- Projects: Nebula Dashboard (Crypto), Synthetix AI (GenAI), Void Commerce (3D E-commerce).
- Experience: TechFlow Systems, Visual Dynamics, StartUp Inc.
- Traits: Precise, minimalist, performance-obsessed.
`;
