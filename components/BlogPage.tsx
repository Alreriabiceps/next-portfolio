import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { TextReveal } from './TextReveal';

interface BlogPageProps {
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors mb-12 text-sm font-mono uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Return to Grid
      </button>

      <div className="mb-20">
        <h2 className="text-zinc-300 font-mono text-sm tracking-[0.2em] uppercase mb-4">Transmission Log</h2>
        <TextReveal text="Insights & Thoughts" className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-6" />
        <p className="text-zinc-200 max-w-2xl text-lg font-light">
          Observations on software architecture, design patterns, and the future of digital interaction.
        </p>
      </div>

      <div className="grid gap-12">
        {BLOG_POSTS.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group grid md:grid-cols-12 gap-8 items-start border-b border-white/5 pb-12 last:border-0"
          >
            <div className="md:col-span-3 text-sm font-mono text-zinc-300 pt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="md:col-span-9">
              <div className="aspect-[2/1] overflow-hidden rounded-lg mb-6 bg-zinc-900/50">
                 <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" 
                 />
              </div>
              <div className="flex gap-3 mb-4">
                {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 border border-white/10 rounded text-[10px] uppercase tracking-wider text-zinc-200 group-hover:border-white/30 transition-colors">
                        {tag}
                    </span>
                ))}
              </div>
              <h3 className="text-3xl font-light text-white mb-3 group-hover:text-accent-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-200 leading-relaxed mb-6 font-light">
                {post.excerpt}
              </p>
              <button className="flex items-center gap-2 text-white border-b border-transparent hover:border-accent-400 pb-1 transition-all">
                Read Article <ArrowRight size={16} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

    </motion.div>
  );
};

export default BlogPage;