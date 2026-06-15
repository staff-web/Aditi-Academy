import { motion, useMotionValue, useTransform, useSpring, useInView, useScroll } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { ParallaxTechBackground } from '../components/ParallaxTechBackground';
import { TechnologyAnimation } from '../components/TechnologyAnimation';
import { Footer } from '../components/Footer';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import CountUp from 'react-countup';
import React from 'react';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber';
import { Text3D, OrbitControls, Float, Line, Sphere, Cylinder } from '@react-three/drei';

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
import { CTASection } from '../components/CTASection';
  const esgHighlights = [
  {
    title: "Environmental Stewardship",
    summary: "30% carbon reduction through cloud optimization, paperless workflows, and green infrastructure across 10+ countries.",
    img: "/assets/esg/environmental.jpg", // Replace with your actual image path
  },
  {
    title: "Social Empowerment",
    summary: "6,000+ women in tech trained, 10,000+ children introduced to coding, and 500+ government officers upskilled.",
    img: "/assets/esg/social.jpg", // Replace with your actual image path
  },
  {
    title: "Governance & Ethics",
    summary: "AI governance-by-design with bias testing, privacy safeguards, and transparent impact reporting across all initiatives.",
    img: "/assets/esg/governance.jpg", // Replace with your actual image path
  },
];


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


