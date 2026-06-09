import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, useInView, AnimatePresence
} from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Briefcase, GraduationCap, Trophy, Code, Zap, Award,
  UserPlus, Calendar, Clock, ArrowRight,
  ChevronDown, CheckCircle, X, Sparkles,
  Loader2, Eye
} from 'lucide-react';
import { CTASection } from '../components/CTASection';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const BRAND = '#dc2626';
const BRAND_DARK = '#b91c1c';
const BRAND_LITE = '#ef4444';

/* ─── Images ─────────────────────────────────────────── */
const IMG = {
  hero:        '/assets/studentactivities/hero.png',
  career:      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80',
  competition: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
  scholarship1: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
  scholarship2: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80',
  scholarship3: 'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80',
  consult:     'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
  hackathon:   'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80',
  workshop:    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80',
  showcase:    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80',
};

// ─── ASSESSMENT QUESTIONS ────────────────────────────────────────────────────
const ASSESSMENT_QUESTIONS = [
  { id: 1, question: "What type of problems excite you most?", options: ["Building websites & apps", "Working with data & numbers", "Security & protecting systems", "AI & intelligent systems", "Cloud infrastructure"] },
  { id: 2, question: "How do you prefer to work?", options: ["Independently on complex problems", "In teams collaborating closely", "Hybrid - both worlds"] },
  { id: 3, question: "What's your experience level?", options: ["Beginner - Excited to learn", "Intermediate - Some experience", "Advanced - Building projects"] },
  { id: 4, question: "Which industry excites you?", options: ["Tech / Software", "Finance / Banking", "Healthcare", "E-commerce / Retail", "Education"] }
];

const COURSE_RECOMMENDATIONS: Record<string, { course: string; career: string; skills: string[]; salary: string }> = {
  "Building websites & apps": { course: "Full Stack Web Development", career: "Frontend/Full Stack Developer", skills: ["React", "Node.js", "MongoDB"], salary: "$65k - $120k" },
  "Working with data & numbers": { course: "Data Science & Analytics", career: "Data Scientist/Analyst", skills: ["Python", "SQL", "Machine Learning"], salary: "$70k - $130k" },
  "Security & protecting systems": { course: "Advanced Cybersecurity", career: "Cybersecurity Specialist", skills: ["Network Security", "Ethical Hacking"], salary: "$75k - $140k" },
  "AI & intelligent systems": { course: "Artificial Intelligence & ML", career: "AI/ML Engineer", skills: ["Python", "TensorFlow", "Deep Learning"], salary: "$80k - $150k" },
  "Cloud infrastructure": { course: "Cloud & DevOps Engineering", career: "DevOps Engineer", skills: ["AWS", "Docker", "Kubernetes"], salary: "$85k - $160k" },
  default: { course: "Professional Certification", career: "Technology Professional", skills: ["Technical Skills", "Problem Solving"], salary: "$60k - $100k" }
};

