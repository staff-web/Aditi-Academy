import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Send, X, Zap, Shield } from 'lucide-react';

// ── YOUR ORIGINAL MASCOT — unchanged ──────────────────────────────────────
const mascotUrl = new URL("../../assets/mascot.jpg", import.meta.url).href;

type ChatMessage = { sender: 'bot' | 'user'; text: string };

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    sender: 'bot',
    text: "Hello! I'm Aditi Assist — your AI-powered training guide. Ask me about programs, courses, or career support.",
  },
];

function getBotReply(message: string): string {
  const l = message.toLowerCase();
  if (l.includes('program') || l.includes('course'))
    return 'We offer individual courses in cloud, cybersecurity, software development, and data analytics. Which area are you interested in?';
  if (l.includes('register') || l.includes('enroll') || l.includes('sign up'))
    return "Great! Please share your name, email, and preferred track. I'll help guide you to the right registration form.";
  if (l.includes('enterprise') || l.includes('team') || l.includes('organization'))
    return 'For enterprise training, I can help you request a proposal and share team training options.';
  if (l.includes('pricing') || l.includes('cost') || l.includes('fee'))
    return 'Pricing depends on the program and format. Tell me whether you want self-paced, live, or corporate training.';
  return 'That sounds great. Can you tell me a bit more about your goal so I can recommend the best option?';
}

// ── 3-D tilt on mouse-move ─────────────────────────────────────────────────
function useTilt(maxDeg = 8) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxDeg, -maxDeg]), { stiffness: 220, damping: 22 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]), { stiffness: 220, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };
  return { rotX, rotY, onMouseMove, onMouseLeave };
}

