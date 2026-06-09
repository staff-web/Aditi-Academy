import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Award, Shield, Code, Network, Lock, Brain, Database, Cloud, Terminal, Cpu, BookOpen, Target, Eye, Fingerprint, Zap, ArrowRight } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCertHovered, setIsCertHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;
  
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const navItems = [
    { to: "/about", label: "About Us" },
    { to: "/programs", label: "Programs" },
    { to: "/certifications", label: "Certificate Program" },
    { to: "/student-activities", label: "Student Activities" },
    { to: "/innovation-insight", label: "Innovation & Insight" },
    { to: "/esg", label: "ESG / SDG" },
  ];

  const certificationCategoriesData = [
    {
      title: "ETHICAL HACKING",
      icon: Shield,
      color: "#dc2626",
      courses: [
        { name: "Certified Ethical Hacker (C|EH)", path: "/certifications/ceh" },
       
      ]
    },
    {
      title: "EXECUTIVE MANAGEMENT",
      icon: Award,
      color: "#8b5cf6",
      courses: [
        { name: "Certified Chief Information Security Officer (C|CISO)", path: "/certifications/cciso" },
       
      ]
    },
    {
      title: "COMPUTER FORENSICS",
      icon: Fingerprint,
      color: "#ec4899",
      courses: [
        { name: "Computer Hacking Forensic Investigator (C|HFI)", path: "/certifications/chfi" }
      ]
    },
    {
      title: "NETWORK SECURITY",
      icon: Network,
      color: "#2ecc71",
      courses: [
        { name: "Certified Network Defender (C|ND)", path: "/certifications/cnd" },
      ]
    },
    {
      title: "PEN TESTING",
      icon: Target,
      color: "#e67e22",
      courses: [
        { name: "Certified Penetration Testing Professional (C|PENT)", path: "/certifications/cpent" }
      ]
    },
    {
      title: "SOC ANALYST",
      icon: Eye,
      color: "#06b6d4",
      courses: [
        { name: "Certified SOC Analyst (C|SA)", path: "/certifications/csa" }
      ]
    },
    {
      title: "CLOUD SECURITY",
      icon: Cloud,
      color: "#3b82f6",
      courses: [
        { name: "Certified Cloud Security Engineer (C|CSE)", path: "/certifications/ccse" }
      ]
    },
    {
      title: "DEVSECOPS",
      icon: Code,
      color: "#ef4444",
      courses: [
        { name: "Certified DevSecOps Engineer (E|CDE)", path: "/certifications/ecde" }
      ]
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isCertHovered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCertHovered]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsCertHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCertHovered(false);
    }, 200);
  };

  const handleCourseClick = (path: string) => {
    setIsCertHovered(false);
    document.body.style.overflow = '';
    navigate(path);
  };

  const handleViewAllClick = () => {
    setIsCertHovered(false);
    document.body.style.overflow = '';
    navigate('/certifications');
  };

  const handleCareerAdviceClick = () => {
    setIsCertHovered(false);
    document.body.style.overflow = '';
    navigate('/contact');
  };

  // NAV HEIGHT: h-16 = 64px, sm:h-20 = 80px
  const NAV_HEIGHT = 80;

  return (
    <>
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
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group relative z-20">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <img
                  src={logoUrl}
                  alt="ADITI Academy logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-2xl"
                />
              </motion.div>
              <div className="block">
                <div className="text-[#B21D38] font-bold text-xs sm:text-base md:text-lg tracking-tight leading-none">
                  ADITI Academy
                </div>
                <div className="text-white text-[8px] sm:text-[10px] md:text-xs tracking-[0.15em] font-medium mt-0.5">
                  HUMAN-CENTERED TECHNOLOGY
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-8 2xl:gap-12">
              {navItems.map((item) => {
                if (item.label === "Certificate Program") {
                  return (
                    <div 
                      key={item.to} 
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link to={item.to} className="relative group flex items-center gap-1.5">
                        <motion.span
                          className={`font-medium transition-colors whitespace-nowrap text-sm 2xl:text-base ${
                            location.pathname === item.to ? "text-white" : "text-gray-400 hover:text-white"
                          }`}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                        <motion.div
                          animate={{ rotate: isCertHovered ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                        </motion.div>
                        {location.pathname === item.to && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {location.pathname !== item.to && (
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                        )}
                      </Link>
                    </div>
                  );
                }
                return <NavLink key={item.to} to={item.to} label={item.label} />;
              })}
            </div>

            <Link
              to="/contact"
              className="hidden xl:inline-flex px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/40 text-sm z-20 relative"
            >
              Tech Consultant
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-white hover:text-red-500 transition-colors relative z-20"
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
              className="xl:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto relative z-20"
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

      {/* CERTIFICATION DROPDOWN — flush under nav */}
      <AnimatePresence>
        {isCertHovered && (
          <>
            {/* Invisible bridge so mouse can travel from nav to dropdown */}
            <div
              className="fixed left-0 right-0 z-40"
              style={{ top: `${NAV_HEIGHT}px`, height: '8px', background: 'transparent' }}
              onMouseEnter={handleMouseEnter}
            />

            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 z-40"
              style={{ top: `${NAV_HEIGHT}px`, bottom: 0 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

              {/* Subtle grid texture */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Main panel — only as tall as content, not full screen */}
              <div className="relative z-10 w-full overflow-y-auto overscroll-contain max-h-full" style={{ scrollbarWidth: 'thin' }}>
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 pb-8">

                  {/* Two-column layout: left label + right grid */}
                  <div className="flex gap-8 lg:gap-12">

                    {/* LEFT SIDEBAR */}
                    <div className="hidden lg:flex flex-col justify-between w-56 xl:w-64 flex-shrink-0 pt-1">
                      <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-600/30 mb-4">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-semibold text-red-400 tracking-widest uppercase">Certifications</span>
                        </div>
                        <h2 className="text-xl xl:text-2xl font-bold text-white leading-tight mb-2">
                          Professional<br />
                          <span className="text-red-500">Certification</span><br />
                          Programs
                        </h2>
                        <p className="text-gray-500 text-xs leading-relaxed">
                          Industry-recognized credentials trusted by leading tech employers worldwide.
                        </p>

                        {/* Stats row */}
                        <div className="mt-5 space-y-3">
                          {[
                            { value: "8+", label: "Certification Tracks" },
                            { value: "EC-Council", label: "Powered by" },
                            { value: "Global", label: "Recognition" },
                          ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3">
                              <div className="w-px h-8 bg-red-600/40" />
                              <div>
                                <div className="text-white font-bold text-sm">{stat.value}</div>
                                <div className="text-gray-500 text-[11px]">{stat.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA buttons */}
                      <div className="mt-6 space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleViewAllClick}
                          className="w-full flex items-center justify-between px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all group"
                        >
                          <span>View All Certifications</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleCareerAdviceClick}
                          className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-all border border-white/10 group"
                        >
                          <span>Get Career Advice</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                      </div>
                    </div>

                    {/* RIGHT: Cert Cards Grid */}
                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {certificationCategoriesData.map((category, idx) => {
                          const CategoryIcon = category.icon;
                          return (
                            <motion.div
                              key={category.title}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.025, duration: 0.25 }}
                              className="group relative bg-white/[0.04] hover:bg-white/[0.07] rounded-xl border border-white/[0.07] hover:border-white/20 transition-all duration-250 overflow-hidden"
                            >
                              {/* Colored top accent line */}
                              <div
                                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: category.color }}
                              />

                              <div className="p-3.5">
                                {/* Icon + title */}
                                <div className="flex items-center gap-2.5 mb-3">
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${category.color}20` }}
                                  >
                                    <CategoryIcon size={14} style={{ color: category.color }} />
                                  </div>
                                  <h3
                                    className="text-[10px] font-bold tracking-wide leading-tight"
                                    style={{ color: category.color }}
                                  >
                                    {category.title}
                                  </h3>
                                </div>

                                {/* Courses */}
                                <div className="space-y-1">
                                  {category.courses.map((course, i) => (
                                    <motion.button
                                      key={course.name}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: idx * 0.025 + i * 0.01 }}
                                      onClick={() => handleCourseClick(course.path)}
                                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-150 text-[11px] leading-snug"
                                    >
                                      {course.name}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Mobile-only CTA (shown when sidebar is hidden) */}
                      <div className="lg:hidden mt-4 flex gap-2">
                        <button
                          onClick={handleViewAllClick}
                          className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all text-center"
                        >
                          View All
                        </button>
                        <button
                          onClick={handleCareerAdviceClick}
                          className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-all text-center"
                        >
                          Career Advice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .overscroll-contain {
          overscroll-behavior: contain;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.4);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.65);
        }
        .bg-white\\/8 {
          background-color: rgba(255,255,255,0.08);
        }
      `}</style>
    </>
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