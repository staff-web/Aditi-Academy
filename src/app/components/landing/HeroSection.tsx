import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";
import { useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PremiumTechBackground } from "./PremiumTechBackground";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0],
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full min-h-screen flex items-center"
    >
      {/* Premium Technology Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <PremiumTechBackground />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-8 py-20">
        <motion.div style={{ y, opacity }} className="relative">
          {/* Full Width Image Container with Margin - EC-Council Style */}
          <div className="relative w-full h-[600px] lg:h-[700px] rounded-3xl overflow-hidden">
            {/* Background Image - People Visible */}
            <img
              src="https://iili.io/B5aiJd7.jpg"
              alt="Technology training professionals"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'none' }}
            />

            {/* Dark Gradient ONLY on LEFT side - Keep RIGHT side clear for faces */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 90%)",
              }}
            />

            {/* Subtle red accent on left */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-transparent"
              style={{
                background:
                  "linear-gradient(to right, rgba(127,29,29,0.3) 0%, transparent 40%)",
              }}
            />

            {/* Text Content - Overlaid on LEFT side of image */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-3xl px-12 lg:px-20">
                <div className="space-y-6">
                  {/* Main Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white"
                  >
                    Technology courses for the{" "}
                    <span className="text-red-500">
                      real world
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl"
                  >
                    Get certified with industry leaders in
                    technology and AI security.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <Link
                      to="/programs"
                      className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-900/40"
                    >
                      <span className="flex items-center gap-2">
                        Explore Programs
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>

                    <Link
                      to="/contact"
                      className="group px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold text-lg rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Get Started
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Trust Badge - Bottom of Image (EC-Council Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-0 left-0 right-0 px-12 lg:px-20 py-8 bg-gradient-to-t from-black/80 to-transparent"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left - Trust Text */}
                <div className="text-white text-lg">
                  Trusted by{" "}
                  <strong className="text-red-500">
                    400,000+
                  </strong>{" "}
                  Certified Professionals Worldwide
                </div>

                {/* Right - Trustpilot Rating */}
                <div className="flex items-center gap-4">
                  <div className="text-white text-2xl font-bold">
                    4.7
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-green-500 fill-green-500"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="#00B67A"
                      />
                    </svg>
                    <span className="text-gray-200 font-medium">
                      Trustpilot
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}