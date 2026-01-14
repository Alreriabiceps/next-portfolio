
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Activity, Database, Cpu, Wifi, Server, Zap, Clock, Monitor } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const CinematicMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    pageLoadTime: 0,
    timeOnPage: 0,
    memoryUsage: 0,
    connectionType: 'Unknown',
    screenResolution: '0x0',
    browserInfo: 'Unknown',
    fps: 60,
    scrollPosition: 0,
  });

  const [systemStatus, setSystemStatus] = useState([
    { name: 'DOM_LOADED', status: 'OK' },
    { name: 'REACT_MOUNTED', status: 'OK' },
    { name: 'THREE_JS_INIT', status: 'OK' },
    { name: 'ANIMATIONS_READY', status: 'OK' },
    { name: 'API_CONNECTION', status: 'OK' },
  ]);

  useEffect(() => {
    // Get page load time
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      setMetrics(prev => ({ ...prev, pageLoadTime: Math.round(pageLoadTime) }));
    }

    // Get screen resolution
    setMetrics(prev => ({
      ...prev,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    }));

    // Get browser info
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    if (userAgent.indexOf('Chrome') > -1) browserName = 'Chrome';
    else if (userAgent.indexOf('Firefox') > -1) browserName = 'Firefox';
    else if (userAgent.indexOf('Safari') > -1) browserName = 'Safari';
    else if (userAgent.indexOf('Edge') > -1) browserName = 'Edge';
    
    setMetrics(prev => ({ ...prev, browserInfo: browserName }));

    // Get connection type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType || 'Unknown';
      setMetrics(prev => ({ ...prev, connectionType: effectiveType.toUpperCase() }));
    }

    // Time on page counter
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setMetrics(prev => ({ ...prev, timeOnPage: elapsed }));
    }, 1000);

    // FPS counter
    let lastTime = performance.now();
    let frames = 0;
    const fpsInterval = setInterval(() => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({ ...prev, fps: frames }));
        frames = 0;
        lastTime = currentTime;
      }
    }, 100);

    // Scroll position
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      setMetrics(prev => ({ ...prev, scrollPosition: scrollPercent }));
    };
    window.addEventListener('scroll', handleScroll);

    // Memory usage (if available)
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
    }

    return () => {
      clearInterval(timeInterval);
      clearInterval(fpsInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <section id="creative" className="relative py-40 overflow-hidden bg-black border-y border-white/5">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
         <ScrollReveal mode="dolly">
            <div className="mb-20 text-center">
                <h2 className="text-zinc-300 font-mono text-xs tracking-[0.5em] uppercase mb-4 animate-pulse">System Diagnostics</h2>
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mix-blend-difference">
                    LIVE TELEMETRY
                </h3>
            </div>
         </ScrollReveal>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              icon={<Activity />} 
              label="Page Load" 
              value={`${metrics.pageLoadTime}ms`} 
              trend={metrics.pageLoadTime < 2000 ? "Optimal" : metrics.pageLoadTime < 4000 ? "Good" : "Slow"} 
            />
            <MetricCard 
              icon={<Clock />} 
              label="Time on Page" 
              value={formatTime(metrics.timeOnPage)} 
              trend="Active" 
            />
            <MetricCard 
              icon={<Monitor />} 
              label="FPS" 
              value={`${metrics.fps}`} 
              trend={metrics.fps >= 55 ? "Optimal" : metrics.fps >= 30 ? "Good" : "Low"} 
            />
            <MetricCard 
              icon={<Wifi />} 
              label="Connection" 
              value={metrics.connectionType} 
              trend="Stable" 
            />
            <MetricCard 
              icon={<Cpu />} 
              label="Memory" 
              value={metrics.memoryUsage > 0 ? `${metrics.memoryUsage} MB` : "N/A"} 
              trend="Normal" 
            />
            <MetricCard 
              icon={<Database />} 
              label="Browser" 
              value={metrics.browserInfo} 
              trend="Online" 
            />
            <MetricCard 
              icon={<Server />} 
              label="Resolution" 
              value={metrics.screenResolution} 
              trend="Active" 
            />
            <MetricCard 
              icon={<Zap />} 
              label="Scroll" 
              value={`${metrics.scrollPosition}%`} 
              trend="Tracking" 
            />
         </div>

         {/* Visualizer Bar */}
         <div className="mt-20 border-t border-white/10 pt-10 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8 h-64 bg-zinc-900/50 rounded-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-full h-[1px] bg-accent-400 absolute top-1/2 animate-[ping_3s_linear_infinite]" />
                    <div className="w-[1px] h-full bg-accent-400 absolute left-1/2 animate-[ping_3s_linear_infinite]" />
                </div>
                {/* Performance Viz Bars - Based on FPS and Memory */}
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-4 pb-4 gap-1">
                    {Array.from({length: 40}).map((_, i) => {
                        // Create a wave pattern based on FPS and time
                        const baseHeight = (metrics.fps / 60) * 100;
                        const waveOffset = Math.sin((Date.now() / 1000 + i * 0.1) * 2) * 20;
                        const height = Math.max(10, Math.min(90, baseHeight + waveOffset));
                        return (
                            <motion.div 
                                key={i}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full bg-accent-500/50 rounded-t-sm"
                            />
                        );
                    })}
                </div>
                <div className="absolute top-4 left-4 text-xs font-mono text-accent-400">PERFORMANCE_MONITOR</div>
                <div className="absolute top-4 right-4 text-xs font-mono text-zinc-500">
                  FPS: {metrics.fps} | Scroll: {metrics.scrollPosition}%
                </div>
            </div>

            <div className="md:col-span-4 h-64 bg-zinc-900/50 rounded-lg border border-white/5 p-6 font-mono text-xs text-zinc-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-50" />
                <ul className="space-y-2">
                    {systemStatus.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                            <span className="text-zinc-400">{item.name}...</span>
                            <span className={item.status === 'OK' ? 'text-green-500' : 'text-yellow-500'}>
                                {item.status}
                            </span>
                        </li>
                    ))}
                    <li className="flex justify-between mt-4 pt-2 border-t border-white/5">
                        <span className="text-zinc-400">LOAD_TIME...</span>
                        <span className="text-green-500">{metrics.pageLoadTime}ms</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-zinc-400">BROWSER...</span>
                        <span className="text-green-500">{metrics.browserInfo}</span>
                    </li>
                </ul>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-dashed border-zinc-700 rounded-full animate-spin border-t-accent-400" />
            </div>
         </div>
      </div>
    </section>
  );
};

const MetricCard = ({ icon, label, value, trend }: { icon: any, label: string, value: string, trend: string }) => (
    <ScrollReveal mode="hud">
        <div className="bg-zinc-900/30 border border-white/10 p-6 rounded relative overflow-hidden group hover:bg-zinc-800/50 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-accent-400">{icon}</div>
            <h4 className="text-zinc-300 text-xs font-mono uppercase tracking-widest mb-2">{label}</h4>
            <div className="text-4xl font-light text-white mb-2">{value}</div>
            <div className={`text-xs font-mono ${trend.includes('+') ? 'text-green-500' : trend.includes('Stable') ? 'text-blue-500' : 'text-zinc-300'}`}>
                {trend}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-900">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-accent-400"
                />
            </div>
        </div>
    </ScrollReveal>
);

export default CinematicMetrics;
