
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Mobile' | 'Database' | 'Cloud';
  level: number; // 0-100
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  FEATURED = 'featured', // New Carousel
  EXPERIENCE = 'experience',
  EXPERTISE = 'expertise',
  CREATIVE = 'creative', // New Ultra Cool Section
  PROJECTS = 'projects',
  CONTACT = 'contact'
}

export enum Page {
  HOME = 'home',
  INSIGHTS = 'insights',
  TELEMETRY = 'telemetry'
}
