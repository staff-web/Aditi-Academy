import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Award, Users, TrendingUp, Check, Star } from 'lucide-react';
import { useRef } from 'react';

const stats = [
  { number: '98%', label: 'Satisfaction Rate', icon: Star },
  { number: '15+', label: 'Years Experience', icon: Award },
  { number: '50+', label: 'Expert Instructors', icon: Users },
  { number: '100+', label: 'Training Programs', icon: TrendingUp },
];

const features = [
  'Industry-Certified Programs',
  'Hands-On Training',
  'Lifetime Support',
  'Job Placement Assistance',
];

export function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
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
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trusted by Professionals,{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Government & Enterprises
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading organizations worldwide choose ADITI Academy for excellence in technology training
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative p-8 bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex p-3 bg-red-50 rounded-xl mb-4 border border-red-100">
                    <stat.icon className="w-6 h-6 text-red-600" />
                  </div>

                  {/* Number */}
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                <Check className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-red-600" />
            <div className="text-left">
              <div className="text-gray-900 font-bold text-lg">Certified & Accredited</div>
              <div className="text-gray-600 text-sm">Recognized by leading technology organizations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}