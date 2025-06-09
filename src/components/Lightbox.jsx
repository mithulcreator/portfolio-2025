import { useEffect } from 'react';

export default function Lightbox({ images, activeIndex, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (activeIndex === null) return null;
  const image = images[activeIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in" onClick={onClose}>
      <div className="relative max-w-3xl w-full p-4" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg object-contain mx-auto"
        />
        {image.alt && <div className="text-center text-white mt-4">{image.alt}</div>}
      </div>
    </div>
  );
} 