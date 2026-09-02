import React, { useState, useEffect } from 'react';

const SaudadeBackground = ({ photo }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (photo && photo.url !== currentPhoto?.url) {
      setPrevPhoto(currentPhoto);
      setCurrentPhoto(photo);
      setIsFading(true);

      const timer = setTimeout(() => {
        setIsFading(false);
        setPrevPhoto(null);
      }, 850);

      return () => clearTimeout(timer);
    }
  }, [photo, currentPhoto]);

  return (
    <div className="saudade-bg-container">
      {/* Previous Photo Layer (Fading Out) */}
      {prevPhoto && (
        <div
          className="saudade-bg-layer fade-out"
          style={{ backgroundImage: `url("${prevPhoto.url}")` }}
        />
      )}

      {/* Current Photo Layer (Fading In) */}
      {currentPhoto && (
        <div
          className={`saudade-bg-layer ${isFading ? 'fade-in' : 'active'}`}
          style={{ backgroundImage: `url("${currentPhoto.url}")` }}
        />
      )}

      {/* Cinematic Dark Overlay */}
      <div className="saudade-bg-overlay" />
      <div className="saudade-bg-ambient-glow" />
    </div>
  );
};

export default SaudadeBackground;
