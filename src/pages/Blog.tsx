
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import { getAllBlogs } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// Get unique categories from posts
const getCategories = (posts: BlogPost[]) => {
  return ["all", ...Array.from(new Set(posts.map(post => post.category)))];
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Fetch blogs from API
  const { data: allPosts = [], isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const categories = getCategories(allPosts);
  
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
          
          {isLoading ? (
            <div className="text-center py-16 divine-card">
              <div className="w-12 h-12 rounded-full border-2 border-divine border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-divine-dark/70">Loading teachings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 divine-card">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-divine-light mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-serif text-divine-dark mb-2">Unable to load teachings</h3>
              <p className="text-divine-dark/70">Please try again later.</p>
            </div>
          ) : filteredPosts.length > 0 ? (
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
