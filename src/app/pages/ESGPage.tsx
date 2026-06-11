import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Globe, Users, Award, Leaf, Heart, Shield,
  CheckCircle, Sparkles, Building2, GraduationCap,
  Code, Brain, Cloud, Network, Cpu, Wind, Trees,
  ArrowRight, ExternalLink, TrendingUp,
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';


// ─── BRAND TOKEN — never changes ───────────────────────────────────────────
const RED = '#dc2626';
const RED_DARK = '#b91c1c';
const RED_LIGHT = '#fca5a5';

// ─── IMAGES ────────────────────────────────────────────────────────────────
const IMGS = {
  hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80',
  digitalTransformation: '/assets/esg/aditi.jpg',
  techEducation: '/assets/esg/hero2.jpg',
  kidsCoding: '/assets/esg/techforkid.jpg',
  womenInTech: '/assets/esg/social.jpg',
  healthcare: '/assets/esg/nironecare.jpg',
  sustainability: '/assets/esg/hero1.jpg',
  environmental: '/assets/esg/environmental.jpg',
  globalPartners: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
  aiTechnology: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  cybersecurity: '/assets/esg/governance.jpg',
  cloudComputing: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
  teamwork: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
  innovation: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80',
};
// Option 1: Direct path from public folder (Recommended for Vite)
const LOGOS = {
  aditi: '/assets/esg/logo/aditi.png',
  aditiAcademy: '/assets/esg/logo/aditiacademy.png',
  techForKids: '/assets/esg/logo/techforkid.png',
  technovationGirls: '/assets/esg/logo/technovationforgril.png',
  nironcare: '/assets/esg/logo/nironecare.jpg',
};

// ═══════════════════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════

function useParallax(offset = 80) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return { ref, y };
}

function Reveal({ children, delay = 0, dir = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const init = { up: { y: 56, x: 0 }, down: { y: -56, x: 0 }, left: { y: 0, x: 56 }, right: { y: 0, x: -56 } }[dir] || { y: 56, x: 0 };
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, ...init }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Magnetic3D({ children, strength = 10, className = '' }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 30 });
  return (
    <motion.div ref={ref} className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1200 }}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 2200, fps = 60, steps = (dur / 1000) * fps;
    let i = 0;
    const tick = () => {
      i++;
      const progress = 1 - Math.pow(1 - i / steps, 4);
      setVal(progress >= 1 ? target : target * progress);
      if (i < steps) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}{suffix}</span>;
}

