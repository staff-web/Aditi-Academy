import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Users,
  Video,
  Laptop,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router';

const services = [
  {
    icon: Laptop,
    title: 'On-Demand Training',
    description:
      'Self-paced training programs with structured content for flexible learning.',
    features: ['24/7 Access', 'Self-Paced', 'Comprehensive Materials'],
  },
  {
    icon: Video,
    title: 'Live Training / Short Courses',
    description:
      'Instructor-led training focused on real-world applications.',
    features: ['Expert Instructors', 'Interactive Sessions', 'Real-World Projects'],
  },
  {
    icon: Users,
    title: 'Group Training',
    description: 'Customized programs tailored for teams and organizations.',
    features: ['Custom Curriculum', 'Team Building', 'Flexible Schedule'],
  },
  {
    icon: Building2,
    title: 'Digital Training (E-Learning)',
    description: 'Scalable learning solution for large organizations.',
    features: ['Enterprise LMS', 'Progress Tracking', 'Certification Management'],
  },
];

export function EnterpriseSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    trainingInterest: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

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
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enterprise &{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Corporate Training
            </span>{' '}
            Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower your organization with cutting-edge technology training
            programs designed for enterprise-scale success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA and Form Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Why Choose ADITI Academy?
            </h3>
            <div className="space-y-4">
              {[
                'Industry-leading instructors with real-world experience',
                'Customizable curriculum aligned with your business goals',
                'Flexible delivery formats: onsite, online, or hybrid',
                'Comprehensive post-training support and resources',
                'Measurable ROI through skills assessment and tracking',
                'Enterprise-grade LMS and reporting dashboard',
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/enterprise"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold shadow-2xl shadow-red-900/50 hover:shadow-red-900/70 transition-all duration-300"
              >
                Learn More About Enterprise Solutions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Get a Quote Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name *"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="Location *"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  required
                />
                <textarea
                  placeholder="Training Interest / Requirements *"
                  value={formData.trainingInterest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainingInterest: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all resize-none"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold shadow-xl shadow-red-900/50 hover:shadow-2xl hover:shadow-red-900/70 transition-all duration-300"
                >
                  Submit Request
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />
      <div className="relative h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-red-900/50 transition-all duration-300">
        <service.icon className="w-10 h-10 text-red-500 mb-4" />
        <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
        <p className="text-sm text-gray-400 mb-4">{service.description}</p>
        <div className="space-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-1 h-1 rounded-full bg-red-600" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}