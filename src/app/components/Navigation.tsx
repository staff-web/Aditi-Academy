import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || !isLanding
          ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Logo Background */}
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">
                  A
                </span>
              </div>
            </motion.div>

            <div>
              <div className="text-white font-bold text-xl tracking-tight leading-none">
                ADITI ACADEMY
              </div>
              <div className="text-red-500 text-xs tracking-[0.15em] font-medium mt-0.5">
                TECHNOLOGY EXCELLENCE
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink to="/about" label="About Us" />
            <NavLink to="/programs" label="Programs" />
            <NavLink
              to="/certifications"
              label="Explore More"
            />
            <NavLink to="/enterprise" label="ESG" />

            <NavLink to="/contact" label="Contact" />
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/40"
            >
              GET TRAINING
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 text-white hover:text-red-500 transition-colors relative z-10"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-8 py-6 space-y-2">
              <MobileNavLink
                to="/programs"
                label="Programs"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                to="/certifications"
                label="Certifications"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                to="/enterprise"
                label="Enterprise"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                to="/about"
                label="About"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                to="/contact"
                label="Contact"
                onClick={() => setMobileOpen(false)}
              />

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg text-center mt-4"
              >
                GET TRAINING
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative group">
      <motion.span
        className={`font-medium transition-colors ${
          isActive
            ? "text-white"
            : "text-gray-400 hover:text-white"
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Hover indicator */}
      {!isActive && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
      )}
    </Link>
  );
}

function MobileNavLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? "bg-red-900/20 text-white border border-red-900/30"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}