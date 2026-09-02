import React from 'react';
import { Info, ExternalLink, X, BookOpen, Camera, ShieldCheck } from 'lucide-react';

const QuoteAttribution = ({ quote, isOpen, onClose }) => {
  if (!isOpen || !quote) return null;

  const { source, copyrightStatus, photo } = quote;

  return (
    <div className="modal-backdrop saudade-modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="modal-content saudade-attribution-modal animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="attribution-header">
          <Info size={22} className="text-primary inline-icon" />
          <h3>About This Quote & Atmosphere</h3>
        </div>

        <div className="attribution-body">
          {/* Quote Provenance Section */}
          <div className="attribution-section">
            <div className="section-title-tag">
              <BookOpen size={16} />
              <span>Quote Provenance</span>
            </div>

            <div className="attribution-detail-box">
              <div className="detail-row">
                <span className="detail-label">Author</span>
                <span className="detail-value font-semibold">{quote.author || 'Anonymous'}</span>
              </div>

              {source?.name && (
                <div className="detail-row">
                  <span className="detail-label">Source Work</span>
                  <span className="detail-value">{source.name}</span>
                </div>
              )}

              {source?.work && (
                <div className="detail-row">
                  <span className="detail-label">Edition / Collection</span>
                  <span className="detail-value">{source.work}</span>
                </div>
              )}

              <div className="detail-row">
                <span className="detail-label">Rights & Status</span>
                <span className="detail-value badge-license">
                  <ShieldCheck size={13} />
                  <span>{copyrightStatus || 'Verified Source'}</span>
                </span>
              </div>

              {source?.url && (
                <div className="detail-row mt-2">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attribution-external-link"
                  >
                    <span>View Gutenberg Source Reference</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Image Attribution Section */}
          {photo && (
            <div className="attribution-section mt-4">
              <div className="section-title-tag">
                <Camera size={16} />
                <span>Atmospheric Photography</span>
              </div>

              <div className="attribution-detail-box">
                <div className="detail-row">
                  <span className="detail-label">Photographer</span>
                  <span className="detail-value font-semibold">{photo.photographer}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Platform</span>
                  <span className="detail-value">{photo.source}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Image License</span>
                  <span className="detail-value">{photo.license}</span>
                </div>

                {photo.attributionUrl && (
                  <div className="detail-row mt-2">
                    <a
                      href={photo.attributionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="attribution-external-link"
                    >
                      <span>View Original Photograph on {photo.source}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteAttribution;
