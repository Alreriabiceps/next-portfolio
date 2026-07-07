import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, Radio } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { TextReveal } from './TextReveal';
import type { BlogPost } from '../types';

interface BlogPageProps {
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [featuredPost, ...posts] = BLOG_POSTS;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const openArticle = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return <ArticleView post={selectedPost} onBack={closeArticle} onExit={onBack} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors mb-12 text-sm font-mono uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Grid
        </button>

        <header className="mb-16 max-w-4xl">
          <div className="flex items-center gap-3 text-accent-400 font-mono text-xs tracking-[0.35em] uppercase mb-5">
            <Radio size={16} />
            Signal Archive
          </div>
          <TextReveal text="Insights" className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-6" />
          <p className="text-zinc-200 max-w-3xl text-lg md:text-xl font-light leading-relaxed">
            Field notes on building practical full-stack products, AI-assisted workflows, performant interfaces, and polished demo experiences.
          </p>
        </header>

        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="group grid lg:grid-cols-12 gap-0 border border-white/10 bg-zinc-950/70 mb-16 overflow-hidden"
          >
            <div className="lg:col-span-7 min-h-[360px] lg:min-h-[520px] overflow-hidden bg-zinc-900">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono uppercase tracking-[0.18em]">
                  <span className="text-accent-400">{featuredPost.category}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-zinc-300">{featuredPost.date}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white leading-none mb-6">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-zinc-200 font-light leading-relaxed mb-5">
                  {featuredPost.deck}
                </p>
                <p className="text-zinc-400 leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-10">
                <PostMeta date={featuredPost.date} readTime={featuredPost.readTime} />
                <TagRow tags={featuredPost.tags} className="mt-6" />
                <ArticleButton onClick={() => openArticle(featuredPost)} className="mt-8" />
              </div>
            </div>
          </motion.article>
        )}

        <section>
          <div className="flex items-end justify-between gap-6 mb-8 border-b border-white/10 pb-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2">Latest Notes</p>
              <h2 className="text-3xl md:text-4xl text-white font-light tracking-tight">Selected Signals</h2>
            </div>
            <span className="hidden md:inline-flex text-sm font-mono text-zinc-500 uppercase tracking-[0.2em]">
              {posts.length} Entries
            </span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.06 }}
                className="group flex min-h-[520px] flex-col overflow-hidden border border-white/10 bg-zinc-950/60 transition-colors hover:border-accent-400/40"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-55 grayscale transition-all duration-700 group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-105" 
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.16em] mb-6">
                    <span className="text-accent-400">{post.category}</span>
                    <span className="text-zinc-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-white leading-tight tracking-tight mb-3 group-hover:text-accent-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-4 font-light">
                    {post.deck}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <PostMeta date={post.date} readTime={post.readTime} compact />
                    <TagRow tags={post.tags} className="mt-5" />
                    <ArticleButton onClick={() => openArticle(post)} className="mt-6" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const ArticleView = ({ post, onBack, onExit }: { post: BlogPost; onBack: () => void; onExit: () => void }) => (
  <motion.main
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.45 }}
    className="min-h-screen pt-28 pb-24 px-6"
  >
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-5 mb-12">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </button>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors text-sm font-mono uppercase tracking-widest"
        >
          Return to Grid
        </button>
      </div>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono uppercase tracking-[0.18em]">
          <span className="text-accent-400">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="text-zinc-400">{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="text-zinc-400">{post.readTime}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white leading-none mb-7">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-200 font-light leading-relaxed max-w-4xl">
          {post.deck}
        </p>
        <TagRow tags={post.tags} className="mt-8" />
      </header>

      <div className="aspect-[16/8] min-h-[280px] overflow-hidden border border-white/10 bg-zinc-900 mb-14">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover opacity-80 grayscale"
        />
      </div>

      <article className="grid lg:grid-cols-12 gap-12">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 border-l border-white/10 pl-5">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-5">In this article</p>
            <div className="space-y-4">
              {post.content.map(section => (
                <p key={section.heading} className="text-sm text-zinc-300 leading-relaxed">
                  {section.heading}
                </p>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-12">
          {post.content.map(section => (
            <section key={section.heading} className="border-b border-white/10 pb-10 last:border-0 last:pb-0">
              <h2 className="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.paragraphs.map(paragraph => (
                  <p key={paragraph} className="text-lg text-zinc-300 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  </motion.main>
);

const PostMeta = ({ date, readTime, compact = false }: { date: string; readTime: string; compact?: boolean }) => (
  <div className={`flex flex-wrap gap-4 text-zinc-400 font-mono ${compact ? 'text-xs' : 'text-sm'} uppercase tracking-[0.14em]`}>
    <span className="inline-flex items-center gap-2">
      <Calendar size={compact ? 12 : 14} />
      {date}
    </span>
    <span className="inline-flex items-center gap-2">
      <Clock size={compact ? 12 : 14} />
      {readTime}
    </span>
  </div>
);

const TagRow = ({ tags, className = '' }: { tags: string[]; className?: string }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map(tag => (
      <span key={tag} className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-300 transition-colors group-hover:border-white/25">
        {tag}
      </span>
    ))}
  </div>
);

const ArticleButton = ({ onClick, className = '' }: { onClick: () => void; className?: string }) => (
  <button onClick={onClick} className={`inline-flex items-center gap-2 text-sm text-white border-b border-transparent pb-1 transition-all hover:border-accent-400 hover:text-accent-400 ${className}`}>
    Read Article <ArrowRight size={16} />
  </button>
);

export default BlogPage;
