import { FormEvent } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Building2, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

export function EnterpriseTrainingPage() {
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
              <Building2 className="w-6 h-6" />
              <span className="ml-3 text-sm font-semibold uppercase tracking-[0.35em]">
                Enterprise Training
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Train your team with scalable skills programs.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Bespoke learning paths for organizations, institutions, and governments that need measurable impact and operational readiness.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#enterprise-registration"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-white font-semibold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-colors"
              >
                Request a Proposal
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center rounded-full border border-red-600 px-8 py-4 text-red-600 font-semibold hover:bg-red-50 transition-colors"
              >
                Explore Programs
              </Link>
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
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customized Programs</h2>
              <p className="text-gray-600 leading-relaxed">
                Tailor learning journeys to your team’s goals with cohort-based training and on-site delivery options.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact & Compliance</h2>
              <p className="text-gray-600 leading-relaxed">
                Align training with organizational KPIs, ESG goals, and compliance requirements for measurable outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Readiness</h2>
              <p className="text-gray-600 leading-relaxed">
                Build confidence across teams with practical simulations, certification prep, and employer-ready skill validation.
              </p>
            </motion.div>
          </div>

          <section id="enterprise-registration" className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-red-600 font-semibold mb-3">
                  Proposal Request
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Request Enterprise Training
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Share your training needs and organization details so we can propose the best program for your team.
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
                    Organization Name
                    <input
                      type="text"
                      name="organization"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Contact Person
                    <input
                      type="text"
                      name="contact"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    Phone Number
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Team Size / Cohort Size
                  <input
                    type="text"
                    name="teamSize"
                    placeholder="e.g. 10-25 employees"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Training Goals and Priorities
                  <textarea
                    name="requirements"
                    rows={5}
                    placeholder="Describe the skills or outcomes your team needs."
                    className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    We’ll prepare a proposal with pricing, timeline, and learning outcomes.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-white font-semibold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-colors"
                  >
                    Send Request
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
