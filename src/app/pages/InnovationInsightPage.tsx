import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { useRef, useState, useEffect } from 'react';
import { 
  Lightbulb, BarChart3, Globe2, Calendar, User, Clock, 
  TrendingUp, Shield, Cpu, Cloud, Brain, Zap, 
  BookOpen, ArrowRight, Eye, Heart, MessageCircle, ChevronDown,
  Twitter, Linkedin, Facebook, Link, Search, Filter, Sparkles, Share2, X
} from 'lucide-react';

const BRAND = '#B51D39';
const BRAND_DARK = '#8a1530';
const BRAND_LITE = '#d4274d';

// Article Images
const ARTICLE_IMGS = {
  featured: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  cybersecurity: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  future: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  education: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  networking: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  blockchain: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
  iot: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  devops: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
  quantum: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
};

// All 10 Articles Data
const ALL_ARTICLES = [
  {
    id: 1,
    title: "The Rise of AI in Southeast Asia: How Cambodia is Preparing for a Digital Future",
    excerpt: "As artificial intelligence reshapes global economies, Cambodia's tech education sector is evolving rapidly to meet the demands of Industry 4.0. ADITI Academy leads the charge with innovative curriculum and industry partnerships.",
    content: `
      <p class="text-lg text-gray-600 leading-relaxed mb-6">Cambodia is at a pivotal moment in its digital transformation journey. With a young, tech-savvy population and increasing foreign investment, the Kingdom is positioning itself as an emerging hub for artificial intelligence and digital innovation in Southeast Asia.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Current AI Landscape in Cambodia</h2>
      <p class="text-gray-600 leading-relaxed mb-4">Over the past three years, Cambodia has seen a 156% increase in AI-related job postings, according to the Ministry of Economy and Finance. Major tech companies like Google, Microsoft, and AWS have established partnerships with local institutions, bringing cutting-edge AI training to Cambodian students and professionals.</p>
      
      <img src="${ARTICLE_IMGS.ai}" alt="AI Technology" class="w-full rounded-2xl my-8" />
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">ADITI Academy's Role in AI Education</h2>
      <p class="text-gray-600 leading-relaxed mb-4">Since 2018, ADITI Academy has trained over 1,500 students in artificial intelligence and machine learning. Our curriculum focuses on practical applications, including computer vision, natural language processing, and predictive analytics for business.</p>
      
      <div class="bg-red-50 border-l-4 border-red-600 p-6 my-8 rounded-r-2xl">
        <p class="text-gray-700 italic">"The demand for AI skills in Cambodia has grown exponentially. Our graduates are now leading AI initiatives at major corporations and startups across the region."</p>
        <p class="text-red-600 font-semibold mt-3">— Sophea Meas, Head of AI Research at ADITI Academy</p>
      </div>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Road Ahead: 2025 and Beyond</h2>
      <p class="text-gray-600 leading-relaxed mb-4">By 2025, experts predict Cambodia will have over 10,000 AI professionals trained across various institutions, positioning the country as a regional leader in AI innovation.</p>
    `,
    category: "Artificial Intelligence",
    author: "Sophea Meas",
    authorRole: "Head of AI Research",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    date: "May 15, 2024",
    readTime: "8 min read",
    image: ARTICLE_IMGS.featured,
    views: 2847,
    likes: 342,
    comments: 28,
  },
  {
    id: 2,
    title: "Cybersecurity Threats in 2024: What Every Organization Needs to Know",
    excerpt: "From ransomware to phishing attacks, understanding the evolving threat landscape is crucial for protecting digital assets and maintaining business continuity.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">Cybersecurity threats are evolving at an unprecedented pace. In 2024, organizations face more sophisticated attacks than ever before, from AI-powered phishing campaigns to ransomware targeting critical infrastructure.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Top Threats to Watch</h2>
    <p class="text-gray-600 leading-relaxed mb-4">According to recent reports, ransomware attacks increased by 95% in Southeast Asia over the past year. Small and medium enterprises are particularly vulnerable, with 60% of attacked SMEs going out of business within six months.</p>
    <img src="${ARTICLE_IMGS.cybersecurity}" alt="Cybersecurity" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Protection Strategies</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Organizations should implement zero-trust architecture, regular security audits, and comprehensive employee training to mitigate risks. ADITI Academy offers specialized cybersecurity courses to help professionals stay ahead of threats.</p>`,
    category: "Cybersecurity",
    author: "Malis Sovann",
    authorRole: "Cybersecurity Lead",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    date: "May 10, 2024",
    readTime: "6 min read",
    image: ARTICLE_IMGS.cybersecurity,
    views: 1952,
    likes: 187,
    comments: 15,
  },
  {
    id: 3,
    title: "Cloud Computing Adoption: Transforming Cambodia's Business Landscape",
    excerpt: "How cloud technologies are enabling SMEs to scale operations, reduce costs, and compete globally in an increasingly digital marketplace.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">Cloud computing has become a game-changer for Cambodian businesses, enabling them to compete globally without massive infrastructure investments.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Cloud Revolution</h2>
    <p class="text-gray-600 leading-relaxed mb-4">More than 70% of Cambodian enterprises have adopted cloud solutions, with spending expected to reach $150 million by 2025. This shift is driving demand for cloud architects and DevOps engineers.</p>
    <img src="${ARTICLE_IMGS.cloud}" alt="Cloud Computing" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Skills in Demand</h2>
    <p class="text-gray-600 leading-relaxed mb-4">AWS, Azure, and Google Cloud certifications are highly sought after, with certified professionals commanding salaries 40% higher than their non-certified peers.</p>`,
    category: "Cloud Computing",
    author: "Rithy Chea",
    authorRole: "Cloud Architect",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    date: "May 5, 2024",
    readTime: "7 min read",
    image: ARTICLE_IMGS.cloud,
    views: 1634,
    likes: 156,
    comments: 12,
  },
  {
    id: 4,
    title: "Data Science Revolution: Transforming Business Intelligence in Cambodia",
    excerpt: "How data-driven decision making is helping Cambodian businesses gain competitive advantages and optimize operations.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">Data science is revolutionizing how Cambodian businesses operate, from predictive analytics to customer behavior insights.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Data Economy</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Companies leveraging data analytics report 23% higher profits and 19% higher customer satisfaction rates. The demand for data scientists in Cambodia has grown 200% since 2021.</p>
    <img src="${ARTICLE_IMGS.data}" alt="Data Science" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Data Capabilities</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy's data science program has trained over 300 professionals, with 92% securing data-related roles within six months of graduation.</p>`,
    category: "Data Science",
    author: "Srey Pov",
    authorRole: "Data Scientist",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    date: "April 28, 2024",
    readTime: "9 min read",
    image: ARTICLE_IMGS.data,
    views: 1428,
    likes: 134,
    comments: 9,
  },
  {
    id: 5,
    title: "The Future of Work: Skills That Will Matter in 2025 and Beyond",
    excerpt: "As automation and AI reshape job markets, discover which technical and soft skills will be most valuable for career resilience.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">The workplace is evolving faster than ever. By 2025, an estimated 85 million jobs may be displaced by automation, while 97 million new roles could emerge.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Top Skills for 2025</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Analytical thinking, creative problem-solving, resilience, flexibility, and technology literacy top the list of most in-demand skills according to the World Economic Forum.</p>
    <img src="${ARTICLE_IMGS.future}" alt="Future of Work" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Preparing for Tomorrow</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy's curriculum is designed to build both technical expertise and future-ready soft skills, ensuring graduates thrive in the evolving job market.</p>`,
    category: "Future Skills",
    author: "Chan Dara",
    authorRole: "Career Strategist",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    date: "April 22, 2024",
    readTime: "10 min read",
    image: ARTICLE_IMGS.future,
    views: 2123,
    likes: 278,
    comments: 34,
  },
  {
    id: 6,
    title: "Digital Transformation in Education: Lessons from ADITI Academy",
    excerpt: "How innovative teaching methodologies, online learning platforms, and industry partnerships are revolutionizing tech education.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">The education sector is undergoing a digital revolution, with technology enabling personalized learning at scale.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Innovative Teaching Methods</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy has pioneered blended learning approaches combining online modules with hands-on labs, resulting in 40% higher engagement rates and 35% faster skill acquisition.</p>
    <img src="${ARTICLE_IMGS.education}" alt="Digital Education" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Industry Partnerships</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Strategic alliances with global tech leaders ensure curriculum relevance and provide students with real-world project opportunities.</p>`,
    category: "Education",
    author: "Sophea Meas",
    authorRole: "Head of AI Research",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    date: "April 18, 2024",
    readTime: "7 min read",
    image: ARTICLE_IMGS.education,
    views: 1891,
    likes: 203,
    comments: 22,
  },
  {
    id: 7,
    title: "Building a Cybersecurity Culture: From Awareness to Action",
    excerpt: "Practical strategies for organizations to foster security-first mindsets and implement effective protection measures.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">Creating a security-conscious culture is as important as implementing technical controls in protecting organizational assets.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Human Firewall</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Studies show that 85% of data breaches involve human error. Regular training and awareness programs can reduce this risk by up to 70%.</p>
    <img src="${ARTICLE_IMGS.cybersecurity}" alt="Cybersecurity Culture" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Implementation Framework</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy offers customized cybersecurity training programs for organizations of all sizes, focusing on practical skills and behavioral change.</p>`,
    category: "Cybersecurity",
    author: "Malis Sovann",
    authorRole: "Cybersecurity Lead",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    date: "April 12, 2024",
    readTime: "6 min read",
    image: ARTICLE_IMGS.cybersecurity,
    views: 1127,
    likes: 98,
    comments: 7,
  },
  {
    id: 8,
    title: "Blockchain Technology: Beyond Cryptocurrency Applications",
    excerpt: "Exploring how blockchain is transforming supply chains, digital identity, and smart contracts across industries.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">Blockchain technology is revolutionizing industries far beyond cryptocurrency, offering unprecedented transparency and security.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Real-World Applications</h2>
    <p class="text-gray-600 leading-relaxed mb-4">From supply chain tracking to digital voting systems, blockchain is creating new possibilities for trust and verification in digital transactions.</p>
    <img src="${ARTICLE_IMGS.blockchain}" alt="Blockchain" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Blockchain Expertise</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy's blockchain certification program covers smart contract development, decentralized applications, and enterprise blockchain solutions.</p>`,
    category: "Emerging Tech",
    author: "Vicheka Phan",
    authorRole: "Blockchain Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    date: "April 5, 2024",
    readTime: "8 min read",
    image: ARTICLE_IMGS.blockchain,
    views: 987,
    likes: 112,
    comments: 8,
  },
  {
    id: 9,
    title: "Internet of Things: Connecting Cambodia's Future Smart Cities",
    excerpt: "How IoT technologies are enabling smart infrastructure, efficient resource management, and improved quality of life.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">The Internet of Things is transforming how cities operate, from traffic management to energy efficiency.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Smart City Initiatives</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Phnom Penh is implementing IoT solutions for smart parking, waste management, and air quality monitoring, creating new opportunities for tech professionals.</p>
    <img src="${ARTICLE_IMGS.iot}" alt="IoT" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Skills for the Connected World</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy's IoT curriculum covers sensor technology, data analytics, and edge computing for smart applications.</p>`,
    category: "Emerging Tech",
    author: "Sokha Leng",
    authorRole: "IoT Architect",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
    date: "March 28, 2024",
    readTime: "7 min read",
    image: ARTICLE_IMGS.iot,
    views: 876,
    likes: 94,
    comments: 5,
  },
  {
    id: 10,
    title: "DevOps and Continuous Delivery: Accelerating Software Innovation",
    excerpt: "How DevOps practices are helping organizations deploy software faster, more reliably, and with higher quality.",
    content: `<p class="text-lg text-gray-600 leading-relaxed mb-6">DevOps has become essential for organizations seeking to accelerate software delivery while maintaining stability and security.</p>
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The DevOps Impact</h2>
    <p class="text-gray-600 leading-relaxed mb-4">Companies implementing DevOps practices deploy 200 times more frequently and recover from failures 24 times faster than their peers.</p>
    <img src="${ARTICLE_IMGS.devops}" alt="DevOps" class="w-full rounded-2xl my-8" />
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building DevOps Capabilities</h2>
    <p class="text-gray-600 leading-relaxed mb-4">ADITI Academy's DevOps certification covers CI/CD pipelines, containerization, infrastructure as code, and monitoring solutions.</p>`,
    category: "DevOps",
    author: "Rithy Chea",
    authorRole: "Cloud Architect",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    date: "March 20, 2024",
    readTime: "9 min read",
    image: ARTICLE_IMGS.devops,
    views: 1543,
    likes: 178,
    comments: 14,
  },
];

