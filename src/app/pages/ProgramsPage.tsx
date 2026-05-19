import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  GraduationCap, Building2, Globe, Award, CheckCircle, Sparkles, Rocket,
  Shield, Brain, Star, ChevronDown, ArrowRight, Trophy, Clock,
  X, PlayCircle, Layers, Cpu, Database, Lock, LineChart, Users, Target, 
  Hand, Briefcase, Landmark, Zap, TrendingUp, BookOpen, Video, 
  BarChart3, Calendar, CheckSquare, DollarSign, Headphones, FileText,
  BriefcaseBusiness, School, Bank, ChartBar, ClipboardList, UserCheck,
  Clock as ClockIcon, ThumbsUp, MessageCircle, Phone, Mail, MapPin
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';

// ─────────────────────────────────────────────────────────────────────────────
// BRAND SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
const BRAND      = '#dc2626';
const BRAND_DARK = '#b91c1c';
const BRAND_LITE = '#ef4444';

const IMGS = {
  hero:           'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80',
  individual:     'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
  corporate:      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
  government:     'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=80',
  ai:             'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  security:       'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
  training:       'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=600&q=80',
  global:         'https://images.unsplash.com/photo-1621977717126-e29965156a27?w=900&q=80',
  internship:     'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=900&q=80',
  career:         'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=900&q=80',
  careerBoost1:   'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
  careerBoost2:   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  careerBoost3:   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  corporateHero:  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
  corporateOffice:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  corporateTeam:  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  govHero:        'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1600&q=80',
  govMeeting:     'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80',
  govPartners:    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
};

const CATEGORIES = [
  { id: 'all',        name: 'All Courses',   icon: Layers,    color: BRAND },
  { id: 'software',   name: 'Software Dev',  icon: Cpu,       color: '#3b82f6' },
  { id: 'ai',         name: 'AI & ML',       icon: Brain,     color: '#8b5cf6' },
  { id: 'security',   name: 'Cybersecurity', icon: Shield,    color: '#ef4444' },
  { id: 'networking', name: 'Networking',    icon: Database,  color: '#06b6d4' },
  { id: 'pmp',        name: 'PMP',           icon: Trophy,    color: '#f59e0b' },
];

