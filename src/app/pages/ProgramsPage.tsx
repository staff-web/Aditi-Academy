import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProgramsSection } from '../components/landing/ProgramsSection';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export function ProgramsPage() {
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
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Training Programs
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive technology training tailored to your career stage
              and professional goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section with Dark Background */}
      <div className="bg-black">
        <ProgramsSection />
      </div>

      <Footer />
    </div>
  );
}
