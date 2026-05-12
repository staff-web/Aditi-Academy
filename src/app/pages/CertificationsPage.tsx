import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Award, Clock, CheckCircle, User } from 'lucide-react';

const certifications = [
  {
    name: 'Certified Ethical Hacker (CEH)',
    provider: 'EC-Council',
    code: 'CEH-312-50',
    duration: '4 Hours',
    passingScore: '70%',
    instructor: 'Senior Cybersecurity Expert',
    color: 'from-red-600 to-rose-600',
    topics: [
      'Network Security',
      'Penetration Testing',
      'Security Protocols',
      'Threat Analysis',
    ],
  },
  {
    name: 'AWS Certified Solutions Architect',
    provider: 'Amazon Web Services',
    code: 'SAA-C03',
    duration: '130 Minutes',
    passingScore: '720/1000',
    instructor: 'AWS Certified Instructor',
    color: 'from-orange-600 to-amber-600',
    topics: [
      'Cloud Architecture',
      'Security & Compliance',
      'Cost Optimization',
      'Migration Strategies',
    ],
  },
  {
    name: 'Project Management Professional (PMP)',
    provider: 'PMI',
    code: 'PMP-2024',
    duration: '230 Minutes',
    passingScore: 'Above Target',
    instructor: 'PMP Certified Professional',
    color: 'from-blue-600 to-cyan-600',
    topics: [
      'Project Planning',
      'Risk Management',
      'Agile Methodologies',
      'Stakeholder Engagement',
    ],
  },
  {
    name: 'Cisco Certified Network Associate (CCNA)',
    provider: 'Cisco',
    code: 'CCNA-200-301',
    duration: '120 Minutes',
    passingScore: '825/1000',
    instructor: 'Cisco Certified Expert',
    color: 'from-cyan-600 to-blue-600',
    topics: [
      'Network Fundamentals',
      'IP Connectivity',
      'Security Fundamentals',
      'Automation & Programmability',
    ],
  },
  {
    name: 'Oracle Database Administrator',
    provider: 'Oracle',
    code: 'OCA-1Z0-082',
    duration: '120 Minutes',
    passingScore: '60%',
    instructor: 'Oracle Certified Master',
    color: 'from-red-700 to-red-600',
    topics: [
      'Database Architecture',
      'Backup & Recovery',
      'Performance Tuning',
      'Security Management',
    ],
  },
  {
    name: 'Certified Data Scientist',
    provider: 'Data Science Council',
    code: 'CDS-2024',
    duration: '180 Minutes',
    passingScore: '75%',
    instructor: 'Lead Data Scientist',
    color: 'from-purple-600 to-violet-600',
    topics: [
      'Machine Learning',
      'Statistical Analysis',
      'Data Visualization',
      'Big Data Technologies',
    ],
  },
];

export function CertificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 mx-auto">
                <Award className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Industry-recognized credentials that validate your expertise and
              accelerate your career growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.code} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${cert.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Background Accent */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cert.color} opacity-5 blur-3xl`}
        />

        {/* Header */}
        <div className="relative mb-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${cert.color} rounded-xl mb-4`}
          >
            <Award className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">
              {cert.provider}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {cert.name}
          </h3>
          <p className="text-red-600 font-mono text-sm">Code: {cert.code}</p>
        </div>

        {/* Exam Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div
              className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center`}
            >
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">{cert.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div
              className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center`}
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Passing Score</p>
              <p className="font-semibold text-gray-900">{cert.passingScore}</p>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl mb-6 border border-gray-100">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center`}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Instructor</p>
            <p className="font-semibold text-gray-900">{cert.instructor}</p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-semibold text-gray-700">Key Topics:</p>
          <div className="grid grid-cols-2 gap-2">
            {cert.topics.map((topic, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cert.color}`}
                />
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-4 bg-gradient-to-r ${cert.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          Enroll Now
        </motion.button>
      </div>
    </motion.div>
  );
}
