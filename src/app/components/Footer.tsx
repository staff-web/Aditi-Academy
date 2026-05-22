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
    <footer className="relative bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* About Column - Fixed alignment */}
          <div className="space-y-4">
            <div className="flex flex-col sm:block">
              <a href="/" className="inline-flex items-center gap-2 group mb-3">
                <img
                  src={logoUrl}
                  alt="ADITI Academy logo"
                  className="w-32 sm:w-40 md:w-48 h-auto object-contain rounded-2xl"
                />
                <div className="hidden xs:block">
                  <div className="text-white font-bold text-base sm:text-xl tracking-tight leading-none">
                    ADITI ACADEMY
                  </div>
                  <div className="text-red-500 text-[10px] sm:text-xs tracking-[0.15em] font-medium mt-0.5">
                    TECHNOLOGY EXCELLENCE
                  </div>
                </div>
              </a>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              ADITI Academy develops curriculums designed to deliver the latest
              and most effective training to tech enthusiasts and engineers,
              offering courses that are current, relevant, and aligned with
              industry demands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Quick Links</h4>
            <div className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/programs" label="Programs" />
              <FooterLink to="/certifications" label="Certificate Program" />
              <FooterLink to="/student-activities" label="Student Activities" />
              <FooterLink to="/contact" label="Contact Us" />
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-4 text-base sm:text-lg">Popular Programs</h4>
            <div className="space-y-3">
              <ProgramItem label="AI Engineer" />
              <ProgramItem label="Cybersecurity" />
              <ProgramItem label="Full Stack Development" />
              <ProgramItem label="Data Science" />
              <ProgramItem label="Cloud Computing" />
            </div>
          </div>

          {/* Contact */}
          <div>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 ADITI Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-500 text-sm hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 text-sm hover:text-red-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block text-gray-400 text-sm hover:text-red-400 transition-colors"
    >
      {label}
    </Link>
  );
}

function ProgramItem({ label }: { label: string }) {
  return (
    <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
      {label}
    </div>
  );
}

function ContactItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-400 text-sm group">
      <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
      <span className="break-words">{text}</span>
    </div>
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
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
    </motion.a>
  );
}