import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { useRef, useState, useEffect } from 'react';
import {
  Target, Zap, Award, TrendingUp, Users, CheckCircle,
  Trophy, GraduationCap, Star, ChevronDown,
  Globe, Cpu, Shield, Lightbulb, Heart, ThumbsUp,
} from 'lucide-react';

const BRAND = '#dc2626';
const BRAND_DARK = '#b91c1c';
const BRAND_LITE = '#ef4444';

// Technology-relevant images for IT Academy
const IMGS = {
  // Hero & main visuals
  heroMain: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
  codingClass: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  cybersecurity: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
  aiTech: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  cloudComputing: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
  
  // Section specific
  vision: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
  mission: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80',
  students: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  classroom: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
  techLab: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80',
  teamwork: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  milestones: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=900&q=80',
  stats: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80',
  cta: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80',
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION COMPONENTS (FULLY WORKING)
// ─────────────────────────────────────────────────────────────────────────────

// Reveal animation on scroll - elements fade in as you scroll
function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
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
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect - elements move at different speeds while scrolling
function ParallaxScroll({ children, speed = 0.02, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], direction === 'up' ? [60, -60] : [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.4]);
  
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Tilt card on hover - 3D effect
function TiltCard({ children, intensity = 8, className = '', style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200, ...style }}
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

// Hover card with lift effect
function HoverCard({ children, className = '', style = {} }) {
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
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

// Animated counter for numbers
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

// Section label with red lines
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="block w-8 h-px bg-red-600" />
      <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">{children}</span>
      <span className="block w-8 h-px bg-red-600" />
    </div>
  );
}

