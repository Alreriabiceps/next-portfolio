import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { WEB_APP_PROJECTS } from '../constants';
import { ArrowRight, ArrowUpRight, Link2, Lock, X } from 'lucide-react';
import { TextReveal } from './TextReveal';
import type { Project } from '../types';

const ProjectCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | string>('240vh');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30, mass: 0.2 });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

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
      const nextProgress =
        scrollLength > 0 ? Math.min(Math.max(-rect.top / scrollLength, 0), 1) : 0;

      progress.set(nextProgress);
    };

    measureScroll();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureScroll) : null;

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

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProject]);

  return (
    <section ref={targetRef} id="apps" style={{ height: sectionHeight }} className="relative bg-black">
      <div ref={containerRef} className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute top-12 left-8 z-20 mix-blend-difference md:left-24">
          <h3 className="mb-4 animate-pulse font-mono text-sm uppercase tracking-[0.35em] text-zinc-300">
            Product Builds
          </h3>
          <TextReveal
            text="Web Apps"
            className="text-5xl font-bold tracking-tighter text-white md:text-7xl"
          />
        </div>

        <div className="relative z-10 flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex w-max select-none gap-16 px-8 will-change-transform md:px-24"
          >
            {WEB_APP_PROJECTS.map((project, i) => (
              <Card
                key={project.id}
                project={project}
                index={i}
                onOpen={() => {
                  if (!project.locked) setActiveProject(project);
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-8 right-8 z-20 h-[1px] bg-zinc-800 md:left-24 md:right-24">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full origin-left bg-white shadow-[0_0_10px_white]"
          />
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeProject && (
              <ProjectShowcase project={activeProject} onClose={() => setActiveProject(null)} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

const Card = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const locked = project.locked === true;

  return (
    <div
      role={locked ? undefined : 'button'}
      tabIndex={locked ? -1 : 0}
      onClick={() => {
        if (!locked) onOpen();
      }}
      onKeyDown={(event) => {
        if (locked) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      className={`group relative h-[60vh] w-[85vw] flex-shrink-0 overflow-hidden border border-white/10 bg-black md:h-[70vh] md:w-[60vw] ${
        locked ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <div className={`absolute inset-0 overflow-hidden ${locked ? 'blur-[3px] opacity-50' : ''}`}>
        <motion.div
          className={`h-full w-full bg-cover bg-center transition-all duration-1000 ${
            locked
              ? 'grayscale'
              : 'grayscale group-hover:scale-105 group-hover:grayscale-0'
          }`}
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundPosition: locked ? 'center' : 'center top',
          }}
        />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent ${
          locked ? 'opacity-95' : 'opacity-90'
        }`}
      />

      {locked && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-4 border border-white/10 bg-black/55 px-8 py-6 text-center backdrop-blur-md">
            <div className="flex items-center gap-3 text-accent-400">
              <Link2 size={22} strokeWidth={1.5} className="rotate-[-35deg]" />
              <Lock size={24} strokeWidth={1.5} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Locked Build
            </p>
            <p className="text-lg font-light text-white">Still In Progress</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 z-20 w-full p-8 md:p-12">
        <div className="relative mb-6 flex items-end justify-between border-b border-white/20 pb-6">
          <div>
            {!locked && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-400">
                Featured Build
              </p>
            )}
            <h1 className="text-4xl font-light uppercase tracking-tighter text-white md:text-6xl">
              {project.title}
            </h1>
            {project.tagline && !locked && (
              <p className="mt-3 max-w-xl text-sm font-light text-zinc-400 md:text-base">
                {project.tagline}
              </p>
            )}
          </div>
          <span className="absolute -top-20 right-0 font-mono text-6xl font-bold text-white/5 md:text-8xl">
            0{index + 1}
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <p className="max-w-md text-lg font-light leading-relaxed text-zinc-300">
            {project.description}
          </p>
          <div className="flex flex-col items-start justify-between">
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="border border-white/20 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-wider text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            {!locked && (
              <span className="group/btn flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white transition-colors group-hover:text-accent-400">
                View Project
                <span className="inline-flex rounded-full bg-white p-1 text-black transition-transform group-hover/btn:rotate-45">
                  <ArrowRight size={14} />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectShowcase = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const screenshots = project.screenshots ?? [];
  const about = project.about ?? [project.description];
  const sections = project.sections ?? [];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-stretch justify-end bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-full w-full max-w-3xl flex-col border-l border-white/10 bg-zinc-950 shadow-[-24px_0_80px_rgba(0,0,0,0.55)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950/95 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-400">
              Project Case Study
            </p>
            <h2 className="mt-2 text-3xl font-light text-white sm:text-4xl">{project.title}</h2>
            {project.tagline && (
              <p className="mt-2 text-sm font-light text-zinc-400">{project.tagline}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="border-b border-white/10">
            <img
              src={project.image}
              alt={`${project.title} cover`}
              className="h-48 w-full object-cover object-top sm:h-64"
            />
          </div>

          <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
            <section>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                About
              </p>
              <div className="space-y-4">
                {about.map((paragraph) => (
                  <p key={paragraph} className="text-base font-light leading-relaxed text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {sections.length > 0 && (
              <section>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  How It Works
                </p>
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <article
                      key={section.title}
                      className="border border-white/10 bg-white/[0.02] p-4 sm:p-5"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-accent-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-light text-white">{section.title}</h3>
                      </div>
                      <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400">
                        {section.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <section>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  Key Features
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border border-white/10 bg-black/30 px-3 py-3 text-sm font-light text-zinc-200"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-accent-900/30 bg-accent-900/10 px-3 py-1.5 font-mono text-[11px] uppercase text-accent-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {project.link && project.link !== '#' && (
              <section>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-accent-400/40 bg-accent-400/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-400 transition-colors hover:border-accent-400 hover:bg-accent-400 hover:text-black"
                >
                  Visit Live Site
                  <ArrowUpRight size={14} />
                </a>
              </section>
            )}

            {screenshots.length > 0 && (
              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Screenshots
                  </p>
                  <p className="font-mono text-xs text-zinc-600">
                    {String(screenshots.length).padStart(2, '0')} frames
                  </p>
                </div>

                <div className="space-y-4">
                  {screenshots.map((shot, index) => (
                    <figure
                      key={shot}
                      className="overflow-hidden border border-white/10 bg-black"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          Frame {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-600">{project.title}</span>
                      </div>
                      <img
                        src={shot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        loading="lazy"
                        className="w-full object-cover object-top"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
};

export default ProjectCarousel;
