import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      {/* Gradiente animado de fondo */}
      <motion.div 
        className="gradient-blob blob-1"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="gradient-blob blob-2"
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="gradient-blob blob-3"
        animate={{
          x: [0, 80, 0],
          y: [0, 120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Partículas flotantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Líneas decorativas */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="decorative-line"
          style={{
            left: `${(i + 1) * 12}%`,
          }}
          animate={{
            scaleY: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