// Gradient text
function GradientText({ children }) {
  return (
    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  { value: 1500, suffix: '+', label: 'IT Students', Icon: GraduationCap },
  { value: 600, suffix: '+', label: 'IT Professionals', Icon: Trophy },
  { value: 500, suffix: '+', label: 'Gov. Officers', Icon: Star },
  { value: 600, suffix: '+', label: 'SMEs', Icon: TrendingUp },
  { value: 1000, suffix: '+', label: 'General Public', Icon: Users },
];

const CORE_VALUES = [
  { Icon: Lightbulb, title: 'Innovation', description: 'Pioneering cutting-edge curriculum at the frontier of technology.', image: IMGS.techLab },
  { Icon: Shield, title: 'Trustworthiness', description: 'Lasting relationships built through integrity and transparency.', image: IMGS.teamwork },
  { Icon: CheckCircle, title: 'Quality', description: 'World-class training aligned with international standards.', image: IMGS.classroom },
  { Icon: Heart, title: 'Humanity', description: 'Putting people first in everything we do and teach.', image: IMGS.students },
  { Icon: ThumbsUp, title: 'Gratitude', description: 'Appreciating every learner, partner, and mentor.', image: IMGS.teamwork },
];

const MILESTONES = [
  { year: '2018', title: 'Founded', description: 'ADITI Academy established in Phnom Penh with a bold vision for tech education.' },
  { year: '2019', title: 'First Cohort', description: 'Launched inaugural cybersecurity and cloud computing programs.' },
  { year: '2020', title: 'Expansion', description: 'Partnered with EC-Council, AWS, and Microsoft for certified training.' },
  { year: '2021', title: 'Gov. Partnership', description: 'Delivered specialized training to 500+ government officers nationwide.' },
  { year: '2022', title: 'MoEYS Accredited', description: 'Received official Ministry of Education, Youth and Sport recognition.' },
  { year: '2023', title: '4,200+ Trained', description: 'Crossed the milestone of 4,200+ trained individuals across all sectors.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
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
        <img src={IMGS.heroMain} alt="Technology Education" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>

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
              <SectionLabel>Who We Are</SectionLabel>
            </Reveal>
            <Reveal delay={0.3} direction="right">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Academy <GradientText>Overview</GradientText>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                We provide <span className="text-red-500 font-semibold">technology upskilling and industry training</span> that empowers students, professionals, SMEs, government organizations, and individuals.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our curriculums deliver the latest training to tech enthusiasts and engineers — courses that are{' '}
                <span className="text-red-500 font-semibold">current, relevant, and industry-aligned.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.4} direction="left">
            <div className="relative h-[500px]">
              <TiltCard intensity={6} className="absolute top-0 left-0 w-[70%] h-[60%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img src={IMGS.codingClass} alt="Students coding" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </TiltCard>
              <TiltCard intensity={6} className="absolute bottom-0 right-0 w-[65%] h-[55%]">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img src={IMGS.cybersecurity} alt="Cybersecurity" className="w-full h-full object-cover" />
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
              { value: '4,200+', label: 'Total Graduates' },
              { value: '6+', label: 'Years Operating' },
              { value: '50+', label: 'Expert Instructors' },
              { value: '10+', label: 'Certifications' },
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
// VISION & MISSION SECTION
// ─────────────────────────────────────────────────────────────────────────────

function VisionMissionSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Our Direction</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Vision & <GradientText>Mission</GradientText>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <ParallaxScroll direction="up">
            <TiltCard>
              <HoverCard>
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img src={IMGS.vision} alt="Vision" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                      <Globe size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To be the advanced Tech Institute that produces{' '}
                    <span className="text-red-600 font-semibold">front-running talents</span> in technology in{' '}
                    <span className="text-red-600 font-semibold">ASIA.</span>
                  </p>
                </div>
              </HoverCard>
            </TiltCard>
          </ParallaxScroll>

          {/* Mission Card */}
          <ParallaxScroll direction="down">
            <TiltCard>
              <HoverCard>
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img src={IMGS.mission} alt="Mission" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                      <Target size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To train tech talents to meet industrial skills demands and contribute to the{' '}
                    <span className="text-red-600 font-semibold">2030 middle income status</span> of Cambodia through the{' '}
                    <span className="text-red-600 font-semibold">technology sector.</span>
                  </p>
                </div>
              </HoverCard>
            </TiltCard>
          </ParallaxScroll>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE VALUES SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CoreValuesSection() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Core Values</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Our <GradientText>Foundation</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Five pillars that define how we educate, collaborate, and grow together.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CORE_VALUES.map((value, index) => (
            <ParallaxScroll key={value.title} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.1}>
                <TiltCard intensity={4}>
                  <HoverCard className="text-center p-6">
                    <div className="relative w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden">
                      <img src={value.image} alt={value.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                        <value.Icon size={28} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
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
// MILESTONES SECTION
// ─────────────────────────────────────────────────────────────────────────────

function MilestonesSection() {
  return (
    <section className="py-28 bg-white relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img src={IMGS.milestones} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Milestones</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Our <GradientText>Journey</GradientText>
          </h2>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {MILESTONES.map((milestone, index) => (
            <ParallaxScroll key={milestone.year} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.1} direction="left">
                <div className="flex gap-6 pb-8 group">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-red-600 font-mono text-sm font-bold bg-red-50 px-3 py-1 rounded-full">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-6 border-l-2 border-red-200 pl-6 ml-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-500">{milestone.description}</p>
                  </div>
                </div>
              </Reveal>
            </ParallaxScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function AchievementsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Notable Achievements</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Our <GradientText>Impact</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Numbers that reflect our commitment to building Cambodia's technology workforce.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <ParallaxScroll key={achievement.label} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.1}>
                <TiltCard intensity={4}>
                  <HoverCard className="text-center p-8">
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <achievement.Icon size={32} className="text-red-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900">
                      {inView ? <AnimatedCounter value={achievement.value} suffix={achievement.suffix} /> : `0${achievement.suffix}`}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{achievement.label}</p>
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
// TECHNOLOGY SHOWCASE SECTION (NEW - adds relevant tech imagery)
// ─────────────────────────────────────────────────────────────────────────────

function TechnologyShowcase() {
  const techImages = [
    { src: IMGS.aiTech, title: 'Artificial Intelligence', description: 'Cutting-edge AI and Machine Learning programs' },
    { src: IMGS.cybersecurity, title: 'Cybersecurity', description: 'Advanced security training and ethical hacking' },
    { src: IMGS.cloudComputing, title: 'Cloud Computing', description: 'AWS, Azure, and cloud architecture' },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Our Technology Focus</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Cutting-Edge <GradientText>Technologies</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We train on the latest technologies to ensure our students are industry-ready.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {techImages.map((tech, index) => (
            <ParallaxScroll key={tech.title} direction={index % 2 === 0 ? 'up' : 'down'}>
              <Reveal delay={index * 0.15}>
                <TiltCard intensity={5}>
                  <HoverCard className="overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img src={tech.src} alt={tech.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{tech.title}</h3>
                        <p className="text-gray-200 text-sm">{tech.description}</p>
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
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <VisionMissionSection />
      <CoreValuesSection />
      <TechnologyShowcase />
      <MilestonesSection />
      <AchievementsSection />
      <CTASection imageUrl={IMGS.cta} />
      <Footer />
    </div>
  );
}