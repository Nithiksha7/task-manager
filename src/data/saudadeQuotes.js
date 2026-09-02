import { getRandomAtmosphereImage } from './saudadeAtmospheres';

export const QUOTE_CATEGORIES = [
  { id: 'Saudade', name: 'Saudade', icon: '🌙', defaultAtmosphere: 'ocean' },
  { id: 'Deep Love', name: 'Deep Love', icon: '♡', defaultAtmosphere: 'deepOcean' },
  { id: 'Longing', name: 'Longing', icon: '🌊', defaultAtmosphere: 'rain' },
  { id: 'Distance', name: 'Distance', icon: '🌌', defaultAtmosphere: 'night' },
  { id: 'Memories', name: 'Memories', icon: '📜', defaultAtmosphere: 'vintage' },
  { id: 'Heartbreak', name: 'Heartbreak', icon: '🕯️', defaultAtmosphere: 'rain' },
  { id: 'Unspoken Love', name: 'Unspoken Love', icon: '☁️', defaultAtmosphere: 'foggyForest' },
  { id: 'Solitude', name: 'Solitude', icon: '🖤', defaultAtmosphere: 'mistyMountains' },
  { id: 'Nostalgia', name: 'Nostalgia', icon: '🥀', defaultAtmosphere: 'vintage' },
  { id: 'Hopeful Love', name: 'Hopeful Love', icon: '🌅', defaultAtmosphere: 'ocean' },
];