const Partner3DCard = ({ partner, index, logoUrl }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 300 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 300 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="group cursor-pointer"
    >
      <div className={`relative rounded-xl bg-white p-4 md:p-6 shadow-md transition-all duration-300 ${
        isHovered ? 'shadow-2xl shadow-red-500/20' : 'shadow-md'
      }`}>
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`} />
        
        <div className="relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
            <img 
              src={logoUrl} 
              alt={partner}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-red-600 transition-colors duration-300 text-center">
            {partner}
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Strategic Partner
          </p>
        </div>
      </div>
    </motion.div>
  );
};

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
        {/* <TechGallerySectionInline /> */}
        <ProgramsSectionInline />
        <CareerBoostSectionInline />
        <EnterpriseSectionInline />
        <QualityAssuranceSectionInline />
        <CTASection />
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
  const [screenSize, setScreenSize] = useState('desktop');
  
  useEffect(() => { 
    setMounted(true);
    
    // Handle screen size detection
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive sizing utilities
  const getResponsiveSize = (desktop, tablet, mobile) => {
    if (screenSize === 'mobile') return mobile;
    if (screenSize === 'tablet') return tablet;
    return desktop;
  };

  const getResponsivePosition = (desktopPos, tabletPos, mobilePos) => {
    if (screenSize === 'mobile') return mobilePos;
    if (screenSize === 'tablet') return tabletPos;
    return desktopPos;
  };

  return (
    <>
      {/* Horizontal scanning lines - responsive widths */}
      <motion.div
        initial={{ x: '-5%', opacity: 0 }}
        animate={{ x: mounted ? '105%' : '-5%', opacity: mounted ? [0, 1, 1, 0.5, 0] : 0 }}
        transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 pointer-events-none z-50"
        style={{ 
          width: getResponsiveSize('2px', '1.5px', '1px'),
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)', 
          filter: 'blur(3px)', 
          boxShadow: getResponsiveSize('0 0 60px 25px rgba(220, 38, 38, 0.7)', '0 0 40px 15px rgba(220, 38, 38, 0.7)', '0 0 20px 8px rgba(220, 38, 38, 0.7)')
        }}
      />
      <motion.div
        initial={{ x: '105%', opacity: 0 }}
        animate={{ x: mounted ? '-5%' : '105%', opacity: mounted ? [0, 0.8, 0.8, 0.4, 0] : 0 }}
        transition={{ duration: 5, delay: 4, repeat: Infinity, repeatDelay: 4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 pointer-events-none z-48"
        style={{ 
          width: getResponsiveSize('1.5px', '1px', '0.75px'),
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.15) 20%, rgba(220, 38, 38, 0.8) 50%, rgba(220, 38, 38, 0.15) 80%, transparent 100%)', 
          filter: 'blur(4px)', 
          boxShadow: getResponsiveSize('0 0 50px 20px rgba(220, 38, 38, 0.5)', '0 0 30px 12px rgba(220, 38, 38, 0.5)', '0 0 15px 6px rgba(220, 38, 38, 0.5)')
        }}
      />
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ y: mounted ? '105%' : '-5%', opacity: mounted ? [0, 0.9, 0.9, 0.5, 0] : 0 }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 4.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full pointer-events-none z-49"
        style={{ 
          height: getResponsiveSize('1px', '0.75px', '0.5px'),
          background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 0.9) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)', 
          filter: 'blur(3px)', 
          boxShadow: getResponsiveSize('0 0 50px 20px rgba(220, 38, 38, 0.6)', '0 0 30px 12px rgba(220, 38, 38, 0.6)', '0 0 15px 6px rgba(220, 38, 38, 0.6)')
        }}
      />
      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ y: mounted ? '105%' : '-5%', opacity: mounted ? [0, 1, 1, 0.6, 0] : 0 }}
        transition={{ duration: 3.5, delay: 1, repeat: Infinity, repeatDelay: 5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full pointer-events-none z-50"
        style={{ 
          height: getResponsiveSize('2px', '1.5px', '1px'),
          background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.3) 25%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.3) 75%, transparent 100%)', 
          filter: 'blur(2px)', 
          boxShadow: getResponsiveSize('0 0 80px 30px rgba(220, 38, 38, 0.8)', '0 0 50px 20px rgba(220, 38, 38, 0.8)', '0 0 25px 10px rgba(220, 38, 38, 0.8)')
        }}
      />

      {/* Corner brackets - responsive sizes and positions */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2, delay: 1.5 }} 
        className="absolute pointer-events-none z-40"
        style={{ 
          top: getResponsiveSize('8px', '6px', '4px'),
          left: getResponsiveSize('8px', '6px', '4px')
        }}
      >
        <svg width={getResponsiveSize(160, 120, 80)} height={getResponsiveSize(160, 120, 80)} viewBox="0 0 160 160">
          <motion.path d="M 55,0 L 0,0 L 0,55" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(3, 2.5, 2)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2 }} />
          <motion.path d="M 35,5 L 5,5 L 5,35" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={getResponsiveSize(1.5, 1.5, 1)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.5 }} />
          <motion.line x1="0" y1="18" x2="22" y2="18" stroke="rgba(220, 38, 38, 0.7)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2, delay: 1.7 }} 
        className="absolute pointer-events-none z-40"
        style={{ 
          top: getResponsiveSize('8px', '6px', '4px'),
          right: getResponsiveSize('8px', '6px', '4px')
        }}
      >
        <svg width={getResponsiveSize(160, 120, 80)} height={getResponsiveSize(160, 120, 80)} viewBox="0 0 160 160">
          <motion.path d="M 105,0 L 160,0 L 160,55" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(3, 2.5, 2)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.2 }} />
          <motion.path d="M 125,5 L 155,5 L 155,35" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={getResponsiveSize(1.5, 1.5, 1)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.7 }} />
          <motion.line x1="160" y1="18" x2="138" y2="18" stroke="rgba(220, 38, 38, 0.7)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2, delay: 1.9 }} 
        className="absolute pointer-events-none z-40"
        style={{ 
          bottom: getResponsiveSize('8px', '6px', '4px'),
          left: getResponsiveSize('8px', '6px', '4px')
        }}
      >
        <svg width={getResponsiveSize(160, 120, 80)} height={getResponsiveSize(160, 120, 80)} viewBox="0 0 160 160">
          <motion.path d="M 55,160 L 0,160 L 0,105" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(3, 2.5, 2)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.4 }} />
          <motion.path d="M 35,155 L 5,155 L 5,125" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={getResponsiveSize(1.5, 1.5, 1)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.9 }} />
          <motion.line x1="0" y1="142" x2="22" y2="142" stroke="rgba(220, 38, 38, 0.7)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 4.5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2, delay: 2.1 }} 
        className="absolute pointer-events-none z-40"
        style={{ 
          bottom: getResponsiveSize('8px', '6px', '4px'),
          right: getResponsiveSize('8px', '6px', '4px')
        }}
      >
        <svg width={getResponsiveSize(160, 120, 80)} height={getResponsiveSize(160, 120, 80)} viewBox="0 0 160 160">
          <motion.path d="M 105,160 L 160,160 L 160,105" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(3, 2.5, 2)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 2.6 }} />
          <motion.path d="M 125,155 L 155,155 L 155,125" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={getResponsiveSize(1.5, 1.5, 1)} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 3.1 }} />
          <motion.line x1="160" y1="142" x2="138" y2="142" stroke="rgba(220, 38, 38, 0.7)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 1.5, delay: 5, repeat: Infinity, repeatDelay: 3 }} />
        </svg>
      </motion.div>

      {/* Large hologram scanning rectangle - responsive sizes and positions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -80, y: -20 }}
        animate={{ opacity: [0, 0.7, 0.7, 0.6, 0.4], scale: [0.85, 1.05, 1, 1.02, 1], x: [0, 5, 0, -3, 0], y: [0, -5, 0, 3, 0] }}
        transition={{ duration: 2.5, delay: 3, times: [0, 0.2, 0.5, 0.8, 1] }}
        className="absolute border-2 border-red-600/70 pointer-events-none z-35"
        style={{ 
          left: getResponsivePosition('12%', '8%', '5%'),
          top: getResponsivePosition('35%', '40%', '45%'),
          width: getResponsiveSize('420px', '320px', '260px'),
          height: getResponsiveSize('288px', '220px', '180px'),
          boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.35)'
        }}
      >
        <motion.div className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4 }} />
        <motion.div className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.2 }} />
        <motion.div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.4 }} />
        <motion.div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500" animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 4.6 }} />
        <motion.div animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 4 }} className="absolute left-0 w-full h-3" style={{ background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.95) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 30px 5px rgba(220, 38, 38, 1), 0 0 60px 15px rgba(220, 38, 38, 0.6)' }} />
        <motion.div animate={{ x: ['0%', '100%', '0%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }} className="absolute top-0 h-full w-2" style={{ background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.7) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.8)' }} />
      </motion.div>

      {/* Small hologram scanning rectangle - responsive sizes and positions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 80, y: 20 }}
        animate={{ opacity: [0, 0.65, 0.65, 0.55, 0.35], scale: [0.85, 1.05, 1, 1.03, 1], x: [0, -5, 0, 3, 0], y: [0, 5, 0, -3, 0] }}
        transition={{ duration: 2.5, delay: 4, times: [0, 0.2, 0.5, 0.8, 1] }}
        className="absolute border-2 border-red-600/60 pointer-events-none z-35"
        style={{ 
          right: getResponsivePosition('10%', '6%', '3%'),
          top: getResponsivePosition('58%', '55%', '50%'),
          width: getResponsiveSize('384px', '280px', '220px'),
          height: getResponsiveSize('224px', '180px', '150px'),
          boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.18), 0 0 60px rgba(220, 38, 38, 0.3)'
        }}
      >
        <motion.div className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5 }} />
        <motion.div className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.2 }} />
        <motion.div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.4 }} />
        <motion.div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500/90" animate={{ borderColor: ['rgba(220,38,38,0.9)', 'rgba(220,38,38,0.4)', 'rgba(220,38,38,0.9)'], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 5.6 }} />
        <motion.div animate={{ x: ['0%', '100%', '0%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 5 }} className="absolute top-0 h-full w-3" style={{ background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.9) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 30px 5px rgba(220, 38, 38, 0.9), 0 0 60px 15px rgba(220, 38, 38, 0.5)' }} />
        <motion.div animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 6 }} className="absolute left-0 w-full h-2" style={{ background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.65) 50%, transparent)', filter: 'blur(3px)', boxShadow: '0 0 25px 5px rgba(220, 38, 38, 0.7)' }} />
      </motion.div>

      {/* Ripple circles - responsive sizes and positions */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }} 
        animate={{ scale: [0, 2.5, 0], opacity: [0, 0.4, 0] }} 
        transition={{ duration: 3, delay: 5, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }} 
        className="absolute border-2 border-red-600/60 rounded-full pointer-events-none z-30"
        style={{ 
          left: getResponsivePosition('30%', '25%', '20%'),
          top: getResponsivePosition('45%', '48%', '52%'),
          width: getResponsiveSize('256px', '200px', '150px'),
          height: getResponsiveSize('256px', '200px', '150px')
        }} 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }} 
        animate={{ scale: [0, 2.2, 0], opacity: [0, 0.35, 0] }} 
        transition={{ duration: 3.5, delay: 8, repeat: Infinity, repeatDelay: 6, ease: 'easeOut' }} 
        className="absolute border-2 border-red-600/50 rounded-full pointer-events-none z-30"
        style={{ 
          right: getResponsivePosition('25%', '20%', '15%'),
          top: getResponsivePosition('60%', '55%', '50%'),
          width: getResponsiveSize('224px', '180px', '140px'),
          height: getResponsiveSize('224px', '180px', '140px')
        }} 
      />

      {/* Rotating reticle - responsive sizes and positions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0.6, 0], scale: [0.5, 1.2, 1.2, 0.8], rotate: 360 }}
        transition={{ duration: 6, delay: 7, repeat: Infinity, repeatDelay: 8, ease: 'linear' }}
        className="absolute pointer-events-none z-38"
        style={{ 
          left: getResponsivePosition('35%', '30%', '25%'),
          top: getResponsivePosition('48%', '50%', '52%'),
          width: getResponsiveSize('192px', '140px', '100px'),
          height: getResponsiveSize('192px', '140px', '100px')
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="rgba(220, 38, 38, 0.7)" strokeWidth={getResponsiveSize(2, 1.5, 1)} fill="none" strokeDasharray="12 6" />
          <circle cx="50" cy="50" r="32" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={getResponsiveSize(1.5, 1, 0.75)} fill="none" />
          <line x1="50" y1="8"  x2="50" y2="28" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} />
          <line x1="50" y1="72" x2="50" y2="92" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} />
          <line x1="8"  y1="50" x2="28" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} />
          <line x1="72" y1="50" x2="92" y2="50" stroke="rgba(220, 38, 38, 0.8)" strokeWidth={getResponsiveSize(2.5, 2, 1.5)} />
        </svg>
      </motion.div>

      {/* Vertical grid lines - responsive positions */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`grid-v-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2, delay: 2 + i * 0.2 }}
          className="absolute top-0 h-full w-px pointer-events-none z-10"
          style={{ 
            left: getResponsivePosition(`${20 + i * 20}%`, `${15 + i * 22}%`, `${10 + i * 25}%`),
            background: 'linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.4) 50%, transparent)'
          }}
        />
      ))}

      {/* Central red glow orb - responsive size */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="absolute pointer-events-none z-5"
        style={{ 
          top: getResponsivePosition('33%', '35%', '38%'),
          left: getResponsivePosition('33%', '30%', '25%'),
          width: getResponsiveSize('600px', '400px', '250px'),
          height: getResponsiveSize('600px', '400px', '250px'),
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)', 
          filter: 'blur(80px)'
        }}
      />
    </>
  );
}
/* ═══════════════════════════════════════════════════════════════
   HERO — 100 % ORIGINAL
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   HERO — 100 % ORIGINAL
═══════════════════════════════════════════════════════════════ */
function HeroSectionInline() {
  const containerRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Trigger curtain animation on mount
  useEffect(() => {
    // Start animation immediately
    const timer = setTimeout(() => setAnimationComplete(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-screen flex items-center overflow-hidden">
      
      {/* ===== PROFESSIONAL CURTAIN SYSTEM ===== */}
      {/* Curtain Container - absolute positioned over everything */}
      <motion.div 
        className="fixed inset-0 z-[200] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: animationComplete ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        {/* Left Curtain - slides to the left */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 shadow-2xl"
          initial={{ x: 0 }}
          animate={{ x: animationComplete ? "-100%" : 0 }}
          transition={{ 
            duration: 1.4, 
            delay: 0.2,
            ease: [0.645, 0.045, 0.355, 1] // Cubic bezier for professional easing
          }}
        >
          {/* Curtain texture overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.4) 30px, rgba(0,0,0,0.4) 32px)',
            backgroundSize: '32px 100%'
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-red-900/10" />
          {/* Curtain fold shadows */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)'
          }} />
        </motion.div>

        {/* Right Curtain - slides to the right */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-gray-950 via-gray-900 to-gray-950 shadow-2xl"
          initial={{ x: 0 }}
          animate={{ x: animationComplete ? "100%" : 0 }}
          transition={{ 
            duration: 1.4, 
            delay: 0.2,
            ease: [0.645, 0.045, 0.355, 1]
          }}
        >
          {/* Curtain texture overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(270deg, transparent, transparent 30px, rgba(0,0,0,0.4) 30px, rgba(0,0,0,0.4) 32px)',
            backgroundSize: '32px 100%'
          }} />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 via-transparent to-red-900/10" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(270deg, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)'
          }} />
        </motion.div>

        {/* Center vertical seam - reveals content */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-red-500 via-red-600 to-red-500"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      </motion.div>

      {/* Background with parallax scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y }}>
          <PremiumTechBackgroundInline />
        </motion.div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16 md:py-20">
        <motion.div 
          style={{ y, opacity }}
          className="relative"
        >

          {/* ── MOBILE (hidden md+) ── */}
          <div className="block md:hidden space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 px-1 relative z-10"
            >
              <h1 className="text-[2rem] font-bold leading-[1.2] text-white">
                Technology courses for the{' '}
                <span className="text-red-500">real world</span>
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                Get certified with industry leaders in technology and AI security.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="text-white text-xs">
                  Trusted by <strong className="text-red-500">400,000+</strong> Pros
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-bold">4.7</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-green-500 fill-green-500" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden"
              style={{ height: '72vw', minHeight: '300px', maxHeight: '400px' }}
            >
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url('/assets/landing/hero.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(12px)',
                  transform: 'scale(1.1)',
                }}
              />
              <img
                src="/assets/landing/hero.png"
                alt="Technology training professionals"
                className="relative w-full h-full object-cover object-center"
                style={{ transform: 'scale(1.15)', transformOrigin: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2.5 z-20">
                <Link to="/programs" className="group flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 text-center">
                  <span className="flex items-center justify-center gap-1.5">
                    Explore Programs
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link to="/contact" className="group flex-1 py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white/25 transition-all duration-300 text-center">
                  <span className="flex items-center justify-center gap-1.5">
                    Consultant
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── DESKTOP (hidden mobile) ── */}
          <div className="hidden md:block">
            <div className="relative w-full h-[550px] lg:h-[700px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 70%, transparent 100%)' }} />
              
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                src="/assets/landing/hero.png"
                alt="Technology training professionals"
                className="w-full h-full object-cover object-center"
              />
              
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(127,29,29,0.2) 0%, transparent 50%)' }} />
              
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-3xl px-8 lg:px-12 xl:px-20">
                  <div className="space-y-5 md:space-y-6">
                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white"
                    >
                      Technology courses for the{' '}
                      <span className="text-red-500">real world</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl"
                    >
                      Get certified with industry leaders in technology and AI security.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-4 pt-3 md:pt-4"
                    >
                      <Link to="/programs" className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-900/40">
                        <span className="flex items-center gap-2">
                          Explore Programs
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                      <Link to="/contact" className="group px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold text-lg rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300">
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="absolute bottom-0 left-0 right-0 px-8 lg:px-12 xl:px-20 py-6 md:py-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
              >
                <div className="flex items-start md:items-center justify-between gap-6">
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
    { img: '/assets/landing/techshowcase/AI.png', label: 'Artificial Intelligence', icon: Cpu },
    { img: '/assets/landing/techshowcase/Cyber.png', label: 'Cybersecurity', icon: Lock },
    { img: '/assets/landing/techshowcase/Software.png', label: 'Software Development', icon: Cloud },
    { img: '/assets/landing/techshowcase/Data.png', label: 'Data Science', icon: Target },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-gray-950 overflow-hidden">
      
      {/* Ambient glow orbs - enhanced for depth */}
      <motion.div
        className="absolute top-1/2 right-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[350px] sm:w-[450px] lg:w-[500px] h-[350px] sm:h-[450px] lg:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <SectionLabel>Technology Domains</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight px-4">
            Master the <span className="text-red-500">Technologies</span> That Matter
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base max-w-xl mx-auto px-4">
            In-demand skills across AI, cloud, security, and engineering disciplines.
          </p>
        </motion.div>

        {/* Responsive Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {domains.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card3D
                  className="relative h-72 sm:h-80 md:h-84 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 cursor-pointer bg-gray-900/30 shadow-2xl transition-all duration-300"
                  strength={12}
                >
                  {/* Image Container - FIXED: full coverage with better visibility */}
                  <div className="absolute inset-0 w-full h-full">
                    <ParallaxImg
                      src={d.img}
                      alt={d.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      speed={0.08}
                      style={{ 
                        filter: 'brightness(0.8) contrast(1.15) saturate(1.1)',
                        transform: 'scale(1.03)',
                      }}
                    />
                    {/* Dynamic gradient overlay - lighter for better image visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent" />
                  </div>
                  
                  {/* FULL HEIGHT SCAN LINE - FIXED: now covers entire card vertically */}
                  <motion.div
                    className="absolute left-0 w-full h-full pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute left-0 w-full bg-gradient-to-b from-transparent via-red-500 to-transparent"
                      style={{ 
                        height: '120%',
                        filter: 'blur(3px)',
                        boxShadow: '0 0 20px rgba(220,38,38,0.8)',
                      }}
                      animate={{
                        top: ['-120%', '120%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 0.3,
                      }}
                    />
                  </motion.div>
                  
                  {/* Second slower scan line for dramatic effect */}
                  <motion.div
                    className="absolute left-0 w-full h-full pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                  >
                    <motion.div
                      className="absolute left-0 w-full bg-gradient-to-b from-transparent via-red-400 to-transparent"
                      style={{ 
                        height: '80%',
                        filter: 'blur(6px)',
                      }}
                      animate={{
                        top: ['-80%', '180%'],
                      }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 0.5,
                      }}
                    />
                  </motion.div>
                  
                  {/* Corner brackets - responsive sizing */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-t-2 border-l-2 border-red-500/0 group-hover:border-red-500/80 transition-all duration-300" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-t-2 border-r-2 border-red-500/0 group-hover:border-red-500/80 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-b-2 border-l-2 border-red-500/0 group-hover:border-red-500/80 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-b-2 border-r-2 border-red-500/0 group-hover:border-red-500/80 transition-all duration-300" />
                  
                  {/* Content - responsive padding and sizes */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-10">
                    <motion.div 
                      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-2 sm:mb-3 shadow-lg shadow-red-500/30 ring-1 ring-white/20"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                    </motion.div>
                    <p className="text-white text-sm sm:text-base lg:text-lg font-bold leading-tight tracking-wide">
                      {d.label}
                    </p>
                    {/* Animated underline on hover */}
                    <motion.div 
                      className="h-0.5 bg-red-500 mt-1.5 sm:mt-2 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '30%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* 3D edge highlight on hover */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                       style={{ boxShadow: 'inset 0 0 20px rgba(220,38,38,0.3)' }} />
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
    { count: 1500, suffix: '+', label: 'IT Students', img: '/assets/landing/impact/ITStudent.jpg' },
    { count: 600,  suffix: '+', label: 'IT Professionals', img: '/assets/landing/impact/ITProfession.jpg' },
    { count: 500,  suffix: '+', label: 'Government Officers', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80' },
    { count: 600,  suffix: '+', label: 'SMEs', img: '/assets/landing/impact/sme.jpg' },
    { count: 1000, suffix: '+', label: 'General Public', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80' },
  ];

  // Advanced scroll animation variants (matching Enterprise section)
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: -15,
      filter: "blur(4px)"
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.8,
        delay: i * 0.08,
        duration: 0.7
      }
    })
  };

  const cardHover = {
    rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
    hover: { 
      scale: 1.03, 
      y: -8, 
      boxShadow: "0 25px 40px -12px rgba(220,38,38,0.25)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <section ref={ref} className="relative py-28 bg-white overflow-hidden">
      {/* Enhanced ambient glow with pulse animation */}
      <motion.div
        className="absolute -right-20 top-20 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-20 bottom-20 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.03) 0%, transparent 70%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header with enhanced reveal matching Enterprise section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionLabel>Impact</SectionLabel>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Our Impact in{' '}
            <span className="relative inline-block">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                className="relative z-10 text-red-600 inline-block"
              >
                Numbers
              </motion.span>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-red-100 -z-0 rounded-full"
              />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-500 max-w-xl mx-auto"
          >
            Empowering thousands across Southeast Asia with future-ready technology skills.
          </motion.p>
        </motion.div>

        {/* Milestones Grid with staggered 3D cards matching Enterprise quality */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {milestones.map((m, index) => (
            <motion.div
              key={m.label}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative perspective-1000"
            >
              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-xl opacity-0 transition duration-500 pointer-events-none"
              />
              
              <Card3D
                className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-red-100/60 transition-all duration-400 h-full"
                strength={12}
              >
                {/* Image strip with enhanced parallax and hover zoom */}
                <div className="relative h-28 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <ParallaxImg
                      src={m.img}
                      alt={m.label}
                      className="absolute inset-0 w-full h-full"
                      speed={0.1}
                      style={{ filter: 'brightness(0.72) saturate(0.85)' }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent" />
                  
                  {/* Animated shine effect on hover */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                  />
                </div>

                <div className="pt-10 pb-6 px-5 text-center relative z-10">
                  {/* Counter with spring animation */}
                  <div className="text-4xl font-extrabold text-gray-900 tabular-nums">
                    {isInView ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.08 + 0.3, type: "spring" }}
                      >
                        <CountUp 
                          end={m.count} 
                          duration={2.5} 
                          delay={index * 0.08} 
                          separator="," 
                          enableScrollSpy={true}
                          scrollSpyDelay={100}
                        />
                        {m.suffix}
                      </motion.span>
                    ) : (
                      `0${m.suffix}`
                    )}
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.5 }}
                    className="mt-1 text-sm font-medium text-gray-500"
                  >
                    {m.label}
                  </motion.p>
                  
                  {/* Animated progress bar matching Enterprise quality */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.08 + 0.6,
                      ease: [0.25, 0.1, 0.1, 1]
                    }}
                    className="mt-4 h-[3px] bg-gradient-to-r from-red-600 via-red-400 to-amber-400 rounded-full origin-left"
                  />
                  
                  {/* Hover reveal icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
                
                {/* Corner accents on hover */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Card3D>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated footer line with pulse effect matching Enterprise */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-red-500"
            />
          </div>
        </motion.div>
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

  // Professional scroll animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.1, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      scale: 0.85,
      y: 40,
      rotateX: -10,
      filter: "blur(6px)"
    }),
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 22,
        stiffness: 110,
        mass: 0.7,
        delay: i * 0.05,
        duration: 0.6
      }
    })
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.3,
        duration: 0.4
      }
    })
  };

  return (
    <section className="relative py-20 bg-gray-950 overflow-hidden">
      {/* Subtle ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header with enhanced scroll animation */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SectionLabel>Our World</SectionLabel>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          >
            Inside <span className="text-red-500">ADITI Academy</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            Modern labs, expert instructors, and cutting-edge technology environments.
          </motion.p>
        </motion.div>

        {/* Mosaic Gallery with staggered card reveals */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-3 grid-rows-3 gap-3"
          style={{ height: 'clamp(300px, 50vw, 580px)' }}
        >
          {mosaic.map((item, index) => (
            <motion.div
              key={item.label}
              custom={index}
              variants={cardVariants}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ParallaxImg
                src={item.img}
                alt={item.label}
                className="absolute inset-0 w-full h-full"
                speed={0.1}
                style={{ filter: 'brightness(0.65) saturate(0.8)' }}
              />
              
              {/* Gradient overlay - kept exactly the same */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              
              {/* Hover overlay - kept exactly the same */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Corner brackets - kept exactly the same */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-8 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-8 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Label with subtle scroll animation */}
              <motion.p 
                custom={index}
                variants={labelVariants}
                className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-semibold z-10 drop-shadow"
              >
                {item.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
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
      title: 'Advanced iOS App Development',
      slug: 'advanced-ios-app-development',
      description: 'Master Swift programming, Core Data, API integration, memory management, and publish iOS apps to the App Store.',
      details: [
        'Swift programming language - Essential iOS Development Skill',
        'Save and load data on your iOS device with Core Data',
        'Fetch data from internal/external JSON files using Web APIs',
        'Publish iOS apps to the App Store'
      ],
      stats: { students: '1,200+', rating: '4.9' },
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=200&q=80',
      tag: '6 Months',
      tagColor: 'bg-emerald-600',
    },
    {
      title: 'Full-Stack Development',
      slug: 'full-stack-development',
      description: 'Master front-end and back-end development with modern frameworks, databases, and deployment strategies.',
      details: [
        'Front-end with React.js & state management',
        'Back-end APIs with Node.js & Express',
        'MongoDB, PostgreSQL & database design',
        'Docker, CI/CD & cloud deployment'
      ],
      stats: { students: '2,200+', rating: '4.8' },
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80',
      tag: '4 Months',
      tagColor: 'bg-blue-600',
    },
    {
      title: 'Web Application Development',
      slug: 'web-application-development',
      description: 'Build dynamic websites with HTML, CSS, JavaScript, PHP, and MySQL integration from fundamentals to deployment.',
      details: [
        'Front-end with HTML, CSS, JavaScript/jQuery',
        'Server-side scripting with PHP',
        'MySQL database integration',
        'Professional-grade dynamic website capstone'
      ],
      stats: { students: '2,800+', rating: '4.8' },
      img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80',
      accentImg: 'https://images.unsplash.com/photo-1627398242454-81a6e318fa7d?w=200&q=80',
      tag: '3 Months',
      tagColor: 'bg-amber-600',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
    

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
            href="/programs"
            className="group flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300"
          >
            Explore Our Program
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
                    href={`/programs`}
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
function CareerBoostSectionInline() {
  const roadmapSteps = [
    {
      title: 'Explore Career Pathways',
      description: 'Choose the right technology track from software, AI, cybersecurity, cloud, and digital transformation.',
    },
    {
      title: 'Structured Learning',
      description: 'Follow a clear curriculum with expert-led courses, hands-on labs, and real-world projects.',
    },
    {
      title: 'Apply with Real Projects',
      description: 'Develop practical portfolio work that demonstrates your capabilities to employers.',
    },
    {
      title: 'Mentor & Peer Support',
      description: 'Stay supported through mentor coaching, study groups, and career guidance.',
    },
    {
      title: 'Certification Preparation',
      description: 'Prepare for recognized certifications and industry exams with structured training.',
    },
    {
      title: 'Launch Your Career',
      description: 'Get ready for interviews, placement support, and career pathways into tech roles.',
    },
  ];

  const SectionLabel = ({ children }) => (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="block w-7 h-px bg-red-600" />
      <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">{children}</span>
      <span className="block w-7 h-px bg-red-600" />
    </div>
  );

  const Roadmap3D = () => {
    const containerRef = React.useRef(null);
    const rendererRef = React.useRef(null);
    const sceneRef = React.useRef(null);
    const cameraRef = React.useRef(null);
    const mouseRef = React.useRef({ x: 0, y: 0 });
    const targetMouseRef = React.useRef({ x: 0, y: 0 });
    const rafRef = React.useRef(null);
    const nodesRef = React.useRef([]);
    const particleSystemRef = React.useRef(null);
    const activeTooltipRef = React.useRef(null);
    const tooltipDomRef = React.useRef(null);
    const clockRef = React.useRef(0);

    // Responsive height based on viewport
    const getResponsiveHeight = () => {
      if (typeof window === 'undefined') return 500;
      if (window.innerWidth < 640) return 400;
      if (window.innerWidth < 1024) return 500;
      return 600;
    };

    React.useEffect(() => {
      if (!containerRef.current || typeof THREE === 'undefined') return;

      const width = containerRef.current.clientWidth;
      const height = getResponsiveHeight();

      // ── Scene ──────────────────────────────────────────────
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x06090f);
      scene.fog = new THREE.FogExp2(0x06090f, 0.012);
      sceneRef.current = scene;

      // ── Camera ─────────────────────────────────────────────
      // Responsive FOV: slightly wider on mobile for better visibility
      const fov = window.innerWidth < 768 ? 45 : 42;
      const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 300);
      // Responsive Z distance: closer on mobile for better readability
      const cameraZ = window.innerWidth < 768 ? 9.5 : 8.5;
      camera.position.set(0, 1.2, cameraZ);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // ── Renderer ───────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // ── Lighting ───────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x0d1a2e, 3));

      const keyLight = new THREE.DirectionalLight(0xd0e4ff, 2.5);
      keyLight.position.set(4, 8, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 0.1;
      keyLight.shadow.camera.far = 40;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x2244aa, 0.6);
      fillLight.position.set(-6, 2, 4);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0x334466, 0.4);
      rimLight.position.set(0, -3, -6);
      scene.add(rimLight);

      // ── Grid floor ─────────────────────────────────────────
      const gridHelper = new THREE.GridHelper(30, 30, 0x1a2540, 0x0e1828);
      gridHelper.position.y = -2.8;
      scene.add(gridHelper);

      // ── Particles (responsive count) ──────────────────────────
      const pCount = window.innerWidth < 768 ? 500 : 900;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 28;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x4a6fa5,
        size: window.innerWidth < 768 ? 0.05 : 0.06,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
      particleSystemRef.current = particles;

      // ── Node positions ─────────────────────────────────────
      const nodePositions = [
        { x: -5.0, y: 0.4,  z: -0.8 },
        { x: -3.0, y: 0.15, z: -0.2 },
        { x: -1.0, y: -0.1, z:  0.3 },
        { x:  1.0, y: -0.3, z:  0.7 },
        { x:  3.0, y: -0.5, z:  1.1 },
        { x:  5.0, y: -0.7, z:  1.5 },
      ];

      const NODE_W = 1.6;
      const NODE_H = 0.72;
      const NODE_D = 0.22;

      const faceColor  = new THREE.Color(0x0d1624);
      const edgeColor  = new THREE.Color(0x2a4070);
      const topColor   = new THREE.Color(0x162236);

      nodesRef.current = roadmapSteps.map((step, idx) => {
        const pos = nodePositions[idx];
        const group = new THREE.Group();
        group.position.set(pos.x, pos.y, pos.z);

        // Front face
        const frontGeo = new THREE.BoxGeometry(NODE_W, NODE_H, NODE_D, 1, 1, 1);
        const frontMat = new THREE.MeshStandardMaterial({
          color: faceColor,
          metalness: 0.35,
          roughness: 0.55,
        });
        const front = new THREE.Mesh(frontGeo, frontMat);
        front.castShadow = true;
        front.receiveShadow = true;
        group.add(front);

        // Top face highlight
        const topGeo = new THREE.BoxGeometry(NODE_W, 0.06, NODE_D + 0.08);
        const topMat = new THREE.MeshStandardMaterial({
          color: topColor,
          metalness: 0.6,
          roughness: 0.3,
        });
        const top = new THREE.Mesh(topGeo, topMat);
        top.position.y = NODE_H / 2 + 0.03;
        group.add(top);

        // Accent border
        const accentGeo = new THREE.BoxGeometry(NODE_W + 0.01, 0.015, 0.015);
        const accentMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x3a6ea8),
          emissive: new THREE.Color(0x1a3a60),
          emissiveIntensity: 0.8,
          metalness: 0.9,
          roughness: 0.1,
        });
        const accent = new THREE.Mesh(accentGeo, accentMat);
        accent.position.y = NODE_H / 2;
        accent.position.z = NODE_D / 2 + 0.008;
        group.add(accent);

        // Wireframe edges
        const edgesGeo = new THREE.EdgesGeometry(frontGeo);
        const edgesMat = new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.5 });
        const edges = new THREE.LineSegments(edgesGeo, edgesMat);
        group.add(edges);

        // Step number dot
        const dotGeo = new THREE.CircleGeometry(0.055, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x2d5a8e });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(-NODE_W / 2 + 0.18, NODE_H / 2 - 0.18, NODE_D / 2 + 0.001);
        group.add(dot);

        // Canvas label texture - responsive text sizing
        const canvas = document.createElement('canvas');
        const isMobile = window.innerWidth < 768;
        canvas.width = isMobile ? 512 : 512;
        canvas.height = isMobile ? 200 : 192;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Step number
        ctx.font = `600 ${isMobile ? '24px' : '28px'} "Inter", system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(100,160,220,0.95)';
        ctx.fillText(`0${idx + 1}`, 28, isMobile ? 48 : 52);

        // Title
        ctx.font = `700 ${isMobile ? '38px' : '46px'} "Inter", system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(235,245,255,1)';
        // Handle long titles on mobile
        let titleText = step.title;
        if (isMobile && step.title.length > 20) {
          titleText = step.title.substring(0, 18) + '...';
        }
        ctx.fillText(titleText, 28, isMobile ? 90 : 98);

        // Divider
        ctx.fillStyle = 'rgba(70,110,160,0.6)';
        ctx.fillRect(28, isMobile ? 102 : 110, 456, 2);

        // Description - responsive wrapping
        ctx.font = `500 ${isMobile ? '22px' : '28px'} "Inter", system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(180,205,235,0.92)';
        const words = step.description.split(' ');
        let line = '';
        let lineY = isMobile ? 140 : 150;
        const maxWidth = isMobile ? 400 : 456;
        words.forEach(word => {
          const test = line + word + ' ';
          if (ctx.measureText(test).width > maxWidth && line) {
            ctx.fillText(line.trim(), 28, lineY);
            line = word + ' ';
            lineY += isMobile ? 28 : 34;
          } else {
            line = test;
          }
        });
        ctx.fillText(line.trim(), 28, lineY);

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const labelMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const labelGeo = new THREE.PlaneGeometry(NODE_W - 0.08, NODE_H - 0.08);
        const label = new THREE.Mesh(labelGeo, labelMat);
        label.position.z = NODE_D / 2 + 0.002;
        group.add(label);

        scene.add(group);

        return {
          group,
          front,
          accent,
          edges,
          baseY: pos.y,
          baseZ: pos.z,
          phase: idx * (Math.PI / 3),
        };
      });

      // ── Connecting path ─────────────────────────────────────
      const curvePoints = nodePositions.map(
        p => new THREE.Vector3(p.x, p.y - NODE_H / 2 - 0.05, p.z)
      );
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.012, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x2a4a7a, transparent: true, opacity: 0.6 });
      scene.add(new THREE.Mesh(tubeGeo, tubeMat));

      // Connector dots
      nodePositions.forEach(p => {
        const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
        const dotMat = new THREE.MeshStandardMaterial({
          color: 0x3a6ea8,
          emissive: 0x1a3050,
          emissiveIntensity: 1.0,
          metalness: 0.8,
          roughness: 0.2,
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(p.x, p.y - NODE_H / 2 - 0.05, p.z);
        scene.add(dot);
      });

      // ── Tooltip DOM element ────────────────────────────────
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(8,14,24,0.98);
        border-left: 3px solid #e63946;
        border-radius: 10px;
        padding: ${window.innerWidth < 768 ? '12px 16px' : '16px 20px'};
        font-family: "Inter", system-ui, sans-serif;
        font-size: ${window.innerWidth < 768 ? '13px' : '15px'};
        color: rgba(220,235,255,0.96);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        max-width: ${window.innerWidth < 768 ? '240px' : '280px'};
        line-height: 1.5;
        z-index: 20;
        white-space: normal;
        backdrop-filter: blur(4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.5);
      `;
      containerRef.current.appendChild(tooltip);
      tooltipDomRef.current = tooltip;

      // ── Raycaster ──────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const pointerVec = new THREE.Vector2();
      const frontMeshes = nodesRef.current.map(n => n.front);

      const onPointerMove = e => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerVec.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        pointerVec.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

        targetMouseRef.current.x = (e.clientX - rect.left) / rect.width  - 0.5;
        targetMouseRef.current.y = (e.clientY - rect.top)  / rect.height - 0.5;

        raycaster.setFromCamera(pointerVec, camera);
        const hits = raycaster.intersectObjects(frontMeshes);

        if (hits.length > 0) {
          const idx = frontMeshes.indexOf(hits[0].object);
          if (idx !== activeTooltipRef.current) {
            activeTooltipRef.current = idx;
            const step = roadmapSteps[idx];
            const isMobile = window.innerWidth < 768;
            tooltip.innerHTML = `
              <div style="color:#7eb4ff; font-size:${isMobile ? '10px' : '12px'}; letter-spacing:.1em; margin-bottom:${isMobile ? '6px' : '8px'};">STEP 0${idx + 1}</div>
              <strong style="color:white; font-size:${isMobile ? '15px' : '18px'}; display:block; margin-bottom:${isMobile ? '6px' : '8px'};">${step.title}</strong>
              <div style="color:#c0d8ff; font-size:${isMobile ? '12px' : '14px'}; line-height:1.45;">${step.description}</div>
            `;
            tooltip.style.opacity = '1';
          }
          tooltip.style.left = `${e.clientX - rect.left + 16}px`;
          tooltip.style.top  = `${e.clientY - rect.top - 12}px`;
          renderer.domElement.style.cursor = 'pointer';
        } else {
          activeTooltipRef.current = null;
          tooltip.style.opacity = '0';
          renderer.domElement.style.cursor = 'default';
        }
      };

      renderer.domElement.addEventListener('pointermove', onPointerMove);

      // ── Animate ────────────────────────────────────────────
      const animate = () => {
        rafRef.current = requestAnimationFrame(animate);
        clockRef.current += 0.012;
        const t = clockRef.current;

        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

        camera.position.x = mouseRef.current.x * 1.2;
        camera.position.y = 1.2 - mouseRef.current.y * 0.6;
        camera.lookAt(mouseRef.current.x * 0.3, mouseRef.current.y * -0.2, 0);

        nodesRef.current.forEach((node, i) => {
          const hovered = activeTooltipRef.current === i;
          node.group.position.y = node.baseY + Math.sin(t + node.phase) * 0.07;
          node.group.rotation.y = Math.sin(t * 0.4 + node.phase) * 0.025;
          const targetScale = hovered ? 1.04 : 1.0;
          node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          node.accent.material.emissiveIntensity = hovered
            ? 1.2 + Math.sin(t * 4) * 0.3
            : 0.5 + Math.sin(t * 1.5 + node.phase) * 0.2;
        });

        if (particles) {
          particles.rotation.y = t * 0.018;
          particles.rotation.x = Math.sin(t * 0.07) * 0.04;
        }

        renderer.render(scene, camera);
      };

      animate();

      // ── Resize handler with responsive updates ─────────────
      const onResize = () => {
        if (!containerRef.current || !camera || !renderer) return;
        const w = containerRef.current.clientWidth;
        const h = getResponsiveHeight();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        cancelAnimationFrame(rafRef.current);
        renderer.dispose();
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (tooltipDomRef.current && tooltipDomRef.current.parentNode === containerRef.current) {
          containerRef.current.removeChild(tooltipDomRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
        }}
      />
    );
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20 overflow-x-hidden">
      {/* FULL WIDTH - removed max-w constraints */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header - responsive text */}
        <div className="text-center mb-8 md:mb-10">
          <SectionLabel>Career Roadmap</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Your{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              3D Journey
            </span>
          </h2>
          <p className="mt-3 md:mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-4">
            Move your cursor across the scene to explore each milestone in three dimensions.
          </p>
        </div>

        {/* Three.js canvas - FULL WIDTH with responsive height */}
        <div className="w-full">
          <Roadmap3D />
        </div>

        {/* Legend strip - responsive wrapping */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 md:mt-7 px-2">
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm"
            >
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono text-slate-400">0{idx + 1}</span>
              <span className="text-[10px] sm:text-xs md:text-sm text-slate-300 whitespace-nowrap">{step.title}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] sm:text-[11px] text-slate-600 mt-4 md:mt-5 tracking-wide">
          Move cursor to pan · Hover nodes for detail
        </p>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS — original structure + 3D tilt cards
═══════════════════════════════════════════════════════════════ */
function EnterpriseSectionInline() {
  // ========== KEEP YOUR EXISTING DATA (unchanged) ==========
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

  const featuredVideoTestimonial = {
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    author: 'Maly, Software Engineer',
    role: 'ADITI Graduate 2024',
    quote: 'The hands-on projects and mentorship completely transformed my career. Within 4 months, I went from zero coding experience to building production-ready applications.'
  };

  // Advanced scroll animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: i * 0.1,
        duration: 0.8
      }
    })
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { type: "spring", damping: 20, stiffness: 80, duration: 0.9 }
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100, rotateY: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { type: "spring", damping: 20, stiffness: 80, duration: 0.9 }
    }
  };

  const scaleReveal = {
    hidden: { opacity: 0, scale: 0.85, rotateX: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" },
    hover: { 
      scale: 1.03, 
      y: -12, 
      boxShadow: "0 25px 40px -12px rgba(220,38,38,0.25)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-red-100/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: ["0%", "-50%", "0%"],
            y: ["0%", "30%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-3xl"
        />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-200/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 space-y-32">
        
        {/* ===== HEADER with advanced reveal ===== */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          className="text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionLabel>Testimonials &amp; Success</SectionLabel>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-5xl mx-auto"
          >
            Student Reviews,{' '}
            <span className="relative inline-block">
              Corporate Testimonials,
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-red-200/50 -z-10 rounded-full"
              />
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">and Success Stories</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Discover how ADITI Academy supports learners and organizations with proven outcomes and trusted partnerships.
          </motion.p>
        </motion.div>

        {/* ===== VIDEO TESTIMONIAL with 3D Tilt Effect ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleReveal}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-200/30 group">
            {/* Animated border gradient */}
            <motion.div
              animate={{ 
                background: ["linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)", "linear-gradient(270deg, #ef4444, #f59e0b, #ef4444)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-red-500 to-amber-500"
            >
              <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl" />
            </motion.div>
            
            <div className="relative rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative group overflow-hidden bg-black/5 min-h-[300px] md:min-h-[400px]">
                  <iframe
                    className="w-full h-full object-cover absolute inset-0"
                    src={featuredVideoTestimonial.videoUrl}
                    title="Video testimonial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-10 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/80">
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold tracking-wider text-red-600 uppercase">Featured Video Review</span>
                    </div>
                    <p className="text-gray-700 text-2xl md:text-3xl font-medium leading-relaxed italic">
                      "{featuredVideoTestimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {featuredVideoTestimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{featuredVideoTestimonial.author}</p>
                        <p className="text-sm text-gray-500">{featuredVideoTestimonial.role}</p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg 
                            key={i} 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="w-5 h-5 text-amber-400 fill-amber-400" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== STUDENT REVIEWS with Stagger Animation ===== */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideFromLeft}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-200">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Student Reviews</h3>
            <motion.div 
              animate={{ width: [0, 60, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-px bg-gradient-to-r from-red-500 to-transparent"
            />
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {studentReviews.map((review, index) => (
              <motion.div
                key={review.author}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 60, rotateX: -20 },
                    visible: { opacity: 1, y: 0, rotateX: 0 }
                  }}
                  className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50/0 to-red-50/0 group-hover:to-red-50/20 transition-all duration-500" />
                  <motion.div
                    animate={{ rotate: [0, 10, -5, 0] }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="absolute top-6 right-7"
                  >
                    <svg className="w-12 h-12 text-red-100 group-hover:text-red-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </motion.div>
                  <p className="text-gray-700 leading-relaxed mb-7 italic text-lg">"{review.quote}"</p>
                  <div className="flex items-center gap-4">
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src={review.img} 
                      alt={review.author} 
                      className="w-12 h-12 rounded-full object-cover border-3 border-red-100 group-hover:border-red-300 transition-all" 
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-400">{review.role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== CORPORATE TESTIMONIALS ===== */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideFromRight}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-200">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Corporate Testimonials</h3>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {corporateTestimonials.map((t, index) => (
              <motion.div
                key={t.author}
                variants={{
                  hidden: { opacity: 0, x: index === 0 ? -80 : 80 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="relative bg-white rounded-2xl border-l-4 border-l-red-500 border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                  <div className="flex items-start gap-5 mb-6">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 flex items-center justify-center flex-shrink-0"
                    >
                      <Building2 className="w-6 h-6 text-red-600" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{t.author}</p>
                      <p className="text-xs text-gray-400 mt-1">Trusted Partner</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic text-base md:text-lg">"{t.quote}"</p>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-6 h-0.5 bg-gradient-to-r from-red-500 to-transparent origin-left"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== ESG IMPACT HIGHLIGHTS with 3D Flip Cards ===== */}
        
        {/* ESG Impact Highlights - KEPT EXACTLY AS YOUR ORIGINAL (unchanged) */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Award className="w-4 h-4 text-white" /></div>
            <h3 className="text-xl font-bold text-gray-900">ESG Impact Highlights</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {esgHighlights.map((highlight, index) => (
              <motion.div key={highlight.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card3D className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-red-50/60 transition-all duration-400 h-full" strength={10}>
                  <div className="relative h-44 overflow-hidden">
                    <ParallaxImg
                      src={highlight.img}
                      alt={highlight.title}
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
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">{highlight.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{highlight.summary}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>

         {/* Partner Showcase - Professional Horizontal Marquee (fully preserved with enhanced 3D) */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          className="text-center mt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-transparent">
              <Globe className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.15em] text-red-600 uppercase">Partner Showcase</span>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-500 mb-10 px-4 text-sm md:text-base"
          >
            Working with education, government, and international technology partners.
          </motion.p>
          
          <div className="relative w-full overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent" />
            
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-6 md:gap-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                {[...Array(2)].flatMap(() => [
                  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
                  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
                  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
                  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
                  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
                  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
                  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Adobe_Logo.svg" },
                ]).map((partner, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative w-40 md:w-48"
                  >
                    <div className="relative rounded-2xl bg-white p-5 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-red-300 overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                          animate={{ y: ["-100%", "500%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ filter: "blur(2px)" }}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-400 to-transparent"
                          animate={{ y: ["500%", "-100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          style={{ filter: "blur(1px)" }}
                        />
                      </motion.div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-50/0 via-red-50/0 to-red-50/0 group-hover:from-red-50/40 group-hover:via-red-50/20 group-hover:to-red-50/40 transition-all duration-500" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                          <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" loading="lazy" />
                        </div>
                        <p className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 text-center">
                          {partner.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                          Strategic Partner
                        </p>
                      </div>
                      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 md:px-9 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span>Request Partnership</span>
              <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </Link>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}

// Custom hooks for scroll animations and parallax
function useScrollAnimation(ref, speed = 0.2) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = (elementCenter - viewportCenter) / windowHeight;
      const translateY = distanceFromCenter * 50 * speed;
      
      element.style.transform = `translateY(${translateY}px)`;
      element.style.transition = 'transform 0.1s ease-out';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
}

function useParallax(ref, speed = 0.1) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + window.scrollY;
      const parallaxY = (scrolled - elementTop) * speed;
      
      const innerElements = element.querySelectorAll('.parallax-child');
      innerElements.forEach(child => {
        child.style.transform = `translateY(${parallaxY * 0.5}px)`;
      });
      
      element.style.transform = `translateY(${parallaxY * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
}

/* ═══════════════════════════════════════════════════════════════
   QUALITY ASSURANCE — original structure + 3D tilt + parallax + icon bubble
═══════════════════════════════════════════════════════════════ */
function QualityAssuranceSectionInline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
 
  const qualityStats = [
    { label: 'Curriculum Alignment', value: 'MoEYS', icon: Shield },
    { label: 'Learner Success Rate',  value: '98%',   icon: TrendingUp },
    { label: 'Expert Trainers',       value: '50+',   icon: Users },
    { label: 'Quality Reviews',       value: '100+',  icon: Award },
  ];
 
  const qualityFeatures = [
    'MoEYS-aligned learning process',
    'Structured curriculum verification',
    'Continuous learner assessment',
    'Dedicated student support',
  ];
 
  return (
    <section ref={containerRef} className="relative py-28 bg-white overflow-hidden">
      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
 
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
 
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-700">
              Quality Assurance
            </span>
          </div>
 
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            Quality Assurance{' '}
            <span className="text-red-600">Aligned with MoEYS</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            The whole organization process is aligned with Ministry of Education standards, ensuring
            consistent quality and trusted outcomes.
          </p>
        </motion.div>
 
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16" />
 
        {/* ── Stat Cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {qualityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  y: -5,
                  rotateX: 3,
                  scale: 1.01,
                  transition: { duration: 0.25 },
                }}
                style={{ perspective: 600, transformStyle: 'preserve-3d' }}
              >
                <div
                  className="
                    relative rounded-2xl border border-gray-100 bg-white
                    shadow-sm hover:shadow-xl hover:shadow-red-50/60 hover:border-red-200
                    transition-all duration-300 h-full overflow-hidden
                    text-center px-5 pt-8 pb-7
                  "
                >
                  {/* Radial glow */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(226,75,74,0.06) 0%, transparent 70%)' }}
                  />
 
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-5 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #E24B4A, #c03333)',
                      boxShadow: '0 4px 12px rgba(226,75,74,0.30), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
 
                  {/* Value */}
                  <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
 
                  {/* Label */}
                  <p className="mt-1.5 text-sm font-medium text-gray-500">{stat.label}</p>
 
                  {/* Animated bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: index * 0.08 + 0.4 }}
                    className="mt-5 h-[3px] rounded-full origin-left"
                    style={{ background: 'linear-gradient(90deg, #E24B4A, #f09595)' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
 
        {/* ── Feature Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              whileHover={{ y: -3 }}
              className="
                flex items-center gap-3 p-5
                bg-gray-50 rounded-2xl border border-gray-100
                hover:border-red-200 hover:bg-red-50/30 hover:shadow-sm
                transition-all duration-300
              "
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #E24B4A, #c03333)',
                  boxShadow: '0 3px 8px rgba(226,75,74,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
 
        {/* ── Cert Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="
              inline-flex items-center gap-5 px-8 py-5
              bg-white border border-gray-200 rounded-2xl
              shadow-md hover:shadow-lg hover:border-red-200
              transition-all duration-300
            "
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #E24B4A, #c03333)',
                boxShadow: '0 4px 12px rgba(226,75,74,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Certified &amp; Accredited</p>
              <p className="text-sm text-gray-400 mt-0.5">
                Recognized by leading technology organizations
              </p>
            </div>
          </motion.div>
        </motion.div>
 
      </div>
    </section>
  );
}