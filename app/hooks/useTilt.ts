'use client';

import { useCallback, useEffect, useRef } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const { maxTilt = 8, perspective = 1000, scale = 1.02, glare = true } = options;
  const ref = useRef<T | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      el.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
      el.style.setProperty('--glare-opacity', '1');
    }
  }, [maxTilt, perspective, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (glare) {
      el.style.setProperty('--glare-opacity', '0');
    }
  }, [perspective, glare]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch-only devices to preserve mobile performance
    if (window.matchMedia('(pointer: coarse)').matches) return;

    el.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease';
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
