import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HolographicTechAnimation } from './HolographicTechAnimation';

export function ParallaxTechBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Dark Red + Black Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 50%, #000000 100%)',
        }}
      />

      {/* Holographic Technology Animation - Delayed */}
      <HolographicTechAnimation />

      {/* Dark Red Gradient Overlays */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 20%, rgba(139, 0, 0, 0.15), transparent 60%),
              radial-gradient(ellipse 50% 40% at 70% 70%, rgba(127, 29, 29, 0.12), transparent 60%)
            `,
          }}
        />
      </motion.div>

      {/* Subtle Grid */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.02]"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#dc2626"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 80%)'
        }}
      />

      {/* Bottom Fade */}
      <div 
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000000 0%, transparent 100%)'
        }}
      />
    </div>
  );
}