const COURSES = [
  { id: 1, category: 'ai',        title: 'Artificial Intelligence & Machine Learning', level: 'Advanced',    duration: '12 weeks', students: '2,400+', rating: 4.9, description: 'Master AI and ML fundamentals, neural networks, deep learning, and real-world applications to build production-ready intelligent systems.', outcomes: ['Build production AI models', 'Deploy ML pipelines', 'Master deep learning algorithms', 'Industry certification recognized globally'], img: IMGS.ai,       price: '$1,299', color: '#8b5cf6' },
  { id: 2, category: 'security',  title: 'Advanced Cybersecurity',                    level: 'Intermediate', duration: '10 weeks', students: '3,200+', rating: 4.8, description: 'Comprehensive cybersecurity training covering ethical hacking, penetration testing, and defense strategies for enterprise security.',          outcomes: ['EC-Council certification', 'Conduct security audits', 'Build defense systems', 'Career advancement opportunities'], img: IMGS.security, price: '$1,099', color: '#ef4444' },
  { id: 3, category: 'networking',title: 'Network Engineering & Infrastructure',       level: 'Intermediate', duration: '8 weeks',  students: '2,800+', rating: 4.7, description: 'Learn network design, configuration, troubleshooting, and infrastructure management for enterprise environments.',                            outcomes: ['Cisco certification path', 'Design network architectures', 'Troubleshoot complex issues', 'High-demand networking skills'], img: IMGS.training, price: '$999',  color: '#06b6d4' },
  { id: 4, category: 'software',  title: 'Full Stack Web Development',                level: 'Beginner',     duration: '14 weeks', students: '4,100+', rating: 4.9, description: 'Build modern web applications with React, Node.js, databases, and deployment strategies from scratch to production.',                            outcomes: ['Launch full-stack apps', 'Master modern frameworks', 'Build professional portfolio', 'Job-ready development skills'], img: IMGS.training, price: '$899',  color: '#3b82f6' },
  { id: 5, category: 'ai',        title: 'Data Science & Analytics',                  level: 'Advanced',     duration: '12 weeks', students: '1,900+', rating: 4.8, description: 'Transform data into insights with Python, machine learning, visualization, and statistical analysis for business intelligence.',                  outcomes: ['Analyze complex datasets', 'Build predictive models', 'Data storytelling mastery', 'Real industry projects'], img: IMGS.ai,       price: '$1,199', color: '#8b5cf6' },
  { id: 6, category: 'pmp',       title: 'Project Management Professional (PMP)',     level: 'Professional', duration: '6 weeks',  students: '2,600+', rating: 4.7, description: 'Earn PMP certification with comprehensive training in Agile, Scrum, risk management, and leadership skills.',                                     outcomes: ['PMP certification exam prep', 'Lead projects effectively', 'Increase salary potential', 'Global PMI recognition'], img: IMGS.corporate,price: '$799',  color: '#f59e0b' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };
  
  const { y, x } = directions[direction] || directions.up;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function ParallaxScroll({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-red-400' : 'text-red-600'}`}>{children}</span>
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
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

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(value / 60);
    const timer = setInterval(() => {
      n += step;
      if (n >= value) { setCount(value); clearInterval(timer); }
      else setCount(n);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────────────────────

function CourseModal({ course, onClose, onRegister }) {
  if (!course) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-[740px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl relative shadow-2xl"
        >
          <div className="relative h-72">
            <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <X size={18} />
            </button>
            <div className="absolute bottom-4 left-6">
              <span className="px-4 py-1.5 rounded-full text-white text-xs font-bold" style={{ background: course.color }}>{course.level}</span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-3">
              <Star size={16} fill="#f59e0b" stroke="none" />
              <span className="font-bold text-gray-900">{course.rating}</span>
              <span className="text-gray-400">· {course.students} enrolled · {course.duration}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
            <h3 className="font-bold text-gray-900 mb-3">What you'll learn</h3>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {course.outcomes.map(o => (
                <div key={o} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <CheckCircle size={14} color={course.color} />
                  <span className="text-sm text-gray-700">{o}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-5 rounded-2xl bg-red-50 border-2 border-red-200">
              <div>
                <div className="text-2xl font-bold text-red-600">{course.price}</div>
                <div className="text-xs text-gray-500">One-time payment</div>
              </div>
              <motion.button onClick={onRegister} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg">
                Register Now →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 14, outline: 'none', background: '#fafafa' };

function RegModal({ show, onClose, course }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-3xl p-8 relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={14} />
          </button>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Register for <GradientText>Course</GradientText></h3>
          {course && <p className="text-sm text-gray-500 mb-6">{course.title}</p>}
          <div className="flex flex-col gap-3">
            {['Your Name *', 'Email Address *', 'Phone Number *', 'Company / Organization (Optional)'].map(ph => (
              <input key={ph} type="text" placeholder={ph} style={inputStyle} />
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { alert('Registration submitted! Our team will contact you.'); onClose(); }}
              className="py-4 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg mt-2">
              Complete Registration
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function QuoteModal({ show, onClose }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-3xl p-8 relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={14} />
          </button>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Get a <GradientText>Quote</GradientText></h3>
          <p className="text-sm text-gray-500 mb-6">Corporate training solutions tailored to your organization</p>
          <div className="flex flex-col gap-3">
            {['Your Name *', 'Company / Organization *', 'Phone Number *', 'Email Address *'].map(ph => (
              <input key={ph} type="text" placeholder={ph} style={inputStyle} />
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { alert('Quote request submitted!'); onClose(); }}
              className="py-4 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg mt-2">
              Submit Request
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PartnerModal({ show, onClose }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-3xl p-8 relative shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={14} />
          </button>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Request <GradientText>Partnership</GradientText></h3>
          <p className="text-sm text-gray-500 mb-6">Government and university collaboration opportunities</p>
          <div className="flex flex-col gap-3">
            {['Your Name *', 'Organization / Institution *', 'Email Address *', 'Phone Number *'].map(ph => (
              <input key={ph} type="text" placeholder={ph} style={inputStyle} />
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { alert('Partnership request submitted!'); onClose(); }}
              className="py-4 rounded-xl bg-red-600 text-white font-bold cursor-pointer shadow-lg mt-2">
              Submit Partnership Request
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection({ onExplore }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <img src={IMGS.hero} alt="Technology Training" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>

      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: heroY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Eyebrow dark={true}>Technology Training Programs</Eyebrow>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Empower Your Future<br />
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">with Professional IT</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Industry-aligned courses designed for students, professionals, and organizations worldwide
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          className="flex gap-4 justify-center flex-wrap">
          <motion.button onClick={onExplore} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-lg shadow-red-900/40 flex items-center gap-2 transition-all">
            Explore Programs <ArrowRight size={18} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold cursor-pointer flex items-center gap-2 transition-all">
            <PlayCircle size={18} /> Watch Overview
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="flex justify-center gap-8 mt-16 pt-8 border-t border-red-800/30 max-w-lg mx-auto">
          {[
            { value: '12,000+', label: 'Students Trained' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '50+', label: 'Expert Instructors' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-red-500 z-10">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUDIENCE SECTION — "WHO ARE YOU"
// ─────────────────────────────────────────────────────────────────────────────

function AudienceCard({ tab, activeTab, setActiveTab, img, badge, title, desc, cta, icon: Icon, delay }) {
  const active = activeTab === tab;
  
  return (
    <ParallaxScroll>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        onClick={() => setActiveTab(tab)}
        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
          active ? 'ring-2 ring-red-500 shadow-xl shadow-red-500/20' : 'hover:shadow-lg hover:border-red-200'
        }`}
        style={{ background: '#fff', border: `1px solid ${active ? BRAND : '#e5e7eb'}` }}
      >
        {/* Top highlight bar for active */}
        {active && <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />}

        <div className="relative h-48 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-bold">
            {badge}
          </div>
          
          {active && (
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
              <CheckCircle size={16} color="#fff" />
            </div>
          )}
          
          <div className="absolute bottom-4 left-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${active ? 'bg-red-600' : 'bg-white/20 backdrop-blur'}`}>
              <Icon size={22} color="#fff" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${active ? 'text-red-600' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
          
          <div className={`flex items-center gap-2 text-sm font-semibold ${active ? 'text-red-600' : 'text-gray-500'}`}>
            <span>{cta}</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </ParallaxScroll>
  );
}

function WhoAreYouSection({ activeTab, setActiveTab }) {
  const audiences = [
    { tab: 'individual', badge: 'B2C', title: 'Individual Students', desc: 'Enroll in short courses to gain foundational IT skills and a clear career support pathway.', cta: 'Explore Courses', icon: GraduationCap, img: IMGS.individual, delay: 0 },
    { tab: 'corporate', badge: 'B2B', title: 'Corporate Clients', desc: 'Secure customized training to close specific team skill gaps with high-value contracts.', cta: 'Get Enterprise Quote', icon: Briefcase, img: IMGS.corporate, delay: 0.1 },
    { tab: 'government', badge: 'B2G', title: 'Government & Universities', desc: 'Seek cooperation and partnership for large-scale training initiatives and accreditation linkage.', cta: 'Request Partnership', icon: Landmark, img: IMGS.government, delay: 0.2 },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <Eyebrow>Choose Your Path</Eyebrow>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Who Are <GradientText>You?</GradientText>
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Select your training pathway to discover tailored programs
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((audience) => (
            <AudienceCard
              key={audience.tab}
              tab={audience.tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              img={audience.img}
              badge={audience.badge}
              title={audience.title}
              desc={audience.desc}
              cta={audience.cta}
              icon={audience.icon}
              delay={audience.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE BROWSER (Individual Tab)
// ─────────────────────────────────────────────────────────────────────────────

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const active = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              active 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon size={14} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}

function CourseCard({ course, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${
        isHovered ? 'border-red-300 shadow-xl shadow-red-500/10' : 'border-gray-100 shadow-md'
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
          <img src={course.img} alt={course.title} className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-white text-xs font-bold" style={{ background: course.color }}>
            {course.level}
          </div>
        </div>
        
        <div className="flex-1 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star size={14} fill="#f59e0b" stroke="none" />
              <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
            </div>
            <span className="text-gray-400 text-xs">· {course.students} students</span>
            <span className="text-gray-400 text-xs">· {course.duration}</span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
            <span className="text-xl font-bold text-gray-900">{course.price}</span>
            <div className={`flex items-center gap-1 text-sm font-semibold text-red-600 transition-all ${isHovered ? 'translate-x-1' : ''}`}>
              View Course <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREER BOOST SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CareerBoostSection({ onRegister }) {
  const benefits = [
    { title: 'Mentorship & Coaching', desc: 'Ongoing support after graduation to guide your career journey.', icon: Users },
    { title: 'Internship Opportunities', desc: 'Gain practical experience fully aligned with your training subject.', icon: Briefcase },
    { title: 'Hands-On Projects', desc: 'Work on real-world projects to build career-ready technical skills.', icon: Target },
    { title: 'Industry Case Studies', desc: 'Learn directly from technical trainers and seasoned industry experts.', icon: TrendingUp },
    { title: 'Soft Skills & Goal Setting', desc: 'Develop essential professional skills alongside technical knowledge.', icon: BookOpen },
    { title: 'Global Opportunities', desc: 'Eligible to participate in overseas partner programs and awards.', icon: Globe },
    { title: 'Official Certification', desc: 'Receive an official certificate upon successful course completion.', icon: Award },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <Eyebrow>Career Support</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Career <GradientText>Boost</GradientText>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            A complete ecosystem of support to accelerate your professional journey.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.05}>
              <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex gap-4 justify-center mt-10">
          <button onClick={onRegister}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer shadow-lg shadow-red-500/30 transition-all">
            Register for New Course <ArrowRight size={16} className="inline ml-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY PROGRAMS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function IndustryProgramsSection() {
  const programs = [
    { title: 'Industry Linkage Program', subtitle: 'Career Support', features: ['Personalized career counseling', 'Job placement assistance', 'Networking with industry professionals'], img: IMGS.career, icon: Users },
    { title: 'Internship Program', subtitle: 'Practical Experience', features: ['Partnerships with leading companies', 'Hands-on experience in diverse industries', 'Mentorship from experienced professionals'], img: IMGS.internship, icon: Briefcase },
    { title: 'Work Global Virtual Company', subtitle: 'Global Opportunities', features: ['Remote work and project-based learning', 'Cross-cultural collaboration', 'Agile methodologies training'], img: IMGS.global, icon: Globe },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <Eyebrow>Industry Programs</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Career <GradientText>Pathways</GradientText>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <Reveal key={prog.title} delay={i * 0.1}>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-red-200 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="text-xs text-white/60 uppercase tracking-wide">{prog.subtitle}</div>
                    <h3 className="text-lg font-bold text-white">{prog.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  {prog.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <CheckCircle size={12} className="text-red-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CORPORATE SECTION — RICH VISUALIZATION (REDESIGNED)
// ─────────────────────────────────────────────────────────────────────────────

function CorporateSection({ onQuote }) {
  const stats = [
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: ThumbsUp },
    { value: 500, suffix: '+', label: 'Corporate Clients', icon: Building2 },
    { value: 45, suffix: 'min', label: 'Average Response', icon: ClockIcon },
    { value: 100, suffix: '%', label: 'Customizable', icon: Target },
  ];

  const services = [
    { title: 'On-Demand Training', desc: 'Self-paced programs with structured content. Access learning materials anytime — ideal for continuous organizational upskilling at scale.', icon: Cpu, duration: '24/7 Access', students: '10,000+' },
    { title: 'Live Training / Short Courses', desc: 'Instructor-led sessions focusing on practical skills, real-world scenarios, and immediate application.', icon: Users, duration: '2-12 weeks', students: '5,000+' },
    { title: 'Group Training', desc: 'Customized programs designed for entire teams or departments, tailored to specific organizational objectives.', icon: Target, duration: 'Custom', students: '500+ Teams' },
    { title: 'Digital Training (E-Learning)', desc: 'Structured digital solution combining video lessons, assessments, and materials for large-scale remote training.', icon: Globe, duration: 'Self-paced', students: '25,000+' },
  ];

  const testimonials = [
    { quote: 'ADITI Academy transformed our IT department\'s capabilities. The custom training program was exactly what we needed.', author: 'Michael Chen', role: 'CTO, TechCorp', rating: 5 },
    { quote: 'The ROI from their training program was immediate. Our team\'s productivity increased by 40% within 3 months.', author: 'Sarah Johnson', role: 'HR Director, Global Solutions', rating: 5 },
  ];

  const partners = ['Google', 'Microsoft', 'AWS', 'Cisco', 'IBM', 'Deloitte'];

  return (
    <div>
      {/* Hero Section for Corporate */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMGS.corporateHero} alt="Corporate Training" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <Reveal>
            <Eyebrow dark={true}>B2B Solutions</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Enterprise Training<br />
              <span className="text-red-500">Solutions</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Empower your workforce with customized IT training programs designed to close skill gaps and drive business growth.
            </p>
            <div className="flex gap-4">
              <button onClick={onQuote} className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all">
                Request Enterprise Quote
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 rounded-xl font-semibold transition-all">
                <Phone size={16} className="inline mr-2" /> Schedule Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Training Solutions</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What We <GradientText>Provide</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Flexible training options tailored to your organization's needs and budget
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-red-200 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                    <service.icon size={24} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">⏱ {service.duration}</span>
                    <span className="text-xs text-red-600">{service.students} trained</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Success Stories</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Trusted by <GradientText>Industry Leaders</GradientText>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.author} delay={i * 0.15}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#f59e0b" stroke="none" className="text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Partners */}
          <div className="text-center">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-6">Trusted Partners</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {partners.map(partner => (
                <span key={partner} className="text-gray-500 font-semibold text-lg">{partner}</span>
              ))}
            </div>
          </div>

          <Reveal className="text-center mt-12">
            <button onClick={onQuote}
              className="px-10 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-lg shadow-red-500/30 transition-all">
              Get Custom Quote →
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOVERNMENT SECTION — RICH VISUALIZATION (REDESIGNED)
// ─────────────────────────────────────────────────────────────────────────────

function GovernmentSection({ onPartner }) {
  const stats = [
    { value: 25, suffix: '+', label: 'Government Partners', icon: Landmark },
    { value: 15, suffix: 'K+', label: 'Civil Servants Trained', icon: Users },
    { value: 10, suffix: '+', label: 'Universities', icon: School },
    { value: 100, suffix: '%', label: 'MoEYS Aligned', icon: Award },
  ];

  const programs = [
    { title: 'Government Digital Transformation', desc: 'Comprehensive training for public sector digital initiatives', duration: '12 weeks', participants: '500+', icon: BarChart3 },
    { title: 'Cybersecurity for Public Sector', desc: 'Secure government infrastructure and data protection', duration: '8 weeks', participants: '300+', icon: Shield },
    { title: 'Data Analytics for Policy Making', desc: 'Data-driven decision making for government officials', duration: '10 weeks', participants: '400+', icon: TrendingUp },
    { title: 'Leadership in Technology', desc: 'Executive program for technology leaders in government', duration: '6 weeks', participants: '200+', icon: UserCheck },
  ];

  const universityPrograms = [
    { title: 'Curriculum Integration', desc: 'Integrate our certified courses into your university programs', icon: BookOpen },
    { title: 'Faculty Development', desc: 'Train your faculty members on the latest technologies', icon: Users },
    { title: 'Student Certification', desc: 'Provide industry-recognized certifications to your students', icon: Award },
    { title: 'Research Collaboration', desc: 'Partner on technology research and innovation projects', icon: Target },
  ];

  return (
    <div>
      {/* Hero Section for Government */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMGS.govHero} alt="Government Partnership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <Reveal>
            <Eyebrow dark={true}>Public Sector & Education</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Government &<br />
              <span className="text-red-500">University Partnerships</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Driving digital transformation through strategic collaboration and accredited training programs.
            </p>
            <div className="flex gap-4">
              <button onClick={onPartner} className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all">
                Request Partnership Info
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 rounded-xl font-semibold transition-all">
                <Mail size={16} className="inline mr-2" /> Contact Government Team
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Government Training Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Eyebrow>Government Programs</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Public Sector <GradientText>Training</GradientText>
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Specialized programs designed for government agencies and civil servants
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <Reveal key={program.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-red-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <program.icon size={24} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{program.desc}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-400">📅 {program.duration}</span>
                        <span className="text-red-600">👥 {program.participants} trained</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* University Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div className="relative">
                <img src={IMGS.govMeeting} alt="University Partnership" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-4 rounded-xl shadow-lg">
                  <School size={32} />
                </div>
              </div>
            </Reveal>
            
            <Reveal direction="right">
              <div>
                <Eyebrow>University Solutions</Eyebrow>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Academic <GradientText>Partnerships</GradientText>
                </h2>
                <p className="text-gray-600 mb-8">
                  Collaborate with ADITI Academy to bring industry-recognized technology education to your students and faculty.
                </p>
                <div className="grid gap-4">
                  {universityPrograms.map((program, i) => (
                    <div key={program.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <program.icon size={16} className="text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{program.title}</h4>
                        <p className="text-sm text-gray-500">{program.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MoEYS Accreditation */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <Award size={48} className="text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Officially Accredited by MoEYS</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our programs are fully aligned with the Ministry of Education, Youth and Sport standards
            </p>
            <button onClick={onPartner}
              className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all">
              Request Accreditation Information
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export function ProgramsPageEnhanced() {
  const [activeTab, setActiveTab] = useState('individual');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const coursesRef = useRef(null);

  const filteredCourses = selectedCategory === 'all' ? COURSES : COURSES.filter(c => c.category === selectedCategory);
  const scrollToCourses = () => coursesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection onExplore={scrollToCourses} />
      <WhoAreYouSection activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === 'individual' && (
          <motion.div key="individual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <section ref={coursesRef} className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <Reveal className="mb-8">
                  <Eyebrow>Course Catalog</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Explore by <GradientText>Category</GradientText>
                  </h2>
                </Reveal>
                <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
                <div className="space-y-4">
                  {filteredCourses.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} onClick={() => setSelectedCourse(course)} />
                  ))}
                </div>
              </div>
            </section>
            <CareerBoostSection onRegister={() => setShowRegForm(true)} />
            <IndustryProgramsSection />
          </motion.div>
        )}

        {activeTab === 'corporate' && (
          <motion.div key="corporate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <CorporateSection onQuote={() => setShowQuote(true)} />
          </motion.div>
        )}

        {activeTab === 'government' && (
          <motion.div key="government" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <GovernmentSection onPartner={() => setShowPartner(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onRegister={() => { setSelectedCourse(null); setShowRegForm(true); }} />
      <RegModal show={showRegForm} onClose={() => setShowRegForm(false)} course={selectedCourse} />
      <QuoteModal show={showQuote} onClose={() => setShowQuote(false)} />
      <PartnerModal show={showPartner} onClose={() => setShowPartner(false)} />
      <Footer />
    </div>
  );
}

export default ProgramsPageEnhanced;