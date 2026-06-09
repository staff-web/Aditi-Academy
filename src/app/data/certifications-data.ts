import {
  Shield,
  Terminal,
  Cloud,
  Search,
  Network,
  Lock,
  Cpu,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';

export interface CertificationCategory {
  id: string;
  name: string;
  acronym: string;
  path: string;
  icon: LucideIcon;
  color: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced' | 'Executive';
  duration: string;
  rating: number;
  reviews: string;
  description: string;
  longDescription: string;
  skills: string[];
  modules: number;
  labs: number;
  price: number;
  category: string;
  categoryLabel: string;
  image: string;           // Unsplash hero image for card
  badgeImage: string;      // Cert badge / logo image
  outcomes: string[];
  examInfo: string;
  whoShouldAttend: string;
}

export interface CertStat {
  value: string;
  label: string;
}

export interface CertFaq {
  q: string;
  a: string;
}

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

export const certificationCategories: CertificationCategory[] = [
  {
    id: 'ceh',
    name: 'Certified Ethical Hacker',
    acronym: 'C|EH',
    path: '/certifications/ceh',
    icon: Terminal,
    color: '#dc2626',
    level: 'Intermediate',
    duration: '5 Days',
    rating: 4.9,
    reviews: '12,400',
    category: 'ethical-hacking',
    categoryLabel: 'Ethical Hacking',
    description: 'Master the art of ethical hacking with hands-on labs in real-world attack vectors.',
    longDescription:
      'The C|EH program is the world\'s most advanced certified ethical hacking course. Covering 20 modules with 220+ hands-on labs, you\'ll learn to think and act like a hacker — legally. Trusted by the DoD, Fortune 500s, and governments worldwide.',
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'Social Engineering', 'Malware Analysis', 'Network Scanning'],
    modules: 20,
    labs: 220,
    price: 1999,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&q=80',
    outcomes: ['Penetration Tester', 'Security Analyst', 'Vulnerability Assessor', 'Network Defender'],
    examInfo: '4-hour exam · 125 questions · 70% passing score',
    whoShouldAttend:
      'Security officers, auditors, security professionals, site admins, and anyone concerned about network security.',
  },
  {
    id: 'cpent',
    name: 'Certified Penetration Testing Professional',
    acronym: 'C|PENT',
    path: '/certifications/cpent',
    icon: Shield,
    color: '#b91c1c',
    level: 'Advanced',
    duration: '6 Days',
    rating: 4.8,
    reviews: '5,200',
    category: 'pen-testing',
    categoryLabel: 'Pen Testing',
    description: 'Advanced penetration testing in live cyber ranges — IoT, OT, cloud, binary exploitation.',
    longDescription:
      'C|PENT is the only certification covering advanced pen testing across diverse domains including IoT, operational technology, cloud, and binary exploitation inside a live cyber range environment with real targets.',
    skills: ['Advanced Exploitation', 'IoT Hacking', 'Cloud Pen Testing', 'Binary Exploitation', 'Bypass Techniques'],
    modules: 14,
    labs: 100,
    price: 2499,
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&q=80',
    outcomes: ['Senior Penetration Tester', 'Red Team Lead', 'Security Consultant', 'Exploit Developer'],
    examInfo: '24-hour or 48-hour practical exam · Fully hands-on',
    whoShouldAttend:
      'Ethical hackers, pen testers, network server administrators, and security engineers seeking advanced credentials.',
  },
  {
    id: 'cciso',
    name: 'Certified Chief Information Security Officer',
    acronym: 'C|CISO',
    path: '/certifications/cciso',
    icon: Lock,
    color: '#991b1b',
    level: 'Executive',
    duration: '5 Days',
    rating: 4.9,
    reviews: '3,100',
    category: 'executive',
    categoryLabel: 'Executive Management',
    description: 'The only certification designed for executive-level security leaders and aspiring CISOs.',
    longDescription:
      'C|CISO bridges the gap between the business and technical security worlds. Covering governance, strategy, finance, and risk management from an executive perspective — built by CISOs, for CISOs.',
    skills: ['Governance & Risk', 'Security Program Management', 'Strategic Planning', 'Compliance', 'Budget Management'],
    modules: 5,
    labs: 40,
    price: 3499,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80',
    outcomes: ['CISO', 'VP of Security', 'Security Director', 'Security Manager'],
    examInfo: '2-hour exam · 150 questions · Multiple choice',
    whoShouldAttend:
      'Senior security professionals, CISOs, security directors, and executives responsible for information security programs.',
  },
  {
    id: 'ccse',
    name: 'Certified Cloud Security Engineer',
    acronym: 'C|CSE',
    path: '/certifications/ccse',
    icon: Cloud,
    color: '#dc2626',
    level: 'Advanced',
    duration: '5 Days',
    rating: 4.7,
    reviews: '4,800',
    category: 'cloud-security',
    categoryLabel: 'Cloud Security',
    description: 'Design and implement secure cloud infrastructure across AWS, Azure, and GCP.',
    longDescription:
      'C|CSE covers cloud security across the major hyperscalers — AWS, Azure, and GCP — with hands-on labs in cloud incident response, governance, compliance, and security architecture for multi-cloud environments.',
    skills: ['AWS Security', 'Azure Security', 'GCP Security', 'Cloud Forensics', 'Zero Trust Architecture'],
    modules: 16,
    labs: 85,
    price: 1999,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&q=80',
    outcomes: ['Cloud Security Engineer', 'Cloud Architect', 'DevSecOps Engineer', 'Cloud Consultant'],
    examInfo: '3-hour exam · 125 questions · 70% passing score',
    whoShouldAttend:
      'Network engineers, cloud administrators, and cybersecurity professionals transitioning to cloud environments.',
  },
  {
    id: 'chfi',
    name: 'Computer Hacking Forensic Investigator',
    acronym: 'C|HFI',
    path: '/certifications/chfi',
    icon: Search,
    color: '#b91c1c',
    level: 'Intermediate',
    duration: '5 Days',
    rating: 4.8,
    reviews: '7,900',
    category: 'forensics',
    categoryLabel: 'Computer Forensics',
    description: 'Detect, investigate, and prosecute cybercrime with advanced forensic techniques.',
    longDescription:
      'C|HFI provides a vendor-neutral approach to forensics across all major investigation scenarios — from disk and mobile forensics to dark web investigations and cloud forensics. Recognized by law enforcement worldwide.',
    skills: ['Digital Forensics', 'Mobile Forensics', 'Dark Web Investigation', 'Malware Forensics', 'Evidence Handling'],
    modules: 14,
    labs: 68,
    price: 1999,
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&q=80',
    outcomes: ['Forensic Investigator', 'Incident Responder', 'Law Enforcement', 'Security Analyst'],
    examInfo: '4-hour exam · 150 questions · 70% passing score',
    whoShouldAttend:
      'Police, government, corporate, and defense personnel involved in cybercrime investigations.',
  },
  {
    id: 'cnd',
    name: 'Certified Network Defender',
    acronym: 'C|ND',
    path: '/certifications/cnd',
    icon: Network,
    color: '#991b1b',
    level: 'Intermediate',
    duration: '5 Days',
    rating: 4.7,
    reviews: '6,300',
    category: 'network-security',
    categoryLabel: 'Network Security',
    description: 'Build bulletproof network defenses with threat intelligence and proactive security strategies.',
    longDescription:
      'C|ND is a vendor-neutral, hands-on credential covering network defense, threat intelligence, threat hunting, and endpoint security using real-world tools and techniques. Build the skills to defend at every layer.',
    skills: ['Network Defense', 'Threat Hunting', 'Endpoint Security', 'Threat Intelligence', 'Incident Response'],
    modules: 20,
    labs: 100,
    price: 1799,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&q=80',
    outcomes: ['Network Security Admin', 'SOC Analyst', 'Network Defender', 'IT Security Engineer'],
    examInfo: '4-hour exam · 100 questions · 70% passing score',
    whoShouldAttend:
      'Network administrators, security administrators, and anyone responsible for defending network infrastructure.',
  },
  {
    id: 'csa',
    name: 'Certified SOC Analyst',
    acronym: 'C|SA',
    path: '/certifications/csa',
    icon: AlertTriangle,
    color: '#dc2626',
    level: 'Foundation',
    duration: '3 Days',
    rating: 4.6,
    reviews: '8,500',
    category: 'soc',
    categoryLabel: 'SOC Analyst',
    description: 'Launch your SOC career with industry-recognized threat detection and response skills.',
    longDescription:
      'C|SA is the first step into a security operations center career. Learn to triage, monitor, and respond to threats in real-time using SIEM tools, threat intelligence, and incident response playbooks.',
    skills: ['SIEM Operations', 'Log Analysis', 'Threat Detection', 'Incident Triage', 'Threat Intelligence'],
    modules: 3,
    labs: 50,
    price: 999,
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&q=80',
    outcomes: ['SOC Analyst Tier 1', 'SOC Analyst Tier 2', 'Threat Analyst', 'Security Monitoring Engineer'],
    examInfo: '2-hour exam · 100 questions · 70% passing score',
    whoShouldAttend:
      'IT professionals and recent graduates aiming to enter a security operations center environment.',
  },
  {
    id: 'ecde',
    name: 'Certified DevSecOps Engineer',
    acronym: 'E|CDE',
    path: '/certifications/ecde',
    icon: Cpu,
    color: '#b91c1c',
    level: 'Advanced',
    duration: '5 Days',
    rating: 4.8,
    reviews: '2,900',
    category: 'devsecops',
    categoryLabel: 'DevSecOps',
    description: 'Embed security into every stage of the software development lifecycle.',
    longDescription:
      'E|CDE teaches engineers to integrate security practices into CI/CD pipelines, container security, IaC scanning, and cloud-native application security — the modern shift-left security approach.',
    skills: ['CI/CD Security', 'Container Security', 'IaC Scanning', 'SAST/DAST', 'Secret Management'],
    modules: 12,
    labs: 80,
    price: 2199,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    badgeImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80',
    outcomes: ['DevSecOps Engineer', 'AppSec Engineer', 'Cloud Security Engineer', 'Platform Security Lead'],
    examInfo: '3-hour exam · 100 questions · 70% passing score',
    whoShouldAttend:
      'Software developers, DevOps engineers, and security professionals looking to integrate security into development pipelines.',
  },
];