function SectionLabel({ children, invert = false }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <span className={`h-px w-10 ${invert ? 'bg-red-300' : 'bg-red-600'}`} />
      <span className={`text-[11px] font-black tracking-[0.25em] uppercase ${invert ? 'text-red-300' : 'text-red-600'}`}>{children}</span>
      <span className={`h-px w-10 ${invert ? 'bg-red-300' : 'bg-red-600'}`} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TECH SCAN HERO OVERLAYS
// ═══════════════════════════════════════════════════════════════════════════

function TechScanningBackground() {
  const [go, setGo] = useState(false);
  useEffect(() => { setTimeout(() => setGo(true), 300); }, []);

  return (
    <>
      {/* Horizontal laser sweep */}
      <motion.div className="absolute top-0 left-0 w-[3px] h-full pointer-events-none z-50"
        style={{ background: `linear-gradient(to bottom,transparent,${RED}dd 50%,transparent)`, filter: 'blur(3px)', boxShadow: `0 0 60px 20px ${RED}99` }}
        initial={{ x: '-4%', opacity: 0 }}
        animate={go ? { x: '104%', opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 4.5, delay: 1.2, repeat: Infinity, repeatDelay: 4, ease: [0.22, 1, 0.36, 1] }} />

      {/* Vertical laser sweep */}
      <motion.div className="absolute top-0 left-0 w-full h-[3px] pointer-events-none z-50"
        style={{ background: `linear-gradient(to right,transparent,${RED}dd 50%,transparent)`, filter: 'blur(2px)', boxShadow: `0 0 80px 24px ${RED}aa` }}
        initial={{ y: '-4%', opacity: 0 }}
        animate={go ? { y: '104%', opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 3.2, delay: 0.8, repeat: Infinity, repeatDelay: 6, ease: [0.16, 1, 0.3, 1] }} />

      {/* Corner HUD brackets */}
      {[
        { cls: 'top-8 left-8', d1: 'M40,0 L0,0 L0,40', d2: 'M24,4 L4,4 L4,24' },
        { cls: 'top-8 right-8', d1: 'M0,0 L40,0 L40,40', d2: 'M16,4 L36,4 L36,24' },
        { cls: 'bottom-8 left-8', d1: 'M40,40 L0,40 L0,0', d2: 'M24,36 L4,36 L4,16' },
        { cls: 'bottom-8 right-8', d1: 'M0,40 L40,40 L40,0', d2: 'M16,36 L36,36 L36,16' },
      ].map((c, i) => (
        <motion.div key={i} className={`absolute ${c.cls} pointer-events-none z-40`}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + i * 0.12, duration: 0.6 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.path d={c.d1} stroke={RED} strokeWidth="2.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.8 + i * 0.15 }} />
            <motion.path d={c.d2} stroke={`${RED}66`} strokeWidth="1.2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 2.1 + i * 0.15 }} />
          </svg>
        </motion.div>
      ))}

      {/* Scanning rect — center focus box */}
      <motion.div className="absolute pointer-events-none z-30"
        style={{ left: '12%', top: '30%', width: 320, height: 220, border: `1.5px solid ${RED}55`, boxShadow: `inset 0 0 40px ${RED}18, 0 0 40px ${RED}28` }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: [0, 0.7, 0.6], scale: [0.88, 1.02, 1] }}
        transition={{ duration: 2.4, delay: 2.8 }}>
        {/* Animated scan line inside box */}
        <motion.div className="absolute left-0 w-full h-[2px]"
          style={{ background: `linear-gradient(to right,transparent,${RED},transparent)`, boxShadow: `0 0 24px 4px ${RED}` }}
          animate={{ y: [0, 218, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 3.5 }} />
        {/* Corner dots */}
        {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((p, i) => (
          <motion.span key={i} className={`absolute ${p} w-2 h-2 rounded-full`}
            style={{ background: RED, boxShadow: `0 0 8px 2px ${RED}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }} />
        ))}
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(circle,${RED}14 0%,transparent 70%)`, filter: 'blur(60px)' }} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <img src={IMGS.hero} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#000000 0%,#000000cc 40%,transparent 100%)' }} />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '128px' }} />

      <div className="absolute inset-0 z-0"><TechScanningBackground /></div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-24 left-8 w-80 h-80 rounded-full animate-pulse" style={{ background: `${RED}18`, filter: 'blur(90px)' }} />
        <div className="absolute bottom-24 right-8 w-[28rem] h-[28rem] rounded-full" style={{ background: `${RED}0f`, filter: 'blur(110px)', animation: 'pulse 3s ease-in-out infinite 1s' }} />
      </div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-32"
        style={{ y: heroY, opacity: heroOpacity }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal delay={0.15}>
              <SectionLabel invert>ESG & SDG in Practice</SectionLabel>
            </Reveal>
            <Reveal delay={0.25} dir="right">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                Driving<br />
                Sustainable<br />
                <span style={{ color: RED }}>Impact</span> Through<br />
                Technology
              </h1>
            </Reveal>
            <Reveal delay={0.38}>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Our integrated ecosystem empowers communities, businesses, and governments to achieve measurable progress on the UN Sustainable Development Goals.
              </p>
            </Reveal>
            <Reveal delay={0.48}>
              <div className="flex flex-wrap gap-4">
                <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${RED}66` }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-white font-bold rounded-xl text-sm tracking-wide transition-all duration-300"
                  style={{ background: RED }}>
                  Explore Our Ecosystem
                </motion.button>
                <motion.button whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.15)' }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-white/25 bg-white/8 backdrop-blur text-white font-bold rounded-xl text-sm tracking-wide transition-all duration-300">
                  Partner With Us
                </motion.button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35} dir="left">
            <div className="relative h-[480px] hidden lg:block">
              <Magnetic3D strength={5} className="absolute top-0 right-0 w-[72%] h-[60%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 32px 80px -16px rgba(0,0,0,0.6), 0 0 0 1px white/5` }}>
                  <img src={IMGS.techEducation} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#00000088,transparent)' }} />
                  {/* Floating label */}
                  <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5">
                    <p className="text-white text-xs font-bold">ADITI Academy</p>
                    <p className="text-gray-400 text-[10px]">1,500+ Students Trained</p>
                  </div>
                </div>
              </Magnetic3D>
              <Magnetic3D strength={5} className="absolute bottom-0 left-0 w-[65%] h-[58%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 32px 80px -16px rgba(0,0,0,0.6)` }}>
                  <img src={IMGS.sustainability} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#00000088,transparent)' }} />
                  <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5">
                    <p className="text-white text-xs font-bold">Sustainability</p>
                    <p className="text-gray-400 text-[10px]">30% Carbon Reduction</p>
                  </div>
                </div>
              </Magnetic3D>
              {/* Floating stat pill */}
              <motion.div className="absolute top-[55%] right-[-12px] bg-black border rounded-2xl px-5 py-4 z-20"
                style={{ borderColor: `${RED}44`, boxShadow: `0 0 30px ${RED}22` }}
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <p className="text-white font-black text-2xl" style={{ color: RED }}>27K+</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Lives Touched</p>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Stats bar */}
        <Reveal delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pt-8 border-t" style={{ borderColor: `${RED}25` }}>
            {[{ v: '10+', l: 'Countries' }, { v: '27.1K+', l: 'Lives Touched' }, { v: '100%', l: 'MoEYS Aligned' }, { v: '30%', l: 'Carbon Reduction' }].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-3xl font-black text-white">{s.v}</p>
                <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom,transparent,#fff)' }} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ESG & SDG SECTION — premium split layout
// ═══════════════════════════════════════════════════════════════════════════

// Floating 3D card shell
function Card3D({ children, className = '', depth = 8 }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [depth, -depth]), { stiffness: 250, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), { stiffness: 250, damping: 28 });
  const shadow = useSpring(hov ? 1 : 0, { stiffness: 200, damping: 22 });

  return (
    <motion.div ref={ref} className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000,
        boxShadow: useTransform(shadow, [0, 1], ['0 4px 16px rgba(0,0,0,0.06)', '0 28px 72px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(220,38,38,0.08)']) }}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHov(false); }}>
      {children}
    </motion.div>
  );
}

