'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;

      setProgress(currentProgress);
      setVisible(scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`top-btn-wrap ${visible ? 'visible' : ''}`}>
      <button
        className="top"
        onClick={scrollToTop}
        aria-label="Back to top"
        type="button"
      >
        <svg className="top-progress-ring" width="42" height="42">
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="rgba(200, 169, 107, 0.2)"
            strokeWidth="2"
          />
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 21 21)"
          />
        </svg>
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
