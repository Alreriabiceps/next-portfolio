
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Download, Search, Palette, Zap, CheckCircle, Rocket, Briefcase } from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import AiAssistant from './components/AiAssistant';
import BentoSection from './components/BentoSection';
import BlogPage from './components/BlogPage';
import TelemetryPage from './components/TelemetryPage';
import ProjectCarousel from './components/ProjectCarousel';
import WebDesignSection from './components/WebDesignSection';
import { TextReveal, GlitchText } from './components/TextReveal';
import { ScrollReveal } from './components/ScrollReveal';
import { EXPERIENCE, PORTFOLIO_OWNER, PORTFOLIO_ROLE } from './constants';
import { SectionId, Page } from './types';

function App() {
  const { scrollY } = useScroll();

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
    <div
      style={{ overflowX: 'clip' }}
      className="relative min-h-screen bg-background text-zinc-100 selection:bg-accent-400/30 selection:text-white font-sans font-light"
    >
      
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
        className="relative z-10"
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
                    <h2 className="text-accent-400/80 font-mono mb-6 tracking-[0.35em] text-sm uppercase glow-text">
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
                      onClick={() => scrollToSection(SectionId.APPS)}
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
                      <h3 className="text-zinc-300 font-mono text-sm tracking-[0.35em] uppercase mb-4">Full Stack Mastery</h3>
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
              <section id="process" className="relative overflow-hidden bg-black px-6 py-32 md:py-40">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/25 to-transparent" />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(56,189,248,0.08),transparent_28%,rgba(255,255,255,0.035)_58%,transparent_82%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                  <ScrollReveal mode="dolly">
                    <div className="mb-14 grid gap-8 md:grid-cols-[1fr_420px] md:items-end">
                      <div>
                        <h3 className="text-zinc-300 font-mono text-sm uppercase mb-4">Development Workflow</h3>
                        <TextReveal text="Process & Method" className="text-5xl md:text-7xl font-light text-white" />
                      </div>
                      <p className="text-zinc-300 text-base font-light leading-relaxed">
                        A build method for moving from unclear idea to usable product: discover the loop, design the system, ship in slices, harden the edges, then improve from real feedback.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ProcessMethodology />
                </div>
              </section>

              <CareerLog />

              <section
                aria-hidden="true"
                className="relative h-36 md:h-52 overflow-hidden bg-gradient-to-b from-black via-zinc-950/80 to-black"
              >
                <div className="absolute left-1/2 top-1/2 h-px w-[min(720px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-400/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
              </section>

              <WebDesignSection />

              {/* CONTACT */}
              <section id="contact" className="py-40 px-6 mb-10 relative overflow-hidden">
                <ScrollReveal mode="dolly">
                  <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="mb-16">
                        <h3 className="text-accent-400 font-mono text-sm tracking-[0.35em] uppercase mb-6 animate-pulse">Connection Secured</h3>
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

const CareerLog: React.FC = () => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/russellecv.pdf';
    link.download = 'Russelle_Roxas_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="experience" className="relative overflow-hidden bg-black px-5 py-32 sm:px-6 md:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(56,189,248,0.045),transparent_32%,rgba(255,255,255,0.02)_72%,transparent_90%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <aside className="md:sticky md:top-32 md:col-span-4 md:h-fit">
            <ScrollReveal mode="dolly" width="100%">
              <div className="relative">
                <h3 className="pointer-events-none absolute -left-4 -top-14 -z-10 select-none text-[8rem] font-black leading-none text-white/[0.04] md:-left-20 md:-top-20 md:text-[12rem]">
                  EXP
                </h3>
                <p className="font-mono text-sm uppercase text-accent-400">Experience Archive</p>
                <h2 className="mt-4 text-5xl font-light leading-none text-white md:text-6xl">
                  Career
                  <br />
                  Log
                </h2>
                <p className="mt-7 max-w-sm text-base font-light leading-relaxed text-zinc-300">
                  A timeline of fintech engineering, client websites, hackathon builds, and technical talks.
                </p>
                <button
                  onClick={downloadResume}
                  className="mt-8 inline-flex items-center gap-3 border-b border-accent-400/35 pb-2 font-mono text-sm uppercase tracking-[0.18em] text-accent-400 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Download size={16} />
                  Download Resume
                </button>

                <div className="mt-10 flex items-center gap-4 border border-white/10 bg-white/[0.03] p-4 text-zinc-300">
                  <Briefcase size={20} className="text-accent-400" />
                  <div>
                    <p className="font-mono text-xs uppercase text-zinc-500">Track</p>
                    <p className="text-base text-white">Software Engineering</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          <div className="relative md:col-span-8">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />

            <div className="space-y-14 md:pl-14">
              {EXPERIENCE.map((job, index) => (
                <ScrollReveal key={job.id} mode="hud" delay={index * 0.06} width="100%">
                  <article className="group relative border-l border-white/10 pl-6 md:border-l-0 md:pl-0">
                    <span className="absolute -left-[62px] top-3 hidden h-3 w-3 border border-accent-400 bg-black shadow-[0_0_18px_rgba(56,189,248,0.45)] transition-colors group-hover:bg-accent-400 md:block" />
                    <span className="absolute -left-14 top-[18px] hidden h-px w-9 bg-accent-400/60 transition-all duration-300 group-hover:w-12 group-hover:bg-accent-400 md:block" />

                    <div className="border-b border-white/10 pb-12">
                      <div className="mb-5 min-w-0">
                        <p className="font-mono text-sm uppercase text-accent-400">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-3 text-3xl font-light leading-tight text-white transition-colors group-hover:text-accent-400 md:text-4xl">
                          {job.role}
                        </h3>
                        <p className="mt-3 break-words text-lg font-light leading-snug text-zinc-300">
                          {job.company}
                        </p>
                      </div>

                      <p className="max-w-3xl text-base font-light leading-relaxed text-zinc-200">
                        {job.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="border border-accent-900/30 bg-accent-900/10 px-3 py-2 font-mono text-xs leading-none text-accent-400/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CareerMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="border border-white/10 bg-white/[0.03] p-5">
    <p className="text-3xl font-light text-white">{value}</p>
    <p className="mt-2 font-mono text-xs uppercase text-zinc-500">{label}</p>
  </div>
);

const ProcessMethodology: React.FC = () => {
  const processSteps = [
    {
      id: 1,
      phase: "Signal",
      title: "Discovery & Planning",
      icon: Search,
      shortDesc: "Find the real user loop",
      fullDesc: "I start by identifying the workflow that actually matters: the user, the action, the friction, and the result. Scope gets shaped around what must be true for the first useful version.",
      tools: ["User Research", "Problem Framing", "Scope Map", "Technical Risk"],
      output: "A clear build target and the smallest valuable release."
    },
    {
      id: 2,
      phase: "Blueprint",
      title: "Design & Architecture",
      icon: Palette,
      shortDesc: "Design the system before the screen",
      fullDesc: "The UI, API, and database are planned together so the product feels smooth from the first click to the final stored record. I keep the architecture readable and ready to grow.",
      tools: ["UI Flows", "Data Models", "API Contracts", "Design System"],
      output: "A product map that engineering and design can both trust."
    },
    {
      id: 3,
      phase: "Forge",
      title: "Development & Implementation",
      icon: Zap,
      shortDesc: "Ship useful slices quickly",
      fullDesc: "I build in thin vertical slices: interface, validation, backend logic, persistence, and feedback states. Each slice should work, teach us something, and reduce uncertainty.",
      tools: ["React/Next.js", "Node/NestJS", "TypeScript", "PostgreSQL"],
      output: "Working product increments instead of a long invisible build."
    },
    {
      id: 4,
      phase: "Harden",
      title: "Testing & Quality Assurance",
      icon: CheckCircle,
      shortDesc: "Protect the parts users feel",
      fullDesc: "The polish pass is where rough edges disappear: loading states, empty states, error paths, accessibility, query speed, security checks, and the flows most likely to break.",
      tools: ["Flow Testing", "Accessibility", "Performance", "Security Checks"],
      output: "A release that feels dependable under real use."
    },
    {
      id: 5,
      phase: "Launch",
      title: "Deployment & Iteration",
      icon: Rocket,
      shortDesc: "Release, watch, improve",
      fullDesc: "Launch is not the finish line. I keep deployment repeatable, monitor the product, listen to usage signals, and turn feedback into the next focused iteration.",
      tools: ["Deployment", "Monitoring", "Feedback Loop", "Iteration"],
      output: "A live system with a practical path for the next version."
    }
  ];

  return (
    <div className="relative">
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <CareerMetric value="05" label="Phases" />
        <CareerMetric value="Build" label="Mode" />
        <CareerMetric value="Iterate" label="Rhythm" />
      </div>

      <div className="grid gap-4">
        {processSteps.map((step, index) => (
          <ScrollReveal key={step.id} mode="hud" delay={index * 0.05} width="100%">
            <article className="relative overflow-hidden border border-white/10 bg-zinc-950/75 p-5 transition-colors hover:border-accent-400/35 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400/45 via-white/10 to-transparent" />
              <div className="grid gap-5 lg:grid-cols-[120px_minmax(0,1fr)_280px] lg:items-start">
                <div className="flex items-center gap-3 lg:block">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent-400/30 bg-accent-400/10 text-accent-400">
                    <step.icon size={22} />
                  </div>
                  <div className="lg:mt-4">
                    <p className="font-mono text-sm text-accent-400">
                      {String(step.id).padStart(2, '0')}
                    </p>
                    <p className="text-sm text-zinc-500">{step.phase}</p>
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-2xl font-light leading-tight text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-zinc-300">{step.shortDesc}</p>
                  <p className="mt-4 max-w-3xl text-base font-light leading-relaxed text-zinc-300">
                    {step.fullDesc}
                  </p>
                </div>

                <div className="border border-white/10 bg-black/35 p-4">
                  <p className="font-mono text-xs uppercase text-zinc-500">Output</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">{step.output}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] leading-none text-zinc-300 sm:text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default App;
