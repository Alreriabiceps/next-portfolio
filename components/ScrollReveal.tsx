
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  mode?: "cinematic" | "hud" | "dolly";
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  width = "fit-content", 
  mode = "cinematic", 
  delay = 0,
  className = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const cinematicVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.9, 
      filter: "blur(15px) brightness(0.5)",
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px) brightness(1)",
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.8,
        delay: delay
      }
    }
  };

  const hudVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scaleY: 0, 
      filter: "blur(4px)",
      borderLeftWidth: "0px"
    },
    visible: { 
      opacity: 1, 
      scaleY: 1, 
      filter: "blur(0px)",
      borderLeftWidth: "2px",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: delay
      }
    }
  };

  const dollyVariants: Variants = {
    hidden: { 
      opacity: 0, 
      z: -200, 
      scale: 1.2,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      z: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // Expo out
        delay: delay
      }
    }
  };

  const selectedVariant = 
    mode === 'hud' ? hudVariants : 
    mode === 'dolly' ? dollyVariants : 
    cinematicVariants;

  return (
    <div ref={ref} style={{ width, perspective: '1000px' }} className={className}>
      <motion.div
        variants={selectedVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
};
