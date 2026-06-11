import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Facebook,
  Linkedin,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react';

const logoUrl = new URL('../../assets/logo.png', import.meta.url).href;

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-900 overflow-hidden">
      {/* 3D Animated Background Elements - VISIBLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 3D Rotating Cubes */}
        <motion.div
          animate={{
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0],
            rotateZ: [0, 360, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -top-20 -left-20 w-40 h-40"
        >
          <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl border border-red-500/30 backdrop-blur-sm"
               style={{ transform: "rotateX(45deg) rotateY(45deg)" }} />
        </motion.div>

        <motion.div
          animate={{
            rotateX: [0, -360, 0],
            rotateY: [0, 360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute -bottom-20 -right-20 w-56 h-56"
        >
          <div className="w-full h-full bg-gradient-to-tl from-red-500/15 to-red-600/5 rounded-full border border-red-500/20 backdrop-blur-sm"
               style={{ transform: "rotateX(60deg) rotateY(30deg)" }} />
        </motion.div>

        {/* 3D Floating Cards */}
        <motion.div
          initial={{ y: 0, rotateX: 0 }}
          animate={{ y: [0, -20, 0], rotateX: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute top-1/4 left-[5%] w-32 h-40"
        >
          <div className="w-full h-full bg-gray-900/80 backdrop-blur-md rounded-xl border border-red-500/30 shadow-2xl"
               style={{ transform: "rotateY(25deg) rotateX(10deg)" }}>
            <div className="p-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg mb-2" />
              <div className="h-1.5 bg-red-500/30 rounded w-3/4 mb-1.5" />
              <div className="h-1.5 bg-red-500/20 rounded w-1/2" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 0, rotateX: 0 }}
          animate={{ y: [0, 20, 0], rotateX: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute bottom-1/4 right-[8%] w-28 h-36"
        >
          <div className="w-full h-full bg-gray-900/80 backdrop-blur-md rounded-xl border border-red-500/30 shadow-2xl"
               style={{ transform: "rotateY(-20deg) rotateX(15deg)" }}>
            <div className="p-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-full mb-2" />
              <div className="h-1.5 bg-red-500/30 rounded w-full mb-1.5" />
              <div className="h-1.5 bg-red-500/20 rounded w-2/3" />
            </div>
          </div>
        </motion.div>

        {/* 3D Rotating Rings */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute top-1/2 left-1/4 w-24 h-24"
        >
          <div className="w-full h-full border-2 border-red-400/40 rounded-full"
               style={{ transform: "rotateX(70deg) rotateY(20deg)" }} />
          <div className="absolute inset-2 border-2 border-red-500/30 rounded-full"
               style={{ transform: "rotateX(70deg) rotateY(20deg) rotateZ(45deg)" }} />
        </motion.div>

        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute bottom-1/3 right-1/3 w-32 h-32"
        >
          <div className="w-full h-full border-2 border-red-400/30 rounded-full"
               style={{ transform: "rotateX(50deg) rotateY(40deg)" }} />
          <div className="absolute inset-3 border-2 border-red-500/20 rounded-full"
               style={{ transform: "rotateX(50deg) rotateY(40deg) rotateZ(60deg)" }} />
        </motion.div>

        {/* Floating 3D Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0 }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100, 0],
              y: [0, (Math.random() - 0.5) * 80, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute w-12 h-12"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg border border-red-500/30 backdrop-blur-sm"
                 style={{ transform: `rotateX(${45 + i * 15}deg) rotateY(${30 + i * 10}deg)` }} />
          </motion.div>
        ))}

        {/* Particle effects */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -100, 0],
              x: [0, (Math.random() - 0.5) * 200, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 180 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={logoUrl}
                  alt="ADITI Academy logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-2xl"
                />
              </motion.div>
              <div className="block">
                <div className="text-[#B21D38] font-bold text-[10px] sm:text-sm md:text-base tracking-tight leading-tight">
                  ADITI Academy
                </div>
                <div className="text-white text-[6px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-medium mt-0.5">
                  HUMAN-CENTERED TECHNOLOGY
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              ADITI Academy develops curriculums designed to deliver the latest
              and most effective training to tech enthusiasts and engineers,
              offering courses that are current, relevant, and aligned with
              industry demands.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Quick Links</h4>
            <div className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/programs" label="Programs" />
              <FooterLink to="/certifications" label="Certificate Program" />
              <FooterLink to="/student-activities" label="Student Activities" />
              <FooterLink to="/contact" label="Contact Us" />
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Contact Us</h4>
            <div className="space-y-3">
              <ContactItem icon={Phone} text="+855(0) 10 879 955" />
              <ContactItem icon={Mail} text="academy@aditi.com.kh" />
              <ContactItem icon={MapPin} text="Phnom Penh, Cambodia" />
            </div>

            {/* Social Media */}
            <div className="flex flex-wrap gap-3 mt-6">
              <SocialIcon icon={Facebook} href="https://www.facebook.com/ADITIAcademyKH" label="Facebook" />
              <SocialIcon icon={Linkedin} href="https://www.linkedin.com/company/aditi-academy/" label="LinkedIn" />
              <SocialIcon icon={Instagram} href="https://www.instagram.com/aditi.academy/" label="Instagram" />
              <SocialIcon icon={Send} href="https://t.me/ADITI_Academy" label="Telegram" />
              <SocialIcon icon={Globe} href="https://www.tiktok.com/@aditi_academy" label="TikTok" />
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest news and updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-900 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 ADITI Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                whileHover={{ x: 3 }}
                className="text-gray-500 text-sm hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ x: 3 }}
                className="text-gray-500 text-sm hover:text-red-400 transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        className="block text-gray-400 text-sm hover:text-red-400 transition-colors"
      >
        {label}
      </Link>
    </motion.div>
  );
}

function ContactItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-3 text-gray-400 text-sm group"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
      </motion.div>
      <span className="break-words">{text}</span>
    </motion.div>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, y: -3, rotateY: 180 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
    </motion.a>
  );
}