// ESG Pillar: dark-themed glass card with accent strip
function ESGCard({ pillar, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);

  const PILLAR_META = {
    Environmental: { Icon: Leaf, color: '#10b981', label: 'E', gradient: 'from-emerald-900/40 to-emerald-950/60' },
    Social: { Icon: Heart, color: RED, label: 'S', gradient: 'from-red-900/40 to-red-950/60' },
    Governance: { Icon: Shield, color: '#3b82f6', label: 'G', gradient: 'from-blue-900/40 to-blue-950/60' },
  };
  const meta = PILLAR_META[pillar.title];
  const Icon = meta.Icon;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 48, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}>
      <Card3D depth={6}
        className="relative rounded-2xl overflow-hidden cursor-default"
        style2={{ background: '#0a0a0a' }}>
        <motion.div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#111111,#0d0d0d)' }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}>

          {/* Image header */}
          <div className="relative h-40 overflow-hidden">
            <motion.img src={pillar.image} alt={pillar.title}
              className="w-full h-full object-cover"
              animate={{ scale: hov ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 70%, #0d0d0d 100%)` }} />
            {/* Colored overlay tint */}
            <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(135deg, ${meta.color}55, transparent)` }} />

            {/* Letter badge */}
            <motion.div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg shadow-xl"
              style={{ background: meta.color, color: '#fff', boxShadow: `0 8px 24px ${meta.color}66` }}
              animate={{ scale: hov ? 1.08 : 1, boxShadow: hov ? `0 12px 32px ${meta.color}88` : `0 8px 24px ${meta.color}66` }}
              transition={{ duration: 0.3 }}>
              {meta.label}
            </motion.div>

            {/* Icon top-right */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
              <Icon size={16} color={meta.color} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-black text-lg tracking-tight">{pillar.title}</h4>
              <motion.button
                onClick={() => setOpen(!open)}
                className="text-xs font-bold px-3 py-1.5 rounded-full border transition-colors duration-200"
                style={{ borderColor: `${meta.color}44`, color: meta.color, background: `${meta.color}12` }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                {open ? 'Less' : 'More'}
              </motion.button>
            </div>

            {/* Items list */}
            <ul className="space-y-2.5">
              {(open ? pillar.items : pillar.items.slice(0, 2)).map((item, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]" style={{ background: meta.color }} />
                  <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom glow line */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(to right, transparent, ${meta.color}, transparent)` }}
            animate={{ opacity: hov ? 1 : 0.3 }}
            transition={{ duration: 0.3 }} />
        </motion.div>
      </Card3D>
    </motion.div>
  );
}

// SDG Goal card: light theme, horizontal
const SDG_COLORS = { 4: '#C5192D', 5: '#FF3A21', 8: '#A21942', 9: '#FD6925', 17: '#19486A' };

