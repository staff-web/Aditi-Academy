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
const BlogSection = () => null;

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

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --brand: #B51D39;
      --brand-dark: #8a1530;
      --brand-lite: #d4274d;
      --ink: #0d0d0d;
      --ink-muted: #3a3a3a;
      --ink-soft: #6b6b6b;
      --paper: #faf9f6;
      --paper-warm: #f5f2ec;
      --paper-rule: #e0dbd2;
      --column-rule: 1px solid #c8c2b8;
    }

    * { box-sizing: border-box; }

    .paper-bg { background: var(--paper); }
    .ink-text { color: var(--ink); }

    .font-display { font-family: 'Playfair Display', Georgia, serif; }
    .font-body-serif { font-family: 'EB Garamond', Georgia, serif; }
    .font-ui { font-family: 'DM Sans', system-ui, sans-serif; }

    /* Newspaper rule lines */
    .column-rule {
      border-right: var(--column-rule);
    }
    .rule-h {
      border-top: 2px solid var(--ink);
    }
    .rule-h-thin {
      border-top: 1px solid var(--paper-rule);
    }
    .rule-h-brand {
      border-top: 3px solid var(--brand);
    }

    /* Drop cap */
    .drop-cap::first-letter {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 4.5rem;
      font-weight: 900;
      line-height: 0.75;
      float: left;
      margin-right: 0.12em;
      color: var(--brand);
    }

    /* Ink stamp badge */
    .badge-ink {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: white;
      background: var(--brand);
      padding: 3px 10px;
      clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
    }

    .badge-category {
      font-family: 'DM Sans', sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--brand);
      border-top: 2px solid var(--brand);
      padding-top: 4px;
    }

    /* Masthead rule */
    .masthead-rule {
      background: repeating-linear-gradient(90deg, var(--ink) 0px, var(--ink) 3px, transparent 3px, transparent 8px);
      height: 3px;
    }

    /* 3D card preserve */
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }

    /* Scanline overlay for hero */
    .scanlines::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);
      pointer-events: none;
    }

    /* Article body prose */
    .article-prose p { font-family: 'EB Garamond', Georgia, serif; font-size: 1.125rem; line-height: 1.85; color: #2a2a2a; margin-bottom: 1.25rem; }
    .article-prose h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 700; color: #0d0d0d; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid #c8c2b8; padding-bottom: 0.5rem; }
    .article-prose img { border-radius: 2px; }
    .article-prose blockquote { border-left: 4px solid var(--brand); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; }

    /* Ticker tape */
    @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .ticker-track { animation: ticker 30s linear infinite; white-space: nowrap; }
    .ticker-track:hover { animation-play-state: paused; }

    /* Folded corner */
    .folded-corner {
      position: relative;
      overflow: hidden;
    }
    .folded-corner::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 28px;
      height: 28px;
      background: linear-gradient(225deg, var(--paper) 50%, var(--paper-rule) 50%);
    }

    /* Reading progress */
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--brand);
      z-index: 9999;
      transform-origin: left;
    }

    /* Number counter animation */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .count-animate { animation: countUp 0.6s ease forwards; }

    /* 3D Float keyframe */
    @keyframes float3d {
      0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
      33% { transform: translateY(-8px) rotateX(2deg) rotateY(-1deg); }
      66% { transform: translateY(-4px) rotateX(-1deg) rotateY(2deg); }
    }

    /* Underline draw */
    .underline-draw {
      position: relative;
    }
    .underline-draw::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--brand);
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .underline-draw:hover::after { width: 100%; }

    /* Newspaper column layout */
    .news-columns-2 {
      column-count: 2;
      column-gap: 2rem;
      column-rule: 1px solid var(--paper-rule);
    }
    @media (max-width: 640px) {
      .news-columns-2 { column-count: 1; }
    }

    /* Ink bleed effect on hover */
    .ink-bleed {
      position: relative;
      overflow: hidden;
    }
    .ink-bleed::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--brand);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      z-index: 0;
    }
    .ink-bleed:hover::before { transform: scaleX(1); }
    .ink-bleed > * { position: relative; z-index: 1; }
    .ink-bleed:hover { color: white !important; }

    /* Photo caption style */
    .photo-caption {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      letter-spacing: 0.05em;
      color: var(--ink-soft);
      border-bottom: 1px solid var(--paper-rule);
      padding: 6px 0;
    }

    /* Pull quote */
    .pull-quote {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-style: italic;
      line-height: 1.4;
      color: var(--ink);
      border-top: 3px double var(--brand);
      border-bottom: 3px double var(--brand);
      padding: 1.5rem 0;
      margin: 2rem 0;
    }

    /* Edition header */
    .edition-header {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
  `}</style>
);

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: { y: 40, x: 0 }, down: { y: -40, x: 0 }, left: { y: 0, x: 40 }, right: { y: 0, x: -40 } };
  const { y, x } = dirs[direction] || dirs.up;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

function Stagger({ children, delay = 0, stagger = 0.08, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}>
          {child}
        </motion.div>
      )) : children}
    </div>
  );
}

function Tilt3D({ children, intensity = 8, className = '', style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 400, damping: 40 });
  const scale = useSpring(1, { stiffness: 400, damping: 40 });

  return (
    <motion.div ref={ref}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', perspective: 1000, ...style }}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) { x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5); scale.set(1.02); }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); scale.set(1); }}>
      {children}
    </motion.div>
  );
}

function ParallaxLayer({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 80}px`, `${speed * 80}px`]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

