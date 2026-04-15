import { useEffect, useRef, useCallback } from 'react';

/**
 * Animated neural network canvas background for the landing page hero.
 * Draws nodes, connections, and pulsing signals on a performant canvas.
 * Respects prefers-reduced-motion.
 */
export function NeuralNetworkHero({ className = '' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  const reducedMotion = useRef(false);

  const initNodes = useCallback((width, height) => {
    const nodes = [];
    const count = Math.min(60, Math.floor((width * height) / 18000));

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 4), // visual layer for coloring
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const COLORS = [
      'rgba(0, 242, 255, ',   // cyan
      'rgba(112, 0, 255, ',   // purple
      'rgba(0, 255, 157, ',   // green accent
      'rgba(255, 0, 85, ',    // pink accent
    ];

    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      const nodes = nodesRef.current;
      const maxDist = 150;

      // Update positions
      if (!reducedMotion.current) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;

          // Subtle mouse attraction
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 10) {
            node.vx += dx * 0.00003;
            node.vy += dy * 0.00003;
          }

          // Boundary wrap
          if (node.x < -10) node.x = w + 10;
          if (node.x > w + 10) node.x = -10;
          if (node.y < -10) node.y = h + 10;
          if (node.y > h + 10) node.y = -10;

          // Speed damping
          node.vx *= 0.999;
          node.vy *= 0.999;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            const colorIdx = (nodes[i].layer + nodes[j].layer) % COLORS.length;

            // Pulsing opacity
            const pulse = reducedMotion.current
              ? 1
              : 0.7 + 0.3 * Math.sin(time * 2 + nodes[i].pulsePhase);

            ctx.beginPath();
            ctx.strokeStyle = COLORS[colorIdx] + (alpha * pulse).toFixed(3) + ')';
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Signal dot traveling along connection
            if (!reducedMotion.current && alpha > 0.07) {
              const t = (Math.sin(time * 3 + i * 0.5) + 1) / 2;
              const sx = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
              const sy = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
              ctx.beginPath();
              ctx.fillStyle = COLORS[colorIdx] + (alpha * 2).toFixed(3) + ')';
              ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = reducedMotion.current
          ? 1
          : 0.6 + 0.4 * Math.sin(time * 1.5 + node.pulsePhase);
        const colorIdx = node.layer % COLORS.length;

        // Glow
        ctx.beginPath();
        ctx.fillStyle = COLORS[colorIdx] + (0.08 * pulse).toFixed(3) + ')';
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = COLORS[colorIdx] + (0.6 * pulse).toFixed(3) + ')';
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`neural-hero-canvas ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
}
