import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function PremiumTechBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Primary Horizontal Scan Beam - Premium Speed */}
      <motion.div
        initial={{ x: '-5%', opacity: 0 }}
        animate={{ 
          x: mounted ? '105%' : '-5%',
          opacity: mounted ? [0, 1, 1, 0.5, 0] : 0
        }}
        transition={{ 
          duration: 4.5,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute top-0 left-0 w-2 h-full pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)',
          filter: 'blur(3px)',
          boxShadow: '0 0 60px 25px rgba(220, 38, 38, 0.7), 0 0 100px 50px rgba(220, 38, 38, 0.3)',
        }}
      />

      {/* Secondary Horizontal Beam - Opposite Direction */}
      <motion.div
        initial={{ x: '105%', opacity: 0 }}
        animate={{ 
          x: mounted ? '-5%' : '105%',
          opacity: mounted ? [0, 0.8, 0.8, 0.4, 0] : 0
        }}
        transition={{ 
          duration: 5,
          delay: 4,
          repeat: Infinity,
          repeatDelay: 4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute top-0 right-0 w-1.5 h-full pointer-events-none z-48"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.15) 20%, rgba(220, 38, 38, 0.8) 50%, rgba(220, 38, 38, 0.15) 80%, transparent 100%)',
          filter: 'blur(4px)',
          boxShadow: '0 0 50px 20px rgba(220, 38, 38, 0.5)',
        }}
      />

      {/* Vertical Scan Beam - Premium Speed */}
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ 
          y: mounted ? '105%' : '-5%',
          opacity: mounted ? [0, 0.9, 0.9, 0.5, 0] : 0
        }}
        transition={{ 
          duration: 5,
          delay: 2.5,
          repeat: Infinity,
          repeatDelay: 4.5,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute top-0 left-0 w-full h-1 pointer-events-none z-49"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 0.9) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)',
          filter: 'blur(3px)',
          boxShadow: '0 0 50px 20px rgba(220, 38, 38, 0.6)',
        }}
      />

      {/* Additional Professional Vertical Scan - Top to Bottom */}
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ 
          y: mounted ? '105%' : '-5%',
          opacity: mounted ? [0, 1, 1, 0.6, 0] : 0
        }}
        transition={{ 
          duration: 3.5,
          delay: 1,
          repeat: Infinity,
          repeatDelay: 5,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="absolute top-0 left-0 w-full h-2 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.3) 25%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.3) 75%, transparent 100%)',
          filter: 'blur(2px)',
          boxShadow: '0 0 80px 30px rgba(220, 38, 38, 0.8), 0 0 120px 60px rgba(220, 38, 38, 0.4)',
        }}
      />

      {/* Corner Frames - HUD Style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute top-8 left-8 pointer-events-none z-40"
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path
            d="M 55,0 L 0,0 L 0,55"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
          <motion.path
            d="M 35,5 L 5,5 L 5,35"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.5 }}
          />
          <motion.line
            x1="0"
            y1="18"
            x2="22"
            y2="18"
            stroke="rgba(220, 38, 38, 0.7)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
        className="absolute top-8 right-8 pointer-events-none z-40"
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path
            d="M 105,0 L 160,0 L 160,55"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          />
          <motion.path
            d="M 125,5 L 155,5 L 155,35"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.7 }}
          />
          <motion.line
            x1="160"
            y1="18"
            x2="138"
            y2="18"
            stroke="rgba(220, 38, 38, 0.7)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.9 }}
        className="absolute bottom-8 left-8 pointer-events-none z-40"
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path
            d="M 55,160 L 0,160 L 0,105"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.4 }}
          />
          <motion.path
            d="M 35,155 L 5,155 L 5,125"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.9 }}
          />
          <motion.line
            x1="0"
            y1="142"
            x2="22"
            y2="142"
            stroke="rgba(220, 38, 38, 0.7)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 4.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.1 }}
        className="absolute bottom-8 right-8 pointer-events-none z-40"
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path
            d="M 105,160 L 160,160 L 160,105"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.6 }}
          />
          <motion.path
            d="M 125,155 L 155,155 L 155,125"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 3.1 }}
          />
          <motion.line
            x1="160"
            y1="142"
            x2="138"
            y2="142"
            stroke="rgba(220, 38, 38, 0.7)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 5, repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
      </motion.div>

      {/* Large Scanning Frame 1 - Moves and Scans - MORE LIVELY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -80, y: -20 }}
        animate={{ 
          opacity: [0, 0.7, 0.7, 0.6, 0.4],
          scale: [0.85, 1.05, 1, 1.02, 1],
          x: [0, 5, 0, -3, 0],
          y: [0, -5, 0, 3, 0]
        }}
        transition={{ 
          duration: 2.5, 
          delay: 3,
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
        className="absolute left-[12%] top-[35%] w-[420px] h-72 border-2 border-red-600/70 pointer-events-none z-35"
        style={{
          boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.35)',
        }}
      >
        {/* Animated Corner Brackets with Pulse */}
        <motion.div 
          className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 1)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 1)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 4 }}
        />
        <motion.div 
          className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 1)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 1)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
        />
        <motion.div 
          className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 1)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 1)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.4 }}
        />
        <motion.div 
          className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 1)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 1)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.6 }}
        />
        
        {/* Internal scanning beam - vertical - FASTER & MORE LIVELY */}
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 4 }}
          className="absolute left-0 w-full h-3"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.95) 50%, transparent)',
            filter: 'blur(3px)',
            boxShadow: '0 0 30px 5px rgba(220, 38, 38, 1), 0 0 60px 15px rgba(220, 38, 38, 0.6)',
          }}
        />
        
        {/* Additional horizontal scan for more activity */}
        <motion.div
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }}
          className="absolute top-0 h-full w-2"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.7) 50%, transparent)',
            filter: 'blur(3px)',
            boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.8)',
          }}
        />
      </motion.div>

      {/* Large Scanning Frame 2 - Different Position - MORE LIVELY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 80, y: 20 }}
        animate={{ 
          opacity: [0, 0.65, 0.65, 0.55, 0.35],
          scale: [0.85, 1.05, 1, 1.03, 1],
          x: [0, -5, 0, 3, 0],
          y: [0, 5, 0, -3, 0]
        }}
        transition={{ 
          duration: 2.5, 
          delay: 4,
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
        className="absolute right-[10%] top-[58%] w-96 h-56 border-2 border-red-600/60 pointer-events-none z-35"
        style={{
          boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.18), 0 0 60px rgba(220, 38, 38, 0.3)',
        }}
      >
        {/* Animated Corner Brackets with Pulse */}
        <motion.div 
          className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500/90"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 0.9)', 'rgba(220, 38, 38, 0.4)', 'rgba(220, 38, 38, 0.9)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 5 }}
        />
        <motion.div 
          className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500/90"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 0.9)', 'rgba(220, 38, 38, 0.4)', 'rgba(220, 38, 38, 0.9)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 5.2 }}
        />
        <motion.div 
          className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500/90"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 0.9)', 'rgba(220, 38, 38, 0.4)', 'rgba(220, 38, 38, 0.9)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 5.4 }}
        />
        <motion.div 
          className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500/90"
          animate={{ 
            borderColor: ['rgba(220, 38, 38, 0.9)', 'rgba(220, 38, 38, 0.4)', 'rgba(220, 38, 38, 0.9)'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 5.6 }}
        />
        
        {/* Internal scanning beam - horizontal - FASTER & MORE LIVELY */}
        <motion.div
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }}
          className="absolute top-0 h-full w-3"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.9) 50%, transparent)',
            filter: 'blur(3px)',
            boxShadow: '0 0 30px 5px rgba(220, 38, 38, 0.9), 0 0 60px 15px rgba(220, 38, 38, 0.5)',
          }}
        />
        
        {/* Additional vertical scan for more activity */}
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 6 }}
          className="absolute left-0 w-full h-2"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.65) 50%, transparent)',
            filter: 'blur(3px)',
            boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.7)',
          }}
        />
      </motion.div>

      {/* Expanding Scan Waves */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.5, 0],
          opacity: [0, 0.4, 0]
        }}
        transition={{
          duration: 3,
          delay: 5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'easeOut'
        }}
        className="absolute left-[30%] top-[45%] w-64 h-64 border-2 border-red-600/60 rounded-full pointer-events-none z-30"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.2, 0],
          opacity: [0, 0.35, 0]
        }}
        transition={{
          duration: 3.5,
          delay: 8,
          repeat: Infinity,
          repeatDelay: 6,
          ease: 'easeOut'
        }}
        className="absolute right-[25%] top-[60%] w-56 h-56 border-2 border-red-600/50 rounded-full pointer-events-none z-30"
      />

      {/* Diagonal Sweep Lines */}
      <motion.div
        initial={{ x: '-100%', y: '-100%', opacity: 0 }}
        animate={{ 
          x: '100%',
          y: '100%',
          opacity: [0, 0.3, 0.3, 0]
        }}
        transition={{ 
          duration: 4,
          delay: 6,
          repeat: Infinity,
          repeatDelay: 6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute top-0 left-0 w-1 h-[200%] pointer-events-none z-25"
        style={{
          background: 'rgba(220, 38, 38, 0.5)',
          transform: 'rotate(45deg)',
          transformOrigin: 'center',
          filter: 'blur(2px)',
          boxShadow: '0 0 30px rgba(220, 38, 38, 0.6)',
        }}
      />

      {/* Rotating Reticle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.6, 0.6, 0],
          scale: [0.5, 1.2, 1.2, 0.8],
          rotate: 360
        }}
        transition={{
          duration: 6,
          delay: 7,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'linear'
        }}
        className="absolute left-[35%] top-[48%] w-48 h-48 pointer-events-none z-38"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(220, 38, 38, 0.7)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="12 6"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
          />
          <line x1="50" y1="8" x2="50" y2="28" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="50" y1="72" x2="50" y2="92" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="8" y1="50" x2="28" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="72" y1="50" x2="92" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* Subtle Grid Lines - Very Minimal */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`grid-v-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2, delay: 2 + i * 0.2 }}
          className="absolute top-0 h-full w-px pointer-events-none z-10"
          style={{
            left: `${20 + i * 20}%`,
            background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.4) 50%, transparent)',
          }}
        />
      ))}

      {/* Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </>
  );
}