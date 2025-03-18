import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Pencil, Trash, Plus, Image as ImageIcon, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { BlogPost } from '@/components/BlogCard';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '@/lib/api';

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const blogData = await getAllBlogs();
      setBlogs(blogData);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      toast({
        variant: "destructive",
        title: "Failed to load blogs",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData object for multipart/form-data submission
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('content', formData.content);
      formDataObj.append('tag', formData.category);
      
      // Only append image if a new one is selected
      if (selectedImage) {
        formDataObj.append('image', selectedImage);
      }
      
      if (currentBlog) {
        // Update existing blog
        await updateBlog(currentBlog.id, formDataObj);
        
        toast({
          title: "Blog updated",
          description: "Your changes have been saved"
        });
      } else {
        // Create new blog
        await createBlog(formDataObj);
        
        toast({
          title: "Blog created",
          description: "Your new blog has been saved"
        });
      }
      
      // Reset form state
      setShowForm(false);
      setCurrentBlog(null);
      setFormData({ title: '', content: '', category: '' });
      setSelectedImage(null);
      
      // Reload blogs after save
      loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save blog post"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || '',
      category: blog.category
    });
    setSelectedImage(null); // Reset selected image when editing
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      
      toast({
        title: "Blog deleted",
        description: "The blog has been removed"
      });
      
      // Update the UI by filtering out the deleted blog
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog post"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-divine-dark">Blog Management</h2>
        <Button 
          onClick={() => {
            setShowForm(!showForm);
            setCurrentBlog(null);
            setFormData({ title: '', content: '', category: '' });
            setSelectedImage(null);
          }}
          className="flex items-center gap-2"
        >
          {showForm ? 'Cancel' : (
            <>
              <Plus className="w-4 h-4" />
              New Blog
            </>
          )}
        </Button>
      </div>

      {showForm ? (
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 border p-4 rounded-md bg-divine-light/5">
          <h3 className="text-lg font-medium text-divine-dark mb-4">
            {currentBlog ? 'Edit Blog' : 'Create New Blog'}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Blog Image</Label>
            
            {/* Current image display */}
            {currentBlog?.imageSrc && !selectedImage && (
              <div className="mb-4">
                <p className="text-sm text-divine-dark/60 mb-2">Current image:</p>
                <div className="relative w-full max-w-xs h-40 rounded-md overflow-hidden bg-divine-light/20">
                  <img 
                    src={currentBlog.imageSrc} 
                    alt="Current blog image" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Selected new image preview */}
            {selectedImage && (
              <div className="mb-4">
                <p className="text-sm text-divine-dark/60 mb-2">New image preview:</p>
                <div className="relative w-full max-w-xs h-40 rounded-md overflow-hidden bg-divine-light/20">
                  <img 
                    src={URL.createObjectURL(selectedImage)} 
                    alt="Selected blog image" 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full"
                    onClick={handleClearImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Image input */}
            <div className="flex items-center gap-2">
              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                {currentBlog?.imageSrc ? 'Change Image' : 'Upload Image'}
              </Button>
              {selectedImage && (
                <span className="text-sm text-divine-dark/60">
                  {selectedImage.name} ({Math.round(selectedImage.size / 1024)} KB)
                </span>
              )}
            </div>
            <p className="text-xs text-divine-dark/60 mt-1">
              {currentBlog?.imageSrc 
                ? 'Leave empty to keep the current image.' 
                : 'Select an image for the blog post.'}
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              {currentBlog ? 'Update Blog' : 'Create Blog'}
            </Button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <div className="text-center py-8">Loading blogs...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No blogs found. Create your first blog post.
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogManagement;
