'use client';

import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelect((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onSelect((currentIndex + 1) % images.length);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelect]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Lightbox"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-btn lightbox-close"
          onClick={onClose}
          type="button"
          aria-label="Close image lightbox"
        >
          <X size={20} />
        </button>

        <button
          className="lightbox-btn lightbox-prev"
          onClick={() => onSelect((currentIndex - 1 + images.length) % images.length)}
          type="button"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="lightbox-img"
        />

        <button
          className="lightbox-btn lightbox-next"
          onClick={() => onSelect((currentIndex + 1) % images.length)}
          type="button"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        <div className="lightbox-caption">
          <b>{String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</b>
          <span>{currentImage.alt}</span>
        </div>
      </div>
    </div>
  );
}
