import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { ParallaxTechBackground } from '../components/ParallaxTechBackground';
import { TechnologyAnimation } from '../components/TechnologyAnimation';
import { Footer } from '../components/Footer';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import CountUp from 'react-countup';
import {
  ArrowRight,
  Star,
  Users,
  Briefcase,
  Building2,
  Store,
  Globe,
  Compass,
  BookOpen,
  Rocket,
  Shield,
  Award,
  Check,
  TrendingUp,
  Zap,
  Target,
  ChevronRight,
  Cpu,
  Lock,
  Cloud,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   3D TILT HOOK
═══════════════════════════════════════════════════════════════ */
function use3DTilt(strength = 10) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientX - cx) / (rect.width / 2)) * strength,
      y: -((e.clientY - cy) / (rect.height / 2)) * strength,
    });
  }, [strength]);
  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  return { ref, tilt, handleMouseMove, handleMouseLeave };
}

/* ═══════════════════════════════════════════════════════════════
   3D CARD WRAPPER
═══════════════════════════════════════════════════════════════ */
function Card3D({ children, className = '', strength = 8 }) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = use3DTilt(strength);
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {/* Dynamic glow that follows cursor */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 3}% ${50 - tilt.y * 3}%, rgba(220,38,38,0.12), transparent 65%)`,
          opacity: Math.abs(tilt.x) + Math.abs(tilt.y) > 1 ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX IMAGE — moves slower than scroll for depth
═══════════════════════════════════════════════════════════════ */
function ParallaxImg({ src, alt, className = '', speed = 0.25, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1 + speed * 0.6 }}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="block w-7 h-px bg-red-600" />
      <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">{children}</span>
      <span className="block w-7 h-px bg-red-600" />
    </div>
  );
}

function TechGrid({ opacity = 0.025, color = '#B51D39', size = 48 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE — UNCHANGED STRUCTURE (Navigation, Footer, Link, etc.)
═══════════════════════════════════════════════════════════════ */
export function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      <Navigation />

      {/* ── Hero — EXACT SAME ── */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <ParallaxTechBackground />
        <TechnologyAnimation />
        <HeroSectionInline />
      </motion.section>

      {/* ── Enhanced Light Sections ── */}
      <div className="relative bg-white">
        <StatsBannerInline />
        <TechShowcaseSectionInline />
        <MilestonesSectionInline />
        <TechGallerySectionInline />
        <ProgramsSectionInline />
        <CareerBoostSectionInline />
        <EnterpriseSectionInline />
        <QualityAssuranceSectionInline />
        <Footer />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM TECH BACKGROUND — 100% ORIGINAL, NOTHING REMOVED
═══════════════════════════════════════════════════════════════ */
function PremiumTechBackgroundInline() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <motion.div
        initial={{ x: '-5%', opacity: 0 }}
        animate={{ x: mounted ? '105%' : '-5%', opacity: mounted ? [0, 1, 1, 0.5, 0] : 0 }}
        transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-2 h-full pointer-events-none z-50"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)', filter: 'blur(3px)', boxShadow: '0 0 60px 25px rgba(220, 38, 38, 0.7), 0 0 100px 50px rgba(220, 38, 38, 0.3)' }}
      />
      <motion.div
        initial={{ x: '105%', opacity: 0 }}
        animate={{ x: mounted ? '-5%' : '105%', opacity: mounted ? [0, 0.8, 0.8, 0.4, 0] : 0 }}
        transition={{ duration: 5, delay: 4, repeat: Infinity, repeatDelay: 4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-1.5 h-full pointer-events-none z-48"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.15) 20%, rgba(220, 38, 38, 0.8) 50%, rgba(220, 38, 38, 0.15) 80%, transparent 100%)', filter: 'blur(4px)', boxShadow: '0 0 50px 20px rgba(220, 38, 38, 0.5)' }}
      />
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ y: mounted ? '105%' : '-5%', opacity: mounted ? [0, 0.9, 0.9, 0.5, 0] : 0 }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 4.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-1 pointer-events-none z-49"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 0.9) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)', filter: 'blur(3px)', boxShadow: '0 0 50px 20px rgba(220, 38, 38, 0.6)' }}
      />
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ y: mounted ? '105%' : '-5%', opacity: mounted ? [0, 1, 1, 0.6, 0] : 0 }}
        transition={{ duration: 3.5, delay: 1, repeat: Infinity, repeatDelay: 5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full h-2 pointer-events-none z-50"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.3) 25%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.3) 75%, transparent 100%)', filter: 'blur(2px)', boxShadow: '0 0 80px 30px rgba(220, 38, 38, 0.8), 0 0 120px 60px rgba(220, 38, 38, 0.4)' }}
      />

      {/* Corner brackets */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.5 }} className="absolute top-8 left-8 pointer-events-none z-40">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path d="M 55,0 L 0,0 L 0,55" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }} />
          <motion.path d="M 35,5 L 5,5 L 5,35" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.5 }} />
          <motion.line x1="0" y1="18" x2="22" y2="18" stroke="rgba(220, 38, 38, 0.7)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.7 }} className="absolute top-8 right-8 pointer-events-none z-40">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path d="M 105,0 L 160,0 L 160,55" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.2 }} />
          <motion.path d="M 125,5 L 155,5 L 155,35" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.7 }} />
          <motion.line x1="160" y1="18" x2="138" y2="18" stroke="rgba(220, 38, 38, 0.7)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 1.9 }} className="absolute bottom-8 left-8 pointer-events-none z-40">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path d="M 55,160 L 0,160 L 0,105" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.4 }} />
          <motion.path d="M 35,155 L 5,155 L 5,125" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.9 }} />
          <motion.line x1="0" y1="142" x2="22" y2="142" stroke="rgba(220, 38, 38, 0.7)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 4.5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 2.1 }} className="absolute bottom-8 right-8 pointer-events-none z-40">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <motion.path d="M 105,160 L 160,160 L 160,105" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.6 }} />
          <motion.path d="M 125,155 L 155,155 L 155,125" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 3.1 }} />
          <motion.line x1="160" y1="142" x2="138" y2="142" stroke="rgba(220, 38, 38, 0.7)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>

      {/* Large hologram scanning rectangle (left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -80, y: -20 }}
        animate={{ opacity: [0, 0.7, 0.7, 0.6, 0.4], scale: [0.85, 1.05, 1, 1.02, 1], x: [0, 5, 0, -3, 0], y: [0, -5, 0, 3, 0] }}
        transition={{ duration: 2.5, delay: 3, times: [0, 0.2, 0.5, 0.8, 1] }}
        className="absolute left-[12%] top-[35%] w-[420px] h-72 border-2 border-red-600/70 pointer-events-none z-35"
        style={{ boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.35)' }}
      >
        <motion.div className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4 }} />
        <motion.div className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.2 }} />
        <motion.div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.4 }} />
        <motion.div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.6 }} />
        <motion.div animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 4 }} className="absolute left-0 w-full h-3" style={{ background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.95) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 30px 5px rgba(220, 38, 38, 1), 0 0 60px 15px rgba(220, 38, 38, 0.6)' }} />
        <motion.div animate={{ x: ['0%', '100%', '0%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }} className="absolute top-0 h-full w-2" style={{ background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.7) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.8)' }} />
      </motion.div>

      {/* Small hologram scanning rectangle (right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 80, y: 20 }}
        animate={{ opacity: [0, 0.65, 0.65, 0.55, 0.35], scale: [0.85, 1.05, 1, 1.03, 1], x: [0, -5, 0, 3, 0], y: [0, 5, 0, -3, 0] }}
        transition={{ duration: 2.5, delay: 4, times: [0, 0.2, 0.5, 0.8, 1] }}
        className="absolute right-[10%] top-[58%] w-96 h-56 border-2 border-red-600/60 pointer-events-none z-35"
        style={{ boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.18), 0 0 60px rgba(220, 38, 38, 0.3)' }}
      >
        <motion.div className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5 }} />
        <motion.div className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.2 }} />
        <motion.div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.4 }} />
        <motion.div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.6 }} />
        <motion.div animate={{ x: ['0%', '100%', '0%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }} className="absolute top-0 h-full w-3" style={{ background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.9) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 30px 5px rgba(220, 38, 38, 0.9), 0 0 60px 15px rgba(220, 38, 38, 0.5)' }} />
        <motion.div animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 6 }} className="absolute left-0 w-full h-2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.65) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.7)' }} />
      </motion.div>

      {/* Ripple circles */}
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 2.5, 0], opacity: [0, 0.4, 0] }} transition={{ duration: 3, delay: 5, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }} className="absolute left-[30%] top-[45%] w-64 h-64 border-2 border-red-600/60 rounded-full pointer-events-none z-30" />
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 2.2, 0], opacity: [0, 0.35, 0] }} transition={{ duration: 3.5, delay: 8, repeat: Infinity, repeatDelay: 6, ease: 'easeOut' }} className="absolute right-[25%] top-[60%] w-56 h-56 border-2 border-red-600/50 rounded-full pointer-events-none z-30" />

      {/* Diagonal sweep line */}
      <motion.div
        initial={{ x: '-100%', y: '-100%', opacity: 0 }}
        animate={{ x: '100%', y: '100%', opacity: [0, 0.3, 0.3, 0] }}
        transition={{ duration: 4, delay: 6, repeat: Infinity, repeatDelay: 6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-1 h-[200%] pointer-events-none z-25"
        style={{ transform: 'rotate(45deg)', transformOrigin: 'center', filter: 'blur(2px)', boxShadow: '0 0 30px rgba(220, 38, 38, 0.6)' }}
      />

      {/* Rotating reticle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0.6, 0], scale: [0.5, 1.2, 1.2, 0.8], rotate: 360 }}
        transition={{ duration: 6, delay: 7, repeat: Infinity, repeatDelay: 8, ease: 'linear' }}
        className="absolute left-[35%] top-[48%] w-48 h-48 pointer-events-none z-38"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="rgba(220, 38, 38, 0.7)" strokeWidth="2" fill="none" strokeDasharray="12 6" />
          <circle cx="50" cy="50" r="32" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="1.5" fill="none" />
          <line x1="50" y1="8"  x2="50" y2="28" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="50" y1="72" x2="50" y2="92" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="8"  y1="50" x2="28" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
          <line x1="72" y1="50" x2="92" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* Vertical grid lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`grid-v-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2, delay: 2 + i * 0.2 }}
          className="absolute top-0 h-full w-px pointer-events-none z-10"
          style={{ left: `${20 + i * 20}%`, background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.4) 50%, transparent)' }}
        />
      ))}

      {/* Central red glow orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] pointer-events-none z-5"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — 100 % ORIGINAL
═══════════════════════════════════════════════════════════════ */
function HeroSectionInline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <PremiumTechBackgroundInline />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-8 py-20">
        <motion.div style={{ y, opacity }} className="relative">
          <div className="relative w-full h-[600px] lg:h-[700px] rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 90%)' }}
            />
            <img
              src="https://iili.io/B5aiJd7.jpg"
              alt="Technology training professionals"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'none' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-transparent"
              style={{ background: 'linear-gradient(to right, rgba(127,29,29,0.3) 0%, transparent 40%)' }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-3xl px-12 lg:px-20">
                <div className="space-y-6">
                  {/* Main Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white"
                  >
                    Technology courses for the{" "}
                    <span className="text-red-500">
                      real world
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl"
                  >
                    Get certified with industry leaders in
                    technology and AI security.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <Link
                      to="/programs"
                      className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-900/40"
                    >
                      <span className="flex items-center gap-2">
                        Explore Programs
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>

                    <Link
                      to="/contact"
                      className="group px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold text-lg rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Tech Consultant
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-0 left-0 right-0 px-12 lg:px-20 py-8 bg-gradient-to-t from-black/80 to-transparent"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white text-lg">
                  Trusted by <strong className="text-red-500">400,000+</strong> Certified Professionals Worldwide
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-white text-2xl font-bold">4.7</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-green-500 fill-green-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B67A" />
                    </svg>
                    <span className="text-gray-200 font-medium">Trustpilot</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
/* ═══════════════════════════════════════════════════════════════
   NEW: STATS BANNER — dark strip between hero and milestones
═══════════════════════════════════════════════════════════════ */
function StatsBannerInline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stats = [
    { value: 400000, suffix: '+', label: 'Certified Professionals' },
    { value: 15,     suffix: '+', label: 'Years of Excellence' },
    { value: 98,     suffix: '%', label: 'Learner Success Rate' },
    { value: 50,     suffix: '+', label: 'Expert Instructors' },
  ];
  return (
    <section ref={ref} className="relative py-14 bg-gray-950 overflow-hidden">
      <TechGrid opacity={0.07} color="#dc2626" size={40} />
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tabular-nums">
                {isInView
                  ? <><CountUp end={s.value} duration={2.2} delay={i * 0.1} separator="," />{s.suffix}</>
                  : `0${s.suffix}`}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">{s.label}</p>
              <div className="mt-3 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NEW: TECH SHOWCASE — dark section, 3D tilt image cards
═══════════════════════════════════════════════════════════════ */
function TechShowcaseSectionInline() {
  const domains = [
    { img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', label: 'Artificial Intelligence', icon: Cpu },
    { img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',    label: 'Cybersecurity',          icon: Lock },
    { img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',    label: 'Cloud Architecture',     icon: Cloud },
    { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', label: 'Hardware & Systems',     icon: Zap },
    { img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&q=80', label: 'Data Science',           icon: Target },
  ];

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      <TechGrid opacity={0.06} color="#dc2626" size={40} />
      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel>Technology Domains</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Master the <span className="text-red-500">Technologies</span> That Matter
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            In-demand skills across AI, cloud, security, and engineering disciplines.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {domains.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card3D
                  className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
                  strength={10}
                >
                  <ParallaxImg
                    src={d.img}
                    alt={d.label}
                    className="absolute inset-0 w-full h-full"
                    speed={0.12}
                    style={{ filter: 'brightness(0.65) saturate(0.8)' }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
                  {/* Red scan line on hover */}
                  <motion.div
                    className="absolute left-0 w-full h-0.5 bg-red-500 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{ filter: 'blur(1px)', boxShadow: '0 0 12px rgba(220,38,38,0.9)' }}
                    animate={{ y: ['-100%', '25000%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
                  />
                  {/* Corner brackets on hover */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="w-8 h-8 rounded-lg bg-red-600/90 flex items-center justify-center mb-2 shadow-lg">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-xs sm:text-sm font-semibold leading-tight">{d.label}</p>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MILESTONES — original structure + 3D tilt + icon bubble
═══════════════════════════════════════════════════════════════ */
function MilestonesSectionInline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const milestones = [
    { icon: Users,     count: 1500, suffix: '+', label: 'IT Students',         img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80' },
    { icon: Briefcase, count: 600,  suffix: '+', label: 'IT Professionals',    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80' },
    { icon: Building2, count: 500,  suffix: '+', label: 'Government Officers', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { icon: Store,     count: 600,  suffix: '+', label: 'SMEs',                img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80' },
    { icon: Globe,     count: 1000, suffix: '+', label: 'General Public',      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80' },
  ];

  return (
    <section ref={ref} className="relative py-28 bg-white overflow-hidden">
      <TechGrid />
      {/* Ambient glow */}
      <motion.div
        className="absolute -right-20 top-20 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>Impact</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Our Impact in{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-red-600">Numbers</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-red-100 -z-0 rounded" />
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Empowering thousands across Southeast Asia with future-ready technology skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {milestones.map((m, index) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Card3D
                  className="group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-red-100/60 transition-shadow duration-400 bg-white h-full"
                  strength={12}
                >
                  {/* Image strip with parallax */}
                  <div className="relative h-28 overflow-hidden">
                    <ParallaxImg
                      src={m.img}
                      alt={m.label}
                      className="absolute inset-0 w-full h-full"
                      speed={0.1}
                      style={{ filter: 'brightness(0.72) saturate(0.85)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
                    {/* Icon bubble floating over image/content boundary */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11 h-11 bg-white rounded-full border-2 border-red-100 shadow-lg flex items-center justify-center z-10">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                  </div>

                  <div className="pt-10 pb-6 px-5 text-center">
                    <div className="text-4xl font-extrabold text-gray-900 tabular-nums">
                      {isInView
                        ? <><CountUp end={m.count} duration={2.2} delay={index * 0.08} separator="," />{m.suffix}</>
                        : `0${m.suffix}`}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-500">{m.label}</p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.08 + 0.4 }}
                      className="mt-4 h-[3px] bg-gradient-to-r from-red-600 to-red-400 rounded-full origin-left"
                    />
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NEW: TECH IMAGE GALLERY — dark mosaic with parallax + hover
═══════════════════════════════════════════════════════════════ */
function TechGallerySectionInline() {
  const mosaic = [
    { img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80', label: 'Advanced Computing',  span: 'col-span-2 row-span-2' },
    { img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80', label: 'Code & Development',  span: '' },
    { img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&q=80', label: 'Network Security',    span: '' },
    { img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80',    label: 'Infrastructure',     span: '' },
    { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80', label: 'Data Analytics',     span: '' },
    { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80', label: 'AI Professionals',   span: '' },
  ];

  return (
    <section className="relative py-20 bg-gray-950 overflow-hidden">
      <TechGrid opacity={0.05} color="#dc2626" size={36} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel>Our World</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Inside <span className="text-red-500">ADITI Academy</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
            Modern labs, expert instructors, and cutting-edge technology environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 grid-rows-3 gap-3" style={{ height: 'clamp(300px, 50vw, 580px)' }}>
          {mosaic.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              <ParallaxImg
                src={item.img}
                alt={item.label}
                className="absolute inset-0 w-full h-full"
                speed={0.1}
                style={{ filter: 'brightness(0.65) saturate(0.8)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Corner brackets appear on hover */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-8 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-8 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <p className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-semibold z-10 drop-shadow">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRAMS — original structure + 3D tilt + parallax image + accent thumb
═══════════════════════════════════════════════════════════════ */
function ProgramsSectionInline() {
  const containerRef = useRef(null);

  const programs = [
    {
      title: 'AI Engineer',
      slug: 'ai-engineer',
      description: 'Master machine learning pipelines, deep neural networks, and production AI systems through hands-on enterprise projects.',
      details: ['ML fundamentals & advanced models', 'Deep learning with PyTorch / TensorFlow', 'Capstone AI product deployment'],
      stats: { students: '1,000+', rating: '4.9' },
      img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&q=80',
      tag: 'Most Popular', tagColor: 'bg-red-600',
    },
    {
      title: 'Ethical Hacking',
      slug: 'ethical-hacking',
      description: 'Learn penetration testing, digital forensics, and threat modelling with CEH-aligned labs and live attack simulations.',
      details: ['Penetration testing & vulnerability assessment', 'Network forensics & incident response', 'Professional security tooling'],
      stats: { students: '800+', rating: '4.8' },
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&q=80',
      tag: 'CEH Aligned', tagColor: 'bg-gray-900',
    },
    {
      title: 'AWS Solutions Architect',
      slug: 'aws-solutions-architect',
      description: 'Design, deploy, and scale enterprise cloud architectures on AWS with best-practice patterns and certification preparation.',
      details: ['Cloud infrastructure fundamentals', 'High-availability architecture design', 'AWS SAA-C03 certification prep'],
      stats: { students: '1,200+', rating: '4.9' },
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80',
      tag: 'AWS Partner', tagColor: 'bg-amber-500',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      <TechGrid />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <SectionLabel>Our Programs</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Featured <span className="text-red-600">Programs</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl">
              Highlighting our most popular courses for software, AI, cybersecurity, cloud, and networking careers.
            </p>
          </div>
          <a
            href="/training/individual"
            className="group flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300"
          >
            Get Training
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <Card3D
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-gray-200/80 transition-shadow duration-500 h-full"
                strength={8}
              >
                <div className="relative h-52 overflow-hidden">
                  <ParallaxImg
                    src={program.img}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full"
                    speed={0.2}
                    style={{ filter: 'brightness(0.82) saturate(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${program.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                    {program.tag}
                  </span>
                  {/* Floating accent thumbnail */}
                  <div className="absolute bottom-4 right-4 w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                    <img src={program.accentImg} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{program.description}</p>

                  <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-gray-500">{program.stats.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-gray-500">{program.stats.rating}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {program.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-red-600" />
                        </div>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/programs/course/${program.slug}`}
                    className="group/link mt-auto inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAREER ROADMAP — original structure + 3D tilt + top image strip
═══════════════════════════════════════════════════════════════ */
function CareerBoostSectionInline() {
  const roadmapSteps = [
    { title: 'Explore Career Pathways',   description: 'Choose the right technology track from software, AI, cybersecurity, cloud, and digital transformation.', img: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=300&q=80' },
    { title: 'Structured Learning',       description: 'Follow a clear curriculum with expert-led courses, hands-on labs, and real-world projects.',              img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80' },
    { title: 'Apply with Real Projects',  description: 'Develop practical portfolio work that demonstrates your capabilities to employers.',                       img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80' },
    { title: 'Mentor & Peer Support',     description: 'Stay supported through mentor coaching, study groups, and career guidance.',                              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { title: 'Certification Preparation', description: 'Prepare for recognized certifications and industry exams with structured training.',                       img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&q=80' },
    { title: 'Launch Your Career',        description: 'Get ready for interviews, placement support, and career pathways into tech roles.',                       img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&q=80' },
  ];

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#B51D39 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>Career Roadmap</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Career Roadmap <span className="text-red-600">Preview</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Explore the learning pathways from foundations to career launch, guided by mentors, projects, and certifications.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card3D
                className="group relative h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-xl hover:shadow-red-50/80 transition-all duration-400"
                strength={10}
              >
                {/* Top image strip with parallax */}
                <div className="relative h-20 overflow-hidden">
                  <ParallaxImg
                    src={step.img}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full"
                    speed={0.08}
                    style={{ filter: 'brightness(0.6) saturate(0.8)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(255,255,255,0.95))' }} />
                  {/* Step badge */}
                  <div className="absolute top-3 left-4 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <div className="p-8 relative">
                  {/* Watermark number */}
                  <span className="absolute top-3 right-5 text-7xl font-black text-gray-50 select-none leading-none group-hover:text-red-50 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08 + 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 to-red-400 origin-left rounded-b-2xl"
                />
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — original structure + 3D tilt cards
═══════════════════════════════════════════════════════════════ */
function EnterpriseSectionInline() {
  const studentReviews = [
    { quote: 'ADITI Academy helped me transition from a marketing role to a software engineering career in less than 6 months.', author: 'Sophea, Graduate', role: 'Junior Developer', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80' },
    { quote: 'The instructors were always available, and the real-world projects gave me the confidence to apply for my first tech role.', author: 'Rithy, Learner', role: 'AI Intern', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
  ];
  const corporateTestimonials = [
    { quote: 'Our ministry staff gained essential digital skills and leadership training through ADITI Academy\'s tailored program.', author: 'Ministry of Education Cambodia' },
    { quote: 'The training delivered measurable results, improving productivity and technical readiness across multiple departments.', author: 'Singapore Tech Alliance' },
  ];
  const successStories = [
    { title: 'From Student to Software Engineer', summary: 'Fast-track program supported career changers with practical coding experience and interview coaching.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80' },
    { title: 'Women Leaders in Tech',             summary: 'Empowering female students with AI, leadership, and entrepreneurship pathways.',                          img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' },
    { title: 'Government Digital Skills Uplift',  summary: 'Large-scale training for public sector teams accelerating digital transformation.',                        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80' },
  ];
  const partners = ['ADITI', 'Technovation Girls Cambodia', 'Tech For Kids Academy', 'Singapore IT Council', 'Japan Software Alliance', 'EU Digital Partners'];

  return (
    <section className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      <TechGrid />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 space-y-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <SectionLabel>Testimonials &amp; Success</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            Student Reviews, Corporate Testimonials,{' '}
            <span className="text-red-600">and Success Stories</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Discover how ADITI Academy supports learners and organizations with proven outcomes and trusted partnerships.
          </p>
        </motion.div>

        {/* Student Reviews */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
            <h3 className="text-xl font-bold text-gray-900">Student Reviews</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {studentReviews.map((review, index) => (
              <motion.div key={review.author} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card3D className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 h-full" strength={6}>
                  <svg className="absolute top-6 right-7 w-10 h-10 text-red-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-gray-600 leading-relaxed mb-7 italic">"{review.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={review.img} alt={review.author} className="w-11 h-11 rounded-full object-cover border-2 border-red-100" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                      <p className="text-xs text-gray-400">{review.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Testimonials */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Briefcase className="w-4 h-4 text-white" /></div>
            <h3 className="text-xl font-bold text-gray-900">Corporate Testimonials</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {corporateTestimonials.map((t, index) => (
              <motion.div key={t.author} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card3D className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 h-full" strength={6}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.author}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Corporate Testimonial</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic text-sm">"{t.quote}"</p>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Award className="w-4 h-4 text-white" /></div>
            <h3 className="text-xl font-bold text-gray-900">Success Stories</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.div key={story.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card3D className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-red-50/60 transition-all duration-400 h-full" strength={10}>
                  <div className="relative h-44 overflow-hidden">
                    <ParallaxImg
                      src={story.img}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full"
                      speed={0.12}
                      style={{ filter: 'brightness(0.75) saturate(0.85)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">{story.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{story.summary}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Showcase */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold tracking-[0.15em] text-red-600 uppercase">Partner Showcase</span>
          </div>
          <p className="text-gray-500 mb-10">Working with education, government, and international technology partners.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {partners.map((partner) => (
              <motion.div key={partner} whileHover={{ y: -3, scale: 1.02 }} className="rounded-xl border border-gray-200 bg-white p-4 text-xs font-semibold text-gray-600 shadow-sm hover:border-red-200 hover:text-red-600 hover:shadow-md transition-all duration-300 cursor-pointer">
                {partner}
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-9 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300"
            >
              Request Partnership
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QUALITY ASSURANCE — original structure + 3D tilt + parallax + icon bubble
═══════════════════════════════════════════════════════════════ */
function QualityAssuranceSectionInline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const qualityStats = [
    { label: 'Curriculum Alignment', value: 'MoEYS Standard', icon: Shield,    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80' },
    { label: 'Learner Success Rate', value: '98%',            icon: TrendingUp, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
    { label: 'Expert Trainers',      value: '50+',            icon: Users,      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80' },
    { label: 'Quality Reviews',      value: '100+',           icon: Award,      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
  ];
  const qualityFeatures = [
    'MoEYS-aligned learning process',
    'Structured curriculum verification',
    'Continuous learner assessment',
    'Dedicated student support',
  ];

  return (
    <section ref={containerRef} className="relative py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      <TechGrid />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <SectionLabel>Quality Assurance</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            Quality Assurance{' '}
            <span className="text-red-600">Aligned with MoEYS</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            The whole organization process is aligned with Ministry of Education standards, ensuring consistent quality and trusted outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {qualityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                <Card3D
                  className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-red-50/60 hover:border-red-100 transition-shadow duration-400 h-full"
                  strength={12}
                >
                  <div className="relative h-32 overflow-hidden">
                    <ParallaxImg
                      src={stat.img}
                      alt={stat.label}
                      className="absolute inset-0 w-full h-full"
                      speed={0.1}
                      style={{ filter: 'brightness(0.7) saturate(0.8)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
                    {/* Icon bubble */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white rounded-full border-2 border-red-100 shadow-lg flex items-center justify-center z-10">
                      <Icon className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="pt-9 pb-6 px-5 text-center">
                    <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                    <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.08 + 0.4 }}
                      className="mt-4 h-[3px] bg-gradient-to-r from-red-600 to-red-400 rounded-full origin-left"
                    />
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-16 flex justify-center">
          <motion.div whileHover={{ y: -4, scale: 1.01 }} className="inline-flex items-center gap-5 px-8 py-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:border-red-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-sm flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Certified &amp; Accredited</p>
              <p className="text-sm text-gray-400 mt-0.5">Recognized by leading technology organizations</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}