function SDGCard({ goal, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hov, setHov] = useState(false);

  const col = SDG_COLORS[goal.number] || RED;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <Card3D depth={4} className="rounded-2xl overflow-hidden">
        <motion.div className="flex items-stretch bg-white rounded-2xl overflow-hidden border"
          style={{ borderColor: hov ? `${col}40` : '#e5e7eb' }}
          animate={{ y: hov ? -3 : 0 }}
          transition={{ duration: 0.3 }}>

          {/* SDG Number slab */}
          <div className="relative w-20 flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{ background: col, minHeight: 88 }}>
            <span className="text-white font-black text-3xl leading-none z-10">{goal.number}</span>
            {/* Shine */}
            <motion.div className="absolute inset-0 opacity-0"
              style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 60%)' }}
              animate={{ opacity: hov ? 1 : 0 }}
              transition={{ duration: 0.3 }} />
          </div>

          {/* Thumbnail */}
          {/* <div className="w-20 flex-shrink-0 overflow-hidden">
            <motion.img src={goal.image} alt="" className="w-full h-full object-cover"
              animate={{ scale: hov ? 1.12 : 1 }} transition={{ duration: 0.5 }} />
          </div> */}

          {/* Text */}
          <div className="flex-1 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: col }}>SDG {goal.number}</p>
            <h4 className="font-black text-gray-900 text-sm leading-tight mb-1">{goal.name}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{goal.description}</p>
          </div>

          {/* Arrow */}
          <motion.div className="flex items-center pr-4"
            animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 6 }}
            transition={{ duration: 0.2 }}>
            {/* <ArrowRight size={15} color={col} /> */}
          </motion.div>

          {/* Bottom accent */}
          <motion.div className="absolute bottom-0 left-20 right-0 h-[2px] rounded-full"
            style={{ background: col }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hov ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style2={{ transformOrigin: 'left' }} />
        </motion.div>
      </Card3D>
    </motion.div>
  );
}

function ESGSDGSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const esgPillars = [
    { title: 'Environmental', image: IMGS.environmental, items: ['Digital transformation & cyber resiliency in 10+ countries', 'Technology driving lower carbon emissions through AI', 'Paperless workflows, cloud efficiency, greener operations', 'Energy-per-user tracking, low-carbon infrastructure preference'] },
    { title: 'Social', image: IMGS.womenInTech, items: ['6,000+ girls trained in technology & leadership', '10,000+ children introduced to coding & AI', 'Thousands of SMEs & government officers upskilled', 'Inclusive technology education for all communities'] },
    { title: 'Governance', image: IMGS.cybersecurity, items: ['AI ethics advocacy & responsible tech adoption across ASEAN', 'AI Governance-by-Design: Bias testing, human oversight', 'Privacy-by-Design: Consent, minimization, strong security', 'Transparent Reporting: Impact, safety, reliability metrics'] },
  ];

  const sdgGoals = [
  { 
    number: 4, 
    name: 'Quality Education', 
    description: 'ADITI Academy delivers industry-aligned, MoEYS endorsed technology training to IT students, professionals, SMEs, and government officers, ensuring equitable access to relevant, high-quality digital skills.',
    // image: IMGS.techEducation,
    stats: [
      '~1,000 IT students trained',
      '600+ professionals upskilled',
      'MoEYS endorsed',
      'Short course graduation',
      'International certifications'
    ]
  },
  { 
    number: 5, 
    name: 'Gender Equality', 
    description: 'Through Technovation Girls Cambodia and dedicated women in tech programs, ADITI has trained 6,000+ girls in technology, leadership, and entrepreneurship, empowering women to lead in the digital economy.',
    // image: IMGS.womenInTech,
    stats: [
      '6,000+ girls trained',
      'Technovation Girls Cambodia',
      'Women leadership programs',
      'Digital literacy for women'
    ]
  },
  { 
    number: 8, 
    name: 'Decent Work & Economic Growth', 
    description: 'By connecting graduates to internships, industry partners, and virtual company programs, ADITI creates direct pathways to employment and contributes to Cambodia\'s goal of reaching middle income status by 2030.',
    // image: IMGS.teamwork,
    stats: [
      'Industry linkage program',
      'Job placement support',
      'Internship partnership',
      'Virtual company program',
      'Cambodia 2030 mission'
    ]
  },
  { 
    number: 9, 
    name: 'Industry, Innovation & Infrastructure', 
    description: 'ADITI Academy builds Cambodia\'s technology industry capacity through AI/ML, cybersecurity, cloud, and software development training, equipping the workforce to support digital infrastructure and innovation.',
    // image: IMGS.innovation,
    stats: [
      'AI & Machine learning course',
      'Cybersecurity training',
      'Cloud computing certs',
      'Innovation Award',
      'Tech for Kids Academy'
    ]
  },
  { 
    number: 10, 
    name: 'Reduced Inequalities', 
    description: 'Training programs target underserved groups, including government officers, SME owners, and the general public, reducing the digital skills gap across income levels, sectors, and geographies in Cambodia.',
    // image: IMGS.globalPartners, // Update image path as needed
    stats: [
      '500+ government officers',
      '550+ SMEs trained',
      '1,500+ general public',
      'Digital literacy programs',
      'Skills Development Fund'
    ]
  },
  { 
    number: 17, 
    name: 'Partnerships for the Goals', 
    description: 'ADITI Academy builds multi-stakeholder partnerships with government ministries, universities, the CBRD Fund, and industry, creating a collaborative ecosystem for sustainable technology capacity building.',
    // image: IMGS.globalPartners,
    stats: [
      'MoEYS endorsement',
      'CBRD & Skill Development Fund'
    ]
  }
];

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: '#f8f8f8' }}>
      {/* Background mesh */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: `radial-gradient(circle,${RED}22 1px,transparent 1px)`, backgroundSize: '36px 36px' }} />
        {/* Split line */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px opacity-10"
          style={{ background: `linear-gradient(to bottom,transparent,${RED},transparent)` }} />
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle,${RED}12,transparent 70%)`, filter: 'blur(80px)' }} />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle,#3b82f612,transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── HEADER ── */}
        <Reveal className="text-center mb-20">
          <SectionLabel>Our Foundation</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-tight tracking-tight">
            ESG Commitment &{' '}
            <span className="relative inline-block">
              <span style={{ color: RED }}>SDG Alignment</span>
              {/* Underline stroke */}
              <motion.span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                style={{ background: `linear-gradient(to right,${RED},${RED_DARK})` }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} />
            </span>
          </h2>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            At ADITI Academy, ESG is not just a framework — it's the foundation of everything we do, aligned with the UN Sustainable Development Goals.
          </p>
        </Reveal>

        {/* ── MAIN TWO-COLUMN ── */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ════ LEFT: ESG ════ */}
          <div>
            <Reveal delay={0.1}>
              {/* Column label strip */}
              <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-200">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-sm shadow-lg"
                    style={{ background: `linear-gradient(135deg,${RED},${RED_DARK})`, boxShadow: `0 8px 24px ${RED}44` }}>
                    ESG
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">ESG Pillars</h3>
                  <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">Environmental · Social · Governance</p>
                </div>
                {/* Live badge */}
                <div className="ml-auto flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Active</span>
                </div>
              </div>
            </Reveal>

            {/* ESG cards stacked */}
            <div className="space-y-5">
              {esgPillars.map((pillar, i) => (
                <ESGCard key={pillar.title} pillar={pillar} index={i} />
              ))}
            </div>

            {/* ESG bottom cta */}
            <Reveal delay={0.5}>
              <motion.div className="mt-8 rounded-2xl p-6 text-white overflow-hidden relative"
                style={{ background: `linear-gradient(135deg,${RED},${RED_DARK})` }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle,white,transparent)', transform: 'translate(30%,-30%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-red-200" />
                    <span className="text-xs font-bold text-red-100 uppercase tracking-widest">Competitive Advantage</span>
                  </div>
                  <h4 className="text-lg font-black mb-2">ESG Turns Responsibility Into Market Power</h4>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Drives innovation, attracts top talent, builds partner trust, and creates long-term value.
                  </p>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* ════ RIGHT: SDG ════ */}
          <div>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-200">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#1a56db,#1e40af)', boxShadow: '0 8px 24px #1a56db44' }}>
                  SDG
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">SDG Alignment</h3>
                  <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">UN 2030 Agenda for Sustainable Development</p>
                </div>
              </div>
            </Reveal>

            {/* UN commitment banner */}
            <Reveal delay={0.25}>
              <div className="mb-6 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#003a63,#00274d)' }}>
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: `radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)`, backgroundSize: '20px 20px' }} />
                <div className="relative flex items-center gap-5 p-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Globe size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm mb-1">Committed to 5 of 17 Global Goals</p>
                    <p className="text-blue-200 text-xs leading-relaxed">Every programme we deliver contributes to the UN 2030 Sustainable Development Agenda.</p>
                  </div>
                  <div className="ml-auto text-right flex-shrink-0">
                    <p className="text-white font-black text-3xl leading-none">5</p>
                    <p className="text-blue-300 text-[10px] uppercase tracking-wider mt-1">SDGs</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* SDG cards */}
            <div className="space-y-3.5">
              {sdgGoals.map((goal, i) => (
                <SDGCard key={goal.number} goal={goal} index={i} />
              ))}
            </div>

            {/* SDG mini stats */}
            {/* <Reveal delay={0.55}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[{ n: '5', l: 'SDGs Addressed' }, { n: '17', l: 'Total UN Goals' }, { n: '2030', l: 'Target Year' }].map(s => (
                  <div key={s.l} className="rounded-xl bg-white border border-gray-100 p-4 text-center"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <p className="text-2xl font-black text-gray-900">{s.n}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider leading-tight">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ECOSYSTEM SECTION
// ═══════════════════════════════════════════════════════════════════════════

function EcosystemSection() {
const pillars = [
  { 
    name: 'ADITI', 
    logo: LOGOS.aditi,
    icon: Cpu,
    description: 'Sustainable digital transformation, software solutions, global software engineer outsourcing', 
    countries: 'Cambodia, Singapore, Japan, EU', 
    impact: 'Carbon-aware coding, ethical hiring, 40% women in engineering', 
    image: IMGS.digitalTransformation 
  },
  { 
    name: 'ADITI Academy', 
    logo: LOGOS.aditiAcademy,
    icon: GraduationCap, 
    description: 'Upskilling IT students, professors, SMEs, government staff, women leaders', 
    stats: '1,500+ students · 600+ professionals · 500+ government officers', 
    impact: 'Industry-aligned curriculum, career support, certification programs', 
    image: IMGS.techEducation 
  },
  { 
    name: 'Tech For Kids Academy', 
    logo: LOGOS.techForKids,
    icon: Code, 
    description: '10,000+ children learning coding, AI, and entrepreneurship', 
    stats: 'Ages 8–16 · 65% from underserved communities', 
    impact: 'Building future innovators, digital literacy for next generation', 
    image: IMGS.kidsCoding 
  },
  { 
    name: 'Technovation Girls Cambodia', 
    logo: LOGOS.technovationGirls,
    icon: Users, 
    description: '6,000 girls trained in tech, leadership, and entrepreneurship', 
    stats: '6,000+ girls · 200+ mentors · Inspiring millions globally', 
    impact: 'Gender equality in tech, SDG-focused problem solving', 
    image: IMGS.womenInTech 
  },
  { 
    name: 'Nironcare', 
    logo: LOGOS.nironcare,
    icon: Heart, 
    description: 'Groundbreaking AI-powered digital health platform', 
    impact: 'Reduces emissions, ensures inclusivity, expands healthcare access, safeguards data privacy', 
    image: IMGS.healthcare 
  },
];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Our Ecosystem</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-tight tracking-tight">
            5 Pillars of <span style={{ color: RED }}>Sustainable Impact</span>
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            Five interconnected pillars driving sustainable impact across education, technology, and social development.
          </p>
        </Reveal>

        <div className="space-y-6">
          {pillars.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Card3D depth={4} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                <motion.div className="grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden"
                  whileHover={{ boxShadow: `0 24px 64px -12px rgba(0,0,0,0.14), 0 0 0 1px ${RED}15` }}
                  transition={{ duration: 0.3 }}>
                  <div className="p-8 lg:p-10">
                    {p.logo ? (
                      <img 
                        src={p.logo} 
                        alt={p.name}
                        className={`mb-6 object-contain ${p.name === 'Nironcare' ? 'h-20 w-auto' : 'h-14 w-auto'}`}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                        style={{ background: `linear-gradient(135deg,${RED},${RED_DARK})`, boxShadow: `0 8px 28px ${RED}44` }}>
                        <p.icon size={26} className="text-white" />
                      </div>
                    )}

                    <p className="text-gray-500 leading-relaxed mb-5">{p.description}</p>
                    {p.countries && (
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Globe size={13} />
                        <span>{p.countries}</span>
                      </div>
                    )}
                    {p.stats && <p className="text-sm font-bold mb-4" style={{ color: RED }}>{p.stats}</p>}
                    <div className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm leading-relaxed">{p.impact}</span>
                    </div>
                  </div>
                  <div className="relative h-56 md:h-auto overflow-hidden">
                    <motion.img src={p.image} alt={p.name} className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to left,transparent,rgba(255,255,255,0.04))' }} />
                    {/* Red stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom,transparent,${RED},transparent)` }} />
                  </div>
                </motion.div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TECHNOLOGY SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════

