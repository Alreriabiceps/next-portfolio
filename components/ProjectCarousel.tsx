import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { WEB_APP_PROJECTS } from '../constants';
import { ArrowRight, Link2, Lock } from 'lucide-react';
import { TextReveal } from './TextReveal';
import type { Project } from '../types';

const ProjectCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | string>('240vh');
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30, mass: 0.2 });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  // Size the pinned section from the actual horizontal overflow, like a ScrollTrigger scrub.
  useEffect(() => {
    let scrollLength = 0;

    const measureScroll = () => {
      const section = targetRef.current;
      const container = containerRef.current;
      const carousel = carouselRef.current;
      if (!section || !container || !carousel) return;

      const overflowWidth = Math.max(0, carousel.scrollWidth - container.clientWidth);
      const viewportHeight = window.innerHeight || container.clientHeight;
      scrollLength = Math.max(viewportHeight * 0.75, overflowWidth);

      setScrollDistance(overflowWidth);
      setSectionHeight(viewportHeight + scrollLength);
      updateProgress();
    };

    const updateProgress = () => {
      const section = targetRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const nextProgress = scrollLength > 0
        ? Math.min(Math.max(-rect.top / scrollLength, 0), 1)
        : 0;

      progress.set(nextProgress);
    };

    measureScroll();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measureScroll)
      : null;

    if (resizeObserver) {
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      if (carouselRef.current) resizeObserver.observe(carouselRef.current);
    }

    const refreshTimer = window.setTimeout(measureScroll, 250);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', measureScroll);

    return () => {
      resizeObserver?.disconnect();
      window.clearTimeout(refreshTimer);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', measureScroll);
    };
  }, [progress]);
  
  return (
    <section ref={targetRef} id="apps" style={{ height: sectionHeight }} className="relative bg-black">
      <div 
        ref={containerRef}
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
      >
        {/* Section Label */}
        <div className="absolute top-12 left-8 md:left-24 z-20 mix-blend-difference">
             <h3 className="text-zinc-300 font-mono text-sm tracking-[0.35em] uppercase mb-4 animate-pulse">Product Builds</h3>
             <TextReveal text="Web Apps" className="text-5xl md:text-7xl font-bold tracking-tighter text-white" />
        </div>

        <div className="relative z-10 flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={carouselRef}
            style={{ x }}
            aria-hidden="true"
            className="flex w-max gap-16 px-8 md:px-24 will-change-transform select-none blur-[3px] opacity-50 pointer-events-none"
          >
            {WEB_APP_PROJECTS.map((project, i) => (
              <Card key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-5 border border-white/10 bg-black/50 px-10 py-8 text-center backdrop-blur-md sm:px-14 sm:py-10">
              <div className="flex items-center gap-4 text-accent-400">
                <Link2 size={28} strokeWidth={1.5} className="rotate-[-35deg]" />
                <Lock size={30} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">Web Apps</p>
                <p className="mt-3 text-2xl font-light text-white sm:text-3xl">Still In Progress</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-8 right-8 md:left-24 md:right-24 h-[1px] bg-zinc-800 z-20">
             <motion.div 
                style={{ scaleX: smoothProgress }} 
                className="h-full bg-white origin-left shadow-[0_0_10px_white]"
             />
        </div>
      </div>
    </section>
  );
};

const Card = ({ project, index }: { project: Project, index: number }) => {
  return (
    <div className="relative h-[60vh] w-[85vw] md:w-[60vw] md:h-[70vh] overflow-hidden bg-black border border-white/10 group flex-shrink-0">
      {/* Background with Parallax effect on hover/focus would be complex in horizontal scroll, 
          so we use internal scaling */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
            className="w-full h-full bg-cover bg-center transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${project.image})` }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
        <div className="flex justify-between items-end mb-6 border-b border-white/20 pb-6">
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter uppercase">{project.title}</h1>
            <span className="text-6xl md:text-8xl font-mono text-white/5 font-bold absolute -top-20 right-8">0{index + 1}</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <p className="text-zinc-300 font-light leading-relaxed text-lg max-w-md">
                {project.description}
            </p>
            <div className="flex flex-col items-start justify-between">
                <div className="flex gap-2 mb-6 flex-wrap">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1.5 text-xs uppercase border border-white/20 bg-white/5 text-zinc-300 tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white hover:text-accent-400 transition-colors group/btn">
                    View Build <span className="bg-white text-black rounded-full p-1 group-hover/btn:rotate-45 transition-transform inline-flex"><ArrowRight size={14}/></span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
