
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { BlogPost as BlogPostType } from '@/components/BlogCard';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog posts data - same as in Blog.tsx for consistency
const allPosts: BlogPostType[] = [
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

// Sample content for blog posts
const getFullContent = (id: string) => {
  return `
<p>In the sacred journey of life, we often find ourselves seeking deeper meaning and connection. This profound quest leads us through valleys of challenge and mountains of insight, all woven together in the tapestry of existence.</p>

<p>The ancient seers and spiritual masters have always taught that true transformation begins within. By cultivating awareness of our inner landscape, we gradually unveil the divine light that already dwells in our hearts.</p>

<h3>The Practice of Presence</h3>

<p>One of the most essential spiritual practices is simply being present. In a world constantly pulling our attention in countless directions, the discipline of returning to the now becomes revolutionary.</p>

<p>When we fully inhabit each moment, we discover that life isn't happening to us, but through us. This shift in perspective opens doorways to grace that transform our experience from the inside out.</p>

<h3>Opening to Divine Guidance</h3>

<p>The spiritual path is not meant to be walked alone. By opening our hearts to divine guidance, we invite wisdom beyond our limited understanding to illuminate our way forward.</p>

<p>This guidance often comes in whispers rather than shouts—in moments of silence, in nature's beauty, in the eyes of a loved one, or in the quiet intuition that arises when the mind grows still.</p>

<h3>The Transformative Power of Devotion</h3>

<p>Devotion is the heart's natural expression of love for the divine. When we cultivate devotion, we water the seeds of joy, compassion, and service that lie within us.</p>

<p>Through regular practice, meditation, prayer, or selfless service, we align ourselves with the greater rhythm of life. This alignment brings a sense of purpose and peace that transcends the fluctuations of worldly existence.</p>

<h3>Embracing the Journey</h3>

<p>The spiritual path is not a destination but an ever-unfolding journey. Each step we take with awareness becomes a sacred offering to life itself.</p>

<p>May your own journey be filled with discovery, transformation, and the profound joy that comes from embracing your true divine nature.</p>
`;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Find the post by ID
    const foundPost = allPosts.find(post => post.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Find related posts (same category, excluding current post)
      const related = allPosts
        .filter(p => p.category === foundPost.category && p.id !== id)
        .slice(0, 3);
      
      setRelatedPosts(related);
    } else {
      // Show error toast if post not found
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 divine-container">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse-subtle">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="pt-32 pb-16 divine-container">
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="text-5xl text-divine mb-4">404</div>
            <h1 className="font-serif text-2xl font-bold text-divine-dark mb-6">
              Blog Post Not Found
            </h1>
            <p className="text-divine-dark/70 mb-8">
              The spiritual teaching you're looking for has moved or doesn't exist.
            </p>
            <Link to="/blog" className="divine-button">
              Return to Teachings
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-light/30 to-white">
        <div className="divine-container">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-divine hover:text-divine-dark mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Teachings
            </Link>
            
            <div className="mb-4 flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-divine-light text-divine capitalize">
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </span>
              <span className="inline-flex items-center text-xs text-divine-dark/60">
                <Calendar className="w-3 h-3 mr-1" />
                {post.date}
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-divine-dark mb-6 animate-fade-in">
              {post.title}
            </h1>
            
            <p className="text-lg text-divine-dark/80 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="divine-container">
          <div className="max-w-4xl mx-auto">
            {post.imageSrc && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg image-reveal">
                <img 
                  src={post.imageSrc} 
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-divine-dark prose-p:text-divine-dark/80 mb-12 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
              dangerouslySetInnerHTML={{ __html: getFullContent(post.id) }}
            />
            
            {/* Divider */}
            <div className="flex items-center my-16">
              <div className="flex-grow h-px bg-divine-light/50"></div>
              <div className="px-4 text-divine">✿</div>
              <div className="flex-grow h-px bg-divine-light/50"></div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-serif text-2xl font-bold text-divine-dark mb-8">
                  Related Teachings
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="divine-card hover-lift p-4"
                    >
                      <h4 className="font-serif text-lg font-medium text-divine-dark mb-2">
                        {relatedPost.title}
                      </h4>
                      <div className="text-xs text-divine-dark/60">
                        {relatedPost.date}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
