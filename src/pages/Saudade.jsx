import React, { useState, useEffect, useCallback } from 'react';
import { getRandomQuote } from '../data/saudadeQuotes';
import QuoteCard from '../components/QuoteCard';
import SavedQuotes from '../components/SavedQuotes';
import { Heart } from 'lucide-react';

const Saudade = () => {
  const [historyList, setHistoryList] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Fetch a new quote with recent history ring buffer protection
  const fetchNewQuote = useCallback((history = historyList) => {
    const nextQuote = getRandomQuote(history);
    setCurrentQuote(nextQuote);
    
    setHistoryList((prevHistory) => {
      const updated = [...prevHistory, nextQuote.id];
      // Keep ring buffer history at max 10 items
      if (updated.length > 10) {
        return updated.slice(updated.length - 10);
      }
      return updated;
    });
  }, [historyList]);

  // Initial load
  useEffect(() => {
    const initial = getRandomQuote([]);
    setCurrentQuote(initial);
    setHistoryList([initial.id]);

    try {
      const saved = JSON.parse(localStorage.getItem('taskflow-saudade-favorites') || '[]');
      setFavorites(saved);
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  const handleRefreshQuote = useCallback(() => {
    fetchNewQuote();
  }, [fetchNewQuote]);

  const handleFavoriteRemove = (quoteId) => {
    const updated = favorites.filter((item) => item.id !== quoteId);
    setFavorites(updated);
    localStorage.setItem('taskflow-saudade-favorites', JSON.stringify(updated));
  };

  const handleFavoritesUpdated = (updatedList) => {
    setFavorites(updatedList);
  };

  return (
    <div className="saudade-page animate-fade-in">
      {/* Page Header */}
      <div className="page-header saudade-header">
        <div className="saudade-header-title-row">
          <Heart size={26} className="text-primary fill-heart" />
          <h1 className="page-title">Saudade</h1>
        </div>
        <p className="page-subtitle">"Some feelings are meant to be felt, not explained."</p>
      </div>

      {/* Main Cinematic Quote Player */}
      <section className="saudade-spotlight-section">
        {currentQuote && (
          <QuoteCard
            quote={currentQuote}
            isSpotlight={true}
            onFavoriteChange={handleFavoritesUpdated}
            onRefreshQuote={handleRefreshQuote}
          />
        )}
      </section>

      {/* Saved Quotes Collection */}
      <section className="saudade-saved-section mt-4">
        <SavedQuotes
          favorites={favorites}
          onFavoriteRemove={handleFavoriteRemove}
        />
      </section>
    </div>
  );
};

export default Saudade;
