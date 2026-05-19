import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Award, Clock, CheckCircle, User, Bell, Target, Trophy, BookOpen, Calendar, Globe } from 'lucide-react';
import { Footer } from '../components/Footer';

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
              Explore{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                More
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover opportunities, resources, and insights to accelerate your technology career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Bell className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Announcements</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-red-600">Updates</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">New Course Launch</h3>
              <p className="text-gray-600 mb-4">Advanced AI Engineering course now available with hands-on projects.</p>
              <span className="text-red-600 font-semibold">Learn More →</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scholarship Program</h3>
              <p className="text-gray-600 mb-4">Limited scholarships available for deserving students.</p>
              <span className="text-red-600 font-semibold">Apply Now →</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Partnership</h3>
              <p className="text-gray-600 mb-4">New collaboration with leading tech companies for internships.</p>
              <span className="text-red-600 font-semibold">Read More →</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Test Your Career Path */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Target className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Career Assessment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Test Your <span className="text-red-600">Career Path</span>
            </h2>
            <p className="text-xl text-gray-600">
              Discover your ideal technology career path with our comprehensive assessment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto"
          >
            <Target className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Path Assessment</h3>
            <p className="text-gray-600 mb-6">
              Take our 10-minute assessment to identify your strengths, interests, and ideal career path in technology.
            </p>
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300">
              Start Assessment
            </button>
          </motion.div>
        </div>
      </section>

      {/* Competition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Competitions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tech <span className="text-red-600">Competitions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Challenge yourself and showcase your skills in exciting technology competitions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coding Challenge</h3>
              <p className="text-gray-600 mb-4">
                Monthly coding competitions with prizes and internship opportunities.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-semibold">Prize: $500</span>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Join Now
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation Hackathon</h3>
              <p className="text-gray-600 mb-4">
                48-hour hackathon to solve real-world problems with technology.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-semibold">Prize: $1,000</span>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Register
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scholarship Program */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Award className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Scholarships</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Scholarship <span className="text-red-600">Program</span>
            </h2>
            <p className="text-xl text-gray-600">
              Financial support for deserving students pursuing technology education
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Financial need</li>
                  <li>• Academic excellence</li>
                  <li>• Passion for technology</li>
                  <li>• Commitment to community</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coverage</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Full/Partial tuition</li>
                  <li>• Learning materials</li>
                  <li>• Certification fees</li>
                  <li>• Career support</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                Apply for Scholarship
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Consult */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Calendar className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Career Consult</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Career <span className="text-red-600">Consultation</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get personalized career guidance from industry experts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-8 rounded-xl max-w-2xl mx-auto text-center"
          >
            <Calendar className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Your Session</h3>
            <p className="text-gray-600 mb-6">
              Schedule a one-on-one consultation with our career advisors to discuss your goals and create a personalized development plan.
            </p>
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300">
              Send Schedule for Booking
            </button>
          </motion.div>
        </div>
      </section>

      {/* Digital Transformation Blog */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
              <Globe className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">Blog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Digital Transformation <span className="text-red-600">Blog</span>
            </h2>
            <p className="text-xl text-gray-600">
              Latest insights on technology trends, industry updates, and student success stories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI in Education</h3>
              <p className="text-gray-600 mb-4">
                How artificial intelligence is revolutionizing learning experiences.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cloud Migration Success</h3>
              <p className="text-gray-600 mb-4">
                Real case study of a company's digital transformation journey.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student Spotlight</h3>
              <p className="text-gray-600 mb-4">
                Success stories from our graduates making impact in the industry.
              </p>
              <span className="text-red-600 font-semibold">Read Article →</span>
            </motion.div>
          </div>
        </div>
      </section>

       <Footer />
    </div>
  );
}
