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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="ADITI Academy logo"
                className="w-12 h-12 rounded-2xl object-contain shadow-lg"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">
                  ADITI ACADEMY
                </span>
                <span className="text-red-400 text-xs">Tech Excellence</span>
              </div>
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
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/programs" label="Programs" />
              <FooterLink to="/certifications" label="Explore More" />
              <FooterLink to="/esg" label="ESG / SDG in Practice" />
              <FooterLink to="/about" label="About Us" />
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-4">Popular Programs</h4>
            <div className="space-y-3">
              <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
                AI Engineer
              </div>
              <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
                Cybersecurity
              </div>
              <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
                Full Stack Development
              </div>
              <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
                Data Science
              </div>
              <div className="text-gray-400 text-sm hover:text-red-400 transition-colors cursor-pointer">
                Cloud Computing
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+855(0) 10 879 955</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-red-500" />
                <span>academy@aditi.com.kh</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Phnom Penh, Cambodia</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
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
            <p className="text-gray-500 text-sm">
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
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
    </motion.a>
  );
}