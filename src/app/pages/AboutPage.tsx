import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useRef } from 'react';
import {
  Target,
  Zap,
  Award,
  TrendingUp,
  Code,
  Shield,
  Cloud,
  Database,
  Users,
  CheckCircle,
  Sparkles,
  Trophy,
  GraduationCap,
  Star,
} from 'lucide-react';

const skills = [
  { icon: Code, name: 'Software Development', level: 95, color: 'from-blue-600 to-cyan-600' },
  { icon: Shield, name: 'Cybersecurity', level: 98, color: 'from-red-600 to-orange-600' },
  { icon: Cloud, name: 'Cloud Computing', level: 92, color: 'from-purple-600 to-pink-600' },
  { icon: Database, name: 'Data Science', level: 90, color: 'from-green-600 to-emerald-600' },
];

const achievements = [
  { number: '4,200+', label: 'Professionals Trained', icon: Users },
  { number: '400+', label: 'Partner Organizations', icon: Trophy },
  { number: '98%', label: 'Success Rate', icon: Star },
  { number: '50+', label: 'Expert Instructors', icon: GraduationCap },
];

const certifications = [
  {
    title: 'EC-Council',
    description: 'Certified Ethical Hacker (CEH)',
    gradient: 'from-red-600 to-orange-600',
  },
  {
    title: 'AWS',
    description: 'Solutions Architect Professional',
    gradient: 'from-orange-600 to-amber-600',
  },
  {
    title: 'Microsoft',
    description: 'Azure Cloud Expert',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Google',
    description: 'Cloud Professional',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    title: 'Cisco',
    description: 'CCNA & CCNP Certified',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'CompTIA',
    description: 'Security+ Certified',
    gradient: 'from-purple-600 to-pink-600',
  },
];

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.5) 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 via-red-700 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-600/30 mx-auto">
                <span className="text-white text-4xl font-bold">A</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              About{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                ADITI Academy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Leading technology training institution empowering professionals worldwide with cutting-edge skills and industry certifications
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
                <span className="text-red-600 font-semibold">Who We Are</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Technology Education <span className="text-red-600">Experts</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                ADITI Academy is a premier technology training institution dedicated to bridging the skills gap in the digital age. We provide comprehensive, hands-on training programs in AI, cybersecurity, cloud computing, and software development.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our mission is to empower individuals and organizations with the technical expertise needed to thrive in today's rapidly evolving technology landscape.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="text-gray-700 font-medium">Industry Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="text-gray-700 font-medium">Expert Instructors</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {[Target, Zap, Award, TrendingUp].map((Icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300"
                  >
                    <Icon className="w-12 h-12 text-red-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {i === 0 && 'Mission Driven'}
                      {i === 1 && 'Innovation'}
                      {i === 2 && 'Excellence'}
                      {i === 3 && 'Growth'}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <span className="text-red-600 font-semibold">Our Expertise</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Core <span className="text-red-600">Technology Skills</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training across the most in-demand technology domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 bg-gradient-to-br ${skill.color} rounded-xl shadow-lg`}>
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{skill.level}%</div>
                </div>

                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <span className="text-red-600 font-semibold">Notable Achievements</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-red-600">Impact</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 text-center"
              >
                <achievement.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-5xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <span className="text-red-600 font-semibold">Education & Credentials</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Accredited <span className="text-red-600">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized by leading technology organizations and educational institutions worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'International Accreditation', desc: 'Globally recognized certification programs' },
              { title: 'Industry Partnerships', desc: 'Collaborations with tech leaders' },
              { title: 'Quality Assurance', desc: 'ISO 9001:2015 certified processes' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300"
              >
                <GraduationCap className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <span className="text-red-600 font-semibold">Professional Certifications</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Industry <span className="text-red-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Authorized training partner for the world's leading technology certification programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.gradient} opacity-5 blur-2xl`} />
                <div className="relative">
                  <div className={`inline-block p-3 bg-gradient-to-br ${cert.gradient} rounded-xl mb-4 shadow-lg`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-gray-600">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
