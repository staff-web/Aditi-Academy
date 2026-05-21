import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;

  const navItems = [
    { to: "/about", label: "About Us" },
    { to: "/programs", label: "Programs" },
    { to: "/certifications", label: "Certificate Program" },
    { to: "/student-activities", label: "Student Activities" },
    { to: "/innovation-insight", label: "Innovation & Insight" },
    { to: "/esg", label: "ESG / SDG" },
    
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <img
                src={logoUrl}
                alt="ADITI Academy logo"
                className="w-48 h-48 sm:w-48sm:h-48 object-contain rounded-2xl"
              />
            </motion.div>
            <div className="hidden xs:block">
              <div className="text-white font-bold text-base sm:text-xl tracking-tight leading-none">
                ADITI ACADEMY
              </div>
              <div className="text-red-500 text-[10px] sm:text-xs tracking-[0.15em] font-medium mt-0.5">
                TECHNOLOGY EXCELLENCE
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8 2xl:gap-12">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden xl:inline-flex px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/40 text-sm"
          >
            Tech Consultant
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-white hover:text-red-500 transition-colors relative z-10"
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
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-5 py-2.5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg text-center mt-3 sm:mt-4 text-sm sm:text-base"
              >
                Tech Consultant
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
        className={`font-medium transition-colors whitespace-nowrap text-sm 2xl:text-base ${
          isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
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
      className={`block px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
        isActive
          ? "bg-red-900/20 text-white border border-red-900/30"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}