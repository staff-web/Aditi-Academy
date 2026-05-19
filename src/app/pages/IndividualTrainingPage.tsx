import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Users, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';

export function IndividualTrainingPage() {
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const course = searchParams.get('course')?.trim();
    if (course) {
      setSelectedCourse(course);
    }
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mx-auto max-w-3xl"
          >
            <div className="inline-flex items-center justify-center mb-6 rounded-full bg-red-600/10 p-4 text-red-700">
              <Users className="w-6 h-6" />
              <span className="ml-3 text-sm font-semibold uppercase tracking-[0.35em]">
                Individual Training
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn the tech skills that land jobs faster.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Flexible short courses, mentorship, and applied projects designed for students and early career professionals who want real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-white font-semibold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-colors"
              >
                View Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#individual-registration"
                className="inline-flex items-center justify-center rounded-full border border-red-600 px-8 py-4 text-red-600 font-semibold hover:bg-red-50 transition-colors"
              >
                Register Now
              </a>
            </div>
          </motion.div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill-Building Courses</h2>
              <p className="text-gray-600 leading-relaxed">
                Industry-aligned tracks in software development, cloud, cybersecurity, and data analytics for rapid career readiness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentorship & Support</h2>
              <p className="text-gray-600 leading-relaxed">
                One-to-one coaching, resume guidance, interview prep, and career planning for every learner.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project-Based Learning</h2>
              <p className="text-gray-600 leading-relaxed">
                Build real-world projects that demonstrate your skills to employers, with feedback from industry trainers.
              </p>
            </motion.div>
          </div>

          <section id="individual-registration" className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-red-600 font-semibold mb-3">
                  Registration Form
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Register for Individual Training
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Submit your details and our enrollment team will reach out with course recommendations and next steps.
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid gap-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Full Name
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Phone Number
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Preferred Course Track
                    <select
                      name="course"
                      value={selectedCourse}
                      onChange={(event) => setSelectedCourse(event.target.value)}
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    >
                      <option value="">Choose one</option>
                      <option value="AI Engineer">AI Engineer</option>
                      <option value="Ethical Hacking">Ethical Hacking</option>
                      <option value="AWS Solutions Architect">AWS Solutions Architect</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Corporate Digital Transformation">Corporate Digital Transformation</option>
                      <option value="Government Cyber Resilience">Government Cyber Resilience</option>
                    </select>
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Tell us about your goals
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="What do you want to achieve with this training?"
                    className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    We'll follow up with course details, pricing, and an enrollment plan.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-white font-semibold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </motion.form>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
