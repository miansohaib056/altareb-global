import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas particle field with subtle connection lines.
 * Designed for hero backgrounds — DPI-capped, idle-friendly,
 * paused when offscreen or tab hidden.
 */
export default function ParticleField({
  density = 0.00006,
  maxParticles = 55,
  linkDistance = 110,
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const visibleRef = useRef(true);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      // Cap DPR at 1.5 — particles are tiny, full 2x is wasteful.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(maxParticles, Math.max(20, Math.floor(w * h * density)));
      const arr = [];
      for (let i = 0; i < target; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.3 + 0.4,
          hue: Math.random() < 0.5 ? 190 : 265,
        });
      }
      particlesRef.current = arr;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      if (!visibleRef.current || document.hidden) {
        runningRef.current = false;
        return;
      }
      const { w, h } = sizeRef.current;
      const parts = particlesRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const linkSq = linkDistance * linkDistance;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 12000) {
          const f = (12000 - dist2) / 12000;
          const inv = 1 / Math.sqrt(dist2 + 1);
          p.vx += dx * inv * f * 0.04;
          p.vy += dy * inv * f * 0.04;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        // O(n²) link pass — kept cheap by squared-distance early-out and small N.
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < linkSq) {
            const a = (1 - dSq / linkSq) * 0.16;
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) >> 1}, 90%, 70%, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, 0.85)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();

    // Pause when canvas is offscreen — saves CPU on long pages.
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    const onVisibility = () => {
      if (!document.hidden && visibleRef.current) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, maxParticles, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
