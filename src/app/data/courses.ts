export type Course = {
  slug: string;
  title: string;
  category: 'Individual' | 'Enterprise';
  description: string;
  details: string[];
};

export const courses: Course[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Individual',
    description:
      'Practical AI training for software engineers, data scientists, and automation specialists.',
    details: [
      'Hands-on machine learning labs and model deployment.',
      'Real world AI project with mentoring support.',
      'Certification prep for AI engineering roles.',
    ],
  },
  {
    slug: 'ethical-hacking',
    title: 'Ethical Hacking',
    category: 'Individual',
    description:
      'Hands-on cybersecurity training for penetration testing, network security, and defensive strategies.',
    details: [
      'Live hacking labs and red-team simulations.',
      'Network defense and incident response training.',
      'Industry certification readiness.',
    ],
  },
  {
    slug: 'aws-solutions-architect',
    title: 'AWS Solutions Architect',
    category: 'Individual',
    description:
      'Cloud architecture and infrastructure training for career-ready cloud professionals.',
    details: [
      'Design and deploy scalable AWS infrastructures.',
      'Cloud automation and cost optimization practices.',
      'Best practices for security and performance.',
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    category: 'Individual',
    description:
      'Learn data visualization, analysis, and business intelligence tools to make data-driven decisions.',
    details: [
      'Data storytelling with dashboards and reporting.',
      'Tools for cleaning, transforming, and modeling data.',
      'Analytics workflows for business outcomes.',
    ],
  },
  {
    slug: 'corporate-digital-transformation',
    title: 'Corporate Digital Transformation',
    category: 'Enterprise',
    description:
      'Training for large teams on digital workflows, cloud adoption, and enterprise IT modernization.',
    details: [
      'Scalable learning roadmaps for teams.',
      'Modernization strategies for digital operating models.',
      'Change management and upskilling support.',
    ],
  },
  {
    slug: 'government-cyber-resilience',
    title: 'Government Cyber Resilience',
    category: 'Enterprise',
    description:
      'Elevate public-sector cybersecurity readiness and staff capabilities with tailored enterprise programs.',
    details: [
      'Compliance-focused security frameworks.',
      'Incident preparedness for public sector teams.',
      'Secure architecture and threat defense training.',
    ],
  },
];
