'use client';

import { useEffect, useRef, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [exiting, setExiting] = useState(false);
  const [telemetry, setTelemetry] = useState('CALIBRATING 3D SPATIAL COORDINATES...');

  const handleSkip = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 550);
  };

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exiting]);

  // Telemetry sequence
  useEffect(() => {
    const t1 = setTimeout(() => setTelemetry('LOADING AISC / NISD DETAILING SPECIFICATIONS...'), 700);
    const t2 = setTimeout(() => setTelemetry('INITIALIZING DIGITAL TWIN WORKSPACE...'), 1400);
    const t3 = setTimeout(() => setTelemetry('MV STRUCTURAL DETAILING SYSTEM READY'), 2000);
    const finish = setTimeout(() => handleSkip(), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(finish);
    };
  }, []);

  // 3D particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const count = Math.min(60, Math.floor(width / 25));
    const colors = ['#c8a96b', '#55d6ff', '#ffffff'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
        color: colors[i % colors.length],
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 400;

      angle += 0.003;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Project & update particles
      const projected: Array<{ x: number; y: number; z: number; color: string }> = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -400) p.x = 400;
        if (p.x > 400) p.x = -400;
        if (p.y < -300) p.y = 300;
        if (p.y > 300) p.y = -300;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        const rx = p.x * cosA - p.z * sinA;
        const rz = p.z * cosA + p.x * sinA + 600;

        if (rz > 50) {
          const scale = fov / rz;
          const x2d = rx * scale + cx;
          const y2d = p.y * scale + cy;

          projected.push({ x: x2d, y: y2d, z: rz, color: p.color });

          const radius = Math.max(1, (1 - rz / 1200) * 2.8);
          ctx.beginPath();
          ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, 1 - rz / 1000);
          ctx.fill();
        }
      }

      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = '#55d6ff';
            ctx.globalAlpha = (1 - dist / 110) * 0.35;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <div className={`intro ${exiting ? 'intro-exit' : ''}`} role="dialog" aria-modal="true" aria-label="System Initializing">
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />
      <button className="intro-skip" onClick={handleSkip} type="button" aria-label="Skip introduction">
        Skip intro <kbd>ESC</kbd>
      </button>

      <div className="intro-content">
        <div className="intro-badge">
          <i /> DIGITAL TWIN PLATFORM
        </div>
        <div className="intro-mark" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src="/assets/mv-desgins-logo.png"
            alt="MV DESGINS"
            style={{
              height: '84px',
              width: 'auto',
              maxWidth: '280px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 25px rgba(200, 169, 107, 0.45))',
            }}
          />
        </div>
        <h2 className="intro-title" style={{ fontSize: '13px', letterSpacing: '0.22em' }}>
          Structural Detailing System
        </h2>
        <div className="intro-telemetry" aria-live="polite">
          <span>&gt;</span> {telemetry}
        </div>
        <div className="load" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
