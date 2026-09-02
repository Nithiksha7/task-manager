import React, { useState } from 'react';
import SaudadeBackground from './SaudadeBackground';
import QuoteActions from './QuoteActions';
import QuoteAttribution from './QuoteAttribution';

const QuoteCard = ({ quote, isSpotlight = false, onFavoriteChange, onRefreshQuote }) => {
  const [isAttributionOpen, setIsAttributionOpen] = useState(false);

  if (!quote) return null;

  return (
    <>
      <div className={`saudade-quote-card ${isSpotlight ? 'spotlight' : ''}`}>
        {/* Photographic Atmosphere Background with Crossfade Transition */}
        <SaudadeBackground photo={quote.photo} />

        {/* Card Header Label */}
        <div className="quote-card-header">
          <span className="quote-category-tag">
            {quote.category ? `SAUDADE · ${quote.category.toUpperCase()}` : 'SAUDADE'}
          </span>
        </div>

        {/* Quote Body */}
        <div className="quote-body">
          <blockquote className="quote-text">
            "{quote.text}"
          </blockquote>
          <div className="quote-author">
            — {quote.author || 'Anonymous'}
          </div>
        </div>

        {/* Action Controls */}
        <QuoteActions
          quote={quote}
          onFavoriteChange={onFavoriteChange}
          onRefreshQuote={onRefreshQuote}
          onToggleAttribution={() => setIsAttributionOpen(true)}
        />
      </div>

      {/* Quote & Image Source Attribution Modal */}
      <QuoteAttribution
        quote={quote}
        isOpen={isAttributionOpen}
        onClose={() => setIsAttributionOpen(false)}
      />
    </>
  );
};

export default QuoteCard;