export const certificationStats: CertStat[] = [
  { value: '350K+', label: 'Certified Professionals' },
  { value: '140+', label: 'Countries' },
  { value: '20+', label: 'Years of Excellence' },
  { value: '#1', label: 'Ethical Hacking Cert' },
];

export const certificationFaqs: CertFaq[] = [
  {
    q: 'Are these certifications globally recognized?',
    a: 'Yes. Our certifications are recognized and accepted by the U.S. Department of Defense, FBI, Fortune 500 companies, and government agencies across 140+ countries worldwide.',
  },
  {
    q: 'What are the prerequisites for enrollment?',
    a: 'Prerequisites vary by certification level. Foundation-level certs require no prior experience. Intermediate and Advanced certifications recommend 2+ years of IT or security experience. All requirements are listed on each certification page.',
  },
  {
    q: 'What delivery formats are available?',
    a: 'All certifications are available as Live Online (instructor-led), In-Person classroom training, and Self-Paced on-demand learning. You can choose the format that best fits your schedule.',
  },
  {
    q: 'How long is my certification valid?',
    a: 'Certifications are valid for 3 years. You can renew through our EC-Council Continuing Education (ECE) credits program, which allows you to stay current without re-taking the full exam.',
  },
  {
    q: 'Is the exam included in the program fee?',
    a: 'Yes — the official exam voucher is included in the program fee for most certifications. This covers one exam attempt at any authorized Pearson VUE testing center or online proctored environment.',
  },
  {
    q: 'Can my employer pay for my certification?',
    a: 'Absolutely. We provide corporate invoicing, purchase order support, and group enrollment discounts for teams of 5 or more. Contact our enterprise team for a custom quote.',
  },
];