
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRandomQuote } from '@/lib/api';

const DailyQuote = () => {
  // Fetch quote from API
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['daily-quote'],
    queryFn: getRandomQuote,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - keep the daily quote consistent for a day
    retry: 2
  });

  // If API fails, fall back to a default quote
  const quote = data || { 
    quote: "The goal of spiritual practice is full recovery, and the only thing you need to recover from is a fractured sense of self.", 
    author: "Marianne Williamson" 
  };

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
            ) : error ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-10">
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
                  className="mx-auto mb-6 text-divine-dark/50 w-10 h-10"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-divine-dark/60 text-sm">Could not load today's wisdom. Please try again later.</p>
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
