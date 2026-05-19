import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { useRef, useState, useEffect } from 'react';
import { 
  Users, Sparkles, Trophy, Calendar, MapPin, Clock, Award,
  Briefcase, GraduationCap, Heart, Zap, Globe, Code,
  Coffee, Gift, Star, UserPlus, BookOpen, ChevronDown,
  ArrowRight, Eye, MessageCircle, Share2, Filter, Search
} from 'lucide-react';

const BRAND = '#B51D39';
const BRAND_DARK = '#8a1530';
const BRAND_LITE = '#d4274d';

// Images
const ACTIVITY_IMGS = {
  hero: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
  hackathon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  workshop: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
  showcase: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  mentoring: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  career: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
  scholarship: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  competition: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
};

// Activities Data
const ACTIVITIES = [
  {
    id: 1,
    title: "Career Path Test",
    description: "Discover your ideal tech career path through our comprehensive assessment tool. Get personalized recommendations based on your skills and interests.",
    category: "Career",
    type: "Assessment",
    date: "Ongoing",
    duration: "30 mins",
    image: ACTIVITY_IMGS.career,
    icon: Briefcase,
    cta: "Explore My Path",
    ctaLink: "/career-test",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Annual Tech Competition",
    description: "Showcase your skills in our annual tech competition. Categories include AI, Cybersecurity, Web Development, and Mobile Apps.",
    category: "Competition",
    type: "Event",
    date: "December 15, 2024",
    duration: "Full Day",
    image: ACTIVITY_IMGS.competition,
    icon: Trophy,
    cta: "Register Now",
    ctaLink: "/competition",
  },
  {
    id: 3,
    title: "Scholarship Program 2024",
    description: "Apply for merit-based and need-based scholarships. Covers up to 100% of tuition fees for eligible students.",
    category: "Scholarship",
    type: "Program",
    date: "Application Deadline: Nov 30",
    duration: "Academic Year",
    image: ACTIVITY_IMGS.scholarship,
    icon: GraduationCap,
    cta: "Apply Now",
    ctaLink: "/scholarship",
  },
  {
    id: 4,
    title: "Career Consultation",
    description: "Book a 1-on-1 session with our career advisors. Get personalized guidance on job search, resume building, and interview preparation.",
    category: "Career",
    type: "Consultation",
    date: "Weekly",
    duration: "45 mins",
    image: ACTIVITY_IMGS.career,
    icon: UserPlus,
    cta: "Schedule Booking",
    ctaLink: "/career-consultation",
  },
  {
    id: 5,
    title: "Hackathon 2024",
    description: "48-hour coding challenge to solve real-world problems. Form teams and build innovative solutions with mentorship from industry experts.",
    category: "Competition",
    type: "Event",
    date: "November 22-24, 2024",
    duration: "48 hours",
    image: ACTIVITY_IMGS.hackathon,
    icon: Code,
    cta: "Join Hackathon",
    ctaLink: "/hackathon",
  },
  {
    id: 6,
    title: "Tech Workshop Series",
    description: "Hands-on workshops covering Cloud Computing, DevOps, AI Fundamentals, and Cybersecurity Essentials.",
    category: "Workshop",
    type: "Training",
    date: "Every Saturday",
    duration: "3 hours",
    image: ACTIVITY_IMGS.workshop,
    icon: Zap,
    cta: "View Schedule",
    ctaLink: "/workshops",
  },
  {
    id: 7,
    title: "Student Showcase Day",
    description: "Present your capstone projects to industry partners and potential employers. Network with tech leaders and recruiters.",
    category: "Showcase",
    type: "Event",
    date: "December 10, 2024",
    duration: "Full Day",
    image: ACTIVITY_IMGS.showcase,
    icon: Award,
    cta: "Register to Showcase",
    ctaLink: "/showcase",
  },
  {
    id: 8,
    title: "Mentorship Program",
    description: "Get paired with industry mentors who provide guidance, career advice, and technical support throughout your learning journey.",
    category: "Career",
    type: "Program",
    date: "Rolling Admission",
    duration: "6 months",
    image: ACTIVITY_IMGS.mentoring,
    icon: Heart,
    cta: "Find a Mentor",
    ctaLink: "/mentorship",
  },
];

