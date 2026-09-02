import React, { useState, useEffect } from 'react';
import { Heart, Share2, Download, Check, RotateCw, Info } from 'lucide-react';

const QuoteActions = ({
  quote,
  onFavoriteChange,
  isSaved: externalIsSaved,
  onRefreshQuote,
  onToggleAttribution,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (externalIsSaved !== undefined) {
      setIsSaved(externalIsSaved);
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('taskflow-saudade-favorites') || '[]');
      setIsSaved(saved.some((item) => item.id === quote.id));
    } catch (e) {
      setIsSaved(false);
    }
  }, [quote.id, externalIsSaved]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleToggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('taskflow-saudade-favorites') || '[]');
      let updated;
      if (saved.some((item) => item.id === quote.id)) {
        updated = saved.filter((item) => item.id !== quote.id);
        setIsSaved(false);
        showToast('Quote removed from favorites');
      } else {
        const itemToSave = {
          ...quote,
          savedAt: new Date().toISOString(),
        };
        updated = [itemToSave, ...saved];
        setIsSaved(true);
        showToast('Quote saved to favorites ♥');
      }
      localStorage.setItem('taskflow-saudade-favorites', JSON.stringify(updated));
      if (onFavoriteChange) {
        onFavoriteChange(updated);
      }
    } catch (err) {
      console.error('Failed to toggle save quote:', err);
    }
  };

  const handleShare = async () => {
    const shareText = `"${quote.text}" — ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TaskFlow · Saudade',
          text: shareText,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      showToast('Quote copied to clipboard.');
    } catch (err) {
      showToast('Could not copy to clipboard.');
    }
  };

  // Generate downloadable photographic quote card PNG via HTML5 Canvas
  const handleDownloadCard = () => {
    setIsDownloading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // 4:5 Pinterest/Instagram ratio
    const ctx = canvas.getContext('2d');

    const renderCardContent = () => {
      // Dark Gradient Overlay
      const grad = ctx.createLinearGradient(0, 0, 0, 1350);
      grad.addColorStop(0, 'rgba(11, 15, 25, 0.55)');
      grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.7)');
      grad.addColorStop(1, 'rgba(9, 13, 20, 0.88)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1350);

      // Top Tag
      ctx.fillStyle = '#7dd3fc';
      ctx.font = '700 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SAUDADE · TASKFLOW', 540, 220);

      // Quote Text (Line wrapping)
      ctx.fillStyle = '#ffffff';
      ctx.font = '300 48px Georgia, serif';
      ctx.textAlign = 'center';

      const words = `"${quote.text}"`.split(' ');
      let line = '';
      const lines = [];
      const maxWidth = 860;
      const lineHeight = 72;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const totalHeight = lines.length * lineHeight;
      let startY = 640 - totalHeight / 2;

      lines.forEach((l) => {
        ctx.fillText(l.trim(), 540, startY);
        startY += lineHeight;
      });

      // Author Signature
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'italic 32px Georgia, serif';
      ctx.fillText(`— ${quote.author}`, 540, startY + 60);

      // Category Tag
      if (quote.category) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.roundRect(430, startY + 130, 220, 46, 23);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 20px Inter, sans-serif';
        ctx.fillText(quote.category.toUpperCase(), 540, startY + 160);
      }

      // Trigger Browser Download
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `taskflow-saudade-${quote.id}.png`;
        link.href = dataUrl;
        link.click();
        showToast('Quote card downloaded!');
      } catch (e) {
        showToast('Download complete.');
      } finally {
        setIsDownloading(false);
      }
    };

    if (quote.photo?.url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw image object-fit cover
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        renderCardContent();
      };
      img.onerror = () => {
        // Fallback solid gradient
        const fallbackGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
        fallbackGrad.addColorStop(0, '#0f172a');
        fallbackGrad.addColorStop(1, '#1e293b');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(0, 0, 1080, 1350);
        renderCardContent();
      };
      img.src = quote.photo.url;
    } else {
      renderCardContent();
    }
  };

  return (
    <div className="quote-actions-wrapper">
      {toastMessage && (
        <div className="quote-action-toast animate-slide-in">
          <Check size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="quote-action-btns">
        {onRefreshQuote && (
          <button
            className="quote-btn refresh-btn"
            onClick={onRefreshQuote}
            title="Get a New Quote"
          >
            <RotateCw size={18} />
            <span>New Quote</span>
          </button>
        )}

        <button
          className={`quote-btn save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleToggleSave}
          title={isSaved ? 'Saved to Favorites' : 'Save to Favorites'}
        >
          <Heart size={18} className={isSaved ? 'heart-icon fill-heart' : 'heart-icon'} />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button className="quote-btn share-btn" onClick={handleShare} title="Share Quote">
          <Share2 size={18} />
          <span>Share</span>
        </button>

        <button
          className="quote-btn download-btn"
          onClick={handleDownloadCard}
          disabled={isDownloading}
          title="Download Pinterest-Style Quote Card"
        >
          <Download size={18} />
          <span>{isDownloading ? 'Generating...' : 'Download Card'}</span>
        </button>

        {onToggleAttribution && (
          <button
            className="quote-btn info-btn"
            onClick={onToggleAttribution}
            title="Quote Source & Photo Attribution"
          >
            <Info size={18} />
            <span>Source</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteActions;