/* ─── Shared motion helpers ──────────────────────────── */
function Reveal({ children, delay = 0, y = 50 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function TiltCard({ children, deg = 6 }: { children: React.ReactNode; deg?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [deg, -deg]), { stiffness: 300, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-deg, deg]), { stiffness: 300, damping: 25 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  
  return (
    <motion.div 
      ref={ref} 
      style={{ rotateX: rx, rotateY: ry, scale, transformStyle: 'preserve-3d' }} 
      onMouseMove={e => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          mx.set((e.clientX - rect.left) / rect.width - 0.5);
          my.set((e.clientY - rect.top) / rect.height - 0.5);
        }
        scale.set(1.02);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); scale.set(1); }}>
      {children}
    </motion.div>
  );
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-red-400' : 'text-red-600'}`}>{children}</span>
      <span className={`block w-7 h-px ${dark ? 'bg-red-500' : 'bg-red-600'}`} />
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{children}</span>;
}

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: '#fef2f2', color: BRAND, border: `1px solid ${BRAND}20` }}>{children}</span>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 800, padding: '5px 14px', borderRadius: 100, background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`, color: '#fff' }}>{children}</span>
);

// ─── MULTIPLE SCHOLARSHIPS ────────────────────────────────────────────────────
const SCHOLARSHIPS = [
  { id: 's1', title: 'Merit Excellence Scholarship', subtitle: 'Up to 100% Tuition', desc: 'For outstanding academic achievers with proven track record.', icon: GraduationCap, image: IMG.scholarship1, date: 'Deadline: Dec 15', cta: 'Apply Now', badge: 'Full Ride', gains: ['100% tuition coverage', 'Monthly stipend $500', 'Research opportunities'], tags: ['Merit-based', 'GPA 3.8+'] },
  { id: 's2', title: 'Women in Tech Scholarship', subtitle: 'Empowering Future Leaders', desc: 'Supporting women pursuing technology degrees.', icon: GraduationCap, image: IMG.scholarship2, date: 'Deadline: Jan 10', cta: 'Apply Now', badge: '50-100%', gains: ['50-100% tuition', 'Mentorship program', 'Conference access'], tags: ['Diversity', 'Leadership'] },
  { id: 's3', title: 'Innovation Grant', subtitle: 'Project-Based Funding', desc: 'For students with groundbreaking tech project ideas.', icon: GraduationCap, image: IMG.scholarship3, date: 'Deadline: Feb 1', cta: 'Apply Now', badge: '$10,000 Grant', gains: ['$10,000 funding', 'Incubator access', 'Industry mentorship'], tags: ['Project-based', 'Innovation'] },
];

// ─── ACTIVITIES DATA (removed mentorship) ────────────────────────────────────
const ACTIVITIES = {
  career: [
    { id: 'c1', title: 'Career Path Assessment', subtitle: 'Explore My Path', desc: 'Discover your ideal tech career through our comprehensive assessment.', icon: Briefcase, image: IMG.career, date: 'Available Now', duration: '30 mins', cta: 'Start Assessment', badge: 'Most Popular', gains: ['Personalized career roadmap', 'Skills gap analysis', 'Industry-aligned path'], tags: ['Self-paced', 'Free', 'Certificate'] },
    { id: 'c2', title: 'Career Consultation', subtitle: 'Book a 1-on-1 Session', desc: 'Book a session with our career advisors for personalized guidance.', icon: UserPlus, image: IMG.consult, date: 'Weekly', duration: '45 mins', cta: 'Schedule Booking', badge: 'Weekly Slots', gains: ['Resume review', 'Mock interview', 'Salary tips'], tags: ['1-on-1', 'Free'] },
  ],
  competition: [
    { id: 'k1', title: 'Annual Tech Competition', subtitle: 'Compete & Win', desc: 'Showcase your skills across AI, Cybersecurity, Web Dev.', icon: Trophy, image: IMG.competition, date: 'Dec 15, 2024', duration: 'Full Day', cta: 'Register Now', badge: 'Prizes', gains: ['Cash prizes', 'Internships', 'Judge feedback'], tags: ['Teams', 'Cash Prizes'] },
    { id: 'k2', title: 'Hackathon 2024', subtitle: '48-Hour Build Sprint', desc: '48-hour coding marathon tackling real-world problems.', icon: Code, image: IMG.hackathon, date: 'Nov 22-24', duration: '48h', cta: 'Join Hackathon', badge: 'Team Event', gains: ['Build product', 'Mentorship', 'Demo to judges'], tags: ['Open Source', 'Prize Pool'] },
    { id: 'k3', title: 'Student Showcase', subtitle: 'Present Your Work', desc: 'Present your capstone projects to industry partners.', icon: Award, image: IMG.showcase, date: 'Dec 10', duration: 'Full Day', cta: 'Register', badge: 'Networking', gains: ['Present to employers', 'Networking', 'Feedback'], tags: ['Capstone', 'Recruiters'] },
  ],
  workshop: [
    { id: 'w1', title: 'Tech Workshop Series', subtitle: 'Hands-on Training', desc: 'Saturday workshops covering Cloud, DevOps, AI, Cybersecurity.', icon: Zap, image: IMG.workshop, date: 'Every Saturday', duration: '3h', cta: 'View Schedule', badge: 'Ongoing', gains: ['Cloud certs', 'AI tools', 'Live labs'], tags: ['Hands-on', 'Certificate'] },
  ],
};

/* ─── SCHEDULE MODAL (FIXED: shows schedule from Google Sheets) ────────────── */
// Simulated Google Sheets schedule data - in production, this would come from an API
const GOOGLE_SCHEDULE_DATA = {
  'Tech Workshop Series': [
    { topic: 'Cloud Computing Fundamentals', date: 'Saturday, Nov 16', time: '10:00 AM - 1:00 PM', instructor: 'Dr. Sarah Chen', location: 'Online (Zoom)' },
    { topic: 'DevOps & CI/CD Pipeline', date: 'Saturday, Nov 23', time: '10:00 AM - 1:00 PM', instructor: 'Michael Rodriguez', location: 'Lab 301' },
    { topic: 'AI & Machine Learning Basics', date: 'Saturday, Nov 30', time: '10:00 AM - 1:00 PM', instructor: 'Prof. Emily Watson', location: 'Online (Zoom)' },
    { topic: 'Cybersecurity Essentials', date: 'Saturday, Dec 7', time: '10:00 AM - 1:00 PM', instructor: 'James Liu', location: 'Lab 302' },
    { topic: 'Full Stack Development', date: 'Saturday, Dec 14', time: '10:00 AM - 1:00 PM', instructor: 'Dr. Sarah Chen', location: 'Online (Zoom)' },
  ],
  default: [
    { topic: 'Introduction Session', date: 'Coming Soon', time: 'TBD', instructor: 'TBD', location: 'TBD' },
  ]
};

function ScheduleModal({ item, onClose }: { item: any; onClose: () => void }) {
  // Get schedule data for this workshop, fallback to default
  const scheduleData = GOOGLE_SCHEDULE_DATA[item.title] || GOOGLE_SCHEDULE_DATA.default;
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: 800,
          maxHeight: '85vh',
          borderRadius: 28,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            padding: '20px 28px',
            background: `linear-gradient(135deg, ${BRAND}10, #fff)`,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a0a0a', margin: 0 }}>
              Schedule: {item?.title}
            </h2>
            <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
              Upcoming sessions and workshops
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 50,
              background: '#fff',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="#555" />
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '28px 32px' }}>
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                background: '#fef2f2',
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Calendar size={20} color={BRAND} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', margin: 0 }}>
                  Workshop Series Schedule
                </p>
                <p style={{ fontSize: 12, color: '#666', margin: 0 }}>
                  All sessions are recorded and available for replay
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {scheduleData.map((session: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedSession(expandedSession === idx ? null : idx)}
                >
                  <div
                    style={{
                      padding: '20px 24px',
                      background: expandedSession === idx ? '#fef2f2' : '#fff',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0a0a0a', marginBottom: 6 }}>
                          {session.topic}
                        </h3>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 16,
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              color: '#666',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                            }}
                          >
                            <Calendar size={12} color={BRAND} /> {session.date}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              color: '#666',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                            }}
                          >
                            <Clock size={12} color={BRAND} /> {session.time}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSession === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} color={BRAND} />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSession === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          borderTop: '1px solid #e5e7eb',
                          background: '#fafafa',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ padding: '20px 24px' }}>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: 16,
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: '#999',
                                  marginBottom: 4,
                                }}
                              >
                                INSTRUCTOR
                              </p>
                              <p style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>
                                {session.instructor}
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: '#999',
                                  marginBottom: 4,
                                }}
                              >
                                LOCATION
                              </p>
                              <p style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>
                                {session.location}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            style={{
                              marginTop: 20,
                              padding: '10px 20px',
                              background: BRAND,
                              color: '#fff',
                              border: 'none',
                              borderRadius: 50,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Add to Calendar →
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── REGISTRATION MODAL (FIXED: prevents double submission) ───────────────────── */
/* ─── REGISTRATION MODAL (Enhanced with success card and no double submission) ───────────────────── */
function RegistrationModal({ item, onClose }: { item: any; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const hasSubmitted = useRef(false);

  const handleSubmit = useCallback(() => {
    // Prevent double submission
    if (hasSubmitted.current || loading) return;
    
    if (!formData.name.trim()) { 
      setError('Please enter your full name'); 
      return; 
    }
    if (!formData.email.trim()) { 
      setError('Please enter your email address'); 
      return; 
    }
    if (!formData.email.includes('@')) { 
      setError('Please enter a valid email address'); 
      return; 
    }
    if (!formData.phone.trim()) { 
      setError('Please enter your phone number'); 
      return; 
    }
    
    setError('');
    hasSubmitted.current = true;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate application ID
      const newAppId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setApplicationId(newAppId);
      
      console.log('Registration submitted:', { 
        ...formData, 
        activity: item?.title,
        applicationId: newAppId,
        timestamp: new Date().toISOString()
      });
      
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  }, [formData, loading, item]);

  // Reset form when modal opens
  useEffect(() => {
    if (item) {
      setFormData({ name: '', email: '', phone: '' });
      setSubmitted(false);
      setLoading(false);
      setError('');
      setApplicationId('');
      hasSubmitted.current = false;
    }
  }, [item]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}
        style={{ background: '#fff', width: '100%', maxWidth: 500, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
        
        <div style={{ padding: '24px 28px', background: `linear-gradient(135deg, ${BRAND}10, #fff)`, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a0a0a', margin: 0 }}>
              {submitted ? 'Application Received!' : `Register for ${item?.title || 'Activity'}`}
            </h2>
            <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
              {submitted ? "We'll be in touch soon" : 'Please fill in your details below'}
            </p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 50, background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
            <X size={16} color="#555" />
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          {submitted ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                style={{ width: 80, height: 80, borderRadius: 40, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}
              >
                <CheckCircle size={40} color={BRAND} />
              </motion.div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0a0a0a', marginBottom: 12 }}>Registration Submitted! 🎉</h3>
              <p style={{ fontSize: 15, color: '#666', marginBottom: 8 }}>Thank you, <strong>{formData.name}</strong>!</p>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                We've sent a confirmation to <strong>{formData.email}</strong>. Our team will review your registration and get back to you within 2-3 business days.
              </p>
              <div style={{ background: '#fef2f2', borderRadius: 16, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: BRAND, margin: 0, fontFamily: 'monospace' }}>
                  ✓ Registration ID: <strong>{applicationId}</strong>
                </p>
                <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>✓ Please keep this for reference</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                onClick={onClose} 
                style={{ width: '100%', padding: '14px', background: BRAND, color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}
              >
                Close
              </motion.button>
            </motion.div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ 
                    padding: '14px 18px', 
                    borderRadius: 14, 
                    border: error && !formData.name ? '1px solid #ef4444' : '1px solid #e5e7eb', 
                    fontSize: 14, 
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }} 
                />
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ 
                    padding: '14px 18px', 
                    borderRadius: 14, 
                    border: error && (!formData.email || !formData.email.includes('@')) ? '1px solid #ef4444' : '1px solid #e5e7eb', 
                    fontSize: 14, 
                    outline: 'none' 
                  }} 
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number *" 
                  value={formData.phone} 
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ 
                    padding: '14px 18px', 
                    borderRadius: 14, 
                    border: error && !formData.phone ? '1px solid #ef4444' : '1px solid #e5e7eb', 
                    fontSize: 14, 
                    outline: 'none' 
                  }} 
                />
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 12 }}>{error}</p>}
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: `0 10px 25px ${BRAND}50` }} 
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit} 
                disabled={loading}
                style={{ 
                  width: '100%', 
                  marginTop: 28, 
                  padding: '16px', 
                  background: BRAND, 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 50, 
                  fontWeight: 700, 
                  fontSize: 15, 
                  cursor: loading ? 'not-allowed' : 'pointer', 
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} /> : `Submit Registration →`}
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── ASSESSMENT MODAL (4 questions → course + career) ────────────────────── */
function AssessmentModal({ onClose, onComplete }: { onClose: () => void; onComplete: (result: any) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const hasCompleted = useRef(false);

  const handleAnswer = useCallback((answer: string) => {
    // Prevent multiple completions
    if (hasCompleted.current) return;
    
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step + 1 < ASSESSMENT_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      hasCompleted.current = true;
      setSubmitting(true);
      setTimeout(() => {
        const recommendation = COURSE_RECOMMENDATIONS[newAnswers[0]] || COURSE_RECOMMENDATIONS.default;
        setResult(recommendation);
        setSubmitting(false);
        onComplete(recommendation);
      }, 2000);
    }
  }, [answers, step, onComplete]);

  // Reset state when modal opens
  useEffect(() => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setSubmitting(false);
    hasCompleted.current = false;
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}
        style={{ background: '#fff', width: '100%', maxWidth: 600, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
        
        <div style={{ padding: '24px 28px', background: `linear-gradient(135deg, ${BRAND}10, #fff)`, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a0a0a', margin: 0 }}>Career Discovery</h2>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 50, background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}><X size={16} color="#555" /></button>
        </div>

        <div style={{ padding: '32px 36px' }}>
          {submitting ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity }}><Loader2 size={48} color={BRAND} /></motion.div>
              <p style={{ marginTop: 24, fontSize: 16, color: '#666' }}>Analyzing your responses...</p>
            </div>
          ) : result ? (
            <div style={{ textAlign: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}
                style={{ width: 80, height: 80, borderRadius: 40, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={40} color={BRAND} />
              </motion.div>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#0a0a0a', marginBottom: 8 }}>Your Path Awaits!</h3>
              <div style={{ background: '#fef2f2', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Recommended Course</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: BRAND, marginBottom: 12 }}>{result.course}</p>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Career Path: <strong>{result.career}</strong></p>
                <p style={{ fontSize: 13, color: BRAND, fontWeight: 600 }}>Avg. Salary: {result.salary}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
                {result.skills.map((skill: string) => <Chip key={skill}>{skill}</Chip>)}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} onClick={onClose} style={{ width: '100%', padding: '14px', background: BRAND, color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>Explore Courses →</motion.button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: BRAND }}>Question {step + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                  <span style={{ fontSize: 13, color: '#666' }}>{Math.round((step / ASSESSMENT_QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3 }}><motion.div animate={{ width: `${(step / ASSESSMENT_QUESTIONS.length) * 100}%` }} style={{ height: 6, background: BRAND, borderRadius: 3 }} /></div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0a0a0a', marginBottom: 28 }}>{ASSESSMENT_QUESTIONS[step].question}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {ASSESSMENT_QUESTIONS[step].options.map((opt, idx) => (
                  <motion.button key={idx} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt)} style={{ padding: '16px 20px', borderRadius: 16, border: '1px solid #e5e7eb', background: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: 14, color: '#333' }}>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── DETAIL DRAWER (FIXED: handles View Schedule correctly) ───────────────── */
/* ─── DETAIL DRAWER (FIXED: No duplicate form - directly opens RegistrationModal) ───────────────── */
function Drawer({ act, onClose, onRegister, onStartAssessment }: any) {
  const Icon = act.icon;
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => { 
    document.body.style.overflow = 'hidden'; 
    return () => { document.body.style.overflow = ''; }; 
  }, []);

  // Handle View Schedule action
  const handleViewSchedule = () => {
    setShowSchedule(true);
  };

  const handleMainAction = () => {
    // Check if this is a workshop with "View Schedule" button
    if (act.cta === 'View Schedule') {
      handleViewSchedule();
    } 
    // Check if this is the Career Path Assessment
    else if (act.id === 'c1') { 
      onClose(); 
      onStartAssessment(); 
    } 
    // For all other actions (Register Now, Join Hackathon, Schedule Booking, Apply Now, etc.)
    // Directly open the registration modal - NO intermediate form in drawer
    else { 
      onClose(); // Close the drawer first
      onRegister(act); // Open the registration modal directly
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }} onClick={e => e.stopPropagation()}
          style={{ background: '#fff', width: '100%', maxWidth: 720, maxHeight: '85vh', borderRadius: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={20} color={BRAND} /></div>
              <div><div style={{ fontSize: 14, fontWeight: 700, color: BRAND }}>{act.subtitle}</div><div style={{ fontSize: 12, color: '#aaa' }}>{act.date} · {act.duration}</div></div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${BRAND}50` }} whileTap={{ scale: 0.97 }}
                onClick={handleMainAction} style={{ padding: '10px 24px', background: BRAND, color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                {act.cta} →
              </motion.button>
              <motion.button onClick={onClose} whileHover={{ scale: 1.1, background: '#fee2e2' }}
                style={{ width: 40, height: 40, borderRadius: 50, background: '#f4f4f5', border: 'none', cursor: 'pointer' }}><X size={18} color="#555" /></motion.button>
            </div>
          </div>
          
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
              <img src={act.image} alt={act.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 24 }}><Pill>{act.badge}</Pill></div>
            </div>
            <div style={{ padding: '32px 36px 48px' }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0a0a0a', marginBottom: 8 }}>{act.title}</h2>
              <p style={{ fontSize: 14, color: BRAND, fontWeight: 600, marginBottom: 20 }}>{act.subtitle}</p>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, marginBottom: 28 }}>{act.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>{act.tags?.map((t: string) => <Chip key={t}>{t}</Chip>)}</div>
              <div style={{ background: '#fef2f2', borderRadius: 20, padding: 24, marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a', marginBottom: 16 }}>What You'll Gain</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {act.gains?.map((g: string, i: number) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}><CheckCircle size={14} color={BRAND} />{g}</div>))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Schedule Modal */}
      <AnimatePresence>
        {showSchedule && (
          <ScheduleModal item={act} onClose={() => setShowSchedule(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════ SECTIONS ═══════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#050505' }}>
      <motion.div style={{ position: 'absolute', inset: 0, y: imgY }}><img src={IMG.hero} alt="" style={{ width: '100%', height: '115%', objectFit: 'cover', opacity: 0.35 }} /></motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)' }} />
      <motion.div style={{ y: textY, opacity: fade, position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 5%', paddingTop: 100 }}>
        <Reveal delay={0.15}><Eyebrow dark>Student Activities</Eyebrow></Reveal>
        <Reveal delay={0.25}><h1 style={{ fontSize: 'clamp(44px,6vw,72px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.03em' }}>Learning<br /><GradientText>Becomes</GradientText><br />Legacy.</h1></Reveal>
        <Reveal delay={0.38}><p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(255,255,255,0.55)', maxWidth: 500, lineHeight: 1.6, marginBottom: 32 }}>ADITI Academy bridges classroom theory and real-world mastery through immersive events, mentorship, and career-defining programs.</p></Reveal>
        <Reveal delay={0.58}>
          <div style={{ display: 'flex', gap: 'clamp(20px,5vw,40px)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, flexWrap: 'wrap' }}>
            {[['500+','Students Engaged'],['24+','Annual Events'],['15+','Competitions'],['98%','Satisfaction']].map(([n,l],i) => (
              <div key={l} style={{ position: 'relative', paddingRight: 'clamp(10px,3vw,40px)' }}>{i > 0 && <span style={{ position: 'absolute', left: -20, top: '10%', height: '80%', width: 1, background: 'rgba(255,255,255,0.1)' }} />}<div style={{ fontSize: 'clamp(28px,4vw,34px)', fontWeight: 800, color: '#fff' }}>{n}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{l}</div></div>
            ))}
          </div>
        </Reveal>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}><ChevronDown size={24} color="rgba(255,255,255,0.3)" /></motion.div>
    </section>
  );
}

function CareerSection({ onOpen }: { onOpen: (item: any) => void }) {
  const [acts] = useState(ACTIVITIES.career);
  const main = acts[0];
  const sub = acts.slice(1);
  return (
    <section id="career" style={{ padding: 'clamp(60px,8vw,110px) 5%', background: '#fafafa' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <ScrollReveal><Eyebrow>Career Development</Eyebrow><h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#0a0a0a', marginBottom: 48, letterSpacing: '-0.03em' }}>Shape your<br /><GradientText>professional story.</GradientText></h2></ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <ScrollReveal delay={0.1}>
            <TiltCard deg={5}>
              <motion.div onClick={() => onOpen(main)} whileHover={{ boxShadow: `0 30px 60px -20px rgba(220,38,38,0.3)` }} style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
                <div style={{ position: 'relative', height: 260 }}><motion.img src={main.image} alt={main.title} whileHover={{ scale: 1.05 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', top: 18, left: 18 }}><Pill>{main.badge}</Pill></div></div>
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><main.icon size={18} color={BRAND} /></div><span style={{ fontSize: 12, color: BRAND, fontWeight: 600 }}>{main.subtitle}</span></div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{main.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>{main.desc}</p>
                  <motion.button whileHover={{ scale: 1.02 }} style={{ padding: '12px 24px', background: BRAND, color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>{main.cta} →</motion.button>
                </div>
              </motion.div>
            </TiltCard>
          </ScrollReveal>
          {sub.map((act, i) => (
            <ScrollReveal key={act.id} delay={0.15 + i * 0.1}>
              <TiltCard deg={4}>
                <motion.div onClick={() => onOpen(act)} style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', cursor: 'pointer', padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}><div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><act.icon size={20} color={BRAND} /></div><span style={{ fontSize: 12, color: BRAND, fontWeight: 700 }}>{act.subtitle}</span></div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{act.title}</h3>
                  <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>{act.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: BRAND, cursor: 'pointer' }}>{act.cta} →</span>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitionSection({ onOpen }: { onOpen: (item: any) => void }) {
  const acts = ACTIVITIES.competition;
  return (
    <section style={{ padding: 'clamp(60px,8vw,110px) 5%', background: '#050505' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <ScrollReveal><Eyebrow dark>Competition & Events</Eyebrow><h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#fff', marginBottom: 48, letterSpacing: '-0.03em' }}>Compete.<br /><GradientText>Win. Repeat.</GradientText></h2></ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
          {acts.map((act, i) => (
            <ScrollReveal key={act.id} delay={i * 0.1}>
              <TiltCard deg={5}>
                <motion.div onClick={() => onOpen(act)} whileHover={{ background: `${BRAND}08` }} style={{ padding: '28px', borderRadius: 24, cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ height: 180, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}><img src={act.image} alt={act.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><act.icon size={16} color={BRAND_LITE} /><span style={{ fontSize: 11, color: BRAND_LITE }}>{act.subtitle}</span></div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{act.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{act.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}><Calendar size={12} /> {act.date}</span><span style={{ fontSize: 13, color: BRAND_LITE, fontWeight: 600 }}>{act.cta} →</span></div>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// MULTIPLE SCHOLARSHIPS SECTION
function ScholarshipSection({ onOpen }: { onOpen: (item: any) => void }) {
  return (
    <section id="scholarship" style={{ padding: 'clamp(60px,8vw,110px) 5%', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <ScrollReveal><Eyebrow dark>Scholarship Programs</Eyebrow><h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.03em' }}>Fund your<br /><GradientText>future today.</GradientText></h2><p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 48, maxWidth: 500 }}>Multiple scholarship opportunities to support your academic journey.</p></ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
          {SCHOLARSHIPS.map((scholarship, idx) => (
            <ScrollReveal key={scholarship.id} delay={idx * 0.1}>
              <TiltCard deg={4}>
                <motion.div onClick={() => onOpen(scholarship)} whileHover={{ y: -8 }} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: 28, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                  <div style={{ position: 'relative', height: 200 }}><img src={scholarship.image} alt={scholarship.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', top: 16, right: 16 }}><Pill>{scholarship.badge}</Pill></div></div>
                  <div style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{scholarship.title}</h3>
                    <p style={{ fontSize: 13, color: BRAND_LITE, fontWeight: 600, marginBottom: 12 }}>{scholarship.subtitle}</p>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 20 }}>{scholarship.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>{scholarship.tags.map((t: string) => <Chip key={t}>{t}</Chip>)}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}><Calendar size={12} /> {scholarship.date}</span><span style={{ fontSize: 14, color: BRAND_LITE, fontWeight: 700 }}>Apply Now →</span></div>
                  </div>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkshopSection({ onOpen }: { onOpen: (item: any) => void }) {
  const act = ACTIVITIES.workshop[0];
  return (
    <section style={{ padding: 'clamp(60px,8vw,110px) 5%', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
        <ScrollReveal><img src={act.image} alt={act.title} style={{ width: '100%', borderRadius: 28, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} /></ScrollReveal>
        <ScrollReveal delay={0.15}><Eyebrow>Workshop Series</Eyebrow><h2 style={{ fontSize: 'clamp(32px,4vw,50px)', fontWeight: 800, marginBottom: 20 }}>Hands-on skills<br /><GradientText>every Saturday.</GradientText></h2><p style={{ fontSize: 15, color: '#666', marginBottom: 32 }}>{act.desc}</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>{act.gains.map((g, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><CheckCircle size={14} color={BRAND} />{g}</div>))}</div><motion.button onClick={() => onOpen(act)} whileHover={{ scale: 1.02 }} style={{ padding: '14px 32px', background: BRAND, color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>{act.cta} →</motion.button></ScrollReveal>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════ ROOT ═══════════════════════════════════════════════════════ */
export function StudentActivitiesPage() {
  const [drawer, setDrawer] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registeringItem, setRegisteringItem] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleOpenDrawer = (item: any) => { setDrawer(item); };
  const handleRegister = (item: any) => { 
    setDrawer(null); 
    setRegisteringItem(item); 
    setShowRegistration(true); 
  };
  const handleStartAssessment = () => { setShowAssessment(true); };
  const handleAssessmentComplete = () => { 
    setTimeout(() => setShowAssessment(false), 3000); 
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', overflowX: 'hidden', fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <Navigation />
      <HeroSection />
      <CareerSection onOpen={handleOpenDrawer} />
      <CompetitionSection onOpen={handleOpenDrawer} />
      <ScholarshipSection onOpen={handleOpenDrawer} />
      <WorkshopSection onOpen={handleOpenDrawer} />
      <CTASection />
      <Footer />
      <AnimatePresence>
        {drawer && <Drawer act={drawer} onClose={() => setDrawer(null)} onRegister={handleRegister} onStartAssessment={handleStartAssessment} />}
        {showRegistration && registeringItem && <RegistrationModal item={registeringItem} onClose={() => { setShowRegistration(false); setRegisteringItem(null); }} />}
        {showAssessment && <AssessmentModal onClose={() => setShowAssessment(false)} onComplete={handleAssessmentComplete} />}
      </AnimatePresence>
    </div>
  );
}

export default StudentActivitiesPage;