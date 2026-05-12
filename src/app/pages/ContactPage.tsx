import { useState } from 'react';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
} from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

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
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to transform your career or organization? Let's start the
              conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info - 2 columns */}
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <ContactCard
                    icon={Phone}
                    title="Phone"
                    content="+855(0) 10 879 955"
                    color="from-blue-600 to-cyan-600"
                  />
                  <ContactCard
                    icon={Mail}
                    title="Email"
                    content="academy@aditi.com.kh"
                    color="from-red-600 to-rose-600"
                  />
                  <ContactCard
                    icon={MapPin}
                    title="Location"
                    content="Phnom Penh, Cambodia"
                    color="from-green-600 to-emerald-600"
                  />
                  <ContactCard
                    icon={Clock}
                    title="Business Hours"
                    content="Mon - Fri: 8:00 AM - 6:00 PM"
                    color="from-purple-600 to-violet-600"
                  />
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <SocialButton icon={Facebook} href="#" label="Facebook" />
                    <SocialButton icon={Linkedin} href="#" label="LinkedIn" />
                    <SocialButton icon={Instagram} href="#" label="Instagram" />
                    <SocialButton icon={Send} href="#" label="Telegram" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-red-300 hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold shadow-xl shadow-red-900/30 hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl opacity-10 blur-2xl" />
            <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-4 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">
                    Phnom Penh, Cambodia
                  </p>
                  <p className="text-gray-500 text-sm">Map integration available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  content,
  color,
}: {
  icon: any;
  title: string;
  content: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
    >
      <div
        className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </motion.div>
  );
}

function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-200 hover:border-red-600 hover:from-red-50 hover:to-red-100 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
    </motion.a>
  );
}
