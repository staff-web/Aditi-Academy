import { motion } from 'motion/react';
import {
  Users,
  Briefcase,
  Trophy,
  BookOpen,
  Target,
  Globe,
  Award,
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Mentorship & Coaching',
    description: 'One-on-one guidance from industry experts',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    description: 'Real-world experience with leading companies',
  },
  {
    icon: Trophy,
    title: 'Hands-On Projects',
    description: 'Work on real-world projects to build career-ready skills',
  },
  {
    icon: BookOpen,
    title: 'Industry Case Studies',
    description: 'Learn from real business challenges',
  },
  {
    icon: Target,
    title: 'Soft Skills & Goal Setting',
    description: 'Develop essential professional capabilities',
  },
  {
    icon: Globe,
    title: 'Global Opportunities',
    description: 'Connect with international tech community',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Industry-recognized credentials',
  },
];

export function CareerBoostSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements - Removed to keep pure white */}

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Boost Program
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support system designed to accelerate your
            professional growth and open doors to new opportunities
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
            {benefits.map((benefit, index) => (
              <CareerCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {benefits.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-red-600 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative flex-shrink-0 w-80 snap-start"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

      {/* Card */}
      <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-8 hover:border-red-300 hover:shadow-xl transition-all duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
        >
          <benefit.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-700 group-hover:bg-clip-text transition-all duration-300">
          {benefit.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
          {benefit.description}
        </p>

        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-b-2xl origin-left"
        />
      </div>
    </motion.div>
  );
}