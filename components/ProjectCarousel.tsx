

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FEATURED_PROJECTS } from '../constants';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';

const ProjectCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const [isCarouselComplete, setIsCarouselComplete] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // Check if carousel section is centered (sticky at top) before allowing carousel scroll
  useEffect(() => {
    const checkCentered = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Check if the sticky container is at the top (centered position)
      // Allow a small threshold (50px) for smooth transitions
      const isAtTop = rect.top >= 0 && rect.top <= 50;
      setIsCentered(isAtTop);
    };

    checkCentered();
    window.addEventListener('scroll', checkCentered, { passive: true });
    window.addEventListener('resize', checkCentered, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkCentered);
      window.removeEventListener('resize', checkCentered);
    };
  }, []);

  // Handle wheel events and prevent page scroll when carousel is active
  useEffect(() => {
    // Only activate carousel scroll when section is centered (sticky at top)
    if (!isCentered) return;

    const handleWheel = (e: WheelEvent) => {
      const currentProgress = progress.get();
      const scrollSensitivity = 0.003;
      const delta = e.deltaY * scrollSensitivity;
      const newProgress = Math.max(0, Math.min(1, currentProgress + delta));
      
      // Scrolling down
      if (e.deltaY > 0) {
        // If progress >= 1 (100% - fully scrolled), allow page scroll to next section
        if (currentProgress >= 1) {
          return; // Allow page scroll
        }
        // Otherwise, prevent page scroll and update carousel
        e.preventDefault();
        e.stopPropagation();
        progress.set(newProgress);
      } 
      // Scrolling up
      else if (e.deltaY < 0) {
        // If progress > 0, prevent page scroll and scroll carousel back to start
        if (currentProgress > 0) {
          e.preventDefault();
          e.stopPropagation();
          progress.set(newProgress);
        }
        // If progress <= 0, allow page scroll to previous section
        // (no action needed, just return to allow normal scroll)
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentProgress = progress.get();
      // Prevent touch scroll if carousel is not at boundaries (0 or 1)
      if (currentProgress > 0 && currentProgress < 1) {
        e.preventDefault();
      }
    };

    // Add listener to window to catch all scroll events when centered
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isCentered, progress]);

  // Update completion state - carousel is "complete" when it reaches 100%
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const wasComplete = isCarouselComplete;
      const nowComplete = latest >= 0.99; // Consider complete at 99% to account for spring animation
      
      if (nowComplete !== wasComplete) {
        setIsCarouselComplete(nowComplete);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, isCarouselComplete]);
  
  return (
    <section ref={targetRef} id="featured" className="relative h-[200vh] bg-black">
      <div 
        ref={containerRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        
        {/* Section Label */}
        <div className="absolute top-12 left-8 md:left-24 z-20 mix-blend-difference">
             <h3 className="text-zinc-300 font-mono text-xs tracking-[0.5em] uppercase mb-4 animate-pulse">Featured Operations</h3>
             <TextReveal text="Mission Profiles" className="text-5xl md:text-7xl font-bold tracking-tighter text-white" />
        </div>

        <motion.div 
          ref={carouselRef}
          drag={isCentered ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDrag={(event, info) => {
            if (!isCentered) {
              return;
            }
            
            const container = containerRef.current;
            const carousel = carouselRef.current;
            if (!container || !carousel) return;

            // Calculate the total scrollable width
            // The carousel moves 75% of container width (from transform: -75%)
            const containerWidth = container.offsetWidth;
            const scrollableWidth = containerWidth * 0.75;
            
            // Get current drag delta (negative = left drag, positive = right drag)
            const dragDelta = info.delta.x;
            
            // Convert drag delta to progress change
            // Dragging left (negative delta) should increase progress
            // Dragging right (positive delta) should decrease progress
            const progressDelta = -dragDelta / scrollableWidth;
            const currentProgress = progress.get();
            const newProgress = Math.max(0, Math.min(1, currentProgress + progressDelta));
            
            progress.set(newProgress);
          }}
          style={{ x }} 
          className="flex gap-16 px-8 md:px-24 will-change-transform cursor-grab active:cursor-grabbing select-none"
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <Card key={project.id} project={project} index={i} />
          ))}
        </motion.div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-24 right-24 h-[1px] bg-zinc-800 z-20">
             <motion.div 
                style={{ scaleX: smoothProgress }} 
                className="h-full bg-white origin-left shadow-[0_0_10px_white]"
             />
        </div>
      </div>
    </section>
  );
};

const Card = ({ project, index }: { project: any, index: number }) => {
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
                        <span key={tag} className="px-3 py-1 text-[10px] uppercase border border-white/20 bg-white/5 text-zinc-300 tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white hover:text-accent-400 transition-colors group/btn">
                    Execute Protocol <span className="bg-white text-black rounded-full p-1 group-hover/btn:rotate-45 transition-transform inline-flex"><ArrowRight size={14}/></span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
