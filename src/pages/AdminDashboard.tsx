
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookText, Quote, LogOut } from 'lucide-react';
import AdminBlogManagement from '@/components/admin/AdminBlogManagement';
import AdminQuoteManagement from '@/components/admin/AdminQuoteManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-divine-light/5">
      <header className="bg-white shadow-sm border-b border-divine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-divine-dark">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-white">
            <TabsTrigger value="blogs" className="flex-1 flex items-center justify-center gap-2">
              <BookText className="w-4 h-4" />
              Manage Blogs
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex-1 flex items-center justify-center gap-2">
              <Quote className="w-4 h-4" />
              Manage Quotes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs" className="mt-6">
            <AdminBlogManagement />
          </TabsContent>
          
          <TabsContent value="quotes" className="mt-6">
            <AdminQuoteManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
