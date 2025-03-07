
import { useEffect, useRef } from 'react';

const ScrollingMantra = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    
    if (!container || !text) return;
    
    // Duplicate the text to create a seamless loop
    const textWidth = text.offsetWidth;
    const containerWidth = container.offsetWidth;
    
    // If container width is larger than the text, duplicate the text as needed
    if (textWidth < containerWidth) {
      const duplicationsNeeded = Math.ceil(containerWidth / textWidth) + 1;
      const mantraText = text.innerHTML;
      let newContent = '';
      
      for (let i = 0; i < duplicationsNeeded; i++) {
        newContent += mantraText;
      }
      
      text.innerHTML = newContent;
    }
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-saffron-light/30 via-gold-light/20 to-saffron-light/30 overflow-hidden">
      <div className="scrolling-text-container relative" ref={containerRef}>
        <div 
          className="scrolling-text font-serif text-xl md:text-2xl lg:text-3xl text-divine-dark/80 animate-scroll-x" 
          ref={textRef}
        >
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare
        </div>
        <div 
          className="scrolling-text font-serif text-xl md:text-2xl lg:text-3xl text-divine-dark/80 animate-scroll-x" 
          aria-hidden="true" 
          style={{ 
            position: 'absolute', 
            left: '100%', 
            top: 0, 
            animationDelay: '0s' 
          }}
        >
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare
        </div>
      </div>
    </section>
  );
};

export default ScrollingMantra;
