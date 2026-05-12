import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function HolographicTechAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Holographic Grid Lines
    const gridLines: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      opacity: number;
      speed: number;
      type: 'horizontal' | 'vertical';
    }> = [];

    // Create scanning lines
    for (let i = 0; i < 12; i++) {
      const type = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      gridLines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: type === 'vertical' ? 1 : Math.random() * 200 + 100,
        height: type === 'horizontal' ? 1 : Math.random() * 200 + 100,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
        type,
      });
    }

    // Holographic Nodes
    const nodes: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      pulsePhase: number;
      connections: number[];
    }> = [];

    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Floating Tech Symbols
    const symbols: Array<{
      x: number;
      y: number;
      char: string;
      opacity: number;
      speed: number;
      size: number;
    }> = [];

    const techChars = ['0', '1', '{', '}', '<', '>', '/', '\\', '[', ']'];
    for (let i = 0; i < 25; i++) {
      symbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: techChars[Math.floor(Math.random() * techChars.length)],
        opacity: Math.random() * 0.2 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 8 + 10,
      });
    }

    let animationFrame: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw scanning grid lines
      gridLines.forEach((line) => {
        ctx.strokeStyle = `rgba(220, 38, 38, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        if (line.type === 'horizontal') {
          line.y += line.speed;
          if (line.y > canvas.height) line.y = -line.height;
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.width, line.y);
        } else {
          line.x += line.speed;
          if (line.x > canvas.width) line.x = -line.width;
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.height);
        }

        ctx.stroke();

        // Pulse opacity
        line.opacity = Math.sin(frame * 0.02 + line.y) * 0.15 + 0.2;
      });

      // Draw holographic nodes
      nodes.forEach((node, i) => {
        // Pulse animation
        const pulse = Math.sin(frame * 0.03 + node.pulsePhase) * 0.3 + 0.7;
        const currentRadius = node.radius * pulse;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${node.opacity * pulse})`;
        ctx.fill();

        // Draw outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${node.opacity * 0.3 * pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i >= j) return;
          
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${(1 - distance / 250) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw floating tech symbols
      symbols.forEach((symbol) => {
        symbol.y -= symbol.speed;
        if (symbol.y < -20) {
          symbol.y = canvas.height + 20;
          symbol.x = Math.random() * canvas.width;
        }

        ctx.font = `${symbol.size}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(220, 38, 38, ${symbol.opacity})`;
        ctx.fillText(symbol.char, symbol.x, symbol.y);

        // Fade effect
        symbol.opacity = Math.sin(frame * 0.02 + symbol.y * 0.01) * 0.1 + 0.15;
      });

      // Draw scanning beam effect
      const beamY = (frame * 2) % canvas.height;
      const gradient = ctx.createLinearGradient(0, beamY - 50, 0, beamY + 50);
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0)');
      gradient.addColorStop(0.5, 'rgba(220, 38, 38, 0.08)');
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, beamY - 50, canvas.width, 100);

      animationFrame = requestAnimationFrame(animate);
    };

    // Delay start of animation
    const startDelay = setTimeout(() => {
      animate();
    }, 1500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
