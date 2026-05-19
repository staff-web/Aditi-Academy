import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const programLinks = [
    { to: "/programs", label: "Program" },
    { to: "/certifications", label: "Certification Program" },
    { to: "/student-activities", label: "Student Activities" },
  ];

  const isProgramActive = programLinks.some(link => location.pathname === link.to);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProgramDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProgramDropdownOpen(false);
    }, 150);
  };

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
            <NavLink to="/about" label="About Us" />
            
            {/* Program Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="relative group flex items-center gap-1.5 py-2">
                <motion.span
                  className={`font-medium transition-colors text-sm 2xl:text-base ${
                    isProgramActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Program
                </motion.span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  programDropdownOpen ? "rotate-180" : ""
                } ${isProgramActive ? "text-white" : "text-gray-400"}`} />
              </button>

              <AnimatePresence>
                {programDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-72 rounded-2xl bg-white shadow-2xl p-2">
                      {programLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`block px-5 py-3.5 rounded-xl text-gray-900 font-medium hover:bg-gray-100 transition-all duration-200 ${
                            location.pathname === link.to ? "bg-gray-100 text-red-600" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/innovation-insight" label="Innovation & Insight" />
            <NavLink to="/esg" label="ESG / SDG" />
            <NavLink to="/contact" label="Contact Us" />
          </div>

          {/* CTA Button */}
          <div
            className="hidden xl:block relative"
            onMouseEnter={() => setTrainingOpen(true)}
            onMouseLeave={() => setTrainingOpen(false)}
          >
            <button className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/40 text-sm">
              GET TRAINING
            </button>
            <AnimatePresence>
              {trainingOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full pt-4"
                  onMouseEnter={() => setTrainingOpen(true)}
                  onMouseLeave={() => setTrainingOpen(false)}
                >
                  <div className="w-80 rounded-3xl bg-white border border-gray-200 shadow-2xl p-5">
                    <div className="space-y-3">
                      <Link
                        to="/training/individual"
                        className="block px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-all duration-200"
                      >
                        Individual Training
                      </Link>
                      <Link
                        to="/training/enterprise"
                        className="block px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-all duration-200"
                      >
                        Enterprise Training
                      </Link>
                      <p className="text-xs text-gray-500 mt-3 pt-1 border-t border-gray-200">
                        Individual registration for learners or enterprise requests
                        for ministries, organizations, and large training initiatives.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              <MobileNavLink to="/about" label="About Us" onClick={() => setMobileOpen(false)} />
              
              {/* Mobile Program Dropdown */}
              <div>
                <button
                  onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <span>Program</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProgramOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileProgramOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3"
                    >
                      {programLinks.map((link) => (
                        <MobileNavLink
                          key={link.to}
                          to={link.to}
                          label={link.label}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileProgramOpen(false);
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink to="/innovation-insight" label="Innovation & Insight" onClick={() => setMobileOpen(false)} />
              <MobileNavLink to="/esg" label="ESG / SDG" onClick={() => setMobileOpen(false)} />
              <MobileNavLink to="/contact" label="Contact Us" onClick={() => setMobileOpen(false)} />
              
              <div className="border-t border-white/10 pt-3 sm:pt-4 mt-2">
                <MobileNavLink to="/training/individual" label="Individual Training" onClick={() => setMobileOpen(false)} />
                <MobileNavLink to="/training/enterprise" label="Enterprise Training" onClick={() => setMobileOpen(false)} />
              </div>
              
              <Link
                to="/training/individual"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-5 py-2.5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg text-center mt-3 sm:mt-4 text-sm sm:text-base"
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