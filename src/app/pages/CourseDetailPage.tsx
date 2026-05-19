import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ArrowRight, BookOpen } from 'lucide-react';
import { courses } from '../data/courses';

export function CourseDetailPage() {
  const params = useParams();
  const course = courses.find((item) => item.slug === params.courseSlug);

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Course Not Found</h1>
          <p className="text-gray-600 mb-8">
            This course page does not exist. Please return to the programs page and select a valid course.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Back to Programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center mb-6 rounded-full bg-red-600/10 px-5 py-3 text-red-700">
              <BookOpen className="w-6 h-6" />
              <span className="ml-3 text-sm font-semibold uppercase tracking-[0.35em]">
                {course.category} Course
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              {course.description}
            </p>
            <Link
              to={`/training/individual?course=${encodeURIComponent(course.title)}`}
              className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-white font-semibold hover:bg-red-700 transition-colors"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-20 grid gap-8 lg:grid-cols-3"
          >
            {course.details.map((detail) => (
              <div key={detail} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{detail}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              View all available courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
