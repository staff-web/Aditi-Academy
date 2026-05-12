import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  Code,
  Brain,
  Shield,
  Cloud,
  Database,
  Network,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const programs = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Master artificial intelligence with cutting-edge deep learning frameworks',
    courses: ['AI Engineer', 'Machine Learning', 'Deep Learning', 'NLP & Computer Vision'],
    gradient: 'from-purple-600 via-purple-700 to-pink-600',
    stats: { students: '1,200+', rating: '4.9' },
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Become a certified security expert with hands-on penetration testing',
    courses: ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'SOC Operations'],
    gradient: 'from-red-600 via-red-700 to-red-800',
    stats: { students: '1,800+', rating: '4.8' },
  },
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'Build scalable cloud infrastructure with AWS, Azure, and Google Cloud',
    courses: ['AWS Solutions', 'Azure Administrator', 'GCP Engineer', 'DevOps & CI/CD'],
    gradient: 'from-blue-600 via-blue-700 to-cyan-600',
    stats: { students: '1,500+', rating: '4.9' },
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Full-stack development with modern frameworks and best practices',
    courses: ['Web Development', 'Mobile Apps', 'API Design', 'System Architecture'],
    gradient: 'from-green-600 via-green-700 to-emerald-600',
    stats: { students: '2,100+', rating: '4.7' },
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Transform data into insights with advanced analytics and visualization',
    courses: ['Data Analysis', 'Big Data', 'Business Intelligence', 'Data Engineering'],
    gradient: 'from-indigo-600 via-indigo-700 to-violet-600',
    stats: { students: '1,400+', rating: '4.8' },
  },
  {
    icon: Network,
    title: 'Network Engineering',
    description: 'Design enterprise networks with Cisco certifications and protocols',
    courses: ['Cisco CCNA', 'Cisco CCNP', 'Network Security', 'Wireless Networks'],
    gradient: 'from-teal-600 via-teal-700 to-green-600',
    stats: { students: '900+', rating: '4.7' },
  },
];

export function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-40 bg-white overflow-hidden">
      {/* Background Elements - Removed to keep pure white */}

      <div className="relative max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-200 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-semibold">Our Programs</span>
          </div>

          <h2 className="text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            Professional{' '}
            <span className="text-red-600">
              Technology Training
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-leading certifications and hands-on training programs designed for real-world success
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full p-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-5 bg-gradient-to-br ${program.gradient} rounded-2xl shadow-lg relative`}>
                      <program.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600">{program.stats.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{program.stats.rating}</span>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="space-y-3 mb-6">
                    {program.courses.map((course, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center gap-3 text-gray-600 group-hover:text-gray-700 transition-colors"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${program.gradient}`} />
                        <span className="text-sm">{course}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More */}
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <a
            href="/programs"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-300"
          >
            View All Programs
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}