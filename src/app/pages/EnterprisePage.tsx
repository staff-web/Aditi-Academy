import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { EnterpriseSection } from '../components/landing/EnterpriseSection';
import { motion } from 'motion/react';
import { Building2, Users, TrendingUp, Award } from 'lucide-react';

const stats = [
  { icon: Building2, value: '200+', label: 'Enterprise Clients' },
  { icon: Users, value: '50K+', label: 'Employees Trained' },
  { icon: TrendingUp, value: '95%', label: 'Client Retention' },
  { icon: Award, value: '15+', label: 'Years Experience' },
];

const clients = [
  'Government Ministries',
  'Financial Institutions',
  'Technology Companies',
  'Healthcare Organizations',
  'Manufacturing SMEs',
  'Educational Institutions',
];

export function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.5) 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 mx-auto">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Training Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Transform your workforce with customized, enterprise-scale
              technology training programs designed to drive business results
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-900/50">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600">
              Partnering with industry leaders across Southeast Asia
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-red-600 hover:shadow-xl transition-all duration-300"
              >
                <p className="font-semibold text-gray-900">{client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Organizations Through Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our enterprise training solutions are designed to address the
                unique challenges faced by organizations in today's digital
                landscape. We work closely with you to develop customized
                programs that align with your business objectives and
                technological requirements.
              </p>
              <div className="space-y-4">
                {[
                  'Tailored curriculum development',
                  'Flexible scheduling and delivery',
                  'Dedicated account management',
                  'Progress tracking and analytics',
                  'Post-training support',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl opacity-10 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1683701251422-912fe98f2b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NTQyNDE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Enterprise Training"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Section with Form */}
      <div className="bg-black">
        <EnterpriseSection />
      </div>

      <Footer />
    </div>
  );
}
