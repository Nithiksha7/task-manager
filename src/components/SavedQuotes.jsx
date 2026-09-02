import React from 'react';
import { Heart, Trash2, Calendar, Bookmark, Info } from 'lucide-react';

const SavedQuotes = ({ favorites = [], onFavoriteRemove }) => {
  const formatDateSaved = (isoStr) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return '';
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="saved-quotes-empty">
        <Bookmark size={36} className="empty-bookmark-icon" />
        <h4>No Saved Quotes Yet</h4>
        <p>Click <strong>♡ Save</strong> on any quote to keep it here in your personal collection.</p>
      </div>
    );
  }

  return (
    <div className="saved-quotes-container">
      <div className="saved-quotes-header">
        <h3>
          <Heart size={20} className="text-primary fill-heart inline-icon" />
          <span>Saved Quotes ({favorites.length})</span>
        </h3>
        <p>Your personal collection of meaningful passages and quiet reflections</p>
      </div>

      <div className="saved-quotes-grid">
        {favorites.map((item) => (
          <div key={item.id} className="saved-quote-item-card">
            {/* Photographic Background Thumbnail Overlay if available */}
            {item.photo?.url && (
              <div
                className="saved-card-photo-bg"
                style={{ backgroundImage: `url("${item.photo.url}")` }}
              />
            )}
            <div className="saved-card-overlay" />

            <div className="saved-card-content">
              <div className="saved-card-top">
                <span className="saved-category-pill">
                  {item.category?.toUpperCase() || 'SAUDADE'}
                </span>
                <button
                  className="remove-fav-btn"
                  onClick={() => onFavoriteRemove(item.id)}
                  title="Remove from favorites"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <blockquote className="saved-quote-text">
                "{item.text}"
              </blockquote>

              <div className="saved-card-bottom">
                <span className="saved-author">— {item.author}</span>
                {item.savedAt && (
                  <span className="saved-date-tag">
                    <Calendar size={13} />
                    <span>{formatDateSaved(item.savedAt)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuotes;
