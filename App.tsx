
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, ArrowRight, Download, Search, Palette, Zap, CheckCircle, Rocket } from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import AiAssistant from './components/AiAssistant';
import BentoSection from './components/BentoSection';
import BlogPage from './components/BlogPage';
import TelemetryPage from './components/TelemetryPage';
import ProjectCarousel from './components/ProjectCarousel';
import { TextReveal, GlitchText } from './components/TextReveal';
import { ScrollReveal } from './components/ScrollReveal';
import { PROJECTS, EXPERIENCE, PORTFOLIO_OWNER, PORTFOLIO_ROLE } from './constants';
import { SectionId, Project, Page } from './types';

function App() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Cinematic Global Effects
  // 1. Motion Blur based on speed
  const blurAmount = useTransform(smoothVelocity, [-3000, 0, 3000], [5, 0, 5]);
  // 2. Dolly Zoom Effect (Scale entire container slightly)
  const dollyScale = useTransform(smoothVelocity, [-3000, 0, 3000], [0.98, 1, 0.98]);

  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Parallax for Hero
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    if (currentPage !== Page.HOME) {
      setCurrentPage(Page.HOME);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (currentPage !== Page.HOME) return;
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-background text-zinc-100 selection:bg-accent-400/30 selection:text-white overflow-x-hidden font-sans font-light">
      
      {/* GLOBAL CINEMATIC OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
         {/* Noise */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <ThreeBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md border-b border-white/5" />
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
          <div 
            onClick={() => { setCurrentPage(Page.HOME); window.scrollTo(0,0); }}
            className="text-lg font-bold font-mono tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-accent-400 animate-pulse" />
            Russelle Roxas
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {Object.values(SectionId).map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-[10px] font-mono font-medium transition-all uppercase tracking-[0.2em] relative group ${
                    activeSection === item && currentPage === Page.HOME ? 'text-white' : 'text-zinc-300 hover:text-zinc-100'
                  }`}
                >
                  {item}
                  {activeSection === item && currentPage === Page.HOME && (
                     <motion.div layoutId="navIndicator" className="absolute -bottom-2 left-0 right-0 h-[1px] bg-accent-400 shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              ))}
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                   setCurrentPage(currentPage === Page.INSIGHTS ? Page.HOME : Page.INSIGHTS);
                   window.scrollTo(0,0);
                }}
                className={`text-[10px] font-mono font-medium transition-all uppercase tracking-[0.2em] ${currentPage === Page.INSIGHTS ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
              >
                INSIGHTS
              </button>
              <button
                onClick={() => {
                   setCurrentPage(currentPage === Page.TELEMETRY ? Page.HOME : Page.TELEMETRY);
                   window.scrollTo(0,0);
                }}
                className={`text-[10px] font-mono font-medium transition-all uppercase tracking-[0.2em] ${currentPage === Page.TELEMETRY ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
              >
                TELEMETRY
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cinematic Main Container */}
      <motion.div 
        style={{ 
          filter: useTransform(blurAmount, (v) => `blur(${v}px)`), 
          scale: dollyScale,
          transformOrigin: 'center top'
        }}
        className="relative z-10 will-change-transform"
      >
        <AnimatePresence mode="wait">
          {currentPage === Page.INSIGHTS ? (
             <BlogPage key="blog" onBack={() => setCurrentPage(Page.HOME)} />
          ) : currentPage === Page.TELEMETRY ? (
             <TelemetryPage key="telemetry" onBack={() => setCurrentPage(Page.HOME)} />
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              transition={{ duration: 0.8 }}
            >
              {/* HERO SECTION */}
              <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
                <motion.div 
                  style={{ y: heroY, opacity: heroOpacity }}
                  className="text-center px-4 max-w-5xl mx-auto z-20 flex flex-col items-center"
                >
                  <ScrollReveal mode="cinematic">
                    <h2 className="text-accent-400/80 font-mono mb-6 tracking-[0.5em] text-xs uppercase glow-text">
                      Welcome
                    </h2>
                    
                    <h1 className="text-7xl md:text-[11rem] font-medium tracking-tighter mb-8 leading-[0.85] text-white mix-blend-overlay">
                      <GlitchText text={PORTFOLIO_OWNER.split(' ')[0]} />
                    </h1>

                    <div className="mb-12">
                      <TextReveal text={PORTFOLIO_ROLE} className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-3xl mx-auto justify-center" delay={0.8} />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(SectionId.FEATURED)}
                      className="px-12 py-4 border border-white/20 bg-white/5 text-white rounded-sm font-medium text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    >
                      <span className="relative z-10">Initialize</span>
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-100 transition-opacity duration-300 z-0" />
                    </motion.button>
                  </ScrollReveal>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-400 flex flex-col items-center gap-2"
                >
                  <span className="text-[9px] font-mono tracking-widest uppercase">Scroll to Navigate</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </section>

              <BentoSection />

              {/* EXPERTISE SECTION */}
              <section id="expertise" className="py-40 px-6 relative">
                <div className="max-w-7xl mx-auto">
                  <ScrollReveal mode="dolly">
                    <div className="mb-20 text-center">
                      <h3 className="text-zinc-300 font-mono text-xs tracking-[0.5em] uppercase mb-4">Full Stack Mastery</h3>
                      <TextReveal text="Expertise" className="text-5xl md:text-7xl font-light tracking-tighter text-white" />
                      <p className="text-zinc-400 text-sm mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                        Proficient in building end-to-end solutions from pixel-perfect interfaces to robust server architectures. 
                        Specialized in creating seamless, scalable applications that deliver exceptional user experiences.
                      </p>
                    </div>
                  </ScrollReveal>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ScrollReveal mode="cinematic" delay={0.1}>
                      <div className="p-8 border border-white/5 hover:border-accent-400/30 transition-all bg-zinc-900/20 rounded-sm relative group overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent-400 transition-colors">Frontend Engineering</h3>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm">
                          Expert in crafting responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks. 
                          I build fast, accessible, and visually stunning experiences that users love.
                        </p>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal mode="cinematic" delay={0.2}>
                      <div className="p-8 border border-white/5 hover:border-accent-400/30 transition-all bg-zinc-900/20 rounded-sm relative group overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent-400 transition-colors">Backend Development</h3>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm">
                          Skilled in building scalable server-side applications with Node.js, Express, and RESTful APIs. 
                          I architect robust systems that handle complex business logic and high traffic efficiently.
                        </p>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal mode="cinematic" delay={0.3}>
                      <div className="p-8 border border-white/5 hover:border-accent-400/30 transition-all bg-zinc-900/20 rounded-sm relative group overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent-400 transition-colors">Database & APIs</h3>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm">
                          Proficient in designing and managing databases with MongoDB and PostgreSQL. 
                          I create efficient data models and optimize queries for performance and reliability.
                        </p>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal mode="cinematic" delay={0.4}>
                      <div className="p-8 border border-white/5 hover:border-accent-400/30 transition-all bg-zinc-900/20 rounded-sm relative group overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent-400 transition-colors">UI/UX Design</h3>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm">
                          Creating intuitive, user-centered designs that balance aesthetics with functionality. 
                          I transform complex requirements into clean, engaging interfaces that enhance user experience.
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </section>

              <ProjectCarousel />

              {/* PROCESS/METHODOLOGY SECTION */}
              <section id="process" className="py-40 px-6 relative bg-zinc-900/10">
                <div className="max-w-7xl mx-auto">
                  <ScrollReveal mode="dolly">
                    <div className="mb-20 text-center">
                      <h3 className="text-zinc-300 font-mono text-xs tracking-[0.5em] uppercase mb-4">Development Workflow</h3>
                      <TextReveal text="Process & Methodology" className="text-5xl md:text-7xl font-light tracking-tighter text-white" />
                      <p className="text-zinc-400 text-sm mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                        A systematic approach to building exceptional digital experiences, from concept to deployment.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ProcessMethodology />
                </div>
              </section>

              {/* EXPERIENCE SECTION */}
              <section id="experience" className="py-40 px-6">
                <div className="max-w-6xl mx-auto">
                   <div className="grid md:grid-cols-12 gap-16">
                     <div className="md:col-span-4 hidden md:block sticky top-32 h-fit">
                        <ScrollReveal mode="dolly">
                            <h3 className="text-[12rem] font-black text-white/5 tracking-tighter absolute -left-20 -top-20 -z-10 select-none leading-none">EXP</h3>
                            <h3 className="text-5xl font-light text-white mb-6">Career<br/>Log</h3>
                            <p className="text-zinc-200 text-lg leading-relaxed font-light mb-8">
                            A tactical overview of deployed systems and engineering leadership.
                            </p>
                            <button 
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/russelleroxascv.pdf';
                                    link.download = 'Russelle_Roxas_Resume.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent-400 hover:text-white transition-colors border-b border-accent-400/30 pb-1 cursor-pointer"
                            >
                                <Download size={14} /> Download Resume
                            </button>
                        </ScrollReveal>
                     </div>
                     
                     <div className="md:col-span-8 relative pl-8 ml-2 border-l border-white/5 space-y-20">
                        {EXPERIENCE.map((job, idx) => (
                          <ScrollReveal key={job.id} mode="hud" delay={idx * 0.1}>
                            <div className="relative group">
                              <span className="absolute -left-[41px] top-2 w-5 h-[1px] bg-accent-400 group-hover:w-8 transition-all duration-300" />
                              <div className="mb-4">
                                <h3 className="text-3xl font-light text-white group-hover:text-accent-400 transition-colors">{job.role}</h3>
                                <div className="flex justify-between items-baseline mt-2 border-b border-white/5 pb-2">
                                  <h4 className="text-lg text-zinc-300">{job.company}</h4>
                                  <span className="text-zinc-300 font-mono text-xs uppercase tracking-wider">{job.period}</span>
                                </div>
                              </div>
                              <p className="text-zinc-200 mb-6 leading-relaxed font-light max-w-2xl">{job.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {job.technologies.map(tech => (
                                  <span key={tech} className="text-[10px] font-mono text-accent-400/70 bg-accent-900/10 border border-accent-900/20 px-2 py-1 rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                   </div>
                </div>
              </section>

              {/* PROJECTS GRID */}
              <section id="projects" className="py-40 px-6 relative bg-zinc-900/20">
                <div className="max-w-7xl mx-auto">
                  <ScrollReveal mode="dolly">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6 border-b border-white/5 pb-8">
                        <div>
                            <h3 className="text-zinc-300 font-mono text-xs tracking-[0.5em] uppercase mb-4">Project Database</h3>
                            <TextReveal text="Deployment Archive" className="text-5xl md:text-7xl font-light tracking-tighter text-white" />
                        </div>
                        <motion.button 
                            whileHover={{ x: 5 }}
                            className="hidden md:flex items-center gap-2 text-zinc-200 hover:text-white transition-colors text-xs uppercase tracking-widest"
                        >
                            View Full Index <ArrowRight size={14} />
                        </motion.button>
                    </div>
                  </ScrollReveal>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {PROJECTS.map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                  </div>
                </div>
              </section>

              {/* CONTACT */}
              <section id="contact" className="py-40 px-6 mb-10 relative overflow-hidden">
                <ScrollReveal mode="dolly">
                  <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="mb-16">
                        <h3 className="text-accent-400 font-mono text-xs tracking-[0.5em] uppercase mb-6 animate-pulse">Connection Secured</h3>
                        <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-8 mix-blend-overlay">
                          INITIATE<br/>PROTOCOL
                        </h2>
                    </div>
                    <div className="flex justify-center gap-12 mb-16">
                       <SocialLink href="#" icon={<Github />} label="Github" />
                       <SocialLink href="#" icon={<Linkedin />} label="LinkedIn" />
                       <SocialLink href="#" icon={<Mail />} label="Email" />
                    </div>
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:contact@example.com"
                        className="inline-block border border-white/20 bg-white/5 px-16 py-5 rounded-sm text-zinc-100 hover:text-black hover:bg-white transition-all uppercase tracking-[0.3em] text-xs relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    >
                        <span className="relative z-10 font-bold">Transmit Message</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </motion.a>
                  </div>
                </ScrollReveal>
              </section>

              <footer className="py-12 border-t border-white/5 bg-black z-10 relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
                      System Status: <span className="text-green-500">Normal</span> | © {new Date().getFullYear()} {PORTFOLIO_OWNER}
                    </p>
                    <div className="flex gap-8 text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
                        <a href="#" className="hover:text-accent-400 transition-colors">Legal</a>
                        <a href="#" className="hover:text-accent-400 transition-colors">Encrypted</a>
                    </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AiAssistant />
    </div>
  );
}

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <motion.a 
    href={href}
    whileHover={{ y: -5, color: "#38bdf8" }}
    className="group flex flex-col items-center gap-4 text-zinc-300 transition-colors"
  >
    <motion.div className="p-5 rounded-full border border-white/5 group-hover:border-accent-400/50 bg-white/[0.02] group-hover:bg-accent-900/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        {icon}
    </motion.div>
    <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">{label}</span>
  </motion.a>
);

const ProcessMethodology: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const processSteps = [
    {
      id: 1,
      title: "Discovery & Planning",
      icon: Search,
      shortDesc: "Understanding requirements and defining scope",
      fullDesc: "Deep understanding of problems, user needs, and business objectives through stakeholder interviews and technical feasibility analysis.",
      tools: ["User Research", "Wireframing", "Technical Planning", "Stakeholder Alignment"]
    },
    {
      id: 2,
      title: "Design & Architecture",
      icon: Palette,
      shortDesc: "Crafting the blueprint for success",
      fullDesc: "Scalable system architectures and intuitive interfaces with database schemas, API structures, and consistent design systems.",
      tools: ["System Design", "UI/UX Design", "Database Schema", "API Architecture"]
    },
    {
      id: 3,
      title: "Development & Implementation",
      icon: Zap,
      shortDesc: "Building with precision and speed",
      fullDesc: "Clean, maintainable code following best practices. Incremental feature implementation with focus on performance and accessibility.",
      tools: ["React/Next.js", "Node.js/Express", "MongoDB/PostgreSQL", "Real-time Features"]
    },
    {
      id: 4,
      title: "Testing & Quality Assurance",
      icon: CheckCircle,
      shortDesc: "Ensuring reliability and performance",
      fullDesc: "Thorough testing including unit, integration, and user acceptance tests. Performance optimization and security audits.",
      tools: ["Unit Testing", "Integration Testing", "Performance Optimization", "Security Audits"]
    },
    {
      id: 5,
      title: "Deployment & Iteration",
      icon: Rocket,
      shortDesc: "Launching and continuous improvement",
      fullDesc: "Modern CI/CD pipelines and cloud deployment. Monitor performance, gather feedback, and iterate for continuous improvement.",
      tools: ["CI/CD", "Cloud Deployment", "Monitoring", "Continuous Improvement"]
    }
  ];

  return (
    <div className="relative">
      {/* Connection Lines */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />
      
      <div className="grid md:grid-cols-5 gap-6 relative z-10">
        {processSteps.map((step, index) => (
          <ScrollReveal key={step.id} mode="cinematic" delay={index * 0.1}>
            <motion.div
              className="relative group"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Card */}
              <div className={`
                relative pt-12 pb-8 px-8 border border-white/5 bg-zinc-900/20 rounded-sm transition-all duration-500 h-full group/item overflow-visible
                ${hoveredStep === step.id 
                  ? 'border-accent-400/50 bg-accent-900/10 shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
                  : 'hover:border-accent-400/30'
                }
              `}>
                {/* Left border accent */}
                <div className={`
                  absolute top-0 left-0 w-1 h-full transition-all duration-500
                  ${hoveredStep === step.id 
                    ? 'bg-accent-400 scale-y-100' 
                    : 'bg-accent-400/0 group-hover/item:bg-accent-400/50 scale-y-0 group-hover/item:scale-y-100'
                  }
                `} />

                {/* Animated Border Glow */}
                {hoveredStep === step.id && (
                  <motion.div
                    className="absolute inset-0 border border-accent-400/30 rounded-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Step Number Badge */}
                <div className={`
                  absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center
                  border font-mono text-xs font-medium transition-all duration-500
                  ${hoveredStep === step.id 
                    ? 'bg-accent-400 border-accent-400 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]' 
                    : 'bg-zinc-900 border-white/10 text-zinc-400 group-hover/item:border-accent-400/50 group-hover/item:text-accent-400'
                  }
                `}>
                  {step.id}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4 mt-2">
                  <div className={`
                    p-4 rounded-full border transition-all duration-500
                    ${hoveredStep === step.id 
                      ? 'border-accent-400 bg-accent-900/30 text-accent-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]' 
                      : 'border-white/10 bg-white/[0.02] text-zinc-400 group-hover/item:border-accent-400/50 group-hover/item:text-accent-400'
                    }
                  `}>
                    <step.icon size={24} className="transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`
                  text-xl font-light mb-3 text-center transition-colors duration-300
                  ${hoveredStep === step.id ? 'text-accent-400' : 'text-white group-hover/item:text-accent-400'}
                `}>
                  {step.title}
                </h3>

                {/* Short Description */}
                <p className="text-zinc-300 text-sm text-center font-light leading-relaxed mb-4">
                  {step.shortDesc}
                </p>

                {/* Expanded Content */}
                <AnimatePresence>
                  {hoveredStep === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-zinc-300 text-xs font-light leading-relaxed mb-3">
                          {step.fullDesc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.tools.map((tool, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              className="text-[10px] font-mono text-accent-400/70 bg-accent-900/10 border border-accent-900/20 px-2 py-1 rounded"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connection Arrow (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/10 group-hover/item:bg-accent-400/50 transition-colors z-20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-white/10 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent group-hover/item:border-l-accent-400/50 transition-colors" />
                  </div>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile Connection Lines */}
      <div className="md:hidden flex justify-center gap-2 mt-6">
        {processSteps.map((_, index) => (
          <div
            key={index}
            className={`
              h-[2px] flex-1 transition-all duration-500
              ${hoveredStep && hoveredStep > index 
                ? 'bg-accent-400' 
                : 'bg-white/10'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal mode="cinematic" delay={index * 0.1}>
      <motion.div
        style={{ rotateX, rotateY, z: 100 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group h-[500px] bg-black border border-white/10 overflow-hidden transform-style-3d hover:z-20 transition-all duration-500"
      >
          {/* Card Image with Parallax */}
          <div className="absolute inset-0 overflow-hidden">
             <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
          </div>
          
          {/* Holographic Overlay on Hover */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-300 pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-light text-white uppercase tracking-tighter group-hover:text-accent-400 transition-colors">{project.title}</h3>
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                 <ExternalLink size={16} />
              </div>
            </div>
            
            <div className="h-[1px] w-full bg-white/20 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <p className="text-zinc-200 text-sm mb-6 leading-relaxed font-light line-clamp-2 group-hover:line-clamp-none transition-all">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="text-[9px] uppercase tracking-widest text-zinc-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default App;
