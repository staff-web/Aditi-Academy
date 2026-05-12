import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { Users, Briefcase, Building2, Store, Globe } from 'lucide-react';

const milestones = [
  {
    icon: Users,
    count: 1500,
    suffix: '+',
    label: 'IT Students',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Briefcase,
    count: 600,
    suffix: '+',
    label: 'IT Professionals',
    color: 'from-red-600 to-red-500',
  },
  {
    icon: Building2,
    count: 500,
    suffix: '+',
    label: 'Government Officers',
    color: 'from-red-700 to-red-600',
  },
  {
    icon: Store,
    count: 600,
    suffix: '+',
    label: 'SMEs',
    color: 'from-red-800 to-red-700',
  },
  {
    icon: Globe,
    count: 1000,
    suffix: '+',
    label: 'General Public',
    color: 'from-red-900 to-red-800',
  },
];

export function MilestonesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements - Removed to keep pure white */}

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/50 mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact in{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Empowering thousands across Southeast Asia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.label}
              milestone={milestone}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  index,
  isInView,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${milestone.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-xl transition-all duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className={`w-14 h-14 bg-gradient-to-br ${milestone.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
        >
          <milestone.icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Count */}
        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          {isInView ? (
            <>
              <CountUp end={milestone.count} duration={2.5} delay={index * 0.1} />
              {milestone.suffix}
            </>
          ) : (
            '0' + milestone.suffix
          )}
        </div>

        {/* Label */}
        <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
          {milestone.label}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className={`mt-4 h-1 bg-gradient-to-r ${milestone.color} rounded-full origin-left`}
        />
      </div>
    </motion.div>
  );
}