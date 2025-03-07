
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-light/30 to-white">
        <div className="divine-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-saffron-light text-divine-dark capitalize animate-fade-in">
              About Me
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-divine-dark mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              My Spiritual Journey
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-divine rounded-full mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="divine-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="image-reveal animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="Spiritual Teacher" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="section-subheading">The Beginning of My Path</h2>
              <p className="text-divine-dark/80 mb-6">
                My spiritual journey began over two decades ago when I experienced a profound awakening that transformed my understanding of existence. What started as a personal quest for meaning has evolved into a lifelong commitment to spiritual growth and service to others.
              </p>
              <p className="text-divine-dark/80 mb-6">
                Through years of dedicated study, meditation, and learning from enlightened masters, I've developed a deep understanding of ancient wisdom traditions and their relevance to modern life. My approach combines timeless spiritual principles with practical guidance for navigating today's complex world.
              </p>
              <p className="text-divine-dark/80">
                I believe that true spiritual growth comes not from following rigid doctrines, but from personal experience and inner transformation. My mission is to guide others on their unique spiritual paths, helping them discover their own inner wisdom and connection to the divine.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-divine-light/10">
        <div className="divine-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center mb-12">My Core Beliefs</h2>
            
            <div className="space-y-8">
              {[
                {
                  title: "Oneness of All Existence",
                  description: "We are all connected through a divine cosmic consciousness. Understanding this interconnectedness is the foundation of spiritual awareness and compassion."
                },
                {
                  title: "The Power of Devotion",
                  description: "True devotion is not blind faith, but a heartfelt commitment to aligning one's life with higher spiritual principles and cultivating a personal relationship with the divine."
                },
                {
                  title: "Balance of Wisdom and Love",
                  description: "Spiritual growth requires both the clarity of wisdom and the warmth of love. Neither alone is sufficient; they must work in harmony to create true transformation."
                },
                {
                  title: "Service to Others",
                  description: "Selfless service is not just an ethical ideal but a powerful spiritual practice that dissolves the ego and opens the heart to divine grace."
                }
              ].map((belief, index) => (
                <div 
                  key={index} 
                  className="divine-card p-6 animate-fade-in"
                  style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                >
                  <h3 className="font-serif text-xl font-semibold text-divine mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-divine-dark/80">
                    {belief.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="divine-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading mb-6">My Guiding Philosophy</h2>
            <div className="divine-card p-8 md:p-12">
              <blockquote className="font-serif text-xl md:text-2xl text-divine-dark/90 italic mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                "The spiritual journey is not about acquiring something outside yourself. It's about dissolving the barriers you've built within yourself and remembering who you've always been."
              </blockquote>
              <div className="w-16 h-1 bg-gradient-to-r from-saffron to-divine rounded-full mx-auto mb-4"></div>
              <p className="text-divine font-medium animate-fade-in" style={{ animationDelay: '0.7s' }}>
                This is the essence of my teaching and personal practice
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
