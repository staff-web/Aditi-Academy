import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  ChevronDown, Globe, Users, Award, Leaf, Heart, Shield,
  CheckCircle, Sparkles, TrendingUp, Target, BarChart3,
  Building2, GraduationCap, Code, Brain, Cloud, Network,
  Database, Cpu, Server, Wind, Trees, Sun, Droplets, Star,

} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// BRAND COLORS
// ─────────────────────────────────────────────────────────────────────────────
const BRAND = '#dc2626';

// Images
const IMGS = {
  hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80',
  digitalTransformation: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
  techEducation: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  kidsCoding: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
  womenInTech: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
  healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  sustainability: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
  globalPartners: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
  aiTechnology: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  cybersecurity: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
  cloudComputing: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
  dataAnalytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  teamwork: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
  innovation: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80',
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION COMPONENTS (from your existing pages)
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  const { y, x } = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxScroll({ children, speed = 0.02, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], direction === 'up' ? [60, -60] : [-60, 60]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function TiltCard({ children, intensity = 8, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

function HoverCard({ children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      style={{
        borderRadius: 24,
        border: `1px solid ${isHovered ? BRAND + '30' : '#e5e7eb'}`,
        background: '#fff',
        boxShadow: isHovered
          ? `0 20px 40px -12px rgba(0,0,0,0.15), 0 0 0 1px ${BRAND}10`
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="block w-8 h-px bg-red-600" />
      <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">{children}</span>
      <span className="block w-8 h-px bg-red-600" />
    </div>
  );
}

function GradientText({ children }) {
  return (
    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM TECH SCANNING BACKGROUND (DARK HERO ONLY)
// ─────────────────────────────────────────────────────────────────────────────

function TechScanningBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Horizontal scan lines */}
      <motion.div
        initial={{ x: '-5%', opacity: 0 }}
        animate={{
          x: mounted ? '105%' : '-5%',
          opacity: mounted ? [0, 1, 1, 0.5, 0] : 0,
        }}
        transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-2 h-full pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(220, 38, 38, 0.2) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.2) 80%, transparent 100%)',
          filter: 'blur(3px)',
          boxShadow: '0 0 60px 25px rgba(220, 38, 38, 0.7), 0 0 100px 50px rgba(220, 38, 38, 0.3)',
        }}
      />

      <motion.div
        initial={{ y: '-5%', opacity: 0 }}
        animate={{ y: mounted ? '105%' : '-5%', opacity: mounted ? [0, 1, 1, 0.6, 0] : 0 }}
        transition={{ duration: 3.5, delay: 1, repeat: Infinity, repeatDelay: 5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full h-2 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.3) 25%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.3) 75%, transparent 100%)',
          filter: 'blur(2px)',
          boxShadow: '0 0 80px 30px rgba(220, 38, 38, 0.8), 0 0 120px 60px rgba(220, 38, 38, 0.4)',
        }}
      />

      {/* Corner brackets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute top-8 left-8 pointer-events-none z-40"
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <motion.path
            d="M 50,0 L 0,0 L 0,50"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
          <motion.path
            d="M 30,5 L 5,5 L 5,30"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.5 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
        className="absolute top-8 right-8 pointer-events-none z-40"
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <motion.path
            d="M 90,0 L 140,0 L 140,50"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          />
          <motion.path
            d="M 110,5 L 135,5 L 135,30"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.7 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.9 }}
        className="absolute bottom-8 left-8 pointer-events-none z-40"
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <motion.path
            d="M 50,140 L 0,140 L 0,90"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.4 }}
          />
          <motion.path
            d="M 30,135 L 5,135 L 5,110"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.9 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.1 }}
        className="absolute bottom-8 right-8 pointer-events-none z-40"
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <motion.path
            d="M 90,140 L 140,140 L 140,90"
            stroke="rgba(220, 38, 38, 0.8)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2.6 }}
          />
          <motion.path
            d="M 110,135 L 135,135 L 135,110"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 3.1 }}
          />
        </svg>
      </motion.div>

      {/* Scanning rectangle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 0.6, 0.6, 0.4], scale: [0.85, 1.05, 1, 1] }}
        transition={{ duration: 2.5, delay: 3, times: [0, 0.2, 0.5, 1] }}
        className="absolute left-[15%] top-[35%] w-96 h-64 border-2 border-red-600/60 pointer-events-none z-35"
        style={{ boxShadow: 'inset 0 0 60px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.35)' }}
      >
        <motion.div
          className="absolute -top-2 -left-2 w-10 h-10 border-t-[5px] border-l-[5px] border-red-500"
          animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 4 }}
        />
        <motion.div
          className="absolute -top-2 -right-2 w-10 h-10 border-t-[5px] border-r-[5px] border-red-500"
          animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-10 h-10 border-b-[5px] border-l-[5px] border-red-500"
          animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.4 }}
        />
        <motion.div
          className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[5px] border-r-[5px] border-red-500"
          animate={{ borderColor: ['rgba(220,38,38,1)', 'rgba(220,38,38,0.5)', 'rgba(220,38,38,1)'], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.6 }}
        />
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
      </motion.div>

      {/* Glow orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] pointer-events-none z-5"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION (DARK MODE)
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <img src={IMGS.hero} alt="Technology Background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>

      {/* Tech scanning overlay */}
      <div className="absolute inset-0 z-0">
        <TechScanningBackground />
      </div>

      {/* Animated tech particles */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-32" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal delay={0.2}>
              <SectionLabel>ESG & SDG in Practice</SectionLabel>
            </Reveal>
            <Reveal delay={0.3} direction="right">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Driving Sustainable Impact Through <GradientText>Technology</GradientText>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our integrated ecosystem empowers communities, businesses, and governments to achieve measurable progress on the UN Sustainable Development Goals through human-centered technology innovation.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40"
                >
                  Explore Our Ecosystem
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Partner With Us
                </motion.button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4} direction="left">
            <div className="relative h-[500px]">
              <TiltCard intensity={6} className="absolute top-0 left-0 w-[70%] h-[60%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img src={IMGS.techEducation} alt="Technology Education" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </TiltCard>
              <TiltCard intensity={6} className="absolute bottom-0 right-0 w-[65%] h-[55%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img src={IMGS.sustainability} alt="Sustainability" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>

        {/* Stats row */}
        <Reveal delay={0.7}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-8 border-t border-red-800/30">
            {[
              { value: '10+', label: 'Countries' },
              { value: '27.1K+', label: 'Lives Touched' },
              { value: '100%', label: 'MoEYS Aligned' },
              { value: '30%', label: 'Carbon Reduction' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ESG & SDG SECTION (LIGHT MODE)
// ─────────────────────────────────────────────────────────────────────────────

function ESGSDGSection() {
  const esgPillars = [
    {
      title: 'Environmental',
      icon: Leaf,
      image: IMGS.sustainability,
      items: [
        'Digital transformation & cyber resiliency in 10+ countries',
        'Technology driving lower carbon emissions through AI health',
        'Paperless workflows, cloud efficiency, greener operations',
        'Track energy per user, optimize models, prefer low-carbon infrastructure',
      ]
    },
    {
      title: 'Social',
      icon: Heart,
      image: IMGS.womenInTech,
      items: [
        '6,000+ girls trained in technology & leadership',
        '10,000+ children introduced to coding & AI',
        'Thousands of SMEs & government officers upskilled',
        'Inclusive technology education for all',
      ]
    },
    {
      title: 'Governance',
      icon: Shield,
      image: IMGS.cybersecurity,
      items: [
        'Advocacy on AI ethics & responsible tech adoption across ASEAN',
        'AI Governance-by-Design: Bias testing, human oversight',
        'Privacy-by-Design: Consent, minimization, strong security',
        'Transparent Reporting: Impact, safety, reliability metrics',
      ]
    },
  ];

  const sdgGoals = [
    { number: 4, name: 'Quality Education', description: 'Accessible, high-quality tech education', image: IMGS.techEducation },
    { number: 5, name: 'Gender Equality', description: 'Empowering women and girls in tech', image: IMGS.womenInTech },
    { number: 8, name: 'Decent Work', description: 'Sustainable employment through skills', image: IMGS.teamwork },
    { number: 9, name: 'Industry Innovation', description: 'Driving technological advancement', image: IMGS.innovation },
    { number: 17, name: 'Partnerships', description: 'Building collaborative ecosystems', image: IMGS.globalPartners },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Our Foundation</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            ESG Commitment & <GradientText>SDG Alignment</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            At ADITI Academy, ESG is not just a framework—it's the foundation of everything we do, aligned with the UN Sustainable Development Goals.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ESG Column */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-10 bg-red-600 rounded-full" />
              ESG Pillars
            </h3>

            <div className="space-y-6">
              {esgPillars.map((pillar, idx) => (
                <ParallaxScroll key={pillar.title} direction={idx % 2 === 0 ? 'up' : 'down'}>
                  <Reveal delay={idx * 0.1}>
                    <TiltCard>
                      <HoverCard>
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                          <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                          <div className="absolute top-6 left-6">
                            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                              <pillar.icon size={24} className="text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h4>
                          <ul className="space-y-2">
                            {pillar.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                <CheckCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </HoverCard>
                    </TiltCard>
                  </Reveal>
                </ParallaxScroll>
              ))}
            </div>
          </div>

          {/* SDG Column */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-10 bg-blue-600 rounded-full" />
              SDG Alignment
            </h3>

            <div className="space-y-4">
              {sdgGoals.map((goal, idx) => (
                <ParallaxScroll key={goal.number} direction={idx % 2 === 0 ? 'up' : 'down'}>
                  <Reveal delay={idx * 0.1}>
                    <TiltCard>
                      <HoverCard>
                        <div className="flex gap-4 p-5">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                            <img src={goal.image} alt={goal.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">{goal.number}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{goal.name}</h4>
                            <p className="text-gray-600 text-sm">{goal.description}</p>
                          </div>
                        </div>
                      </HoverCard>
                    </TiltCard>
                  </Reveal>
                </ParallaxScroll>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Competitive Advantage</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">ESG Turns Responsibility Into Market Power</h3>
            <p className="text-red-100 max-w-2xl mx-auto">
              Our commitment drives innovation, attracts top talent, builds trust with partners, and creates long-term sustainable value.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ECOSYSTEM PILLARS (LIGHT MODE)
// ─────────────────────────────────────────────────────────────────────────────

function EcosystemSection() {
  const pillars = [
    {
      name: 'ADITI',
      icon: Cpu,
      description: 'Sustainable digital transformation, software solutions, global software engineer outsourcing',
      countries: 'Cambodia, Singapore, Japan, EU',
      impact: 'Carbon-aware coding, ethical hiring, 40% women in engineering',
      image: IMGS.digitalTransformation,
    },
    {
      name: 'ADITI Academy',
      icon: GraduationCap,
      description: 'Upskilling IT students, professors, SMEs, government staff, women leaders',
      stats: '1,500+ students | 600+ professionals | 500+ government officers',
      impact: 'Industry-aligned curriculum, career support, certification programs',
      image: IMGS.techEducation,
    },
    {
      name: 'Tech For Kids Academy',
      icon: Code,
      description: '10,000+ children learning coding, AI, and entrepreneurship',
      stats: 'Ages 8-16 | 65% from underserved communities',
      impact: 'Building future innovators, digital literacy for next generation',
      image: IMGS.kidsCoding,
    },
    {
      name: 'Technovation Girls Cambodia',
      icon: Users,
      description: '6,000 girls trained in tech, leadership, and entrepreneurship',
      stats: '6,000+ girls | 200+ mentors | Inspiring millions globally',
      impact: 'Gender equality in tech, SDG-focused problem solving',
      image: IMGS.womenInTech,
    },
    {
      name: 'Nironcare',
      icon: Heart,
      description: 'Groundbreaking AI-powered digital health',
      impact: 'Reduces emissions, ensures inclusivity, expands healthcare access, safeguards data privacy',
      image: IMGS.healthcare,
    },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Our Ecosystem</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            5 Pillars of <GradientText>Sustainable Impact</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            ADITI Academy operates through five interconnected pillars driving sustainable impact across education, technology, and social development.
          </p>
        </Reveal>

        <div className="space-y-8">
          {pillars.map((pillar, index) => (
            <ParallaxScroll key={pillar.name}>
              <Reveal delay={index * 0.1}>
                <TiltCard>
                  <HoverCard>
                    <div className="grid md:grid-cols-2">
                      <div className="p-8">
                        <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center mb-6 shadow-lg">
                          <pillar.icon size={28} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.name}</h3>
                        <p className="text-gray-600 text-lg mb-4">{pillar.description}</p>
                        {pillar.countries && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Globe size={14} />
                            <span>{pillar.countries}</span>
                          </div>
                        )}
                        {pillar.stats && (
                          <p className="text-sm font-semibold text-red-600 mb-3">{pillar.stats}</p>
                        )}
                        <div className="flex items-start gap-2 text-gray-600">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{pillar.impact}</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-auto overflow-hidden rounded-r-2xl">
                        <img
                          src={pillar.image}
                          alt={pillar.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
                      </div>
                    </div>
                  </HoverCard>
                </TiltCard>
              </Reveal>
            </ParallaxScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY SHOWCASE (LIGHT MODE)
// ─────────────────────────────────────────────────────────────────────────────

function TechnologyShowcase() {
  const technologies = [
    { name: 'Artificial Intelligence', icon: Brain, description: 'AI-powered healthcare, smart logistics, sustainable agriculture', image: IMGS.aiTechnology },
    { name: 'Cloud Computing', icon: Cloud, description: 'Cloud efficiency, reduced carbon footprint, scalable solutions', image: IMGS.cloudComputing },
    { name: 'Cybersecurity', icon: Shield, description: 'Digital transformation, cyber resiliency, data protection', image: IMGS.cybersecurity },
    { name: 'IoT & Smart Systems', icon: Network, description: 'Smart logistics, environmental monitoring, efficiency optimization', image: IMGS.innovation },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Technology Innovation</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Driving <GradientText>Green Technology</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            Our technology solutions are designed with sustainability at their core, reducing environmental impact while maximizing social benefit.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <ParallaxScroll key={tech.name} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.1}>
                <TiltCard intensity={5}>
                  <HoverCard className="overflow-hidden">
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img src={tech.image} alt={tech.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mb-3 shadow-lg">
                          <tech.icon size={20} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                  </HoverCard>
                </TiltCard>
              </Reveal>
            </ParallaxScroll>
          ))}
        </div>

        {/* Environmental Impact Stats */}
        <Reveal delay={0.3}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wind, value: '30%', label: 'Reduction in Carbon Emissions', image: IMGS.sustainability },
              { icon: Cloud, value: '25%', label: 'Cloud Efficiency Gains', image: IMGS.cloudComputing },
              { icon: Trees, value: '10+', label: 'Countries with Digital Transformation', image: IMGS.globalPartners },
            ].map((stat, i) => (
              <TiltCard key={stat.label}>
                <HoverCard>
                  <div className="relative h-32 overflow-hidden rounded-t-2xl">
                    <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" style={{ filter: 'brightness(0.7)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <stat.icon size={32} className="text-red-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                </HoverCard>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IMPACT METRICS (LIGHT MODE)
// ─────────────────────────────────────────────────────────────────────────────

function ImpactMetricsSection() {
  const metrics = [
    { value: 27100, suffix: '+', label: 'Total Lives Touched', icon: Users },
    { value: 6000, suffix: '+', label: 'Women/Girls in Tech', icon: Heart },
    { value: 10, suffix: 'K+', label: 'Children in Coding', icon: Code },
    { value: 4, suffix: '', label: 'Partner Countries', icon: Globe },
    { value: 2100, suffix: '+', label: 'Certifications Issued', icon: Award },
    { value: 800, suffix: '+', label: 'Corporate Training', icon: Building2 },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Measurable Impact</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Key Impact <GradientText>Metrics</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            Our ecosystem's measurable contributions to sustainable development.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <ParallaxScroll key={metric.label} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.08}>
                <TiltCard intensity={4}>
                  <HoverCard className="text-center p-8">
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <metric.icon size={32} className="text-red-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{metric.label}</p>
                  </HoverCard>
                </TiltCard>
              </Reveal>
            </ParallaxScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTNERSHIP (LIGHT MODE)
// ─────────────────────────────────────────────────────────────────────────────

function PartnershipSection() {
  const partners = [
    'Ministry of Education', 'Ministry of Industry', 'ACLEDA Bank',
    'Microsoft Cambodia', 'Google for Education', 'AWS Partner Network',
    'UNICEF', 'UNESCO', 'ASEAN Secretariat', 'World Bank'
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Collaboration</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Partnership <GradientText>Model</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            Collaborate with us to drive sustainable impact in your organization and community.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <ParallaxScroll direction="up">
            <Reveal direction="left">
              <TiltCard>
                <HoverCard>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">How to Collaborate</h3>
                    <div className="space-y-6">
                      {[
                        { step: '01', title: 'Funding & Sponsorship', desc: 'Support our programs through targeted funding or sponsorship opportunities.' },
                        { step: '02', title: 'Curriculum Co-Creation', desc: 'Partner to develop customized training programs that meet your industry needs.' },
                        { step: '03', title: 'Accreditation & Certification', desc: 'Joint certification programs with industry recognition.' },
                        { step: '04', title: 'Large-Scale Training', desc: 'Comprehensive upskilling programs for your workforce.' },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{item.step}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </HoverCard>
              </TiltCard>
            </Reveal>
          </ParallaxScroll>

          <ParallaxScroll direction="down">
            <Reveal direction="right">
              <TiltCard>
                <HoverCard>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Past & Current Partners</h3>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {partners.map((partner) => (
                        <div key={partner} className="bg-gray-50 p-3 rounded-lg text-center">
                          <span className="text-sm font-medium text-gray-700">{partner}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="flex-shrink-0" />
                          500+ government officials trained in digital governance
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="flex-shrink-0" />
                          15 corporate clients achieved 25% productivity gains
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="flex-shrink-0" />
                          200+ SMEs digitized through our ecosystem
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={14} className="flex-shrink-0" />
                          Regional expansion to 4 countries
                        </li>
                      </ul>
                    </div>
                  </div>
                </HoverCard>
              </TiltCard>
            </Reveal>
          </ParallaxScroll>
        </div>

        <Reveal className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all"
          >
            Become a Partner →
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <SectionLabel>
            <span className="text-red-200">Take Action</span>
          </SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join Our ESG Impact Journey
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto mb-10">
            Take action today to contribute to sustainable development through technology and education.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Join a Course
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 font-bold rounded-xl transition-all"
            >
              Partner With Us
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE NAVIGATION & FOOTER
// ─────────────────────────────────────────────────────────────────────────────




// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────

export default function ESGPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
     <Navigation />
      <div className="pt-20">
        <HeroSection />
        <ESGSDGSection />
        <EcosystemSection />
        <TechnologyShowcase />
        <ImpactMetricsSection />
        <PartnershipSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