function TechnologyShowcase() {
  const techs = [
    { name: 'Artificial Intelligence', icon: Brain, desc: 'AI-powered healthcare, smart logistics, sustainable agriculture', image: IMGS.aiTechnology },
    { name: 'Cloud Computing', icon: Cloud, desc: 'Cloud efficiency, reduced carbon footprint, scalable solutions', image: IMGS.cloudComputing },
    { name: 'Cybersecurity', icon: Shield, desc: 'Digital transformation, cyber resiliency, data protection', image: IMGS.cybersecurity },
    { name: 'IoT & Smart Systems', icon: Network, desc: 'Smart logistics, environmental monitoring, efficiency optimization', image: IMGS.innovation },
  ];

  return (
    <section className="py-28" style={{ background: '#f8f8f8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Technology Innovation</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-tight tracking-tight">
            Driving <span style={{ color: RED }}>Green Technology</span>
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            Sustainability is at the core of every solution we build.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {techs.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09}>
              <Card3D depth={6} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                <motion.div className="rounded-2xl overflow-hidden bg-white"
                  whileHover={{ boxShadow: `0 24px 60px -12px rgba(0,0,0,0.16), 0 0 0 1px ${RED}15`, y: -6 }}
                  transition={{ duration: 0.3 }}>
                  <div className="relative h-44 overflow-hidden">
                    <motion.img src={t.image} alt={t.name} className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#00000088,transparent)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                        style={{ background: RED, boxShadow: `0 6px 20px ${RED}66` }}>
                        <t.icon size={18} className="text-white" />
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight">{t.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              </Card3D>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Wind, value: '30%', label: 'Carbon Emission Reduction', image: IMGS.sustainability },
              { icon: Cloud, value: '25%', label: 'Cloud Efficiency Gains', image: IMGS.cloudComputing },
              { icon: Trees, value: '10+', label: 'Countries Transformed', image: IMGS.globalPartners },
            ].map((s, i) => (
              <Card3D key={s.label} depth={5} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                <motion.div className="rounded-2xl overflow-hidden bg-white"
                  whileHover={{ boxShadow: '0 20px 50px -12px rgba(0,0,0,0.14)', y: -4 }}
                  transition={{ duration: 0.3 }}>
                  <div className="relative h-28 overflow-hidden">
                    <img src={s.image} alt={s.label} className="w-full h-full object-cover" style={{ filter: 'brightness(0.6)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#fff,transparent 60%)' }} />
                  </div>
                  <div className="p-6 text-center">
                    <s.icon size={26} className="mx-auto mb-3" style={{ color: RED }} />
                    <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
                    <p className="text-sm text-gray-500">{s.label}</p>
                  </div>
                </motion.div>
              </Card3D>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// IMPACT METRICS
// ═══════════════════════════════════════════════════════════════════════════

function ImpactMetricsSection() {
  const metrics = [
    { target: 27100, suffix: '+', label: 'Total Lives Touched', icon: Users },
    { target: 6000, suffix: '+', label: 'Women & Girls in Tech', icon: Heart },
    { target: 10000, suffix: '+', label: 'Children in Coding', icon: Code },
    { target: 4, suffix: '', label: 'Partner Countries', icon: Globe },
    { target: 2100, suffix: '+', label: 'Certifications Issued', icon: Award },
    { target: 800, suffix: '+', label: 'Corporate Training', icon: Building2 },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Measurable Impact</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-tight tracking-tight">
            Key Impact <span style={{ color: RED }}>Metrics</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <Card3D depth={5} className="rounded-2xl bg-white border border-gray-100">
                <motion.div className="rounded-2xl bg-white p-8 text-center"
                  whileHover={{ boxShadow: `0 24px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px ${RED}18`, y: -5 }}
                  transition={{ duration: 0.3 }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${RED}12` }}>
                    <m.icon size={28} style={{ color: RED }} />
                  </div>
                  <p className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
                    <AnimatedCounter target={m.target} suffix={m.suffix} />
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{m.label}</p>
                  {/* Red underline */}
                  <div className="mt-4 mx-auto h-0.5 w-12 rounded-full" style={{ background: RED }} />
                </motion.div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARTNERSHIP
// ═══════════════════════════════════════════════════════════════════════════

// function PartnershipSection() {
//   const partners = ['Ministry of Education', 'Ministry of Industry', 'ACLEDA Bank', 'Microsoft Cambodia', 'Google for Education', 'AWS Partner Network', 'UNICEF', 'UNESCO', 'ASEAN Secretariat', 'World Bank'];

//   return (
//     <section className="py-28" style={{ background: '#f8f8f8' }}>
//       <div className="max-w-7xl mx-auto px-6 lg:px-10">
//         <Reveal className="text-center mb-16">
//           <SectionLabel>Collaboration</SectionLabel>
//           <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-tight tracking-tight">
//             Partnership <span style={{ color: RED }}>Model</span>
//           </h2>
//           <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
//             Collaborate with us to drive sustainable impact in your organization and community.
//           </p>
//         </Reveal>

//         <div className="grid lg:grid-cols-2 gap-8 mb-12">
//           <Reveal dir="left">
//             <Card3D depth={4} className="h-full rounded-2xl bg-white border border-gray-100">
//               <motion.div className="h-full rounded-2xl bg-white p-8 lg:p-10"
//                 whileHover={{ boxShadow: '0 24px 64px -12px rgba(0,0,0,0.12)' }}
//                 transition={{ duration: 0.3 }}>
//                 <h3 className="text-xl font-black text-gray-900 mb-8">How to Collaborate</h3>
//                 <div className="space-y-7">
//                   {[
//                     { n: '01', t: 'Funding & Sponsorship', d: 'Support our programs through targeted funding or sponsorship opportunities.' },
//                     { n: '02', t: 'Curriculum Co-Creation', d: 'Develop customized training programs that meet your industry needs.' },
//                     { n: '03', t: 'Accreditation & Certification', d: 'Joint certification programs with industry recognition.' },
//                     { n: '04', t: 'Large-Scale Training', d: 'Comprehensive upskilling programs for your workforce.' },
//                   ].map(item => (
//                     <div key={item.n} className="flex items-start gap-4">
//                       <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-white text-sm shadow-lg"
//                         style={{ background: `linear-gradient(135deg,${RED},${RED_DARK})`, boxShadow: `0 6px 20px ${RED}44` }}>
//                         {item.n}
//                       </div>
//                       <div className="pt-1">
//                         <h4 className="font-black text-gray-900 mb-1">{item.t}</h4>
//                         <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </Card3D>
//           </Reveal>

//           <Reveal dir="right">
//             <Card3D depth={4} className="h-full rounded-2xl bg-white border border-gray-100">
//               <motion.div className="h-full rounded-2xl bg-white p-8 lg:p-10"
//                 whileHover={{ boxShadow: '0 24px 64px -12px rgba(0,0,0,0.12)' }}
//                 transition={{ duration: 0.3 }}>
//                 <h3 className="text-xl font-black text-gray-900 mb-7">Partners & Collaborators</h3>
//                 <div className="grid grid-cols-2 gap-2.5 mb-8">
//                   {partners.map(p => (
//                     <motion.div key={p} className="rounded-xl border border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-100 px-3 py-2.5 text-center cursor-default transition-colors duration-200"
//                       whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
//                       <span className="text-xs font-semibold text-gray-700">{p}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//                 <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
//                   <h4 className="font-black text-blue-900 text-sm mb-3">Success Metrics</h4>
//                   {['500+ government officials trained in digital governance', '15 corporate clients achieved 25% productivity gains', '200+ SMEs digitized through our ecosystem', 'Regional expansion to 4 countries'].map(m => (
//                     <div key={m} className="flex items-center gap-2 mb-2">
//                       <CheckCircle size={13} className="text-blue-500 flex-shrink-0" />
//                       <span className="text-xs text-blue-800">{m}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </Card3D>
//           </Reveal>
//         </div>

//         <Reveal className="text-center">
//           <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${RED}55` }} whileTap={{ scale: 0.97 }}
//             className="px-10 py-4 text-white font-black rounded-2xl shadow-lg text-sm tracking-wide transition-all"
//             style={{ background: `linear-gradient(135deg,${RED},${RED_DARK})`, boxShadow: `0 8px 28px ${RED}44` }}>
//             Become a Partner →
//           </motion.button>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// ═══════════════════════════════════════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ESGPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <div className="h-16 sm:h-20">
        <HeroSection />
        <ESGSDGSection />
        <EcosystemSection />
        <TechnologyShowcase />
        <ImpactMetricsSection />
        {/* <PartnershipSection /> */}
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}