// ─── TICKER TAPE ──────────────────────────────────────────────────────────
function TickerTape() {
  const items = ['Artificial Intelligence', '•', 'Cybersecurity', '•', 'Cloud Computing', '•', 'Data Science', '•', 'Future Skills', '•', 'Digital Transformation', '•', 'Blockchain', '•', 'IoT', '•', 'DevOps', '•'];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-t border-b font-ui py-2" style={{ borderColor: 'var(--paper-rule)', background: 'var(--paper-warm)' }}>
      <div className="ticker-track flex gap-8">
        {repeated.map((item, i) => (
          <span key={i} className="text-xs font-medium tracking-wider shrink-0"
            style={{ color: item === '•' ? 'var(--brand)' : 'var(--ink-soft)', letterSpacing: '0.12em' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    update();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden scanlines mt-15" style={{ minHeight: '92vh', background: '#060606' }}>
      {/* Parallax image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageParallax }}>
        <img src={ARTICLE_IMGS.featured} alt="" className="w-full h-full object-cover" style={{ opacity: 0.18, filter: 'sepia(30%) contrast(1.1)' }} />
      </motion.div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Ink bleed glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(181,29,57,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(181,29,57,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <motion.div className="relative z-10 w-full h-full flex flex-col" style={{ y: heroY, opacity: heroOpacity }}>
        {/* Masthead */}
        <div className="border-b border-white/10 px-6 lg:px-14 py-5">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <div className="edition-header" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span className="mr-4">{currentTime}</span>
            </div>
            <div className="text-center">
              <Reveal delay={0.1}>
                <div className="font-display text-white font-black tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', textShadow: '0 2px 20px rgba(181,29,57,0.4)', letterSpacing: '-0.02em' }}>
                  ADITI<span style={{ color: 'var(--brand)' }}>.</span>INSIGHT
                </div>
                <div className="edition-header mt-1" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.4em' }}>Innovation & Technology Review</div>
              </Reveal>
            </div>
            <div className="flex gap-5">
              {['45+', '12+', '8.2K'].map((n, i) => (
                <div key={i} className="text-center hidden md:block">
                  <div className="font-display font-bold text-white text-xl">{n}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
                    {['Articles', 'Experts', 'Readers'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 3, background: 'var(--brand)', opacity: 0.8 }} />

        {/* Main hero content */}
        <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 lg:px-14 py-12 grid lg:grid-cols-12 gap-0 items-center" style={{ minHeight: '70vh' }}>

          {/* Left — Huge display type */}
          <div className="lg:col-span-7 lg:pr-12" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <Reveal delay={0.2}>
              <div className="badge-ink mb-6 inline-block">Featured Edition</div>
            </Reveal>

            <Reveal delay={0.3} direction="right">
              <h1 className="font-display text-white leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                Future-Ready <br />
                <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>Ideas</span> for<br />
                Tech Growth
              </h1>
            </Reveal>

            <Reveal delay={0.45}>
              <p className="font-body-serif text-white/60 mb-8" style={{ fontSize: '1.2rem', lineHeight: 1.7, maxWidth: 520 }}>
                Explore how ADITI Academy blends innovation with practical insight to help learners and organisations build resilient capabilities in AI, cybersecurity, cloud, and digital transformation.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="flex gap-4 flex-wrap">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: 'var(--brand)', color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', padding: '14px 32px', border: 'none', cursor: 'pointer', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
                  START READING ↓
                </motion.button>
                <motion.button whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.97 }}
                  style={{ background: 'transparent', color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '0.06em', padding: '14px 32px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                  SUBSCRIBE
                </motion.button>
              </div>
            </Reveal>
          </div>

          {/* Right — floating 3D article preview */}
          <div className="lg:col-span-5 lg:pl-12 hidden lg:flex items-center justify-center">
            <Reveal delay={0.5} direction="left">
              <Tilt3D intensity={10}>
                <motion.div
                  animate={{ y: [0, -12, 0], rotateZ: [0, 0.5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                  style={{ width: 340, transformStyle: 'preserve-3d' }}>
                  {/* Card shadow layer */}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(181,29,57,0.3)', transform: 'translateZ(-20px) translateY(16px) translateX(8px)', filter: 'blur(20px)', borderRadius: 4 }} />
                  <div className="relative overflow-hidden" style={{ background: 'var(--paper)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={ARTICLE_IMGS.featured} alt="" className="w-full object-cover" style={{ height: 200, filter: 'sepia(10%)' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span className="badge-ink" style={{ fontSize: 9 }}>Artificial Intelligence</span>
                    </div>
                    <div className="p-5">
                      <div className="rule-h-brand mb-3" />
                      <h3 className="font-display font-bold mb-2 leading-snug" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
                        The Rise of AI in Southeast Asia
                      </h3>
                      <p className="font-ui text-xs" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                        Cambodia's tech education sector evolves to meet Industry 4.0 demands.
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: '1px solid var(--paper-rule)' }}>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="" className="rounded-full object-cover" style={{ width: 28, height: 28 }} />
                        <span className="font-ui text-xs font-medium" style={{ color: 'var(--ink-muted)' }}>Sophea Meas · 8 min</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 flex flex-col items-center gap-1 z-10" style={{ transform: 'translateX(-50%)' }}>
        <span className="font-ui text-white/30" style={{ fontSize: 9, letterSpacing: '0.3em' }}>SCROLL</span>
        <ChevronDown size={18} color="rgba(255,255,255,0.3)" />
      </motion.div>
    </section>
  );
}

// ─── FEATURED ARTICLE (NEWSPAPER FRONT PAGE STYLE) ───────────────────────
function FeaturedArticle({ article, onReadMore }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* Section masthead */}
      <div className="mb-6">
        <div className="rule-h mb-3" />
        <div className="flex items-center justify-between">
          <span className="badge-category font-ui">Top Story</span>
          <span className="font-ui text-xs" style={{ color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>May 15, 2024 Edition</span>
        </div>
        <div className="rule-h-thin mt-3" />
      </div>

      <Tilt3D intensity={4} className="cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onReadMore(article)}
          className="grid lg:grid-cols-12 gap-0 overflow-hidden"
          style={{ background: 'var(--paper)', border: '1px solid var(--paper-rule)', borderRadius: 2 }}>

          {/* Image — large, left */}
          <div className="lg:col-span-7 relative overflow-hidden" style={{ minHeight: 380 }}>
            <motion.img
              src={article.image} alt={article.title}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover absolute inset-0"
              style={{ filter: 'sepia(8%) contrast(1.05)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
              <div className="flex items-center gap-3 text-white/70 font-ui" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
                <Eye size={12} /> <span>{article.views.toLocaleString()} views</span>
                <Heart size={12} /> <span>{article.likes}</span>
                <MessageCircle size={12} /> <span>{article.comments}</span>
              </div>
            </div>
          </div>

          {/* Content — right column */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between" style={{ borderLeft: '3px solid var(--brand)' }}>
            <div>
              <div className="badge-category mb-4">{article.category}</div>
              <h2 className="font-display font-bold leading-tight mb-4 underline-draw"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--ink)', lineHeight: 1.2 }}>
                {article.title}
              </h2>

              {/* Decorative rule */}
              <div className="flex items-center gap-2 mb-4">
                <div style={{ flex: 1, height: 1, background: 'var(--paper-rule)' }} />
                <div style={{ width: 6, height: 6, background: 'var(--brand)', transform: 'rotate(45deg)' }} />
                <div style={{ flex: 1, height: 1, background: 'var(--paper-rule)' }} />
              </div>

              <p className="font-body-serif mb-6" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)' }}>
                {article.excerpt}
              </p>

              {/* Pull quote */}
              <div className="pull-quote" style={{ fontSize: '1rem', margin: '1.2rem 0' }}>
                "Cambodia's tech education sector is evolving rapidly to meet the demands of Industry 4.0."
              </div>
            </div>

            <div>
              <div className="rule-h-thin mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={article.authorAvatar} alt={article.author} className="rounded-full object-cover" style={{ width: 38, height: 38, filter: 'sepia(15%)' }} />
                  <div>
                    <p className="font-ui font-semibold" style={{ fontSize: 13, color: 'var(--ink)' }}>{article.author}</p>
                    <p className="font-ui" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{article.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-ui" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                  <Clock size={13} /> <span>{article.readTime}</span>
                </div>
              </div>
              <motion.div
                className="flex items-center gap-2 mt-4 font-ui font-semibold"
                style={{ color: 'var(--brand)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                whileHover={{ gap: 12 }}>
                Read Full Article <ArrowRight size={14} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Tilt3D>
    </div>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────
function ArticleCard({ article, index, onReadMore, variant = 'default' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const cardRef = useRef(null);

  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onReadMore(article)}
        className="cursor-pointer group flex gap-4 py-4"
        style={{ borderBottom: '1px solid var(--paper-rule)' }}
        whileHover={{ x: 4 }}>
        <div className="relative overflow-hidden shrink-0" style={{ width: 80, height: 68, borderRadius: 2 }}>
          <motion.img src={article.image} alt={article.title} className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} style={{ filter: 'sepia(10%)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="badge-category mb-1 font-ui" style={{ fontSize: 9 }}>{article.category}</div>
          <h4 className="font-display font-bold leading-tight line-clamp-2 underline-draw"
            style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.3 }}>
            {article.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
            <Clock size={10} /> {article.readTime}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={(e) => {
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect) { x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5); }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
        onClick={() => onReadMore(article)}
        className="cursor-pointer overflow-hidden folded-corner"
        style={{
          background: 'var(--paper)',
          border: hovered ? `1px solid ${BRAND}40` : '1px solid var(--paper-rule)',
          borderRadius: 2,
          boxShadow: hovered ? `0 24px 48px -12px rgba(0,0,0,0.14), 0 0 0 1px ${BRAND}15, 0 0 30px ${BRAND}08` : '0 2px 8px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'border 0.3s, box-shadow 0.3s, transform 0.3s',
        }}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <motion.img src={article.image} alt={article.title}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover" style={{ filter: 'sepia(8%) contrast(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />

          {/* 3D depth layer */}
          <motion.div animate={{ translateZ: hovered ? 20 : 0 }} style={{ position: 'absolute', top: 12, left: 12 }}>
            <span className="badge-ink" style={{ fontSize: 9 }}>{article.category}</span>
          </motion.div>

          {/* Hover ink overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--brand)' }} />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3 font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
            <Calendar size={10} /> {article.date}
            <span style={{ color: 'var(--paper-rule)' }}>|</span>
            <Clock size={10} /> {article.readTime}
          </div>

          <h3 className="font-display font-bold leading-tight mb-3 line-clamp-2"
            style={{ fontSize: '1.05rem', color: hovered ? 'var(--brand)' : 'var(--ink)', lineHeight: 1.3, transition: 'color 0.3s' }}>
            {article.title}
          </h3>
          <p className="font-body-serif line-clamp-3 mb-4" style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            {article.excerpt}
          </p>

          <div className="rule-h-thin mb-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={article.authorAvatar} alt={article.author} className="rounded-full object-cover" style={{ width: 24, height: 24, filter: 'sepia(15%)' }} />
              <span className="font-ui" style={{ fontSize: 11, color: 'var(--ink-muted)', fontWeight: 500 }}>{article.author}</span>
            </div>
            <div className="flex items-center gap-3 font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
              <span className="flex items-center gap-1"><Eye size={10} /> {article.views}</span>
              <span className="flex items-center gap-1"><Heart size={10} /> {article.likes}</span>
            </div>
          </div>

          <motion.div
            animate={{ x: hovered ? 4 : 0 }}
            className="flex items-center gap-1 mt-3 font-ui font-semibold"
            style={{ fontSize: 11, color: 'var(--brand)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Continue Reading <ArrowRight size={11} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ARTICLE DETAIL PAGE ──────────────────────────────────────────────────
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div className="reading-progress" style={{ scaleX, width: '100%' }} />;
}

function ArticleDetailPage({ article, onClose, allArticles, onReadMore }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = 'unset'; }; }, []);

  const relatedArticles = allArticles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  const latestNews = allArticles.filter(a => a.id !== article.id).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: '3%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '3%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: 'var(--paper)', fontFamily: 'EB Garamond, Georgia, serif' }}>

      <ReadingProgress />

      {/* Navigation bar */}
      <div className="sticky top-0 z-20" style={{ background: 'rgba(250,249,246,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--paper-rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button onClick={onClose} whileHover={{ x: -4 }}
            className="flex items-center gap-2 font-ui text-sm font-medium"
            style={{ color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Back to Articles
          </motion.button>
          <div className="font-display font-black text-lg tracking-tight" style={{ color: 'var(--ink)' }}>
            ADITI<span style={{ color: 'var(--brand)' }}>.</span>INSIGHT
          </div>
          <div className="flex items-center gap-2">
            {[Twitter, Linkedin, Facebook].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.15, color: BRAND }} whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: '1px solid var(--paper-rule)', cursor: 'pointer', padding: 6, borderRadius: 2, color: 'var(--ink-soft)', display: 'flex' }}>
                <Icon size={15} />
              </motion.button>
            ))}
          </div>
        </div>
        <div style={{ height: 3, background: 'var(--brand)', opacity: 0.8 }} />
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <Reveal>
          <span className="badge-ink inline-block mb-6" style={{ fontSize: 10 }}>{article.category}</span>
          <h1 className="font-display font-black leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            {article.title}
          </h1>

          <div className="masthead-rule mb-6" />

          <div className="flex items-center flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-3">
              <img src={article.authorAvatar} alt={article.author} className="rounded-full object-cover" style={{ width: 48, height: 48, filter: 'sepia(15%)' }} />
              <div>
                <p className="font-ui font-semibold" style={{ fontSize: 14, color: 'var(--ink)' }}>{article.author}</p>
                <p className="font-ui" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-ui" style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Eye size={12} /> {article.views.toLocaleString()} views</span>
            </div>
          </div>
        </Reveal>

        {/* Hero image */}
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden mb-10" style={{ borderRadius: 2 }}>
            <img src={article.image} alt={article.title} className="w-full" style={{ filter: 'sepia(8%) contrast(1.05)' }} />
            <p className="photo-caption">{article.category} · ADITI Academy Editorial</p>
          </div>
        </Reveal>

        {/* Body — newspaper columns on large */}
        <Reveal delay={0.2}>
          <div className="article-prose drop-cap" dangerouslySetInnerHTML={{ __html: article.content }} />
        </Reveal>

        {/* Engagement */}
        <div className="flex items-center justify-between pt-8 mt-10" style={{ borderTop: '2px solid var(--ink)' }}>
          <div className="flex gap-3">
            {[{ Icon: Heart, label: `${article.likes} Likes` }, { Icon: MessageCircle, label: `${article.comments} Comments` }].map(({ Icon, label }) => (
              <motion.button key={label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 font-ui font-medium"
                style={{ padding: '8px 18px', background: 'var(--paper-warm)', border: '1px solid var(--paper-rule)', cursor: 'pointer', fontSize: 13, color: 'var(--ink-muted)', borderRadius: 2 }}>
                <Icon size={15} style={{ color: 'var(--brand)' }} /> {label}
              </motion.button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.04 }} className="flex items-center gap-2 font-ui"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--ink-soft)' }}>
            <Share2 size={15} /> Share
          </motion.button>
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section style={{ background: 'var(--paper-warm)', borderTop: '1px solid var(--paper-rule)', borderBottom: '1px solid var(--paper-rule)', padding: '3rem 0' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="rule-h-brand mb-3" style={{ width: 40 }} />
                <h2 className="font-display font-bold" style={{ fontSize: '1.5rem', color: 'var(--ink)' }}>Related {article.category}</h2>
              </div>
              <button onClick={onClose} className="font-ui font-semibold flex items-center gap-1"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => onReadMore(a)}
                  className="cursor-pointer overflow-hidden"
                  style={{ background: 'var(--paper)', border: '1px solid var(--paper-rule)', borderRadius: 2 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                  <div className="overflow-hidden" style={{ height: 140 }}>
                    <motion.img src={a.image} alt={a.title} className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} style={{ filter: 'sepia(8%)' }} />
                  </div>
                  <div className="p-4">
                    <div className="badge-category mb-2 font-ui" style={{ fontSize: 9 }}>{a.category}</div>
                    <h3 className="font-display font-bold line-clamp-2" style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.3 }}>{a.title}</h3>
                    <div className="flex gap-2 mt-2 font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
                      <Clock size={10} /> {a.readTime}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter + More News */}
      <section style={{ background: 'var(--paper)', padding: '4rem 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Newsletter */}
          <Reveal>
            <div className="relative overflow-hidden mb-14 p-10 text-center"
              style={{ background: 'var(--ink)', borderRadius: 2 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--brand)' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 24px)', pointerEvents: 'none' }} />
              <Sparkles size={32} color={BRAND} className="mx-auto mb-4" />
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.8rem' }}>Never Miss an Insight</h3>
              <p className="font-body-serif mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Weekly dispatches on AI, cybersecurity, and the future of tech</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input type="email" placeholder="Your email address"
                  className="flex-1 px-4 py-3 font-ui text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: 0 }} />
                <motion.button whileHover={{ background: BRAND_DARK }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '12px 24px', background: 'var(--brand)', color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', border: 'none', cursor: 'pointer', textTransform: 'uppercase', borderRadius: 0 }}>
                  Subscribe
                </motion.button>
              </div>
              <p className="font-ui mt-4" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>No spam. Unsubscribe anytime.</p>
            </div>
          </Reveal>

          {/* More News */}
          <div className="rule-h mb-6" />
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold" style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>More Tech Insights</h2>
            <span className="font-ui" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Latest Edition</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news, i) => (
              <motion.div key={news.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => onReadMore(news)} className="cursor-pointer"
                whileHover={{ y: -4 }}>
                <div className="overflow-hidden mb-3" style={{ height: 130, borderRadius: 2 }}>
                  <motion.img src={news.image} alt={news.title} className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} style={{ filter: 'sepia(8%)' }} />
                </div>
                <div className="badge-category mb-2 font-ui" style={{ fontSize: 9 }}>{news.category}</div>
                <h4 className="font-display font-bold line-clamp-2 underline-draw" style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.35 }}>{news.title}</h4>
                <div className="flex items-center gap-2 mt-2 font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
                  <Calendar size={9} /> {news.date}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button onClick={onClose} whileHover={{ background: 'var(--ink)', color: 'white' }}
              className="font-ui font-semibold inline-flex items-center gap-2"
              style={{ padding: '14px 40px', border: '2px solid var(--ink)', color: 'var(--ink)', background: 'transparent', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 13, transition: 'all 0.3s' }}>
              Browse All Articles <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ─── TOPICS SECTION ───────────────────────────────────────────────────────
function TopicsSection() {
  const topics = [
    { icon: Brain, label: 'AI & Machine Learning' },
    { icon: Shield, label: 'Cybersecurity' },
    { icon: Cloud, label: 'Cloud Computing' },
    { icon: BarChart3, label: 'Data Science' },
    { icon: Cpu, label: 'DevOps' },
    { icon: Zap, label: 'Innovation' },
  ];

  return (
    <section style={{ background: 'var(--ink)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-14 relative z-10">
        <Reveal className="mb-12 text-center">
          <div className="font-ui text-white/30 mb-3" style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase' }}>Explore By Domain</div>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em' }}>
            Technology <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>Domains</span>
          </h2>
          <div style={{ width: 60, height: 2, background: 'var(--brand)', margin: '1rem auto 0' }} />
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((topic, i) => (
            <Reveal key={topic.label} delay={i * 0.08}>
              <Tilt3D intensity={12}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="text-center cursor-pointer py-8 px-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, transition: 'background 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(181,29,57,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(181,29,57,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <topic.icon size={22} color={BRAND} />
                  </div>
                  <span className="font-ui text-white/70" style={{ fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.4, display: 'block' }}>{topic.label}</span>
                </motion.div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────
function NewsletterSection() {
  return (
    <section style={{ background: 'var(--paper-warm)', padding: '5rem 0', borderTop: '1px solid var(--paper-rule)' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-ui mb-2" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Daily Dispatch</div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Stay <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>Updated</span>
          </h2>
          <p className="font-body-serif mb-8" style={{ color: 'var(--ink-muted)', fontSize: '1.1rem' }}>Get curated insights delivered to your inbox every week.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address"
              className="flex-1 px-5 py-3 font-ui text-sm outline-none"
              style={{ background: 'var(--paper)', border: '1px solid var(--paper-rule)', borderRadius: 0, color: 'var(--ink)' }} />
            <motion.button whileHover={{ background: BRAND_DARK }} whileTap={{ scale: 0.97 }}
              style={{ padding: '12px 28px', background: 'var(--brand)', color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', textTransform: 'uppercase', borderRadius: 0 }}>
              Subscribe
            </motion.button>
          </div>
          <p className="font-ui mt-4" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>No spam. Unsubscribe anytime.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export function InnovationInsightPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

  const featuredArticle = ALL_ARTICLES[0];
  const otherArticles = ALL_ARTICLES.slice(1);
  const filteredArticles = selectedCategory === 'All' ? otherArticles : otherArticles.filter(a => a.category === selectedCategory);
  const displayedArticles = showAllArticles ? filteredArticles : filteredArticles.slice(0, 6);

  // Split into main grid (left) + sidebar (right)
  const mainArticles = displayedArticles.slice(0, 4);
  const sidebarArticles = displayedArticles.slice(4, 6);

  return (
    
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)' }}>
      <GlobalStyles />
       
      <Navigation />
     
      <HeroSection className="mt-10"/>
      <TickerTape />


      {/* Category filter — newspaper section tabs */}
      <div className="sticky top-0 z-30" style={{ background: 'var(--paper)', borderBottom: '2px solid var(--ink)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => (
              <motion.button key={cat}
                onClick={() => { setSelectedCategory(cat); setShowAllArticles(false); }}
                whileTap={{ scale: 0.97 }}
                className="relative shrink-0 font-ui font-medium py-4 px-4"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: selectedCategory === cat ? 'var(--brand)' : 'var(--ink-soft)',
                  borderBottom: selectedCategory === cat ? `3px solid var(--brand)` : '3px solid transparent',
                  marginBottom: -2,
                  transition: 'color 0.2s',
                }}>
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured + Secondary layout */}
      <section style={{ background: 'var(--paper)', padding: '4rem 0' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
          {/* Edition line */}
          <div className="flex items-center gap-4 mb-2">
            <div style={{ flex: 1, height: 2, background: 'var(--ink)' }} />
            <span className="edition-header font-ui" style={{ letterSpacing: '0.3em', fontSize: 9 }}>FEATURED COVERAGE</span>
            <div style={{ flex: 1, height: 2, background: 'var(--ink)' }} />
          </div>

          <FeaturedArticle article={featuredArticle} onReadMore={setSelectedArticle} />
        </div>
      </section>

      {/* Latest Articles — Newspaper grid */}
      <section style={{ background: 'var(--paper-warm)', padding: '4rem 0', borderTop: '1px solid var(--paper-rule)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-14">
          {/* Section header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div style={{ width: 4, height: 28, background: 'var(--brand)' }} />
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>Latest Insights</h2>
              <div style={{ flex: 1, height: 1, background: 'var(--paper-rule)' }} />
              <span className="font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.2em', textTransform: 'uppercase', shrink: 0 }}>Current Edition</span>
            </div>
          </div>

          {/* Main grid + sidebar */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main articles — 3 col grid */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {mainArticles.map((article, idx) => (
                  <ArticleCard key={article.id} article={article} index={idx} onReadMore={setSelectedArticle} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4" style={{ borderLeft: '1px solid var(--paper-rule)', paddingLeft: '2rem' }}>
              {/* Sidebar header */}
              <div className="rule-h mb-4" />
              <div className="font-ui font-semibold mb-5" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Also in This Edition</div>

              {/* Compact article list */}
              {sidebarArticles.map((article, idx) => (
                <ArticleCard key={article.id} article={article} index={idx} onReadMore={setSelectedArticle} variant="compact" />
              ))}

              {/* Decorative aside */}
              <div className="mt-8 p-5 relative overflow-hidden" style={{ background: 'var(--paper)', border: '1px solid var(--paper-rule)', borderLeft: '4px solid var(--brand)' }}>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <Sparkles size={14} color={BRAND} />
                </div>
                <div className="font-ui font-semibold mb-2" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--brand)', textTransform: 'uppercase' }}>Editor's Note</div>
                <p className="font-body-serif" style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                  "The intersection of AI and education is reshaping careers. Stay informed."
                </p>
                <p className="font-ui mt-3" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>— ADITI Editorial Team</p>
              </div>

              {/* Stats card */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[['45+', 'Articles'], ['12+', 'Experts'], ['8.2K', 'Readers'], ['4+', 'Domains']].map(([val, label]) => (
                  <div key={label} className="text-center py-4"
                    style={{ background: 'var(--paper)', border: '1px solid var(--paper-rule)', borderTop: `3px solid var(--brand)` }}>
                    <div className="font-display font-bold" style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>{val}</div>
                    <div className="font-ui" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Load more */}
          {filteredArticles.length > 6 && !showAllArticles && (
            <div className="text-center mt-12">
              <motion.button onClick={() => setShowAllArticles(true)}
                whileHover={{ background: 'var(--ink)', color: 'white' }}
                whileTap={{ scale: 0.97 }}
                className="font-ui font-semibold inline-flex items-center gap-2"
                style={{ padding: '14px 40px', border: '2px solid var(--ink)', color: 'var(--ink)', background: 'transparent', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12, transition: 'all 0.3s' }}>
                Load More Articles ({filteredArticles.length - 6} remaining)
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <TopicsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />

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