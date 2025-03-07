
import { Link } from 'react-router-dom';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageSrc?: string;
};

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="divine-card overflow-hidden hover-lift">
      {post.imageSrc && (
        <div className="aspect-video overflow-hidden image-reveal">
          <img 
            src={post.imageSrc} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-divine-light text-divine capitalize">
            {post.category}
          </span>
          <span className="ml-2 text-xs text-divine-dark/60">
            {post.date}
          </span>
        </div>
        
        <h3 className="font-serif text-xl font-semibold mb-2 text-divine-dark">
          <Link to={`/blog/${post.id}`} className="hover:text-divine transition-colors duration-300">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-divine-dark/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="divine-link text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
