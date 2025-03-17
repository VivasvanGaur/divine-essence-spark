
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Pencil, Trash, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { BlogPost } from '@/components/BlogCard';
import { getAllBlogs } from '@/lib/api';

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would make an API call to save the blog
    toast({
      title: currentBlog ? "Blog updated" : "Blog created",
      description: "Your changes have been saved"
    });
    setShowForm(false);
    setCurrentBlog(null);
    setFormData({ title: '', content: '', category: '' });
    // Reload blogs after save
    loadBlogs();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || '',
      category: blog.category
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    // Here you would make an API call to delete the blog
    // For now, we'll just show a success message
    toast({
      title: "Blog deleted",
      description: "The blog has been removed"
    });
    // Update the UI by filtering out the deleted blog
    setBlogs(blogs.filter(blog => blog.id !== id));
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
