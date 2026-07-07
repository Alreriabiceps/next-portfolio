import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WEB_DESIGN_PROJECTS } from '../constants';
import type { Project } from '../types';
import SitePreviewImage from './SitePreviewImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WebDesignSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-design-card]');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '[data-design-heading]',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );

      gsap.set(cards, { autoAlpha: 0, y: 36 });

      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="design"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 md:py-32"
    >
      <div className="absolute inset-x-0 -top-28 h-72 pointer-events-none bg-gradient-to-b from-black via-black to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(56,189,248,0.10),transparent_24%,rgba(255,255,255,0.035)_55%,transparent_78%)]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:inset-x-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header
          data-design-heading
          className="mb-12 flex flex-col gap-8 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-sm uppercase text-accent-400">
              Client Sites
            </p>
            <h2 className="text-5xl font-light leading-none text-white md:text-7xl">
              Web Design
            </h2>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-300 md:text-lg">
              Full-color live previews from each client demo. Open any card to visit the site.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left sm:min-w-[360px]">
            <DesignMetric value={String(WEB_DESIGN_PROJECTS.length).padStart(2, '0')} label="Sites" />
            <DesignMetric value="04" label="Regions" />
            <DesignMetric value="Live" label="Previews" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {WEB_DESIGN_PROJECTS.map((project, index) => (
            <DesignCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DesignMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
    <p className="text-2xl font-light text-white">{value}</p>
    <p className="mt-1 font-mono text-xs uppercase text-zinc-500">{label}</p>
  </div>
);

const DesignCard = ({ project, index }: { project: Project; index: number }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    data-design-card
    className="group flex flex-col overflow-hidden border border-white/10 bg-zinc-950 transition-colors duration-300 hover:border-accent-400/40"
    aria-label={`Open ${project.title} live preview`}
  >
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-white/10 bg-zinc-950/90 px-3 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-[10px] text-zinc-500">
          {project.link.replace(/^https?:\/\//, '')}
        </span>
      </div>

      <SitePreviewImage
        siteUrl={project.link}
        alt={`${project.title} website preview`}
        fallbackSrc={project.image}
        className="absolute inset-0 top-8 h-[calc(100%-2rem)] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="pointer-events-none absolute right-3 top-11 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight size={14} />
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-xl font-light leading-tight text-white transition-colors group-hover:text-accent-400 md:text-2xl">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-sm text-zinc-600">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="text-sm font-light leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </a>
);

export default WebDesignSection;
