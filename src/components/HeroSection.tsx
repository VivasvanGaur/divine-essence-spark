
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      
      // Calculate mouse position relative to the hero element
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      // Calculate parallax offset (subtle effect)
      const moveX = (x - 0.5) * 20; // 20px max movement
      const moveY = (y - 0.5) * 20; // 20px max movement
      
      // Apply the transform
      hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    const handleMouseLeave = () => {
      // Reset position on mouse leave
      hero.style.transform = 'translate(0, 0)';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-divine-light/30 to-white/50 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMGYwZjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtOGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTE2IDhjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTIwIDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xNi04YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0xNiAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 bg-repeat z-0"></div>
      
      {/* Main content container */}
      <div className="divine-container relative z-10">
        <div 
          ref={heroRef}
          className="transition-transform duration-200 ease-out-sine max-w-3xl mx-auto text-center"
        >
          <div className="inline-block mb-4 opacity-90">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-saffron to-gold-dark shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 animate-pulse-subtle">
                <path d="M12 2v1.5m0 17V22m8.5-10H22M2 12h1.5m14.3-7.1-1 1m-10.6 0-1-1m1 15.2-1 1m16.6-1 1 1m-4-9.8a5 5 0 1 1-8-4 5 5 0 0 1 8 4Z" />
              </svg>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-divine-dark mb-6 animate-fade-in">
            Discover Inner <span className="text-saffron">Peace</span> and <span className="text-divine">Wisdom</span>
          </h1>
          
          <p className="text-lg md:text-xl text-divine-dark/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Embark on a transformative spiritual journey to connect with your true self and the divine consciousness that resides within all beings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#daily-wisdom" 
              className="divine-button bg-divine hover:bg-divine-dark"
            >
              Begin Your Journey
            </a>
            <a 
              href="/about" 
              className="divine-button bg-white/80 backdrop-blur-sm text-divine hover:bg-white hover:text-divine-dark border border-divine/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute bottom-10 left-10 w-24 h-24 rounded-full bg-saffron/5 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="hidden md:block absolute top-32 right-20 w-16 h-16 rounded-full bg-divine/5 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="hidden md:block absolute bottom-20 right-40 w-20 h-20 rounded-full bg-gold/5 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;
