import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Globe, Database, Cpu, Wifi, MapPin, Coffee, Github, Linkedin, ArrowUpRight, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { SKILLS } from '../constants';
import { TextReveal } from './TextReveal';

const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const BentoCard = ({ children, className = "", delay = 0 }: { children?: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -5, borderColor: "rgba(255,255,255,0.2)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`glass-panel p-6 rounded-2xl relative group overflow-hidden border border-white/5 transition-colors ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

const BentoSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h3 className="text-zinc-300 font-mono text-xs tracking-[0.2em] uppercase mb-4">Architecture</h3>
                <TextReveal text="Inside The System" className="text-5xl font-light tracking-tight text-white" />
            </div>
            <p className="text-zinc-200 max-w-sm text-sm leading-relaxed">
              A curated overview of my technical arsenal and professional footprint.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          
          {/* Main Bio */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-zinc-900/40">
            <div>
                {/* Profile Picture Section */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative group/profile">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/20 to-accent-900/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                        <img 
                            src="/profile/profile.jpg" 
                            alt="Russelle Roxas" 
                            className="relative w-20 h-20 rounded-full object-cover border-2 border-white/10 group-hover:border-accent-400/50 transition-all duration-300 group-hover:scale-105 shadow-lg"
                        />
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-900 shadow-lg">
                            <div className="w-full h-full bg-green-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-light text-white mb-1">Full Stack AI Software Engineer</h3>
                        <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Russelle Roxas</p>
                        <a
                          href="https://rrlabs.digital/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-400 transition-colors hover:text-white"
                        >
                          Founder · RR Labs
                          <ArrowUpRight size={12} />
                        </a>
                    </div>
                </div>
                <p className="text-zinc-300 leading-relaxed font-light">
                    Building the future, one line of code at a time. I craft pixel-perfect interfaces 
                    and bulletproof backends with equal passion. Whether it's breathing life into React 
                    components or architecting scalable Node.js systems, I turn complex problems into 
                    elegant solutions. When I'm not debugging, I'm probably optimizing-performance 
                    isn't just a feature, it's an obsession.
                </p>
            </div>
            <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
                    <span className="text-zinc-300 text-xs font-mono uppercase tracking-wider">Open for Contracts</span>
                </div>
                <div className="pl-5 border-l border-white/10 space-y-2">
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        Available for freelance projects, consulting, and long-term collaborations.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-accent-400 bg-accent-900/20 border border-accent-900/30 px-2.5 py-1.5 rounded font-mono">
                            React / Next.js
                        </span>
                        <span className="text-xs text-accent-400 bg-accent-900/20 border border-accent-900/30 px-2.5 py-1.5 rounded font-mono">
                            Node.js / TypeScript
                        </span>
                        <span className="text-xs text-accent-400 bg-accent-900/20 border border-accent-900/30 px-2.5 py-1.5 rounded font-mono">
                            Full Stack
                        </span>
                    </div>
                </div>
            </div>
          </BentoCard>

          {/* Stack */}
          <BentoCard className="md:col-span-1 md:row-span-2 bg-zinc-900/20" delay={0.1}>
            <div className="h-full flex flex-col">
                <h3 className="text-sm font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={14} className="text-zinc-300 group-hover:text-white transition-colors" />
                    Stack
                </h3>
                <div className="flex-1 space-y-6">
                    {SKILLS.map((skill, i) => {
                        const IconComponent = skill.icon;
                        return (
                            <div key={i} className="group/item">
                                <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2 group-hover/item:text-white transition-colors">
                                    <div className="flex items-center gap-2">
                                        <IconComponent size={14} className="text-zinc-400 group-hover/item:text-accent-400 transition-colors" />
                                        <span>{skill.name}</span>
                                    </div>
                                    <span>0{Math.floor(skill.level / 10)}</span>
                                </div>
                                <div className="h-[1px] bg-zinc-800 w-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "circOut" }}
                                        className="h-full bg-white group-hover/item:bg-accent-400 transition-colors"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
          </BentoCard>

          {/* Location + Connect */}
          <div className="md:col-span-1 md:row-span-2 flex h-full flex-col gap-4">
          <BentoCard className="flex-1 bg-zinc-900/30" delay={0.2}>
             <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <MapPin className="text-zinc-400 group-hover:text-accent-400 transition-colors" size={20} />
                        <ArrowUpRight className="text-zinc-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-lg text-white font-light group-hover:translate-x-1 transition-transform">Arayat, Pampanga</p>
                            <p className="text-xs text-zinc-300 font-mono mt-1">PHILIPPINES</p>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <Phone className="text-zinc-400 group-hover:text-accent-400 transition-colors" size={14} />
                                <a href="tel:+639613790775" className="text-xs text-zinc-300 font-mono hover:text-accent-400 transition-colors">+63 961 379 0775</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="text-zinc-400 group-hover:text-accent-400 transition-colors" size={14} />
                                <a href="mailto:Russelleroxas11@gmail.com" className="text-xs text-zinc-300 font-mono hover:text-accent-400 transition-colors break-all">Russelleroxas11@gmail.com</a>
                            </div>
                        </div>
                        <div className="space-y-2.5 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <Clock className="text-zinc-400 group-hover:text-accent-400 transition-colors" size={14} />
                                <span className="text-xs text-zinc-300 font-mono">PHT (UTC+8)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="text-zinc-400 group-hover:text-accent-400 transition-colors" size={14} />
                                <span className="text-xs text-zinc-300 font-mono">Available Now</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Remote / On-site</p>
                </div>
             </div>
          </BentoCard>

          {/* Socials - Positioned below Location */}
          <BentoCard className="flex flex-col justify-between bg-white/[0.02]" delay={0.3}>
             <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Wifi size={14} className="text-zinc-300 group-hover:text-white transition-colors" />
                    Connect
                </h3>
                <p className="text-xs text-zinc-400 font-light mb-6 leading-relaxed">
                    Follow my journey and connect for collaborations.
                </p>
             </div>
             <div className="flex gap-4">
                 <a href="https://github.com/Alreriabiceps" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors hover:scale-125 transform duration-200 p-2 rounded-lg hover:bg-white/5" title="GitHub">
                    <Github size={20} />
                 </a>
                 <a href="https://www.linkedin.com/in/rroxas121709/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors hover:scale-125 transform duration-200 p-2 rounded-lg hover:bg-white/5" title="LinkedIn">
                    <Linkedin size={20} />
                 </a>
                 <a href="https://rrlabs.digital/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors hover:scale-125 transform duration-200 p-2 rounded-lg hover:bg-white/5" title="RR Labs">
                    <Globe size={20} />
                 </a>
                 <a href="https://discord.com/users/your-discord-id" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors hover:scale-125 transform duration-200 p-2 rounded-lg hover:bg-white/5" title="Discord">
                    <DiscordIcon size={20} />
                 </a>
             </div>
          </BentoCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoSection;
