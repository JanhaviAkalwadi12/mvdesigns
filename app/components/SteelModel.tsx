'use client';

import { useEffect, useRef, useState } from 'react';

export default function SteelModel() {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 41, y: 107, rotX: 59, rotZ: -34 });

  useEffect(() => {
    // Disable interactive tilt if user prefers reduced motion or on touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Subtle tilt
      const targetRotX = 59 - normY * 7;
      const targetRotZ = -34 + normX * 8;

      setCoords({
        x: Math.round(41 + normX * 12),
        y: Math.round(107 + normY * 15),
        rotX: targetRotX,
        rotZ: targetRotZ,
      });

      if (modelRef.current) {
        modelRef.current.style.transform = `rotateX(${targetRotX.toFixed(1)}deg) rotateZ(${targetRotZ.toFixed(1)}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="model-wrapper" aria-label="Animated 3D structural steel frame illustration">
      <div ref={modelRef} className="model">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <b>
          <i /> LIVE MODEL VIEW
        </b>
        <span className="coord c1">
          X {String(coords.x).padStart(3, '0')} / Y {String(coords.y).padStart(3, '0')}
        </span>
        <span className="coord c2">CONNECTION A-04</span>
      </div>
    </div>
  );
}
