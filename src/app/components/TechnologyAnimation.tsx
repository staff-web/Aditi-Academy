import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Data stream lines
const dataStreams = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  delay: i * 0.8,
  duration: 3 + Math.random() * 2,
}));

// Circuit nodes
const circuitNodes = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: 10 + (i % 5) * 20,
  y: 15 + Math.floor(i / 5) * 35,
  delay: i * 0.15,
}));

// Hexagon grid positions
const hexagons = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (i % 4) * 25 + 10,
  y: Math.floor(i / 4) * 30 + 10,
  delay: i * 0.2,
}));

export function TechnologyAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  // Delay start of animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 1.5 second delay after page load

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* Gradients */}
          <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.8;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#dc2626" stopOpacity="0.6">
              <animate
                attributeName="stop-opacity"
                values="0.6;1;0.6"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.8;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid Lines - Animated */}
        <g opacity="0.15">
          {/* Horizontal lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={12.5 * i}
              x2="100"
              y2={12.5 * i}
              stroke="url(#redGlow)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 2,
                delay: i * 0.1 + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
          
          {/* Vertical lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={8.33 * i}
              y1="0"
              x2={8.33 * i}
              y2="100"
              stroke="url(#redGlow)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 2,
                delay: i * 0.08 + 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </g>

        {/* Data Streams - Vertical flowing lines */}
        {dataStreams.map((stream) => (
          <g key={stream.id}>
            <motion.line
              x1={stream.startX}
              y1="0"
              x2={stream.startX}
              y2="100"
              stroke="url(#pulseGradient)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: stream.duration,
                repeat: Infinity,
                delay: stream.delay,
                ease: 'linear',
              }}
              filter="url(#glow)"
            />
          </g>
        ))}

        {/* Circuit Board Nodes with Connections */}
        <g opacity="0.4">
          {circuitNodes.map((node, i) => {
            const nextNode = circuitNodes[i + 1];
            return (
              <g key={node.id}>
                {/* Connection line to next node */}
                {nextNode && (
                  <motion.line
                    x1={node.x}
                    y1={node.y}
                    x2={nextNode.x}
                    y2={nextNode.y}
                    stroke="#dc2626"
                    strokeWidth="0.15"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{
                      duration: 1.5,
                      delay: node.delay + 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}
                
                {/* Node point */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="0.4"
                  fill="#dc2626"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: node.delay + 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  filter="url(#glow)"
                />
                
                {/* Pulsing effect */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="0.4"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.1"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 3, 3],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: node.delay + 2,
                    ease: 'easeOut',
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* Hexagon Tech Pattern */}
        {hexagons.map((hex) => (
          <motion.g key={hex.id}>
            <motion.path
              d={`M ${hex.x} ${hex.y - 3} L ${hex.x + 2.6} ${hex.y - 1.5} L ${hex.x + 2.6} ${hex.y + 1.5} L ${hex.x} ${hex.y + 3} L ${hex.x - 2.6} ${hex.y + 1.5} L ${hex.x - 2.6} ${hex.y - 1.5} Z`}
              fill="none"
              stroke="#dc2626"
              strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                delay: hex.delay + 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            
            {/* Inner hex glow */}
            <motion.circle
              cx={hex.x}
              cy={hex.y}
              r="1"
              fill="#dc2626"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: hex.delay + 2,
                ease: 'easeInOut',
              }}
              filter="url(#glow)"
            />
          </motion.g>
        ))}

        {/* Scanning Lines */}
        <motion.line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke="#dc2626"
          strokeWidth="0.3"
          opacity="0.6"
          initial={{ y1: 0, y2: 0 }}
          animate={{
            y1: [0, 100],
            y2: [0, 100],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 2,
          }}
          filter="url(#glow)"
        />

        {/* Corner Brackets - Professional UI Element */}
        {[
          { x: 2, y: 2, rotate: 0 },
          { x: 98, y: 2, rotate: 90 },
          { x: 98, y: 98, rotate: 180 },
          { x: 2, y: 98, rotate: 270 },
        ].map((corner, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
          >
            <line
              x1={corner.x}
              y1={corner.y}
              x2={corner.x + (corner.rotate === 0 || corner.rotate === 180 ? 5 : 0)}
              y2={corner.y + (corner.rotate === 90 || corner.rotate === 270 ? 5 : 0)}
              stroke="#dc2626"
              strokeWidth="0.3"
              transform={`rotate(${corner.rotate}, ${corner.x}, ${corner.y})`}
            />
            <line
              x1={corner.x}
              y1={corner.y}
              x2={corner.x + (corner.rotate === 90 || corner.rotate === 270 ? 5 : 0)}
              y2={corner.y + (corner.rotate === 0 || corner.rotate === 180 ? 5 : 0)}
              stroke="#dc2626"
              strokeWidth="0.3"
              transform={`rotate(${corner.rotate}, ${corner.x}, ${corner.y})`}
            />
          </motion.g>
        ))}

        {/* Radar Sweep Effect */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="url(#redGlow)"
          strokeWidth="0.2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: 3,
          }}
          style={{ transformOrigin: '50% 50%' }}
          opacity="0.3"
        />

        {/* Digital Rain Effect - Binary numbers */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.text
            key={`binary-${i}`}
            x={10 + i * 11}
            y="0"
            fontSize="1.5"
            fill="#dc2626"
            opacity="0.4"
            fontFamily="monospace"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, 100],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5 + 2,
              ease: 'linear',
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.text>
        ))}
      </svg>

      {/* 3D Depth Layers with CSS */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          initial={{ x: '0%', y: '0%', scale: 0.8 }}
          animate={{
            x: ['0%', '50%', '0%'],
            y: ['0%', '30%', '0%'],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full right-0 bottom-0"
          style={{
            background: 'radial-gradient(circle, rgba(127, 29, 29, 0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          initial={{ x: '0%', y: '0%', scale: 1 }}
          animate={{
            x: ['0%', '-30%', '0%'],
            y: ['0%', '-20%', '0%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>
    </div>
  );
}