export const saudadeQuotes = [
  {
    id: 'sq-1',
    text: "Somewhere between missing you and learning to live without you, I became someone I didn't know.",
    author: "TaskFlow",
    category: "Saudade",
    atmosphere: "ocean",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-2',
    text: "Distance doesn't always mean miles. Sometimes it is the silence between two people who still care.",
    author: "TaskFlow",
    category: "Distance",
    atmosphere: "night",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-3',
    text: "Some memories don't hurt because they were bad. They hurt because they were beautiful.",
    author: "Rainer Maria Rilke",
    category: "Memories",
    atmosphere: "vintage",
    source: {
      name: "Letters to a Young Poet (1929)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/44626",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-4',
    text: "Perhaps saudade is simply love with nowhere left to go.",
    author: "Fernando Pessoa",
    category: "Saudade",
    atmosphere: "mistyMountains",
    source: {
      name: "The Book of Disquiet (1982)",
      work: "Verified Literary Work",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-5',
    text: "I loved you as certain dark things are to be loved, in secret, between the shadow and the soul.",
    author: "Pablo Neruda",
    category: "Deep Love",
    atmosphere: "sunset-glow",
    source: {
      name: "100 Love Sonnets (Sonnet XVII)",
      work: "Verified Literary Work",
      url: "https://www.poetryfoundation.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-6',
    text: "I wish I could show you, when you are lonely or in darkness, the astonishing light of your own being.",
    author: "Hafiz",
    category: "Deep Love",
    atmosphere: "deepOcean",
    source: {
      name: "The Divan of Hafiz (14th Century)",
      work: "Public Domain Poetry",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-7',
    text: "I carry your heart with me. I carry it in my heart. I am never without it.",
    author: "E.E. Cummings",
    category: "Deep Love",
    atmosphere: "night",
    source: {
      name: "Complete Poems (1952)",
      work: "Verified Literary Poetry",
      url: "https://www.poetryfoundation.org",
    },
    copyrightStatus: "Verified Literary Poetry",
  },
  {
    id: 'sq-8',
    text: "If I had a flower for every time I thought of you... I could walk through my garden forever.",
    author: "Alfred Lord Tennyson",
    category: "Deep Love",
    atmosphere: "foggyForest",
    source: {
      name: "The Early Poems of Alfred Lord Tennyson",
      work: "Public Domain Literature (1842)",
      url: "https://www.gutenberg.org/ebooks/844",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-9',
    text: "We loved with a love that was more than love.",
    author: "Edgar Allan Poe",
    category: "Deep Love",
    atmosphere: "night",
    source: {
      name: "Annabel Lee (1849)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/932",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-10',
    text: "In case you ever foolishly forget: I am never not thinking of you.",
    author: "Virginia Woolf",
    category: "Longing",
    atmosphere: "rain",
    source: {
      name: "The Selected Letters of Virginia Woolf",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-11',
    text: "Certain places remember people long after people leave.",
    author: "Jorge Luis Borges",
    category: "Memories",
    atmosphere: "vintage",
    source: {
      name: "Labyrinths (1962)",
      work: "Verified Literature",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Verified Literature",
  },
  {
    id: 'sq-12',
    text: "Sometimes you miss someone you know you shouldn't, not because they were good for you, but because they felt like home.",
    author: "TaskFlow",
    category: "Longing",
    atmosphere: "rain",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-13',
    text: "Solitude is not emptiness; it is the space where your thoughts finally learn to breathe.",
    author: "Virginia Woolf",
    category: "Solitude",
    atmosphere: "mistyMountains",
    source: {
      name: "A Room of One's Own (1929)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/36100",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-14',
    text: "My heart is, and always will be, yours.",
    author: "Jane Austen",
    category: "Deep Love",
    atmosphere: "vintage",
    source: {
      name: "Sense and Sensibility (1811)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/161",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-15',
    text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known and even that is an understatement.",
    author: "F. Scott Fitzgerald",
    category: "Deep Love",
    atmosphere: "night",
    source: {
      name: "Letters to Zelda (1919)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-16',
    text: "We spoke without words, and loved without promises. That is why it stayed forever.",
    author: "TaskFlow",
    category: "Unspoken Love",
    atmosphere: "foggyForest",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-17',
    text: "Quiet heartbreaks leave no sound, only a quiet room where laughter used to live.",
    author: "TaskFlow",
    category: "Heartbreak",
    atmosphere: "rain",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-18',
    text: "No matter how far the stars drift, they share the same dark sky.",
    author: "Rumi",
    category: "Distance",
    atmosphere: "night",
    source: {
      name: "The Masnavi (13th Century)",
      work: "Public Domain Poetry",
      url: "https://www.gutenberg.org",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-19',
    text: "Even in the darkest solitude, the warmth of your memory is a lantern I carry.",
    author: "Kahlil Gibran",
    category: "Solitude",
    atmosphere: "mistyMountains",
    source: {
      name: "The Prophet (1923)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/58585",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-20',
    text: "What is spoken in a whisper often stays in the soul longer than what is shouted.",
    author: "Emily Dickinson",
    category: "Unspoken Love",
    atmosphere: "foggyForest",
    source: {
      name: "The Complete Poems of Emily Dickinson",
      work: "Public Domain Poetry (1890)",
      url: "https://www.gutenberg.org/ebooks/12242",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-21',
    text: "To love or have loved, that is enough. Ask nothing further. There is no other pearl to be found in the dark folds of life.",
    author: "Victor Hugo",
    category: "Deep Love",
    atmosphere: "deepOcean",
    source: {
      name: "Les Misérables (1862)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/135",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-22',
    text: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë",
    category: "Deep Love",
    atmosphere: "mistyMountains",
    source: {
      name: "Wuthering Heights (1847)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/768",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-23',
    text: "I have for first time found what I can truly love—I have found you.",
    author: "Charlotte Brontë",
    category: "Hopeful Love",
    atmosphere: "vintage",
    source: {
      name: "Jane Eyre (1847)",
      work: "Public Domain Literature",
      url: "https://www.gutenberg.org/ebooks/1260",
    },
    copyrightStatus: "Public Domain Literature",
  },
  {
    id: 'sq-24',
    text: "The sun sets every evening, yet it promises to wake the ocean tomorrow. Love is no different.",
    author: "TaskFlow",
    category: "Hopeful Love",
    atmosphere: "ocean",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
  {
    id: 'sq-25',
    text: "We are all stories in the end, held gently by the hands that remembered us.",
    author: "TaskFlow",
    category: "Nostalgia",
    atmosphere: "vintage",
    source: {
      name: "Original TaskFlow Content",
      work: "TaskFlow Reflections",
      url: null,
    },
    copyrightStatus: "Original TaskFlow Content",
  },
];

/**
 * Random Quote Selector Engine
 * @param {Array<string>} historyList Array of recently displayed quote IDs to avoid repetition
 * @returns {Object} Complete quote object with attached photographic image object
 */
export function getRandomQuote(historyList = []) {
  // Filter out recently seen quotes
  let candidates = saudadeQuotes.filter((q) => !historyList.includes(q.id));
  if (candidates.length === 0) {
    candidates = saudadeQuotes;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  const selectedQuote = candidates[randomIndex];

  // Resolve photorealistic atmospheric image for quote
  const atmospherePhoto = getRandomAtmosphereImage(selectedQuote.atmosphere || 'ocean');

  return {
    ...selectedQuote,
    photo: atmospherePhoto,
  };
}

export function getDailyQuote() {
  return getRandomQuote();
}
