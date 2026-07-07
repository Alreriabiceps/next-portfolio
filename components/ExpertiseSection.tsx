import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Database,
  LayoutTemplate,
  MonitorSmartphone,
  Server,
  Wrench,
} from 'lucide-react';
import { EXPERTISE_CATEGORIES, SKILLS } from '../constants';
import type { Skill } from '../types';
import { ScrollReveal } from './ScrollReveal';

const CATEGORY_ICONS: Record<Skill['category'], React.ComponentType<{ size?: number; className?: string }>> = {
  Frontend: LayoutTemplate,
  Backend: Server,
  Database: Database,
  Mobile: MonitorSmartphone,
  Cloud: Cloud,
  Tools: Wrench,
};

const ExpertiseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Skill['category']>('Frontend');

  const skillsByCategory = useMemo(() => {
    return EXPERTISE_CATEGORIES.map((domain) => ({
      ...domain,
      skills: SKILLS.filter((skill) => skill.category === domain.category),
    }));
  }, []);

  const activeDomain = skillsByCategory.find((domain) => domain.category === activeCategory) ?? skillsByCategory[0];
  const averageLevel = Math.round(SKILLS.reduce((sum, skill) => sum + skill.level, 0) / SKILLS.length);

  return (
    <section id="expertise" className="relative overflow-hidden bg-black px-5 py-32 sm:px-6 md:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(56,189,248,0.07),transparent_30%,rgba(255,255,255,0.02)_68%,transparent_88%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:col-span-4 lg:h-fit">
            <ScrollReveal mode="dolly" width="100%">
              <div className="relative">
                <h3 className="pointer-events-none absolute -left-4 -top-14 -z-10 select-none text-[8rem] font-black leading-none text-white/[0.04] md:-left-16 md:-top-20 md:text-[11rem]">
                  SKL
                </h3>
                <p className="font-mono text-sm uppercase text-accent-400">Capability Matrix</p>
                <h2 className="mt-4 text-5xl font-light leading-none text-white md:text-6xl">
                  Technical
                  <br />
                  Expertise
                </h2>
                <p className="mt-7 max-w-sm text-base font-light leading-relaxed text-zinc-300">
                  Full-stack delivery across interface, API, data, mobile, cloud, and tooling — grouped by how I actually ship products.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  <ExpertiseMetric value={String(EXPERTISE_CATEGORIES.length).padStart(2, '0')} label="Domains" />
                  <ExpertiseMetric value={String(SKILLS.length).padStart(2, '0')} label="Tools" />
                  <ExpertiseMetric value={`${averageLevel}%`} label="Avg Level" />
                </div>
              </div>
            </ScrollReveal>
          </aside>

          <div className="lg:col-span-8">
            <ScrollReveal mode="hud" width="100%">
              <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-6">
                {skillsByCategory.map((domain) => {
                  const Icon = CATEGORY_ICONS[domain.category];
                  const isActive = activeCategory === domain.category;

                  return (
                    <button
                      key={domain.category}
                      type="button"
                      onClick={() => setActiveCategory(domain.category)}
                      className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors sm:text-xs ${
                        isActive
                          ? 'border-accent-400/50 bg-accent-400/10 text-accent-400'
                          : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                      }`}
                    >
                      <Icon size={14} />
                      {domain.category}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal key={activeDomain.category} mode="hud" width="100%">
              <article className="relative overflow-hidden border border-white/10 bg-zinc-950/80">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400/50 via-white/10 to-transparent" />

                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent-400/30 bg-accent-400/10 text-accent-400">
                        {React.createElement(CATEGORY_ICONS[activeDomain.category], { size: 22 })}
                      </div>
                      <div>
                        <p className="font-mono text-sm text-accent-400">{activeDomain.category}</p>
                        <h3 className="mt-1 text-3xl font-light text-white md:text-4xl">{activeDomain.title}</h3>
                      </div>
                    </div>
                    <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-300">
                      {activeDomain.description}
                    </p>

                    <div className="mt-8 space-y-4">
                      {activeDomain.skills.map((skill, index) => (
                        <SkillRow key={skill.name} skill={skill} index={index} />
                      ))}
                    </div>
                  </div>

                  <div className="border border-white/10 bg-black/35 p-5">
                    <p className="font-mono text-xs uppercase text-zinc-500">Domain Snapshot</p>
                    <p className="mt-3 text-4xl font-light text-white">
                      {activeDomain.skills.length}
                      <span className="ml-2 text-base text-zinc-500">skills</span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      Strongest:{' '}
                      <span className="text-white">
                        {[...activeDomain.skills].sort((a, b) => b.level - a.level)[0]?.name}
                      </span>
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeDomain.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase text-zinc-300"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {skillsByCategory
                .filter((domain) => domain.category !== activeCategory)
                .map((domain, index) => (
                  <ScrollReveal key={domain.category} mode="hud" delay={index * 0.05} width="100%">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(domain.category)}
                      className="group w-full border border-white/10 bg-zinc-950/50 p-5 text-left transition-colors hover:border-accent-400/35"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-zinc-500 transition-colors group-hover:text-accent-400">
                            {React.createElement(CATEGORY_ICONS[domain.category], { size: 18 })}
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase text-zinc-500">{domain.category}</p>
                            <p className="mt-1 text-lg font-light text-white">{domain.title}</p>
                          </div>
                        </div>
                        <span className="font-mono text-sm text-zinc-600">{domain.skills.length}</span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm font-light leading-relaxed text-zinc-400">
                        {domain.description}
                      </p>
                    </button>
                  </ScrollReveal>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpertiseMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="border border-white/10 bg-white/[0.03] p-4">
    <p className="text-2xl font-light text-white">{value}</p>
    <p className="mt-1 font-mono text-[10px] uppercase text-zinc-500">{label}</p>
  </div>
);

const SkillRow = ({ skill, index }: { skill: Skill; index: number }) => {
  const IconComponent = skill.icon;

  return (
    <div className="group border border-white/10 bg-black/20 px-4 py-3 transition-colors hover:border-accent-400/25">
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconComponent size={16} className="text-zinc-500 transition-colors group-hover:text-accent-400" />
          <span className="text-sm text-zinc-200">{skill.name}</span>
        </div>
        <span className="font-mono text-xs text-zinc-500">{skill.level}%</span>
      </div>
      <div className="h-px overflow-hidden bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 + index * 0.06, ease: 'circOut' }}
          className="h-full bg-gradient-to-r from-accent-400/70 to-accent-400"
        />
      </div>
    </div>
  );
};

export default ExpertiseSection;
