
import { Project, Skill, Experience, Testimonial, BlogPost } from './types';
import React from 'react';

export const PORTFOLIO_OWNER = "Russelle Roxas";
export const PORTFOLIO_ROLE = "Full stack Developer";

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

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 101,
    title: "Aether Lens",
    description: "Augmented Reality interface for smart glasses built with WebXR and Three.js.",
    tags: ["WebXR", "Three.js", "React"],
    link: "#",
    image: "https://picsum.photos/800/600?grayscale&random=20"
  },
  {
    id: 102,
    title: "Quantum Ledger",
    description: "Blockchain visualization tool processing 10k+ transactions per second in real-time.",
    tags: ["Rust", "Wasm", "WebGL"],
    link: "#",
    image: "https://picsum.photos/800/600?grayscale&random=21"
  },
  {
    id: 103,
    title: "Cyber City",
    description: "Procedural city generator using wave function collapse algorithm.",
    tags: ["Algorithms", "Canvas API"],
    link: "#",
    image: "https://picsum.photos/800/600?grayscale&random=22"
  },
  {
    id: 104,
    title: "Neural Dreams",
    description: "Interactive generative art platform powered by stable diffusion models.",
    tags: ["AI", "Python", "React"],
    link: "#",
    image: "https://picsum.photos/800/600?grayscale&random=23"
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A real-time crypto analytics platform using WebSockets and D3.js for high-frequency data visualization.",
    tags: ["React", "D3.js", "Node.js", "WebSockets"],
    link: "#",
    image: "https://picsum.photos/600/400?grayscale&random=1"
  },
  {
    id: 2,
    title: "Synthetix AI",
    description: "Generative AI content creation suite integrated with Gemini API for text-to-image and text-to-code workflows.",
    tags: ["TypeScript", "Gemini API", "Next.js", "Python"],
    link: "#",
    image: "https://picsum.photos/600/400?grayscale&random=2"
  },
  {
    id: 3,
    title: "Void Commerce",
    description: "Headless e-commerce solution with a 3D product configurator built using Three.js and React Fiber.",
    tags: ["Three.js", "React Fiber", "GraphQL", "PostgreSQL"],
    link: "#",
    image: "https://picsum.photos/600/400?grayscale&random=3"
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

export const EXPERIENCE: Experience[] = [
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
    company: "GDG-HAU Hackathon 2025: Beyond the Limits - The AI Hack",
    period: "2025",
    description: "Participated in a competitive hackathon focused on AI innovation, developing a full-stack application that leverages artificial intelligence to solve real-world challenges. Built a scalable solution with modern web technologies, integrating AI capabilities seamlessly into the user experience.",
    technologies: ["Next.js", "Firebase", "TypeScript", "React", "TailwindCSS", "AI Integration"]
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
    title: "The Future of WebGL in E-Commerce",
    excerpt: "Why 3D product configuration is becoming the standard for high-end retail brands, and how to implement it performantly.",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    tags: ["Three.js", "UX", "Performance"],
    image: "https://picsum.photos/800/600?grayscale&random=10"
  },
  {
    id: 2,
    title: "Scaling Node.js Microservices",
    excerpt: "Lessons learned from decomposing a massive monolith into resilient, independent services using NestJS and Kafka.",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    tags: ["Backend", "Architecture", "DevOps"],
    image: "https://picsum.photos/800/600?grayscale&random=11"
  },
  {
    id: 3,
    title: "AI-Driven UI Components",
    excerpt: "Building 'smart' components that adapt their layout and content based on user behavior using Gemini Flash.",
    date: "Sep 15, 2024",
    readTime: "6 min read",
    tags: ["AI", "React", "Gemini"],
    image: "https://picsum.photos/800/600?grayscale&random=12"
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are NOVA, the AI assistant for Russelle Roxas's portfolio. 
Russelle is a Full stack Developer specializing in React, Three.js, and AI integration.
Your goal is to answer questions about Alex's skills, projects, and experience professionally with a minimalist, precise tone.
Keep answers concise (under 3 sentences usually).
Data to reference:
- Skills: React, Three.js, TypeScript, Node.js, Rust.
- Projects: Nebula Dashboard (Crypto), Synthetix AI (GenAI), Void Commerce (3D E-commerce).
- Experience: TechFlow Systems, Visual Dynamics, StartUp Inc.
- Traits: Precise, minimalist, performance-obsessed.
`;
