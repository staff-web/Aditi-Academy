import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router';
import {
  ArrowRight, Star, Clock, CheckCircle, Users, Award,
  Target, Shield, ChevronRight, BookOpen, PlayCircle, Briefcase,
  Filter, Search, X, ChevronDown, GraduationCap, Zap, TrendingUp,
} from 'lucide-react';

import {
  certificationCategories,
  certificationStats,
  certificationFaqs,
  type CertificationCategory,
} from '../data/certifications-data';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
const mascot = new URL("../../assets/image.png", import.meta.url).href;

// ─── Brand ────────────────────────────────────────────────────────────────────
const BRAND = '#dc2626';

// ─── Reusable primitives ─────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className="block w-8 h-px bg-red-600" />
      <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">{children}</span>
      <span className="block w-8 h-px bg-red-600" />
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: { y: 50, x: 0 }, down: { y: -50, x: 0 }, left: { y: 0, x: 50 }, right: { y: 0, x: -50 } };
  const { y, x } = dirs[direction];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Real image shield ────────────────────────────────────────────────────────

function RealShieldImage({ size = 200 }: { size?: number }) {
  return (
    <>
      <style>{`
        @keyframes shieldFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      <img
        src={mascot}
        alt="Certification Shield"
        width={size}
        height={size}
        className="object-contain"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.4)) drop-shadow(0 0 40px rgba(220,38,38,0.2))',
          animation: 'shieldFloat 4s ease-in-out infinite',
          width: size,
          height: size,
        }}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/200x200/dc2626/ffffff?text=SHIELD';
        }}
      />
    </>
  );
}

// ─── Orbital ring canvas ──────────────────────────────────────────────────────

function OrbitalRing({
  radius = 120,
  speed = 1,
  offset = 0,
  tilt = 0,
  color = '#dc2626',
  canvasSize = { width: 400, height: 250 }
}: {
  radius?: number;
  speed?: number;
  offset?: number;
  tilt?: number;
  color?: string;
  canvasSize?: { width: number; height: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = offset;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012 * speed;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((tilt * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.27, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}40`;
      ctx.lineWidth = 2;
      ctx.stroke();
      const dx = Math.cos(t) * radius;
      const dy = Math.sin(t) * radius * 0.27;
      const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 8);
      dg.addColorStop(0, color);
      dg.addColorStop(1, 'rgba(220,38,38,0)');
      ctx.beginPath();
      ctx.arc(dx, dy, 7, 0, Math.PI * 2);
      ctx.fillStyle = dg;
      ctx.fill();
      for (let i = 1; i <= 8; i++) {
        const tt = t - i * 0.18;
        const tx = Math.cos(tt) * radius;
        const ty = Math.sin(tt) * radius * 0.27;
        ctx.beginPath();
        ctx.arc(tx, ty, Math.max(1, 5 - i * 0.4), 0, Math.PI * 2);
        const alpha = Math.floor((1 - i / 8) * 100).toString(16).padStart(2, '0');
        ctx.fillStyle = `${color}${alpha}`;
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [radius, speed, offset, tilt, color]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    />
  );
}

// ─── Certification Card ───────────────────────────────────────────────────────

function CertificationCard({ cert, onClick }: { cert: CertificationCategory; onClick: (path: string) => void }) {
  const Icon = cert.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setRot({ x: -dy * 7, y: dx * 7 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{ perspective: '900px', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateX: rot.x, rotateY: rot.y, y: hovered ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-red-300 transition-shadow duration-300 text-left w-full"
        onClick={() => onClick(cert.path)}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
            transform: hovered ? 'translateX(350%)' : 'translateX(0)',
            transition: 'transform 0.7s ease',
            pointerEvents: 'none',
          }} />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ background: `${cert.color}dd`, color: '#fff', letterSpacing: '0.14em' }}>
              {cert.categoryLabel}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "'Courier New', monospace" }}>
              {cert.acronym}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{
              background: cert.level === 'Advanced' ? '#7f1d1d' : cert.level === 'Executive' ? '#1e1b4b' : cert.level === 'Foundation' ? '#14532d' : '#1c1917',
              color: cert.level === 'Advanced' ? '#fca5a5' : cert.level === 'Executive' ? '#c7d2fe' : cert.level === 'Foundation' ? '#86efac' : '#d6d3d1',
            }}>
              {cert.level}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${cert.color}15` }}>
              <Icon size={18} style={{ color: cert.color }} />
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2">{cert.name}</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{cert.description}</p>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock size={11} /> {cert.duration}</span>
            <span className="flex items-center gap-1">
              <Star size={11} fill="#f59e0b" stroke="none" className="text-yellow-500" />
              {cert.rating} <span className="text-gray-300">({cert.reviews})</span>
            </span>
            <span className="flex items-center gap-1"><BookOpen size={11} /> {cert.modules} modules</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 2).map(skill => (
              <span key={skill} className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{skill}</span>
            ))}
            {cert.skills.length > 2 && (
              <span className="text-[11px] text-gray-400">+{cert.skills.length - 2} more</span>
            )}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">From</div>
              {/* <div className="text-lg font-extrabold text-gray-900">${cert.price.toLocaleString()}</div> */}
            </div>
            <button
              onClick={() => onClick(cert.path)}
              className="flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
            >
              Learn More
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Filter data ──────────────────────────────────────────────────────────────

const FILTER_GROUPS = [
  {
    label: 'Category',
    items: [
      { id: 'all', name: 'All Certifications', count: null },
      { id: 'ethical-hacking', name: 'Ethical Hacking' },
      { id: 'pen-testing', name: 'Pen Testing' },
      { id: 'executive', name: 'Executive' },
      { id: 'cloud-security', name: 'Cloud Security' },
      { id: 'forensics', name: 'Forensics' },
      { id: 'network-security', name: 'Network Security' },
      { id: 'soc', name: 'SOC Analyst' },
      { id: 'devsecops', name: 'DevSecOps' },
    ],
  },
];

// ─── Vertical Filter Sidebar ──────────────────────────────────────────────────

function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
  certifications,
}: {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  totalCount: number;
  filteredCount: number;
  certifications: CertificationCategory[];
}) {
  // Count per category
  const countFor = (id: string) =>
    id === 'all'
      ? certifications.length
      : certifications.filter(c => c.category === id).length;

  return (
    <aside className="w-full lg:w-60 xl:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-28 space-y-4">

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search certifications…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-red-400 focus:outline-none transition-colors text-sm shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={13} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Filter panel */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <Filter size={13} className="text-red-600" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Filter</span>
            <span className="ml-auto text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {filteredCount}/{totalCount}
            </span>
          </div>

          {/* Category list */}
          <div className="p-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 pt-1 pb-2">
              Category
            </div>
            {FILTER_GROUPS[0].items.map(cat => {
              const isActive = cat.id === 'all' ? !selectedCategory : selectedCategory === cat.id;
              const count = countFor(cat.id);
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ x: 2 }}
                  onClick={() => onSelectCategory(cat.id === 'all' ? null : cat.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-150 mb-0.5
                    ${isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-xs font-medium">{cat.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Clear filters */}
        <AnimatePresence>
          {(selectedCategory || searchQuery) && (
            <motion.button
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              onClick={() => { onSelectCategory(null); onSearchChange(''); }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
            >
              <X size={12} /> Clear all filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-black pt-28 pb-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-red-950/40" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full filter blur-[160px] opacity-[0.12] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-red-500 rounded-full filter blur-[130px] opacity-[0.08] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden xl:block" style={{ width: 280, height: 300 }}>
        <div style={{ position: 'relative', width: 140, height: 154, margin: '0 auto' }}>
          <RealShieldImage size={200} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <OrbitalRing radius={120} speed={0.65} offset={0} tilt={18} />
          <OrbitalRing radius={120} speed={1.05} offset={2.1} tilt={-22} />
          <OrbitalRing radius={98} speed={1.45} offset={4.2} tilt={8} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal><SectionBadge>Certification Programs</SectionBadge></Reveal>
        <Reveal delay={0.15}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 max-w-3xl">
            Professional{' '}
            <GradientText>Certifications</GradientText>
            <br />That Define Careers
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed">
            Industry-recognized credentials trusted by 350,000+ security professionals. Validate your expertise and unlock your next opportunity.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#certifications-section"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 text-sm"
            >
              Explore Certifications <ArrowRight size={16} />
            </a>
            <a
              href="#why-certify"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm"
            >
              <PlayCircle size={16} /> Why Get Certified
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="flex flex-wrap gap-8">
            {certificationStats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Why Get Certified ────────────────────────────────────────────────────────

function WhyGetCertifiedSection() {
  const benefits = [
    { icon: Award, title: 'Industry Recognition', description: 'Globally accepted by the DoD, Fortune 500s, and government agencies across 140+ countries.' },
    { icon: TrendingUp, title: 'Higher Earning Potential', description: 'Certified professionals earn up to 25% more than non-certified peers in comparable roles.' },
    { icon: Users, title: 'Professional Network', description: 'Join a global community of 350,000+ certified security professionals and experts.' },
    { icon: Target, title: 'Skill Validation', description: 'Prove real-world skills with rigorous, lab-driven exams that employers genuinely trust.' },
  ];

  return (
    <section id="why-certify" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <SectionBadge>Why Get Certified</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            Benefits of <GradientText>Certification</GradientText>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} className="text-red-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Frequently Asked <GradientText>Questions</GradientText>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {certificationFaqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors text-sm"
                >
                  <span>{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 90 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronRight size={18} className="text-gray-400 flex-shrink-0 ml-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="border-t border-gray-100"
                    >
                      <p className="px-6 py-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABannerSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-red-700" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-full opacity-10">
        <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse at right, white, transparent 70%)' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-5">
            <Shield size={16} className="text-red-200" />
            <span className="text-red-200 text-xs font-bold tracking-[0.18em] uppercase">Start Your Journey</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ready to Get Certified?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 350,000+ professionals who have advanced their careers with our world-class certifications.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-red-700 font-bold rounded-xl hover:shadow-xl hover:shadow-black/20 transition-all text-sm"
            >
              Contact an Advisor
            </Link>
            <Link
              to="/programs"
              className="px-8 py-3.5 bg-white/15 backdrop-blur border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition-all text-sm"
            >
              View All Programs
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [searchQuery, setSearchQuery] = useState('');
  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = certificationCategories.filter(cert => {
    if (selectedCategory && cert.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cert.name.toLowerCase().includes(q) ||
        cert.description.toLowerCase().includes(q) ||
        cert.longDescription.toLowerCase().includes(q) ||
        cert.acronym.toLowerCase().includes(q)
      );
    }
    return true;
  });

  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
    if (category) {
      setTimeout(() => {
        document.getElementById('certifications-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />

      {/* ── Certifications section: sidebar left + grid right ── */}
      <section id="certifications-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Explore Our <GradientText>Certifications</GradientText>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Choose the certification that aligns with your career goals
            </p>
          </Reveal>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Filter size={15} className="text-red-600" />
                Filter &amp; Search
                {(selectedCategory || searchQuery) && (
                  <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full">Active</span>
                )}
              </div>
              <ChevronDown size={15} className={`text-gray-400 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {mobileFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3">
                    <FilterSidebar
                      selectedCategory={selectedCategory}
                      onSelectCategory={(id) => { setSelectedCategory(id); setMobileFilterOpen(false); }}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      totalCount={certificationCategories.length}
                      filteredCount={filtered.length}
                      certifications={certificationCategories}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-6 lg:gap-8 items-start">

            {/* LEFT — Vertical Filter Sidebar (desktop only) */}
            <div className="hidden lg:block">
              <Reveal direction="right">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalCount={certificationCategories.length}
                  filteredCount={filtered.length}
                  certifications={certificationCategories}
                />
              </Reveal>
            </div>

            {/* RIGHT — Cards grid */}
            <div className="flex-1 min-w-0">
              {/* Result count */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-gray-400 font-medium">
                  Showing <span className="text-gray-700 font-bold">{filtered.length}</span> of{' '}
                  <span className="text-gray-700 font-bold">{certificationCategories.length}</span> certifications
                  {selectedCategory && (
                    <span className="ml-2 text-red-600 font-semibold">
                      · {FILTER_GROUPS[0].items.find(i => i.id === selectedCategory)?.name}
                    </span>
                  )}
                </p>
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X size={11} /> Clear
                  </button>
                )}
              </div>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((cert, i) => (
                    <Reveal key={cert.id} delay={i * 0.04}>
                      <CertificationCard cert={cert} onClick={() => navigate(cert.path)} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search size={30} className="text-gray-300" />
                  </div>
                  <h3 className="text-base font-bold text-gray-700 mb-2">No certifications found</h3>
                  <p className="text-gray-400 text-sm mb-5">Try adjusting your search or filter</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                    className="px-5 py-2 text-red-600 font-semibold text-sm hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <WhyGetCertifiedSection />
      <FAQSection />

      <CTASection />
      <Footer />
    </div>
  );
}