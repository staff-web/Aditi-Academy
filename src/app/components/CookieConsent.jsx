import { useState, useEffect, useRef } from 'react';

const CookieConsent = () => {
  const [phase, setPhase] = useState('hidden');
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });
  const [ripples, setRipples] = useState([]);

  const cardWrapRef = useRef(null);
  const cardRef = useRef(null);
  const surfaceRef = useRef(null);
  const sheenRef = useRef(null);
  const canvasRef = useRef(null);

  const tiltCur = useRef({ x: 5, y: 0 });
  const tiltTarget = useRef({ x: 5, y: 0 });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'all' || consent === 'custom') return;

    const timer = setTimeout(() => {
      setPhase('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')));
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Professional tech scanning animation
  useEffect(() => {
    if (phase === 'hidden') return undefined;
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    if (!canvas || !surface) return undefined;
    const ctx = canvas.getContext('2d');

    const sizeBg = () => {
      canvas.width = surface.offsetWidth;
      canvas.height = surface.offsetHeight;
    };
    sizeBg();

    let scanProgress = 0;
    let scanStartTime = Date.now() + 800; // Delay before scan starts

    let raf;
    const draw = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(15,15,30,0)');
      bgGradient.addColorStop(1, 'rgba(10,10,20,0.02)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanning beam effect
      if (now >= scanStartTime) {
        scanProgress = ((now - scanStartTime) % 3000) / 3000; // 3 second cycle
        const beamY = canvas.height * scanProgress;

        // Main scan line
        const gradient = ctx.createLinearGradient(0, beamY - 30, 0, beamY + 30);
        gradient.addColorStop(0, 'rgba(224,36,36,0)');
        gradient.addColorStop(0.3, 'rgba(224,36,36,0.15)');
        gradient.addColorStop(0.5, 'rgba(224,36,36,0.35)');
        gradient.addColorStop(0.7, 'rgba(224,36,36,0.15)');
        gradient.addColorStop(1, 'rgba(224,36,36,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, beamY - 30, canvas.width, 60);

        // Bright scan line core
        ctx.fillStyle = 'rgba(224,36,36,0.5)';
        ctx.fillRect(0, beamY - 1, canvas.width, 2);

        // Grid pattern on scan area (tech look)
        ctx.strokeStyle = 'rgba(224,36,36,0.08)';
        ctx.lineWidth = 0.5;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, beamY - 25);
          ctx.lineTo(x, beamY + 25);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => sizeBg());
    ro.observe(surface);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [phase]);

  // Continuous 3D tilt lerp toward mouse-driven target
  useEffect(() => {
    if (phase === 'hidden') return undefined;
    let raf;
    const loop = () => {
      const cur = tiltCur.current;
      const tgt = tiltTarget.current;
      cur.x += (tgt.x - cur.x) * 0.08;
      cur.y += (tgt.y - cur.y) * 0.08;
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${cur.x}deg) rotateY(${cur.y}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    tiltTarget.current = { x: (ny - 0.5) * -14, y: (nx - 0.5) * 18 };
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle 240px at ${nx * 100}% ${ny * 100}%, rgba(255,255,255,0.055) 0%, transparent 70%)`;
    }
  };

  const handleCardLeave = () => {
    tiltTarget.current = { x: 5, y: 0 };
    if (sheenRef.current) {
      sheenRef.current.style.background = 'radial-gradient(circle 200px at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)';
    }
  };

  const dismiss = (cb) => {
    setPhase('exiting');
    setTimeout(() => { setPhase('hidden'); cb?.(); }, 650);
  };

  const spawnRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const surfRect = surfaceRef.current?.getBoundingClientRect();
    if (!surfRect) return;
    const id = Date.now() + Math.random();
    setRipples((rs) => [...rs, {
      id,
      x: rect.left - surfRect.left + rect.width / 2,
      y: rect.top - surfRect.top + rect.height / 2,
    }]);
  };

  const removeRipple = (id) => setRipples((rs) => rs.filter((r) => r.id !== id));

  const handleAcceptAll = (e) => {
    spawnRipple(e);
    setTimeout(() => dismiss(() => {
      localStorage.setItem('cookieConsent', 'all');
      document.cookie = `cookieConsent=all; path=/; max-age=${60 * 60 * 24 * 365}`;
    }), 320);
  };

  const handleDecline = () => dismiss(() => localStorage.setItem('cookieConsent', 'declined'));

  const handleSave = () => dismiss(() => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    document.cookie = `cookieConsent=custom; path=/; max-age=${60 * 60 * 24 * 365}`;
  });

  const isExpanded = phase === 'expanded';

  const toggleExpand = () => {
    if (phase === 'visible') setPhase('expanded');
    else if (phase === 'expanded') setPhase('visible');
  };

  if (phase === 'hidden') return null;

  const isIn = phase === 'entering';
  const isOut = phase === 'exiting';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .ck2*{box-sizing:border-box;margin:0;padding:0}
        .ck2{font-family:'Inter',system-ui,-apple-system,sans-serif}

        .ck2-shell{
          position:fixed;inset:0 0 0 0;z-index:9999;
          pointer-events:none;display:flex;
          align-items:flex-end;justify-content:center;
          padding:16px 12px 20px;
        }

        @media(min-width:768px){
          .ck2-shell{
            padding:20px 20px 24px;
          }
        }

        @media(min-width:1024px){
          .ck2-shell{
            padding:24px 24px 32px;
          }
        }

        .ck2-card-wrap{
          width:100%;max-width:calc(100% - 24px);pointer-events:auto;
          perspective:2000px;perspective-origin:50% 40%;
          position:relative;
        }

        @media(min-width:640px){
          .ck2-card-wrap{
            max-width:640px;
          }
        }

        @media(min-width:768px){
          .ck2-card-wrap{
            max-width:768px;
          }
        }

        @media(min-width:1024px){
          .ck2-card-wrap{
            max-width:1100px;
          }
        }

        .ck2-card{
          width:100%;border-radius:16px;
          transform-style:preserve-3d;
          transform:rotateX(5deg) rotateY(0deg);
          position:relative;
        }

        @media(min-width:768px){
          .ck2-card{
            border-radius:24px;
          }
        }

        @media(min-width:1024px){
          .ck2-card{
            border-radius:28px;
          }
        }

        .ck2-glow-ring{
          position:absolute;inset:-2px;border-radius:inherit;
          pointer-events:none;z-index:0;
          animation:ck2-ringPulse 4s ease-in-out infinite;
        }
        @keyframes ck2-ringPulse{
          0%,100%{box-shadow:0 0 20px 2px rgba(220,30,30,0.15),0 0 60px 4px rgba(220,30,30,0.06)}
          50%{box-shadow:0 0 40px 6px rgba(220,30,30,0.3),0 0 100px 10px rgba(220,30,30,0.1)}
        }

        .ck2-surface{
          position:relative;border-radius:inherit;overflow:hidden;
          background:linear-gradient(160deg,rgba(28,28,36,0.98) 0%,rgba(14,14,20,0.99) 60%,rgba(10,10,16,1) 100%);
          border:1px solid rgba(255,255,255,0.07);
          backdrop-filter:blur(40px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.07) inset,
            0 -1px 0 rgba(0,0,0,0.5) inset,
            0 0 0 1px rgba(0,0,0,0.9),
            0 20px 60px rgba(0,0,0,0.7),
            0 60px 120px rgba(0,0,0,0.5);
          z-index:1;
        }

        .ck2-bgcanvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;opacity:.9}

        .ck2-sheen{
          position:absolute;inset:0;pointer-events:none;z-index:2;
          background:radial-gradient(circle 200px at 50% 30%,rgba(255,255,255,0.03) 0%,transparent 70%);
          border-radius:inherit;
        }

        .ck2-mesh{
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background:
            radial-gradient(ellipse 40% 30% at 15% 20%,rgba(200,20,20,0.06) 0%,transparent 60%),
            radial-gradient(ellipse 30% 40% at 85% 80%,rgba(120,0,180,0.05) 0%,transparent 60%),
            radial-gradient(ellipse 50% 30% at 50% 110%,rgba(220,30,30,0.04) 0%,transparent 60%);
          animation:ck2-meshMove 12s ease-in-out infinite;
        }
        @keyframes ck2-meshMove{0%,100%{opacity:1}50%{opacity:.6}}

        .ck2-strip{
          height:3px;position:relative;overflow:visible;z-index:10;
          background:#e02424;
          animation:ck2-stripGrow 1.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        .ck2-strip::after{
          content:'';position:absolute;inset:-12px 0;background:#e02424;filter:blur(14px);opacity:.4;
          animation:ck2-stripGrowGlow 1.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        .ck2-strip::before{
          content:'';position:absolute;inset:-20px 0;
          background:#e02424;filter:blur(24px);opacity:.15;
          animation:ck2-stripGrowGlow 1.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes ck2-stripGrow{0%{transform:scaleY(0);opacity:0}70%{transform:scaleY(1.12)}100%{transform:scaleY(1);opacity:1}}
        @keyframes ck2-stripGrowGlow{0%{transform:scaleY(0);opacity:0}60%{opacity:.5;transform:scaleY(1.15)}100%{transform:scaleY(1);opacity:.4}}

        .ck2-body{padding:20px 16px 16px;position:relative;z-index:5}

        @media(min-width:640px){
          .ck2-body{
            padding:24px 22px 20px;
          }
        }

        @media(min-width:768px){
          .ck2-body{
            padding:28px 28px 24px;
          }
        }

        @media(min-width:1024px){
          .ck2-body{
            padding:32px 36px 28px;
          }
        }

        .ck2-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}

        @media(min-width:640px){
          .ck2-row{
            gap:16px;
            flex-wrap:nowrap;
          }
        }

        @media(min-width:768px){
          .ck2-row{
            gap:20px;
          }
        }

        .ck2-icon-3d{
          flex-shrink:0;width:48px;height:48px;position:relative;
          transform-style:preserve-3d;animation:ck2-iconFloat 4s ease-in-out infinite;
        }

        @media(min-width:768px){
          .ck2-icon-3d{
            width:56px;
            height:56px;
          }
        }

        @media(min-width:1024px){
          .ck2-icon-3d{
            width:64px;
            height:64px;
          }
        }

        @keyframes ck2-iconFloat{
          0%,100%{transform:translateY(0) rotateY(0deg)}
          25%{transform:translateY(-3px) rotateY(8deg)}
          75%{transform:translateY(-2px) rotateY(-4deg)}
        }

        .ck2-icon-face{
          width:100%;height:100%;border-radius:14px;
          background:linear-gradient(145deg,rgba(255,60,60,0.22),rgba(160,0,0,0.12));
          border:1px solid rgba(255,80,80,0.25);
          display:flex;align-items:center;justify-content:center;position:relative;
          box-shadow:0 0 0 1px rgba(255,60,60,0.08) inset,0 6px 24px rgba(220,36,36,0.2),0 0 40px rgba(220,36,36,0.1);
        }

        @media(min-width:768px){
          .ck2-icon-face{
            border-radius:17px;
          }
        }

        @media(min-width:1024px){
          .ck2-icon-face{
            border-radius:20px;
          }
        }

        .ck2-icon-face::before{
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,120,120,0.18) 0%,transparent 50%);
        }
        .ck2-icon-shadow{
          position:absolute;bottom:-8px;left:8px;right:8px;height:10px;
          background:rgba(220,36,36,0.25);filter:blur(12px);border-radius:50%;
        }

        .ck2-meta{flex:1;min-width:0}
        .ck2-headline{
          font-size:14px;font-weight:800;
          background:linear-gradient(135deg,#f8f8fa 0%,#c8c8d8 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          letter-spacing:-.04em;line-height:1.2;margin-bottom:4px;
        }

        @media(min-width:640px){
          .ck2-headline{
            font-size:15px;
          }
        }

        @media(min-width:768px){
          .ck2-headline{
            font-size:16px;
            margin-bottom:6px;
          }
        }

        @media(min-width:1024px){
          .ck2-headline{
            font-size:17px;
            margin-bottom:8px;
          }
        }

        .ck2-sub{font-size:11px;line-height:1.6;color:rgba(160,160,180,0.9)}

        @media(min-width:640px){
          .ck2-sub{
            font-size:12px;
          }
        }

        @media(min-width:768px){
          .ck2-sub{
            font-size:13px;
          }
        }

        @media(min-width:1024px){
          .ck2-sub{
            font-size:13.5px;
          }
        }

        .ck2-link{
          color:#ff5555;font-weight:700;background:none;border:none;padding:0;cursor:pointer;
          font-family:inherit;font-size:inherit;display:inline;text-decoration:none;
          background:linear-gradient(90deg,#ff5555,#ff8080);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          transition:opacity .15s;
        }
        .ck2-link:hover{opacity:.8}

        .ck2-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;width:100%;justify-content:flex-end;margin-top:12px}

        @media(min-width:640px){
          .ck2-actions{
            gap:8px;
            width:auto;
            margin-top:0;
          }
        }

        @media(min-width:768px){
          .ck2-actions{
            gap:10px;
          }
        }

        .ck2-btn-ghost{
          height:32px;padding:0 10px;background:none;border:none;
          font-size:11px;font-weight:500;color:rgba(120,120,140,0.9);cursor:pointer;
          font-family:inherit;border-radius:8px;transition:all .15s;
          white-space:nowrap;
        }

        @media(min-width:768px){
          .ck2-btn-ghost{
            height:34px;
            font-size:12px;
          }
        }

        .ck2-btn-ghost:hover{color:rgba(180,180,200,0.9);background:rgba(255,255,255,0.05)}

        .ck2-btn-outline{
          height:32px;padding:0 12px;background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.1);border-radius:10px;
          font-size:11px;font-weight:600;color:rgba(160,160,180,0.9);cursor:pointer;
          font-family:inherit;transition:all .2s;position:relative;overflow:hidden;
          white-space:nowrap;
        }

        @media(min-width:640px){
          .ck2-btn-outline{
            height:36px;
            padding:0 14px;
            font-size:12px;
            border-radius:11px;
          }
        }

        @media(min-width:768px){
          .ck2-btn-outline{
            height:37px;
            padding:0 16px;
            font-size:12.5px;
          }
        }

        .ck2-btn-outline::before{
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 60%);
        }
        .ck2-btn-outline:hover{
          background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);
          color:rgba(220,220,240,1);box-shadow:0 4px 16px rgba(0,0,0,0.3);
        }

        .ck2-btn-red{
          height:32px;padding:0 14px;border:none;border-radius:10px;
          font-size:11px;font-weight:800;color:#fff;cursor:pointer;
          font-family:inherit;letter-spacing:-.02em;white-space:nowrap;
          position:relative;overflow:hidden;
          background:linear-gradient(160deg,#ff3535 0%,#cc1111 50%,#990000 100%);
          box-shadow:
            0 1px 0 rgba(255,180,180,0.5) inset,0 -2px 0 rgba(0,0,0,0.4) inset,
            0 0 0 1px rgba(255,60,60,0.4),0 2px 8px rgba(220,20,20,0.5),
            0 6px 20px rgba(220,20,20,0.4),0 12px 40px rgba(220,20,20,0.25),0 24px 60px rgba(220,20,20,0.12);
          transition:all .2s cubic-bezier(0.16,1,0.3,1);
          text-shadow:0 1px 2px rgba(0,0,0,0.4);
        }

        @media(min-width:640px){
          .ck2-btn-red{
            height:34px;
            padding:0 16px;
            font-size:12px;
            border-radius:11px;
          }
        }

        @media(min-width:768px){
          .ck2-btn-red{
            height:37px;
            padding:0 20px;
            font-size:13px;
          }
        }

        .ck2-btn-red::before{
          content:'';position:absolute;top:0;left:0;right:0;height:50%;
          background:linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 100%);
          border-radius:inherit;
        }
        .ck2-btn-red::after{
          content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
          animation:ck2-sweep 2.5s ease-in-out infinite;
        }
        @keyframes ck2-sweep{0%,60%{left:-100%}100%{left:200%}}
        .ck2-btn-red:hover{
          transform:translateY(-2px) scale(1.02);
          box-shadow:
            0 1px 0 rgba(255,200,200,0.55) inset,0 -2px 0 rgba(0,0,0,0.4) inset,
            0 0 0 1px rgba(255,80,80,0.5),0 4px 12px rgba(230,20,20,0.65),
            0 10px 30px rgba(230,20,20,0.5),0 20px 60px rgba(230,20,20,0.3),0 40px 80px rgba(230,20,20,0.15);
        }
        .ck2-btn-red:active{transform:scale(0.97) translateY(0)}

        .ck2-foot{
          display:flex;align-items:center;justify-content:space-between;
          margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);
          flex-wrap:wrap;gap:10px;
        }

        @media(min-width:768px){
          .ck2-foot{
            margin-top:18px;
            padding-top:16px;
            gap:0;
          }
        }

        .ck2-badges{display:flex;align-items:center;gap:8px;font-size:9px}

        @media(min-width:768px){
          .ck2-badges{
            gap:14px;
            font-size:10.5px;
          }
        }

        .ck2-badge{display:flex;align-items:center;gap:5px;font-weight:500;color:rgba(100,100,120,0.9)}
        .ck2-dot{
          width:6px;height:6px;border-radius:50%;background:#22c55e;
          box-shadow:0 0 10px rgba(34,197,94,0.7);animation:ck2-gp 2.5s ease-in-out infinite;
        }
        @keyframes ck2-gp{0%,100%{box-shadow:0 0 8px 3px rgba(34,197,94,0.4)}50%{box-shadow:0 0 14px 5px rgba(34,197,94,0.15)}}
        .ck2-sep-dot{color:rgba(255,255,255,0.07);font-size:14px;line-height:1}

        @media(min-width:768px){
          .ck2-sep-dot{
            font-size:18px;
          }
        }

        .ck2-policy{
          font-size:9px;color:rgba(100,100,120,0.9);text-decoration:none;
          font-weight:500;display:flex;align-items:center;gap:3px;transition:color .15s;
        }

        @media(min-width:768px){
          .ck2-policy{
            font-size:10.5px;
          }
        }

        .ck2-policy:hover{color:#ff5555}

        .ck2-hr{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.06) 80%,transparent)}

        .ck2-exp{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(0.16,1,0.3,1)}
        .ck2-exp.open{max-height:800px}

        @media(min-width:768px){
          .ck2-exp.open{
            max-height:700px;
          }
        }

        .ck2-exp-in{padding:16px 16px 16px;position:relative;z-index:5}

        @media(min-width:640px){
          .ck2-exp-in{
            padding:18px 22px 18px;
          }
        }

        @media(min-width:768px){
          .ck2-exp-in{
            padding:22px 26px 24px;
          }
        }

        @media(min-width:1024px){
          .ck2-exp-in{
            padding:26px 32px 28px;
          }
        }

        .ck2-sec-label{
          font-size:8px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
          color:rgba(90,90,110,1);margin-bottom:14px;
        }

        @media(min-width:768px){
          .ck2-sec-label{
            font-size:9.5px;
            margin-bottom:16px;
          }
        }

        .ck2-tiles{display:grid;grid-template-columns:1fr;gap:10px}

        @media(min-width:640px){
          .ck2-tiles{
            grid-template-columns:repeat(3,1fr);
            gap:12px;
          }
        }

        @media(min-width:768px){
          .ck2-tiles{
            gap:10px;
          }
        }

        .ck2-tile{
          border-radius:12px;padding:12px;border:1px solid rgba(255,255,255,0.055);
          background:linear-gradient(145deg,rgba(255,255,255,0.032) 0%,rgba(255,255,255,0.012) 100%);
          position:relative;overflow:hidden;
          transition:transform .3s cubic-bezier(0.16,1,0.3,1),border-color .25s,box-shadow .25s,background .25s;
          transform-style:preserve-3d;
        }

        @media(min-width:768px){
          .ck2-tile{
            border-radius:16px;
            padding:16px;
          }
        }

        .ck2-tile::after{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);
        }
        .ck2-tile.clickable{cursor:pointer;-webkit-user-select:none;user-select:none}
        .ck2-tile.clickable:hover{
          transform:translateY(-4px) scale(1.02) rotateX(-2deg);
          border-color:rgba(220,36,36,0.28);
          background:linear-gradient(145deg,rgba(220,36,36,0.09) 0%,rgba(160,0,0,0.05) 100%);
          box-shadow:0 8px 32px rgba(0,0,0,0.4),0 4px 16px rgba(220,36,36,0.1),0 0 0 1px rgba(220,36,36,0.12) inset;
        }
        .ck2-tile.active{
          border-color:rgba(220,36,36,0.32);
          background:linear-gradient(145deg,rgba(220,36,36,0.11) 0%,rgba(160,0,0,0.06) 100%);
          box-shadow:0 6px 28px rgba(0,0,0,0.4),0 4px 20px rgba(220,36,36,0.12),0 0 0 1px rgba(220,36,36,0.14) inset;
        }
        .ck2-tile.active::before,.ck2-tile.essential::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:inherit;
        }
        .ck2-tile.active::before{
          background:linear-gradient(90deg,#880000,#e02424,#ff5555,#e02424,#880000);
          background-size:200% 100%;animation:ck2-plasma 2s linear infinite;
          box-shadow:0 0 16px rgba(220,36,36,0.7);
        }
        .ck2-tile.essential{border-color:rgba(34,197,94,0.18);background:linear-gradient(145deg,rgba(34,197,94,0.07) 0%,rgba(0,100,50,0.04) 100%)}
        .ck2-tile.essential::before{
          background:linear-gradient(90deg,#065f46,#22c55e,#4ade80,#22c55e,#065f46);
          background-size:200% 100%;animation:ck2-plasma 3s linear infinite;
          box-shadow:0 0 14px rgba(34,197,94,0.6);
        }

        .ck2-tile-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}

        @media(min-width:768px){
          .ck2-tile-top{
            margin-bottom:12px;
          }
        }

        .ck2-tile-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:all .25s;position:relative}

        @media(min-width:768px){
          .ck2-tile-icon{
            width:34px;
            height:34px;
            border-radius:10px;
          }
        }

        .ck2-tile-name{font-size:11px;font-weight:700;color:rgba(230,230,245,0.95);letter-spacing:-.02em;margin-bottom:3px}

        @media(min-width:768px){
          .ck2-tile-name{
            font-size:12.5px;
            margin-bottom:4px;
          }
        }

        .ck2-tile-desc{font-size:10px;color:rgba(100,100,120,0.9);line-height:1.4}

        @media(min-width:768px){
          .ck2-tile-desc{
            font-size:11px;
            line-height:1.5;
          }
        }

        .ck2-always-badge{
          display:inline-flex;align-items:center;gap:3px;font-size:8px;font-weight:800;
          color:#4ade80;letter-spacing:.04em;background:rgba(74,222,128,0.1);
          border:1px solid rgba(74,222,128,0.2);padding:2px 6px;border-radius:16px;
          box-shadow:0 0 12px rgba(74,222,128,0.1);
        }

        @media(min-width:768px){
          .ck2-always-badge{
            font-size:9px;
            padding:3px 8px 3px 5px;
            gap:4px;
          }
        }

        .ck2-toggle{
          width:32px;height:18px;border-radius:9px;background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.07);position:relative;
          transition:all .3s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;cursor:pointer;
        }

        @media(min-width:768px){
          .ck2-toggle{
            width:36px;
            height:20px;
            border-radius:10px;
          }
        }

        .ck2-toggle.on{
          background:linear-gradient(90deg,#cc1111,#e02424);border-color:transparent;
          box-shadow:0 0 20px rgba(220,36,36,0.55),0 2px 8px rgba(220,36,36,0.4);
        }
        .ck2-toggle-knob{
          position:absolute;top:2px;left:2px;width:12px;height:12px;
          background:linear-gradient(135deg,#ffffff,#e8e8ee);border-radius:50%;
          box-shadow:0 1px 4px rgba(0,0,0,0.5),0 0 0 0.5px rgba(255,255,255,0.3) inset;
          transition:transform .35s cubic-bezier(0.34,1.56,0.64,1);
        }

        @media(min-width:768px){
          .ck2-toggle-knob{
            width:14px;
            height:14px;
          }
        }

        .ck2-toggle.on .ck2-toggle-knob{transform:translateX(14px)}

        @media(min-width:768px){
          .ck2-toggle.on .ck2-toggle-knob{
            transform:translateX(16px);
          }
        }

        .ck2-exp-foot{
          display:flex;align-items:center;justify-content:flex-end;gap:6px;
          margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);
          flex-wrap:wrap;
        }

        @media(min-width:768px){
          .ck2-exp-foot{
            gap:8px;
            margin-top:20px;
            padding-top:18px;
          }
        }

        .ck2-rpl{
          position:absolute;width:6px;height:6px;background:rgba(255,60,60,0.3);
          border-radius:50%;transform:translate(-50%,-50%) scale(0);pointer-events:none;
          animation:ck2-rplAnim .7s ease-out forwards;z-index:100;
        }
        @keyframes ck2-rplAnim{to{transform:translate(-50%,-50%) scale(280);opacity:0}}

        .ck2-ca{position:absolute;pointer-events:none;z-index:20}
        .ck2-ca-tl{top:0;left:0;width:22px;height:22px;border-top:1.5px solid rgba(220,36,36,0.5);border-left:1.5px solid rgba(220,36,36,0.5);border-radius:20px 0 0 0}
        .ck2-ca-tr{top:0;right:0;width:22px;height:22px;border-top:1.5px solid rgba(220,36,36,0.5);border-right:1.5px solid rgba(220,36,36,0.5);border-radius:0 20px 0 0}
        .ck2-ca-bl{bottom:0;left:0;width:22px;height:22px;border-bottom:1.5px solid rgba(220,36,36,0.15);border-left:1.5px solid rgba(220,36,36,0.15);border-radius:0 0 0 20px}
        .ck2-ca-br{bottom:0;right:0;width:22px;height:22px;border-bottom:1.5px solid rgba(220,36,36,0.15);border-right:1.5px solid rgba(220,36,36,0.15);border-radius:0 0 20px 0}

        /* Enhanced Growing Animation */
        @keyframes ck2-growIn {
          0% {
            opacity: 0;
            transform: scale(0.75) translateY(40px);
          }
          50% {
            transform: scale(1.02) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .ck2-card-wrap.entering {
          animation: ck2-growIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @media(max-width:640px){
          .ck2-row{flex-wrap:wrap}
          .ck2-actions{width:100%;justify-content:flex-end;margin-top:12px}
          .ck2-tiles{grid-template-columns:1fr}
          .ck2-exp.open{max-height:1200px}
          .ck2-badges{display:none}
        }
        @media (prefers-reduced-motion: reduce){
          .ck2-icon-3d,.ck2-strip,.ck2-strip::after,.ck2-strip::before,.ck2-glow-ring,.ck2-mesh,.ck2-btn-red::after,.ck2-dot,.ck2-tile.active::before,.ck2-tile.essential::before{
            animation:none!important;
          }
          .ck2-card-wrap.entering{
            animation:none!important;
          }
        }
      `}</style>

      <div className="ck2">
        <div className="ck2-shell">
          <div
            className={`ck2-card-wrap${isIn ? ' entering' : ''}`}
            ref={cardWrapRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
          >
            <div className="ck2-card" ref={cardRef}>
              <div className="ck2-glow-ring" />

              <div className="ck2-surface" ref={surfaceRef}>
                <canvas className="ck2-bgcanvas" ref={canvasRef} />
                <div className="ck2-sheen" ref={sheenRef} />
                <div className="ck2-mesh" />

                <div className="ck2-ca ck2-ca-tl" />
                <div className="ck2-ca ck2-ca-tr" />
                <div className="ck2-ca ck2-ca-bl" />
                <div className="ck2-ca ck2-ca-br" />

                <div className="ck2-strip" />

                {ripples.map((r) => (
                  <div
                    key={r.id}
                    className="ck2-rpl"
                    style={{ left: r.x, top: r.y }}
                    onAnimationEnd={() => removeRipple(r.id)}
                  />
                ))}

                <div className="ck2-body">
                  <div className="ck2-row">
                    <div className="ck2-icon-3d">
                      <div className="ck2-icon-face">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                          <defs>
                            <linearGradient id="ckShieldGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop stopColor="#ff6060" />
                              <stop offset="1" stopColor="#990000" />
                            </linearGradient>
                          </defs>
                          <path d="M12 2L3.5 6V12c0 5 3.8 9.7 8.5 11C17.2 21.7 21 17 21 12V6L12 2z" fill="rgba(220,30,30,0.18)" stroke="url(#ckShieldGrad)" strokeWidth="1.4" strokeLinejoin="round" />
                          <path d="M8.5 12l2.5 2.5 5-5" stroke="#ff8080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="ck2-icon-shadow" />
                    </div>

                    <div className="ck2-meta">
                      <p className="ck2-headline">We value your privacy</p>
                      <p className="ck2-sub">
                        We use cookies to personalize content and analyze traffic.{' '}
                        <button className="ck2-link" onClick={toggleExpand}>
                          {isExpanded ? 'Hide settings ↑' : 'Manage preferences →'}
                        </button>
                      </p>
                    </div>

                    {!isExpanded && (
                      <div className="ck2-actions">
                        <button className="ck2-btn-ghost" onClick={handleDecline}>Decline</button>
                        <button className="ck2-btn-outline" onClick={toggleExpand}>Customize</button>
                        <button className="ck2-btn-red" onClick={handleAcceptAll}>Accept all</button>
                      </div>
                    )}
                  </div>

                  {!isExpanded && (
                    <div className="ck2-foot">
                      <div className="ck2-badges">
                        <span className="ck2-badge"><span className="ck2-dot" />GDPR compliant</span>
                        <span className="ck2-sep-dot">·</span>
                        <span className="ck2-badge">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(100,100,120,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          256-bit encrypted
                        </span>
                        <span className="ck2-sep-dot">·</span>
                        <span className="ck2-badge">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(100,100,120,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                          </svg>
                          30-day retention
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`ck2-exp${isExpanded ? ' open' : ''}`}>
                  <div className="ck2-hr" />
                  <div className="ck2-exp-in">
                    <p className="ck2-sec-label">Cookie preferences</p>

                    <div className="ck2-tiles">
                      <div className="ck2-tile essential">
                        <div className="ck2-tile-top">
                          <div className="ck2-tile-icon" style={{ background: 'rgba(34,197,94,0.12)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                          <span className="ck2-always-badge">
                            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#4ade80" /></svg>
                            Always on
                          </span>
                        </div>
                        <p className="ck2-tile-name">Essential</p>
                        <p className="ck2-tile-desc">Security, sessions, and core site functions.</p>
                      </div>

                      <div
                        className={`ck2-tile clickable${preferences.analytics ? ' active' : ''}`}
                        onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                        role="checkbox" aria-checked={preferences.analytics} tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                      >
                        <div className="ck2-tile-top">
                          <div className="ck2-tile-icon" style={{ background: preferences.analytics ? 'rgba(220,36,36,0.15)' : 'rgba(255,255,255,0.05)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={preferences.analytics ? '#ff5555' : 'rgba(90,90,110,0.9)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                          </div>
                          <div className={`ck2-toggle${preferences.analytics ? ' on' : ''}`}>
                            <div className="ck2-toggle-knob" />
                          </div>
                        </div>
                        <p className="ck2-tile-name">Analytics</p>
                        <p className="ck2-tile-desc">Understand how visitors navigate our pages.</p>
                      </div>

                      <div
                        className={`ck2-tile clickable${preferences.marketing ? ' active' : ''}`}
                        onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                        role="checkbox" aria-checked={preferences.marketing} tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                      >
                        <div className="ck2-tile-top">
                          <div className="ck2-tile-icon" style={{ background: preferences.marketing ? 'rgba(220,36,36,0.15)' : 'rgba(255,255,255,0.05)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={preferences.marketing ? '#ff5555' : 'rgba(90,90,110,0.9)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                          <div className={`ck2-toggle${preferences.marketing ? ' on' : ''}`}>
                            <div className="ck2-toggle-knob" />
                          </div>
                        </div>
                        <p className="ck2-tile-name">Marketing</p>
                        <p className="ck2-tile-desc">Relevant ads and personalized content.</p>
                      </div>
                    </div>

                    <div className="ck2-exp-foot">
                      <button className="ck2-btn-ghost" onClick={handleDecline}>Decline all</button>
                      <button className="ck2-btn-outline" onClick={handleSave}>Save selection</button>
                      <button className="ck2-btn-red" onClick={handleAcceptAll}>Accept all</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
