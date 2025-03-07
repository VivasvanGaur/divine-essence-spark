
import HeroSection from '@/components/HeroSection';
import ScrollingMantra from '@/components/ScrollingMantra';
import DailyQuote from '@/components/DailyQuote';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ScrollingMantra />
      <DailyQuote />
      
      <section className="section-padding bg-gradient-to-b from-white to-divine-light/20">
        <div className="divine-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-gold-light text-divine-dark capitalize">
                Spiritual Path
              </div>
              <h2 className="section-heading mb-4">Discover Sacred Teachings</h2>
              <p className="text-lg text-divine-dark/80 mb-6">
                Explore ancient wisdom and timeless spiritual principles that can transform your life and elevate your consciousness. Our teachings combine traditional knowledge with practical guidance for modern seekers.
              </p>
              <Link to="/blog" className="divine-button">
                Read Teachings
              </Link>
            </div>
            
            <div className="order-1 md:order-2 image-reveal animate-slide-in">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                  alt="Sacred teachings" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-divine-light/10">
        <div className="divine-container">
          <div className="text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-saffron-light text-divine-dark capitalize">
              Spiritual Journey
            </div>
            <h2 className="section-heading mb-4">Begin Your Path to Enlightenment</h2>
            <p className="text-lg text-divine-dark/80 max-w-2xl mx-auto">
              The journey of a thousand miles begins with a single step. Take your first step towards spiritual growth and inner peace.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                ),
                title: "Self Discovery",
                description: "Embark on a journey to discover your true self and unlock your innate potential for growth and transformation."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                ),
                title: "Community",
                description: "Join a supportive community of like-minded seekers who share your passion for spiritual growth and enlightenment."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                ),
                title: "Personal Growth",
                description: "Experience profound personal growth through meditation, self-reflection, and the application of timeless spiritual principles."
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="divine-card p-6 text-center animate-slide-in hover-lift"
                style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-divine-light text-divine mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-divine-dark/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-t from-saffron-light/20 to-white">
        <div className="divine-container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="section-heading mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-divine-dark/80 mb-8">
              Take the first step towards discovering your true self and embracing a life of spiritual fulfillment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="divine-button">
                Learn About Me
              </Link>
              <Link to="/contact" className="divine-button bg-white text-divine hover:text-divine-dark border border-divine/20">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
