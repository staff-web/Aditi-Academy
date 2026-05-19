import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80';
const BRAND = '#B51D39';
const BRAND_DARK = '#8a1530';
const BRAND_LITE = '#d4274d';

export type CTASectionProps = {
  imageUrl?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  buttonText?: string;
  buttonTo?: string;
};

export function CTASection({
  imageUrl = DEFAULT_IMAGE,
  titlePrefix = 'Ready to shape your ',
  titleHighlight = 'tech future?',
  description = "Join thousands of learners advancing their careers with ADITI Academy's world-class technology programs.",
  buttonText = 'Explore Programs',
  buttonTo = '/programs',
}: CTASectionProps) {
  const navigate = useNavigate();

  return (
    <section style={{ position: 'relative', padding: '140px 0', overflow: 'hidden', background: '#000' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={imageUrl} alt="Call to action background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(0,0,0,0.92) 0%, ${BRAND}18 50%, rgba(0,0,0,0.92) 100%)` }} />
      </div>

      <RadialGrid opacity={0.14} />
      <HoloBeam />
      <Orb top="0%" left="20%" color={`${BRAND}2a`} size={600} delay={0} />
      <Orb bottom="0%" right="15%" color={`${BRAND}18`} size={400} delay={1} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', background: `${BRAND}22`, border: `1px solid ${BRAND}55`, boxShadow: `0 0 40px ${BRAND}33` }}>
            <Sparkles size={28} color={BRAND_LITE} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20, lineHeight: 1.1 }}>
            {titlePrefix}
            <span style={{ background: `linear-gradient(135deg,${BRAND_LITE},${BRAND})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {titleHighlight}
            </span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px' }}>
            {description}
          </p>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: `0 24px 80px ${BRAND}66` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(buttonTo)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 44px', borderRadius: 14, background: `linear-gradient(135deg,${BRAND_LITE},${BRAND},${BRAND_DARK})`, color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer', boxShadow: `0 16px 50px ${BRAND}55`, letterSpacing: '-0.01em' }}>
            {buttonText}
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function HoloBeam() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${BRAND}66 30%, ${BRAND}cc 50%, ${BRAND}66 70%, transparent 100%)`,
          boxShadow: `0 0 24px ${BRAND}55`,
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
      />
    </div>
  );
}

function RadialGrid({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, zIndex: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${BRAND}33 1px,transparent 1px),linear-gradient(90deg,${BRAND}33 1px,transparent 1px)`,
        backgroundSize: '68px 68px',
      }} />
    </div>
  );
}

function Orb({ top, left, right, bottom, size = 400, color, delay = 0 }: { top?: string; left?: string; right?: string; bottom?: string; size?: number; color: string; delay?: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute', width: size, height: size, borderRadius: '50%',
        background: color, filter: `blur(${Math.round(size * 0.25)}px)`,
        pointerEvents: 'none', zIndex: 0,
        top, left, right, bottom,
      }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}