const CATEGORIES = ['All', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'Data Science', 'Future Skills', 'Education', 'Emerging Tech', 'DevOps'];

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
        <img src={ARTICLE_IMGS.featured} alt="Innovation & Insight" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600 rounded-full filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full filter blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="max-w-3xl">
          <Reveal delay={0.2}>
            <SectionLabel>Innovation & Insight</SectionLabel>
          </Reveal>
          <Reveal delay={0.3} direction="right">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Future-Ready Ideas <GradientText>for Tech Growth</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
              Explore how ADITI Academy blends innovation with practical insight to help learners 
              and organizations build resilient capabilities in AI, cybersecurity, cloud, and 
              digital transformation.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-red-800/30">
              {[
                { value: '45+', label: 'Articles Published' },
                { value: '12+', label: 'Industry Experts' },
                { value: '8.2K', label: 'Monthly Readers' },
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
// FEATURED ARTICLE CARD
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedArticle({ article, onReadMore }) {
  return (
    <ParallaxScroll direction="up">
      <TiltCard intensity={4}>
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => onReadMore(article)}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-80 md:h-full overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">{article.category}</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-600 transition-colors">{article.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={article.authorAvatar} alt={article.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{article.author}</p>
                    <p className="text-xs text-gray-500">{article.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                  <span className="flex items-center gap-1"><Heart size={14} /> {article.likes}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">Read Full Article <ArrowRight size={16} /></span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </ParallaxScroll>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE CARD
// ─────────────────────────────────────────────────────────────────────────────

function ArticleCard({ article, index, onReadMore }) {
  return (
    <ParallaxScroll direction={index % 2 === 0 ? 'up' : 'down'}>
      <Reveal delay={index * 0.08} direction="up">
        <HoverCard className="cursor-pointer overflow-hidden" onClick={() => onReadMore(article)}>
          <div className="relative h-52 overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">{article.category}</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight hover:text-red-600 transition-colors line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={article.authorAvatar} alt={article.author} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs text-gray-700">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span className="flex items-center gap-1"><Eye size={12} /> {article.views}</span>
                <span className="flex items-center gap-1"><Heart size={12} /> {article.likes}</span>
              </div>
            </div>
          </div>
        </HoverCard>
      </Reveal>
    </ParallaxScroll>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE DETAIL PAGE (WITH READ MORE CTA)
// ─────────────────────────────────────────────────────────────────────────────

function ArticleDetailPage({ article, onClose, allArticles, onReadMore }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Get related articles (same category, excluding current)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  
  // Get latest articles for "more news" section
  const latestNews = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            ← Back to Articles
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><Twitter size={18} /></button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><Linkedin size={18} /></button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><Facebook size={18} /></button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-6">{article.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img src={article.authorAvatar} alt={article.author} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {article.views} views</span>
            </div>
          </div>
        </div>

        <img src={article.image} alt={article.title} className="w-full rounded-2xl my-8" />

        <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-lg max-w-none" />

        {/* Engagement Footer */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Heart size={18} /> {article.likes} Likes</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"><MessageCircle size={18} /> {article.comments} Comments</button>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"><Share2 size={18} /> Share</button>
        </div>
      </article>

      {/* RELATED ARTICLES SECTION */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Related {article.category} Articles</h2>
                <p className="text-gray-500 mt-1">Continue exploring similar topics</p>
              </div>
              <button onClick={onClose} className="text-red-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div key={related.id} onClick={() => onReadMore(related)} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded-full">{related.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">{related.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {related.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {related.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* READ MORE NEWS CTA SECTION - Newsletter + Latest News */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 mb-12 text-center">
            <Sparkles size={36} className="text-white/80 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-2">Never Miss an Insight</h3>
            <p className="text-red-100 mb-6">Subscribe to our newsletter for the latest tech trends and industry insights</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-white" />
              <button className="px-6 py-2 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">Subscribe Now</button>
            </div>
            <p className="text-red-200 text-xs mt-3">No spam. Unsubscribe anytime.</p>
          </div>

          {/* Latest News Grid */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">More Tech News & Insights</h2>
            <p className="text-gray-500 mt-1">Stay updated with our latest articles and thought leadership</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <div key={news.id} onClick={() => onReadMore(news)} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                <div className="relative h-36 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded-full">{news.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">{news.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {news.date}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {news.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Articles CTA */}
          <div className="text-center mt-10">
            <button onClick={onClose} className="inline-flex items-center gap-2 px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
              Browse All Articles <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPICS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function TopicsSection() {
  const topics = [
    { icon: Brain, label: "AI & Machine Learning" },
    { icon: Shield, label: "Cybersecurity" },
    { icon: Cloud, label: "Cloud Computing" },
    { icon: BarChart3, label: "Data Science" },
    { icon: Cpu, label: "DevOps" },
    { icon: Zap, label: "Innovation" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <SectionLabel>Explore by Topic</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dive Deeper into <GradientText>Technology Domains</GradientText></h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((topic, i) => (
            <Reveal key={topic.label} delay={i * 0.07}>
              <HoverCard className="text-center p-5 cursor-pointer">
                <topic.icon className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <span className="text-sm font-semibold text-gray-800">{topic.label}</span>
              </HoverCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWSLETTER SECTION
// ─────────────────────────────────────────────────────────────────────────────

function NewsletterSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <Sparkles size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay <GradientText>Updated</GradientText></h2>
          <p className="text-gray-500 mb-8">Get the latest insights delivered to your inbox weekly.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
            <button className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors">Subscribe</button>
          </div>
          <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function InnovationInsightPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const featuredArticle = ALL_ARTICLES[0];
  const otherArticles = ALL_ARTICLES.slice(1);
  
  const filteredArticles = selectedCategory === 'All' ? otherArticles : otherArticles.filter(a => a.category === selectedCategory);
  const displayedArticles = showAllArticles ? filteredArticles : filteredArticles.slice(0, 6);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />

      {/* Category Filter */}
      <section className="py-6 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setShowAllArticles(false); }} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FeaturedArticle article={featuredArticle} onReadMore={setSelectedArticle} />
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <p className="text-gray-500">Discover our most recent insights and thought leadership</p>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article, idx) => (
              <ArticleCard key={article.id} article={article} index={idx} onReadMore={setSelectedArticle} />
            ))}
          </div>

          {filteredArticles.length > 6 && !showAllArticles && (
            <div className="text-center mt-12">
              <button onClick={() => setShowAllArticles(true)} className="px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
                Load More Articles ({filteredArticles.length - 6} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      <TopicsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleDetailPage 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
            allArticles={ALL_ARTICLES}
            onReadMore={setSelectedArticle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default InnovationInsightPage;