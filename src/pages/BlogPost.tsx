import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { BlogPost as BlogPostType } from '@/components/BlogCard';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogById, getAllBlogs } from '@/lib/api';

// Sample content for blog posts - this would ideally come from the API
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
  
  // Fetch single blog post
  const { 
    data: post, 
    isLoading: isPostLoading,
    error: postError
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id || ''),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!id
  });
  
  // Fetch all blogs for related posts
  const { 
    data: allPosts = [],
    isLoading: isRelatedLoading
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!post
  });
  
  // Find related posts by category
  const relatedPosts = post 
    ? allPosts.filter(p => p.category === post.category && p.id !== id).slice(0, 3)
    : [];
    
  const isLoading = isPostLoading || isRelatedLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 divine-container">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 rounded-full border-2 border-divine border-t-transparent animate-spin mx-auto" />
            <p className="ml-4 text-divine-dark/70">Loading teaching...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (postError || !post) {
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
