
import { useState } from "react";
import { createBlog } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    category: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.title || !formData.content) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      const response = await createBlog({
        ...formData,
        publishedAt: new Date().toISOString(),
      });
      
      toast.success("Blog post created successfully!");
      // Redirect to the blog post page
      navigate(`/blog/${response.id}`);
    } catch (error) {
      console.error("Failed to create blog post:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="divine-card p-6 md:p-8">
      <h2 className="text-2xl font-serif text-divine-dark font-semibold mb-6">Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-divine-dark font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="divine-input w-full p-3"
              placeholder="Enter blog title"
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-divine-dark font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="divine-input w-full p-3"
              placeholder="Enter author name"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-divine-dark font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="divine-input w-full p-3"
              placeholder="Enter blog category"
            />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-divine-dark font-medium mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="divine-input w-full p-3 resize-none"
              placeholder="Short description of the blog"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-divine-dark font-medium mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              className="divine-input w-full p-3"
              placeholder="Write your blog content here..."
            />
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-divine-dark font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="divine-input w-full p-3"
              placeholder="Enter URL for blog image"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="px-4 py-2 border border-divine-dark/20 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="divine-button"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Blog Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
