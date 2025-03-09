import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import BlogCard, { BlogPost } from "@/components/BlogCard";
import { getAllBlogs } from "@/lib/api";
import { PlusIcon } from "lucide-react";

const Blog = () => {
  const [category, setCategory] = useState<string | null>(null);
  
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs
  });

  // Filter blogs by category if one is selected
  const filteredBlogs = category
    ? blogs?.filter(blog => blog.category === category)
    : blogs;

  // Get unique categories from blogs
  const categories = blogs
    ? [...new Set(blogs.map(blog => blog.category).filter(Boolean))]
    : [];

  return (
    <Layout>
      <section className="section-padding bg-white">
        <div className="divine-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h1 className="section-heading">
              <span className="text-divine">Spiritual</span> Insights
            </h1>
            
            <Link
              to="/blog/create"
              className="divine-button flex items-center gap-2 self-start md:self-auto"
            >
              <PlusIcon size={18} />
              <span>Create New Blog</span>
            </Link>
          </div>
          
          {/* Category filter - only show if we have categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === null
                      ? "bg-divine text-white"
                      : "bg-divine-light/30 text-divine-dark hover:bg-divine-light"
                  }`}
                  onClick={() => setCategory(null)}
                >
                  All
                </button>
                
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-divine text-white"
                        : "bg-divine-light/30 text-divine-dark hover:bg-divine-light"
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-divine border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-divine-dark/60">Loading spiritual insights...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-divine-dark/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4 text-divine-dark/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-lg font-medium">Failed to load blog posts</p>
                <p className="mt-1">Please try again later</p>
              </div>
            </div>
          ) : filteredBlogs?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-divine-dark/60 mb-4">No blog posts found in this category.</p>
              {category !== null && (
                <button
                  onClick={() => setCategory(null)}
                  className="text-divine hover:underline"
                >
                  View all blog posts
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