const ACTIVITY_CATEGORIES = ['All', 'Career', 'Competition', 'Scholarship', 'Workshop', 'Showcase'];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const directions = { up: { y: 50, x: 0 }, down: { y: -50, x: 0 }, left: { y: 0, x: 50 }, right: { y: 0, x: -50 } };
  const { y, x } = directions[direction] || directions.up;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y, x }} animate={inView ? { opacity: 1, y: 0, x: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function ParallaxScroll({ children, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], direction === 'up' ? [50, -50] : [-50, 50]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

function TiltCard({ children, intensity = 6, className = '', style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200, ...style }} className={className}
      onMouseMove={(e) => { const rect = ref.current?.getBoundingClientRect(); if (rect) { x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5); } }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

function HoverCard({ children, className = '', style = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div className={className} style={{ borderRadius: 24, border: `1px solid ${isHovered ? BRAND + '30' : '#e5e7eb'}`, background: '#fff', boxShadow: isHovered ? `0 20px 40px -12px rgba(0,0,0,0.12), 0 0 0 1px ${BRAND}10` : '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', transform: isHovered ? 'translateY(-4px)' : 'translateY(0)', ...style }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
    </motion.div>
  );
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
  return <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">{children}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION (Dark)
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <img src={ACTIVITY_IMGS.hero} alt="Student Activities" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="max-w-3xl">
          <Reveal delay={0.2}>
            <SectionLabel>Student Activities</SectionLabel>
          </Reveal>
          <Reveal delay={0.3} direction="right">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Learning Through <GradientText>Real Projects</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
              ADITI Academy empowers learners with hands-on student activities, live labs, mentor-led workshops 
              and collaborative tech events designed to bridge classroom learning and real-world impact.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-red-800/30">
              {[
                { value: '500+', label: 'Students Engaged' },
                { value: '24+', label: 'Annual Events' },
                { value: '15+', label: 'Competitions' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ChevronDown size={28} className="text-red-500/70" />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ActivityCard({ activity, index, onViewDetails }) {
  const Icon = activity.icon;
  
  return (
    <ParallaxScroll direction={index % 2 === 0 ? 'up' : 'down'}>
      <Reveal delay={index * 0.08} direction="up">
        <TiltCard intensity={4}>
          <HoverCard className="cursor-pointer overflow-hidden h-full flex flex-col" onClick={() => onViewDetails(activity)}>
            <div className="relative h-48 overflow-hidden">
              <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">{activity.category}</span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">{activity.type}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={18} className="text-red-600" />
                <h3 className="text-xl font-bold text-gray-900 leading-tight hover:text-red-600 transition-colors line-clamp-2">{activity.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{activity.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={12} /> {activity.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {activity.duration}</span>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-100">
                <span className="text-red-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  {activity.cta} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </HoverCard>
        </TiltCard>
      </Reveal>
    </ParallaxScroll>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED ACTIVITY CARD (Large)
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedActivityCard({ activity, onViewDetails }) {
  const Icon = activity.icon;
  
  return (
    <ParallaxScroll direction="up">
      <TiltCard intensity={4}>
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => onViewDetails(activity)}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-80 md:h-full overflow-hidden">
              <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">{activity.category}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Star size={12} /> Featured
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <Icon size={24} className="text-red-600" />
                </div>
                <span className="text-sm text-gray-500">Limited Slots Available</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-600 transition-colors">{activity.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{activity.description}</p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>{activity.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all">
                  {activity.cta}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </ParallaxScroll>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ActivityDetailModal({ activity, onClose }) {
  const Icon = activity.icon;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            ← Back to Activities
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
            {activity.cta}
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
              <Icon size={28} className="text-red-600" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">{activity.category}</span>
              <p className="text-sm text-gray-500 mt-2">{activity.type}</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{activity.title}</h1>
          <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <span>{activity.duration}</span>
            </div>
          </div>
        </div>

        <img src={activity.image} alt={activity.title} className="w-full rounded-2xl my-8" />

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">About This Activity</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{activity.description}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What You'll Gain</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Hands-on experience with real-world projects</li>
            <li>Certificate of participation and achievement</li>
            <li>Networking opportunities with industry professionals</li>
            <li>Portfolio-worthy project outcomes</li>
            <li>Mentorship from experienced tech leaders</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Basic understanding of technology concepts</li>
            <li>Laptop with required software installed</li>
            <li>Commitment to complete the activity</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8 rounded-r-2xl">
            <p className="text-gray-700 font-semibold mb-2">Limited Slots Available!</p>
            <p className="text-gray-600">Register early to secure your spot. Early bird discounts available for the first 50 registrants.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-8 mt-8 border-t border-gray-200">
          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all">
            {activity.cta}
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition-all">
            Share <Share2 size={16} className="inline ml-2" />
          </button>
        </div>
      </article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CALL TO ACTION BANNER
// ─────────────────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join an Activity?</h2>
        <p className="text-red-100 mb-8">Take the first step toward an exciting tech career</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-all">
            View All Activities
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all">
            Contact Coordinator
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: "500+", label: "Students Participated", icon: Users },
    { value: "24+", label: "Annual Events", icon: Calendar },
    { value: "15+", label: "Competitions Hosted", icon: Trophy },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <SectionLabel>Our Impact</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Making a <GradientText>Difference</GradientText></h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} className="text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function StudentActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  
  const featuredActivity = ACTIVITIES.find(a => a.isFeatured) || ACTIVITIES[0];
  const otherActivities = ACTIVITIES.filter(a => !a.isFeatured);
  
  const filteredActivities = selectedCategory === 'All' 
    ? otherActivities 
    : otherActivities.filter(a => a.category === selectedCategory);
  
  const displayedActivities = showAllActivities ? filteredActivities : filteredActivities.slice(0, 6);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />

      {/* Category Filter */}
      <section className="py-6 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {ACTIVITY_CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => { setSelectedCategory(cat); setShowAllActivities(false); }} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FeaturedActivityCard activity={featuredActivity} onViewDetails={setSelectedActivity} />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* All Activities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">All Activities & Programs</h2>
            <p className="text-gray-500">Explore our complete range of student activities and opportunities</p>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedActivities.map((activity, idx) => (
              <ActivityCard key={activity.id} activity={activity} index={idx} onViewDetails={setSelectedActivity} />
            ))}
          </div>

          {filteredActivities.length > 6 && !showAllActivities && (
            <div className="text-center mt-12">
              <button onClick={() => setShowAllActivities(true)} className="px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
                Load More Activities ({filteredActivities.length - 6} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <CTABanner />

      <Footer />

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetailModal 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default StudentActivitiesPage;