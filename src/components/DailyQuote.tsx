
import { useState, useEffect } from 'react';

// Sample quotes that will change daily
const spiritualQuotes = [
  {
    quote: "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi"
  },
  {
    quote: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
    author: "Pierre Teilhard de Chardin"
  },
  {
    quote: "The spiritual journey is the unlearning of fear and the acceptance of love.",
    author: "Marianne Williamson"
  },
  {
    quote: "The goal of spiritual practice is full recovery, and the only thing you need to recover from is a fractured sense of self.",
    author: "Marianne Williamson"
  },
  {
    quote: "You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul.",
    author: "Swami Vivekananda"
  },
  {
    quote: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung"
  },
  {
    quote: "We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves.",
    author: "Buddha"
  }
];

const DailyQuote = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to select a daily quote based on the date
    const getDailyQuote = () => {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const index = dayOfYear % spiritualQuotes.length;
      return spiritualQuotes[index];
    };

    // Set the daily quote
    setQuote(getDailyQuote());
    
    // Simulate loading (for aesthetic purposes)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="daily-wisdom" className="section-padding bg-white">
      <div className="divine-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading text-center mb-16">
            <span className="text-divine">Daily</span> Wisdom
          </h2>
          
          <div className="relative divine-card p-8 md:p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-saffron-light/30 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-divine-light/30 rounded-tl-full" />
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-10">
                <div className="w-12 h-12 rounded-full border-2 border-divine border-t-transparent animate-spin" />
                <p className="text-divine-dark/60 text-sm">Finding today's wisdom...</p>
              </div>
            ) : (
              <div className="relative z-10 text-center animate-fade-in">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mx-auto mb-6 text-gold-dark/50 w-10 h-10"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                
                <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-divine-dark mb-6 leading-relaxed">
                  {quote.quote}
                </blockquote>
                
                <cite className="block text-divine text-lg not-italic font-medium">
                  — {quote.author}
                </cite>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyQuote;
