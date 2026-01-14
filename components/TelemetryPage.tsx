import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CinematicMetrics from './DistortionGrid';
import { TextReveal } from './TextReveal';

interface TelemetryPageProps {
  onBack: () => void;
}

const TelemetryPage: React.FC<TelemetryPageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors mb-12 text-sm font-mono uppercase tracking-widest relative z-10"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Grid
        </button>

        <div className="mb-20 relative z-10">
          <h2 className="text-zinc-300 font-mono text-sm tracking-[0.2em] uppercase mb-4">System Diagnostics</h2>
          <TextReveal text="Live Telemetry" className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-6" />
          <p className="text-zinc-200 max-w-2xl text-lg font-light">
            Real-time performance metrics and system diagnostics from your browser.
          </p>
        </div>
      </div>

      <CinematicMetrics />
    </motion.div>
  );
};

export default TelemetryPage;


