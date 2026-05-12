import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor - Smaller and more subtle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Trailing Ring - More subtle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 200 }}
      >
        <div 
          className="w-full h-full border border-red-500/20 rounded-full" 
          style={{ transform: 'translate(-2px, -2px)' }} 
        />
      </motion.div>
    </>
  );
}