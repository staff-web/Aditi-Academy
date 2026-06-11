import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft, ArrowRight, Star, Clock, BookOpen, CheckCircle,
  Shield, Users, Award, Target, ChevronRight, X, Play,
  Monitor, MapPin, Smartphone, Download, Calendar, Globe,
  Briefcase, TrendingUp, Lock,
} from 'lucide-react';
import {
  certificationCategories,
  type CertificationCategory,
} from '../data/certifications-data';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

// ─── Reusable primitives (duplicated for standalone use; extract to shared if preferred) ──

function SectionBadge({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className={`block w-6 h-px ${light ? 'bg-red-300' : 'bg-red-600'}`} />
      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${light ? 'text-red-300' : 'text-red-600'}`}>{children}</span>
      <span className={`block w-6 h-px ${light ? 'bg-red-300' : 'bg-red-600'}`} />
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// ─── Registration Modal ───────────────────────────────────────────────────────

const DELIVERY_OPTIONS = [
  { id: 'live-online', label: 'Live Online', icon: Monitor, desc: 'Instructor-led, real-time virtual classroom' },
  { id: 'in-person', label: 'In-Person', icon: MapPin, desc: 'On-site classroom at authorized training centers' },
  { id: 'self-paced', label: 'Self-Paced', icon: Smartphone, desc: 'On-demand learning at your own pace, 1-year access' },
];

const UPCOMING_DATES = [
  { date: 'June 9 – 13, 2025', seats: 8 },
  { date: 'June 23 – 27, 2025', seats: 15 },
  { date: 'July 7 – 11, 2025', seats: 22 },
  { date: 'July 21 – 25, 2025', seats: 30 },
];

function RegistrationModal({ cert, onClose }: { cert: CertificationCategory; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '', country: '',
    delivery: 'live-online', date: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const canProceedStep1 = form.firstName && form.lastName && form.email && form.country;
  const canProceedStep3 = form.date;

  const STEPS = ['Your Details', 'Delivery Format', 'Schedule & Pay'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{ background: '#08000a', border: '1px solid #3d0000', boxShadow: '0 40px 80px rgba(220,38,38,0.18)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b" style={{ borderColor: '#1f0000' }}>
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] text-red-500 mb-1.5 uppercase">Enroll Now</div>
            <div className="text-white font-black text-lg leading-tight">{cert.name}</div>
            <div className="text-gray-400 text-xs mt-1">{cert.acronym} · {cert.level} · {cert.duration} · From ${cert.price.toLocaleString()}</div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors ml-4 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Step bar */}
            <div className="flex items-center px-6 pt-5 pb-2 gap-0">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0"
                      style={{
                        background: step > i + 1 ? '#dc2626' : step === i + 1 ? '#dc2626' : '#1f0000',
                        border: step === i + 1 ? '2px solid #fca5a5' : step > i + 1 ? 'none' : '1px solid #3d0000',
                        color: step >= i + 1 ? '#fff' : '#6b7280',
                      }}
                    >
                      {step > i + 1 ? <CheckCircle size={13} /> : i + 1}
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${step === i + 1 ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                  </div>
                  {i < 2 && (
                    <div
                      className="flex-1 h-px mx-3 transition-all duration-300"
                      style={{ background: step > i + 1 ? '#dc2626' : '#1f0000' }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 pt-4">
              <AnimatePresence mode="wait">
                {/* ── Step 1: Details ── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[
                        { label: 'First Name *', key: 'firstName', placeholder: 'John', col: 1 },
                        { label: 'Last Name *', key: 'lastName', placeholder: 'Smith', col: 1 },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-wider uppercase">{f.label}</label>
                          <input
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
                            style={{ background: '#0f0000', border: '1px solid #3d0000' }}
                            placeholder={f.placeholder}
                            value={(form as any)[f.key]}
                            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                            onFocus={e => (e.target.style.borderColor = '#dc2626')}
                            onBlur={e => (e.target.style.borderColor = '#3d0000')}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-wider uppercase">Email Address *</label>
                      <input
                        type="email"
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none"
                        style={{ background: '#0f0000', border: '1px solid #3d0000' }}
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = '#dc2626')}
                        onBlur={e => (e.target.style.borderColor = '#3d0000')}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-wider uppercase">Phone</label>
                        <input
                          className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none"
                          style={{ background: '#0f0000', border: '1px solid #3d0000' }}
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          onFocus={e => (e.target.style.borderColor = '#dc2626')}
                          onBlur={e => (e.target.style.borderColor = '#3d0000')}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-wider uppercase">Country *</label>
                        <select
                          className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white outline-none"
                          style={{ background: '#0f0000', border: '1px solid #3d0000' }}
                          value={form.country}
                          onChange={e => setForm({ ...form, country: e.target.value })}
                        >
                          <option value="">Select country</option>
                          {['United States', 'United Kingdom', 'India', 'UAE', 'Singapore', 'Australia', 'Canada', 'Germany', 'France', 'Japan'].map(c => (
                            <option key={c} style={{ background: '#0f0000' }}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-wider uppercase">Company / Organization</label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none"
                        style={{ background: '#0f0000', border: '1px solid #3d0000' }}
                        placeholder="Acme Corp"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = '#dc2626')}
                        onBlur={e => (e.target.style.borderColor = '#3d0000')}
                      />
                    </div>
                    {/* What's included */}
                    <div className="rounded-xl p-4" style={{ background: '#0f0000', border: '1px solid #1f0000' }}>
                      <div className="text-[11px] font-bold text-gray-400 mb-3 tracking-wider uppercase">What's Included</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          `${cert.modules} comprehensive modules`,
                          `${cert.labs}+ hands-on labs`,
                          'Official courseware',
                          'Exam voucher included',
                          '1-year content access',
                          'Global community access',
                        ].map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                            <CheckCircle size={11} className="text-red-500 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Delivery ── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                      Select your preferred learning format for <span className="text-white font-semibold">{cert.acronym}</span>.
                    </p>
                    <div className="flex flex-col gap-3 mb-5">
                      {DELIVERY_OPTIONS.map(opt => {
                        const Icon = opt.icon;
                        const selected = form.delivery === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                            style={{
                              background: selected ? '#1a0000' : '#0f0000',
                              border: `1px solid ${selected ? '#dc2626' : '#2d0000'}`,
                            }}
                          >
                            <input
                              type="radio"
                              name="delivery"
                              checked={selected}
                              onChange={() => setForm({ ...form, delivery: opt.id })}
                              className="hidden"
                            />
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: selected ? '#dc262622' : '#1f0000' }}
                            >
                              <Icon size={18} style={{ color: selected ? '#dc2626' : '#6b7280' }} />
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-bold text-sm">{opt.label}</div>
                              <div className="text-gray-400 text-xs mt-0.5">{opt.desc}</div>
                            </div>
                            {opt.id === 'live-online' && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-900/60 text-red-300 border border-red-800 flex-shrink-0">
                                POPULAR
                              </span>
                            )}
                            <div
                              className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                              style={{
                                borderColor: selected ? '#dc2626' : '#3d0000',
                                background: selected ? '#dc2626' : 'transparent',
                                boxShadow: selected ? '0 0 0 3px rgba(220,38,38,0.2)' : 'none',
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div className="rounded-xl p-4" style={{ background: '#0f0000', border: '1px solid #1f0000' }}>
                      <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider uppercase">Exam Information</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{cert.examInfo}</p>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Schedule ── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="text-gray-400 text-sm mb-5">Select your preferred start date</p>
                    <div className="flex flex-col gap-2.5 mb-5">
                      {UPCOMING_DATES.map(d => (
                        <label
                          key={d.date}
                          className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                          style={{
                            background: form.date === d.date ? '#1a0000' : '#0f0000',
                            border: `1px solid ${form.date === d.date ? '#dc2626' : '#2d0000'}`,
                          }}
                        >
                          <input type="radio" name="date" checked={form.date === d.date} onChange={() => setForm({ ...form, date: d.date })} className="hidden" />
                          <Calendar size={16} className={form.date === d.date ? 'text-red-500' : 'text-gray-500'} />
                          <div className="flex-1 text-sm text-white font-medium">{d.date}</div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400">{d.seats} seats left</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: form.delivery === 'live-online' ? '#1e3a5f' : '#1a3a1a', color: form.delivery === 'live-online' ? '#93c5fd' : '#86efac' }}>
                              {form.delivery === 'live-online' ? 'Virtual' : form.delivery === 'in-person' ? 'Classroom' : 'On-Demand'}
                            </span>
                          </div>
                          <div
                            className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                            style={{
                              borderColor: form.date === d.date ? '#dc2626' : '#3d0000',
                              background: form.date === d.date ? '#dc2626' : 'transparent',
                            }}
                          />
                        </label>
                      ))}
                    </div>
                    {/* Order summary */}
                    <div className="rounded-xl p-4" style={{ background: '#0f0000', border: '1px solid #dc262640' }}>
                      <div className="text-[11px] font-bold text-gray-400 mb-3 tracking-wider uppercase">Order Summary</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>{cert.name} ({cert.acronym})</span>
                          <span>${cert.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-xs">
                          <span>Courseware & exam voucher</span>
                          <span className="text-green-400">Included</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-xs">
                          <span>Format</span>
                          <span className="text-gray-300">{DELIVERY_OPTIONS.find(d => d.id === form.delivery)?.label}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold" style={{ borderColor: '#3d0000' }}>
                          <span className="text-white">Total</span>
                          <span className="text-red-500 text-lg">${cert.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors font-medium"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                ) : <div />}
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !canProceedStep1}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                      background: (step === 1 && !canProceedStep1) ? '#3d0000' : '#dc2626',
                      opacity: (step === 1 && !canProceedStep1) ? 0.5 : 1,
                      cursor: (step === 1 && !canProceedStep1) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={() => canProceedStep3 && setSubmitted(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                      background: canProceedStep3 ? '#dc2626' : '#3d0000',
                      opacity: canProceedStep3 ? 1 : 0.5,
                      cursor: canProceedStep3 ? 'pointer' : 'not-allowed',
                      boxShadow: canProceedStep3 ? '0 4px 16px rgba(220,38,38,0.35)' : 'none',
                    }}
                  >
                    Complete Registration
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ── Success ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: '#0f2d0f', border: '2px solid #22c55e' }}
            >
              <CheckCircle size={28} className="text-green-400" />
            </motion.div>
            <h3 className="text-white text-xl font-black mb-2">Registration Confirmed</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Thank you, {form.firstName}! Confirmation details have been sent to{' '}
              <span className="text-red-400">{form.email}</span>. Your journey toward{' '}
              <span className="text-white font-bold">{cert.acronym}</span> starts soon.
            </p>
            <div className="rounded-xl p-4 text-left mb-6" style={{ background: '#0f0000', border: '1px solid #1f0000' }}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Program', cert.acronym],
                  ['Format', DELIVERY_OPTIONS.find(d => d.id === form.delivery)?.label || ''],
                  ['Start Date', form.date],
                  ['Investment', `$${cert.price.toLocaleString()}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{k}</div>
                    <div className="text-white font-semibold">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all"
            >
              Back to Certifications
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Certification Detail Page ────────────────────────────────────────────────

const TABS = ['overview', 'curriculum', 'exam', 'careers'] as const;
type Tab = typeof TABS[number];

const CURRICULUM_TITLES: Record<string, string[]> = {
  ceh: ['Introduction & Ethics', 'Footprinting & Reconnaissance', 'Scanning Networks', 'Enumeration', 'Vulnerability Analysis', 'System Hacking', 'Malware Threats', 'Sniffing', 'Social Engineering', 'Denial-of-Service', 'Session Hijacking', 'Evading IDS, Firewalls & Honeypots', 'Web Server Hacking', 'Web Application Hacking', 'SQL Injection', 'Wireless Hacking', 'Mobile Platform Hacking', 'IoT & OT Hacking', 'Cloud Computing Attacks', 'Cryptography'],
  default: ['Foundations & Core Concepts', 'Threat Landscape Overview', 'Attack Vectors & Techniques', 'Defensive Strategies', 'Tools & Methodologies', 'Lab Exercises & Practice', 'Real-World Case Studies', 'Exam Preparation & Review'],
};

export default function CertificationDetailPage() {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showRegistration, setShowRegistration] = useState(false);

  const cert = certificationCategories.find(c => c.id === certId);

  if (!cert) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Certification not found</h1>
          <Link to="/certifications" className="text-red-600 hover:underline font-semibold">
            Back to Certifications
          </Link>
        </div>
      </div>
    );
  }

  const Icon = cert.icon;
  const modules = CURRICULUM_TITLES[cert.id] || CURRICULUM_TITLES.default;
  const displayModules = modules.slice(0, cert.modules);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black pt-24 pb-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://t4.ftcdn.net/jpg/08/86/84/11/360_F_886841182_2b4p5UJLtsajWMnWO5UqLQIOCWDeenDi.jpg")',
            opacity: 0.35,
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-red-950/40" />
        
        {/* Animated glow effects */}
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-red-600 rounded-full filter blur-[180px] opacity-[0.15] animate-pulse" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link>
            <ChevronRight size={12} />
            <span className="text-gray-300 font-medium">{cert.acronym}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: `${cert.color}33`, color: '#fca5a5', border: `1px solid ${cert.color}55` }}
                >
                  {cert.categoryLabel}
                </span>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: cert.level === 'Advanced' ? '#7f1d1d' : cert.level === 'Executive' ? '#1e1b4b' : cert.level === 'Foundation' ? '#14532d' : '#1c1917',
                    color: cert.level === 'Advanced' ? '#fca5a5' : cert.level === 'Executive' ? '#c7d2fe' : cert.level === 'Foundation' ? '#86efac' : '#d6d3d1',
                  }}
                >
                  {cert.level}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${cert.color}22`, border: `1px solid ${cert.color}44` }}>
                  <Icon size={22} style={{ color: cert.color }} />
                </div>
                <span className="font-black text-2xl tracking-tight" style={{ color: '#dc2626', fontFamily: "'Courier New', monospace" }}>
                  {cert.acronym}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                {cert.name}
              </h1>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-2xl">
                {cert.longDescription}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { icon: Clock, label: 'Duration', value: cert.duration },
                  { icon: BookOpen, label: 'Modules', value: `${cert.modules}` },
                  { icon: Target, label: 'Labs', value: `${cert.labs}+` },
                  { icon: Star, label: 'Rating', value: `${cert.rating}/5` },
                  { icon: Users, label: 'Reviews', value: cert.reviews },
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-2 text-sm">
                    <m.icon size={14} className="text-red-500 flex-shrink-0" />
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-wider">{m.label}</div>
                      <div className="text-white font-bold text-sm">{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {cert.skills.map(s => (
                  <span key={s} className="text-xs text-gray-300 px-3 py-1.5 rounded-full" style={{ background: '#1f0000', border: '1px solid #3d0000' }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-0">
                <button
                  onClick={() => setShowRegistration(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
                  style={{ background: '#dc2626', boxShadow: '0 8px 24px rgba(220,38,38,0.4)' }}
                >
                  Enroll Now 
                  {/* — ${cert.price.toLocaleString()} */}
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-gray-300 border border-gray-700 hover:border-red-600 hover:text-white transition-all">
                  <Download size={15} /> Download Brochure
                </button>
              </div>
            </div>

            {/* Right: certification image */}
            <div className="">
              <div className="rounded-2xl overflow-hidden relative" style={{ border: '1px solid #3d0000' }}>
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-120 object-cover"
                  style={{ filter: 'brightness(0.55)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              {/* Empty div removed - no 3D shield widget */}
              <div className="relative mt-4 flex justify-center" style={{ height: 200 }} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 border-t mt-6" style={{ borderColor: '#1f0000' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex gap-0">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-4 text-sm font-bold capitalize transition-all relative"
                  style={{ color: activeTab === tab ? '#dc2626' : '#6b7280' }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab content ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <SectionBadge>Who Should Attend</SectionBadge>
                  <p className="text-gray-600 text-sm leading-relaxed">{cert.whoShouldAttend}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <SectionBadge>Skills You'll Gain</SectionBadge>
                  <div className="space-y-2.5">
                    {cert.skills.map(s => (
                      <div key={s} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm md:col-span-2 lg:col-span-1">
                  <SectionBadge>What's Included</SectionBadge>
                  <div className="space-y-2.5">
                    {[
                      `${cert.modules} comprehensive modules`,
                      `${cert.labs}+ hands-on labs`,
                      'Official courseware & materials',
                      'Certification exam voucher',
                      '1-year access to course updates',
                      'Global community membership',
                    ].map(f => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle size={13} className="text-red-600 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div key="curriculum" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <p className="text-gray-500 text-sm mb-6">
                  {cert.modules} comprehensive modules · {cert.labs}+ hands-on labs
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {displayModules.map((title, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 px-4 py-3.5 shadow-sm hover:border-red-200 hover:shadow-md transition-all"
                    >
                      <span className="text-xs font-black text-gray-300 font-mono w-8 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-gray-800 font-medium flex-1">{title}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">{Math.floor(Math.random() * 3 + 2)}h</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'exam' && (
              <motion.div key="exam" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Exam Format', content: cert.examInfo },
                    { title: 'Prerequisites', content: '2+ years of IT/security experience recommended. No formal prerequisites required for all levels.' },
                    { title: 'Certification Validity', content: '3 years. Renew through EC-Council Continuing Education (ECE) credits — no full re-exam required.' },
                    { title: 'Global Recognition', content: 'Accepted by the U.S. DoD (Directive 8570), FBI, U.S. Army, and Fortune 500 companies across 140+ countries.' },
                  ].map(item => (
                    <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <SectionBadge>{item.title}</SectionBadge>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'careers' && (
              <motion.div key="careers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                  {cert.outcomes.map((role, i) => (
                    <div key={role} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-red-100 transition-all text-center">
                      <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
                        <Briefcase size={20} className="text-red-600" />
                      </div>
                      <div className="text-gray-900 font-bold text-sm mb-1">{role}</div>
                      <div className="text-gray-400 text-xs">$90K – $150K / yr</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
                  <div className="text-4xl font-black text-red-600 mb-2">87%</div>
                  <div className="text-gray-600 text-sm">
                    of <strong>{cert.acronym}</strong> holders report career advancement within 6 months of certification
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Sticky enroll bar ── */}
      <div
        className="sticky bottom-0 z-40 border-t"
        style={{ background: 'rgba(5,0,10,0.96)', backdropFilter: 'blur(20px)', borderColor: '#1f0000' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-white font-black text-sm">{cert.acronym}</div>
            <div className="text-gray-500 text-xs">{cert.level} · {cert.duration}</div>
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <Star size={11} fill="currentColor" /> {cert.rating} ({cert.reviews} reviews)
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* <div className="text-gray-300 text-sm">
              From <span className="text-white font-black text-lg">${cert.price.toLocaleString()}</span>
            </div> */}
            <button
              onClick={() => setShowRegistration(true)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: '#dc2626', boxShadow: '0 4px 14px rgba(220,38,38,0.4)' }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && (
          <RegistrationModal cert={cert} onClose={() => setShowRegistration(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}