// ═══════════════════════════════════════════════════════════════════════════
export function ChatbotWidget() {
  const [open, setOpen]               = useState(false);
  const [messages, setMessages]       = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft]             = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);   // visible on first load
  const [hasInteracted, setHasInteracted] = useState(false); // tracks first click
  const [scanPos, setScanPos]         = useState(0);
  const messagesEndRef                = useRef<HTMLDivElement>(null);
  const greetingTimer                 = useRef<ReturnType<typeof setTimeout>>();
  const tilt                          = useTilt(8);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Greeting logic:
  // - Before first interaction: show forever (no auto-hide timer)
  // - After first interaction (chat closed): show for 3s, then hide; repeat on each close
  useEffect(() => {
    clearTimeout(greetingTimer.current);

    if (showGreeting && !open && hasInteracted) {
      // Post-interaction: auto-hide after 3s
      greetingTimer.current = setTimeout(() => setShowGreeting(false), 3000);
    }
    // Pre-interaction (!hasInteracted): no timer → stays visible forever

    return () => clearTimeout(greetingTimer.current);
  }, [showGreeting, open, hasInteracted]);

  useEffect(() => {
    if (!open) return;
    let raf: number;
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      setScanPos(((ts - start) % 3200) / 3200);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const openChat = () => {
    setOpen(true);
    setShowGreeting(false);
    setHasInteracted(true);
  };

  const closeChat = () => {
    setOpen(false);
    // Re-show greeting immediately; timer in the effect above will hide it after 3s
    setShowGreeting(true);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages(m => [...m, { sender: 'user', text }]);
    setDraft('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { sender: 'bot', text: getBotReply(text) }]);
      setIsTyping(false);
    }, 800);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .ac-msgs::-webkit-scrollbar { width: 3px; }
    .ac-msgs::-webkit-scrollbar-track { background: transparent; }
    .ac-msgs::-webkit-scrollbar-thumb { background: rgba(220,38,38,0.28); border-radius: 3px; }

    @keyframes ac-spin    { to { transform: rotate(360deg); } }
    @keyframes ac-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
    @keyframes ac-glow    { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes ac-blink   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
    @keyframes ac-bounce  { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-7px);opacity:1} }
    @keyframes ac-msgin   { from{opacity:0;transform:translateY(14px) scale(.93)} to{opacity:1;transform:none} }
    @keyframes ac-panelin {
      from{opacity:0;transform:perspective(900px) rotateX(-8deg) scale(.93) translateY(20px)}
      to  {opacity:1;transform:perspective(900px) rotateX(0) scale(1) translateY(0)}
    }

    .ac-panel  { animation: ac-panelin .4s cubic-bezier(.34,1.56,.64,1) both; }
    .ac-msg    { animation: ac-msgin  .32s cubic-bezier(.34,1.56,.64,1) both; }
    .ac-status { animation: ac-blink  2s ease-in-out infinite; }

    .ac-dot1 { animation: ac-bounce 1.2s 0s   infinite; }
    .ac-dot2 { animation: ac-bounce 1.2s .15s infinite; }
    .ac-dot3 { animation: ac-bounce 1.2s .3s  infinite; }

    .ac-ring-a {
      position:absolute;inset:-4px;border-radius:50%;
      background:conic-gradient(from 0deg,#dc2626,#ef4444,#fca5a5,#ef4444,#dc2626);
      animation: ac-spin 3s linear infinite;
    }
    .ac-ring-b {
      position:absolute;inset:-2px;border-radius:50%;
      background:conic-gradient(from 180deg,rgba(220,38,38,.32),transparent,rgba(220,38,38,.32));
      animation: ac-spin 2s linear infinite reverse;
    }
    .ac-halo {
      position:absolute;inset:-14px;border-radius:50%;
      background:radial-gradient(circle,rgba(220,38,38,.26) 0%,transparent 70%);
      animation: ac-glow 2.4s ease-in-out infinite;
      pointer-events:none;
    }
    .ac-launch {
      animation: ac-float 3s ease-in-out infinite;
    }
    .ac-launch:hover {
      animation: none !important;
      transform: translateY(-6px) scale(1.07) !important;
      transition: transform .25s cubic-bezier(.34,1.56,.64,1) !important;
    }
    .ac-launch:active { transform: scale(.93) !important; }

    .ac-send { transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease; }
    .ac-send:hover  { transform: scale(1.12) translateY(-2px) !important; box-shadow: 0 10px 28px rgba(220,38,38,.55) !important; }
    .ac-send:active { transform: scale(.93) !important; }

    .ac-input:focus {
      border-color: rgba(220,38,38,.5) !important;
      background: rgba(220,38,38,.04) !important;
      box-shadow: 0 0 0 3px rgba(220,38,38,.1) !important;
      outline: none;
    }
    .ac-input::placeholder { color: #44445a; }

    .ac-close { transition: all .22s cubic-bezier(.34,1.56,.64,1); }
    .ac-close:hover { background: rgba(220,38,38,.18) !important; border-color: rgba(220,38,38,.4) !important; transform: rotate(90deg) scale(1.1); }

    .ac-mascot-hdr { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
    .ac-mascot-hdr:hover { transform: scale(1.14) rotate(-5deg); }

    .ac-bot-bub  { transition: transform .2s ease, box-shadow .2s ease; }
    .ac-bot-bub:hover  { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,.45), 0 0 0 1px rgba(220,38,38,.14) !important; }
    .ac-user-bub { transition: transform .2s ease, box-shadow .2s ease; }
    .ac-user-bub:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(220,38,38,.46) !important; }

    .ac-corner { position:absolute; width:14px; height:14px; border-color:rgba(220,38,38,.28); border-style:solid; pointer-events:none; }
    .ac-tl { top:10px;    left:10px;  border-width:1px 0 0 1px; }
    .ac-tr { top:10px;    right:10px; border-width:1px 1px 0 0; }
    .ac-bl { bottom:10px; left:10px;  border-width:0 0 1px 1px; }
    .ac-br { bottom:10px; right:10px; border-width:0 1px 1px 0; }

    /* ── Responsiveness ── */
    .ac-greeting-bubble {
      position: fixed !important;
      bottom: 116px !important;
      right: 80px !important;
      left: auto !important;
      margin: 0 !important;
      white-space: nowrap !important;
      z-index: 10000 !important;
    }
    @media (max-width: 480px) {
      .ac-chat-panel {
        width: calc(100vw - 24px) !important;
        border-radius: 18px !important;
        left: 10px !important;
      }
      .ac-greeting-bubble {
        right: 60px !important;
        bottom: 116px !important;
        white-space: nowrap !important;
      }
    }
  `;

  const outfit = { fontFamily: "'Outfit', sans-serif" };
  const mono   = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, pointerEvents: 'auto', ...outfit }}>

        {/* ═══ CHAT PANEL ═════════════════════════════════════════════════ */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              className="ac-panel ac-chat-panel"
              exit={{ opacity: 0, scale: 0.9, y: 14 }}
              style={{
                width: 348, borderRadius: 24, overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                background: 'linear-gradient(160deg, #13131e 0%, #0d0d16 100%)',
                border: '1px solid rgba(220,38,38,0.22)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.75), 0 0 60px rgba(220,38,38,0.08)',
                transformStyle: 'preserve-3d',
                position: 'relative',
                marginBottom: 16,
                rotateX: tilt.rotX,
                rotateY: tilt.rotY,
              }}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <div className="ac-corner ac-tl" />
              <div className="ac-corner ac-tr" />
              <div className="ac-corner ac-bl" />
              <div className="ac-corner ac-br" />

              {/* HEADER */}
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,rgba(220,38,38,0.13) 0%,rgba(185,28,28,0.06) 100%)', borderBottom: '1px solid rgba(220,38,38,0.15)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle,rgba(220,38,38,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(220,38,38,0.55),transparent)' }} />

                {/* spinning ring + YOUR mascot */}
                <div style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
                  <div className="ac-ring-a" />
                  <div className="ac-ring-b" />
                  <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'linear-gradient(145deg,#1e1e2a,#13131c)', border: '1px solid rgba(220,38,38,0.3)', overflow: 'hidden', zIndex: 2 }}>
                    <img src={mascotUrl} alt="Aditi" className="ac-mascot-hdr" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f8', letterSpacing: '0.02em' }}>Aditi Assist</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <div className="ac-status" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3a0', boxShadow: '0 0 6px #22d3a0' }} />
                    <span style={{ ...mono, fontSize: 10.5, color: '#8888aa' }}>Online · AI-Powered</span>
                  </div>
                </div>

                {['AI', 'LIVE'].map(label => (
                  <div key={label} style={{ ...mono, fontSize: 9, letterSpacing: '0.07em', padding: '3px 7px', borderRadius: 4, color: 'rgba(220,38,38,0.85)', background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.22)' }}>{label}</div>
                ))}

                <button type="button" onClick={closeChat} className="ac-close" style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8888aa', flexShrink: 0, marginLeft: 2 }}>
                  <X size={14} />
                </button>
              </div>

              {/* HUD STRIP */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderBottom: '1px solid rgba(220,38,38,0.07)', background: 'rgba(220,38,38,0.03)' }}>
                {['NEURAL', 'SECURE', 'ENC-256'].map((label, i) => (
                  <div key={label} style={{ ...mono, fontSize: 8.5, letterSpacing: '0.05em', padding: '2px 7px', borderRadius: 3, color: i === 0 ? 'rgba(220,38,38,0.75)' : '#555570', background: i === 0 ? 'rgba(220,38,38,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(220,38,38,0.2)' : 'rgba(255,255,255,0.04)'}` }}>{label}</div>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, opacity: 0.4 }}>
                  <Shield size={9} color="#8888aa" />
                  <span style={{ ...mono, fontSize: 8.5, color: '#8888aa' }}>TLS 1.3</span>
                </div>
              </div>

              {/* MESSAGES */}
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* scan line */}
                <div style={{ position: 'absolute', left: 0, right: 0, height: 1.5, zIndex: 10, pointerEvents: 'none', top: `${scanPos * 100}%`, background: 'linear-gradient(90deg,transparent,rgba(220,38,38,0.3),transparent)', opacity: 0.55 }} />

                <div className="ac-msgs" style={{ flex: 1, overflowY: 'auto', padding: '16px 13px', display: 'flex', flexDirection: 'column', gap: 11, height: 340, maxHeight: 340, background: 'linear-gradient(180deg,#0d0d14 0%,#0f0f1a 100%)', position: 'relative' }}>
                  {/* grid bg */}
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4, backgroundImage: 'linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

                  {messages.map((msg, i) => (
                    <div key={i} className="ac-msg" style={{ animationDelay: `${i * 0.04}s`, display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 7 }}>

                      {msg.sender === 'bot' && (
                        <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, border: '1.5px solid rgba(220,38,38,0.3)', overflow: 'hidden', background: '#13131c' }}>
                          <img src={mascotUrl} alt="bot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      )}

                      <div
                        className={msg.sender === 'bot' ? 'ac-bot-bub' : 'ac-user-bub'}
                        style={{
                          maxWidth: '78%', padding: '10px 14px', fontSize: 13, lineHeight: 1.56, position: 'relative',
                          borderRadius: msg.sender === 'bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                          ...(msg.sender === 'bot'
                            ? { background: 'linear-gradient(135deg,#1a1a28 0%,#141420 100%)', border: '1px solid rgba(220,38,38,0.14)', color: '#ddddf0', boxShadow: '0 4px 20px rgba(0,0,0,0.35),0 0 0 1px rgba(255,255,255,0.02)' }
                            : { background: 'linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(220,38,38,0.42),0 0 0 1px rgba(255,255,255,0.1) inset' }),
                        }}
                      >
                        {msg.sender === 'bot' && (
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, borderRadius: '16px 16px 0 0', background: 'linear-gradient(90deg,rgba(220,38,38,0.35),rgba(239,68,68,0.1),transparent)' }} />
                        )}
                        {msg.text}
                      </div>

                      {msg.sender === 'user' && (
                        <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#dc2626,#b91c1c)', border: '1.5px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="5.5" r="3" fill="rgba(255,255,255,0.75)" />
                            <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(220,38,38,0.3)', overflow: 'hidden', background: '#13131c', flexShrink: 0 }}>
                        <img src={mascotUrl} alt="bot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                      <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'linear-gradient(135deg,#1a1a28,#141420)', border: '1px solid rgba(220,38,38,0.14)', display: 'flex', gap: 5, alignItems: 'center' }}>
                        {[1, 2, 3].map(n => (
                          <div key={n} className={`ac-dot${n}`} style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626', opacity: 0.7 }} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* INPUT */}
              <form onSubmit={sendMessage} style={{ padding: '12px 13px 14px', borderTop: '1px solid rgba(220,38,38,0.09)', background: 'linear-gradient(180deg,#0d0d14,#0a0a12)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent)' }} />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Type your message…"
                    className="ac-input"
                    style={{ flex: 1, borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(220,38,38,0.15)', padding: '10px 16px', fontSize: 13, color: '#e0e0f0', transition: 'all .25s ease', ...outfit }}
                  />
                  <button type="submit" className="ac-send" style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0, background: 'linear-gradient(135deg,#ef4444,#dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,38,38,0.45),0 0 0 1px rgba(255,255,255,0.1) inset' }}>
                    <Send size={15} color="white" />
                  </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 8, ...mono, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(136,136,170,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Zap size={9} color="rgba(220,38,38,0.35)" />
                  ADITI NEURAL ENGINE · ENCRYPTED
                  <Zap size={9} color="rgba(220,38,38,0.35)" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ LAUNCHER ═══════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>

          {/* ── Greeting bubble ──
              Desktop: to the left of the button (right: 100%)
              Mobile (@media): above the button, right-aligned (via .ac-greeting-bubble CSS class)
          */}
          <AnimatePresence>
            {showGreeting && !open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.82, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.82, x: 10 }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                className="ac-greeting-bubble"
                style={{ }}
              >
                <div style={{
                  background: 'white',
                  border: '1px solid #dc2626',
                  borderRadius: '12px 12px 4px 12px',
                  padding: '12px 18px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}>
                  <p style={{
                    fontSize: 15,
                    color: '#dc2626',
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    Would you like to talk with me? 🎀
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* launcher button — YOUR original mascot image */}
          <button
            type="button"
            className="ac-launch"
            onClick={openChat}
            aria-expanded={open}
            aria-label="Open Aditi Assist"
            style={{ position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, width: 82, height: 82, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'absolute', background: 'transparent' }}>
              <img
                src={mascotUrl}
                alt="Aditi Mascot"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
              />
            </div>
          </button>
        </div>

      </div>
    </>
  );
}