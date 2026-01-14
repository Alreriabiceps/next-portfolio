
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: "words" | "characters" | "decrypt";
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  mode = "characters" 
}) => {
  const items = mode === "words" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: mode === "words" ? 0.1 : 0.03, 
        delayChildren: delay * i 
      },
    }),
  };

  const charVariant: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      scale: 1,
      filter: "blur(0px)",
      textShadow: "0 0 0px rgba(255,255,255,0)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      z: -50,
      scale: 1.5,
      filter: "blur(8px)",
      textShadow: "0 0 10px rgba(56,189,248,0.5)", // Glow on enter
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        wordBreak: "break-word",
        perspective: "1000px" 
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span 
          variants={charVariant} 
          style={{ 
            marginRight: mode === "words" ? "0.25em" : "0em",
            display: "inline-block",
            transformStyle: "preserve-3d"
          }} 
          key={index}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className} group`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] animate-pulse duration-100 mix-blend-screen">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] animate-pulse duration-75 mix-blend-screen">
        {text}
      </span>
    </div>
  );
};
