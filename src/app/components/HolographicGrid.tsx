import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function HolographicGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Interactive Light Crosshair - Very Subtle */}
      <motion.div
        className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
        style={{
          left: mousePosition.x,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 25,
        }}
      />
      
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
        style={{
          top: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 25,
        }}
      />

      {/* Corner Accents - Premium */}
      {[
        { position: 'top-0 left-0', rotate: 0 },
        { position: 'top-0 right-0', rotate: 90 },
        { position: 'bottom-0 right-0', rotate: 180 },
        { position: 'bottom-0 left-0', rotate: 270 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-40 h-40 opacity-30`}
          style={{ rotate: corner.rotate }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d="M 0 0 L 100 0 L 100 4 L 4 4 L 4 100 L 0 100 Z"
              fill="none"
              stroke="url(#redGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}