
import { useState } from 'react';
import Layout from '@/components/Layout';
import BlogCard, { BlogPost } from '@/components/BlogCard';

// Sample blog posts data
const allPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Path to Inner Peace Through Daily Meditation",
    excerpt: "Discover how establishing a consistent meditation practice can transform your inner landscape and bring lasting peace to your daily life.",
    category: "meditation",
    date: "June 15, 2023",
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "2",
    title: "Ancient Wisdom for Modern Living: Applying Spiritual Principles Today",
    excerpt: "How can ancient spiritual teachings help us navigate the challenges of contemporary life? This article explores practical applications of timeless wisdom.",
    category: "teachings",
    date: "July 3, 2023",
    imageSrc: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "3",
    title: "The Sacred Art of Devotion: Opening Your Heart to Divine Grace",
    excerpt: "Devotion is more than religious ritual—it's a transformative practice that can open your heart to receive divine grace and experience profound spiritual connection.",
    category: "devotion",
    date: "August 12, 2023",
    imageSrc: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: "4",
    title: "Finding Your Dharma: Discovering Your True Purpose in Life",
    excerpt: "What is dharma, and how can understanding this concept help you align with your authentic purpose? Learn practical steps for uncovering your life's mission.",
    category: "purpose",
    date: "September 5, 2023",
    imageSrc: "https://images.unsplash.com/photo-1533630757306-cbadb934bcb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "5",
    title: "The Healing Power of Forgiveness: A Spiritual Perspective",
    excerpt: "Forgiveness is not just a moral virtue but a powerful spiritual practice that can heal deep wounds and transform relationships. Learn the sacred approach to letting go.",
    category: "healing",
    date: "October 20, 2023",
    imageSrc: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "6",
    title: "Sacred Silence: The Transformative Power of Stillness",
    excerpt: "In a world of constant noise and distraction, discover how embracing silence can deepen your spiritual practice and reveal profound inner truths.",
    category: "practice",
    date: "November 8, 2023",
    imageSrc: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
  }
];

// Get unique categories from posts
const categories = ["all", ...Array.from(new Set(allPosts.map(post => post.category)))];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter posts based on search term and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-light/30 to-white">
        <div className="divine-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-saffron-light text-divine-dark capitalize animate-fade-in">
              Spiritual Teachings
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-divine-dark mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Wisdom Teachings
            </h1>
            <p className="text-lg text-divine-dark/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore articles on spiritual growth, meditation, devotion, and practical wisdom for everyday life.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="divine-container">
          <div className="mb-12">
            <div className="max-w-xl mx-auto">
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search teachings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="divine-input w-full py-3 pl-10 pr-4"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-divine-dark/50" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-divine text-white'
                        : 'bg-divine-light/50 text-divine-dark hover:bg-divine-light'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 divine-card">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-divine-light mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-serif text-divine-dark mb-2">No teachings found</h3>
              <p className="text-divine-dark/70">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
