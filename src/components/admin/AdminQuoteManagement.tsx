
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Pencil, Trash, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getAllQuotes, Quote } from '@/lib/api';

const AdminQuoteManagement = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  
  const [formData, setFormData] = useState({
    quote: '',
    author: ''
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setIsLoading(true);
    try {
      const quoteData = await getAllQuotes();
      setQuotes(quoteData);
    } catch (error) {
      console.error('Failed to load quotes:', error);
      toast({
        variant: "destructive",
        title: "Failed to load quotes",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would make an API call to save the quote
    toast({
      title: currentQuote ? "Quote updated" : "Quote created",
      description: "Your changes have been saved"
    });
    setShowForm(false);
    setCurrentQuote(null);
    setFormData({ quote: '', author: '' });
    // Reload quotes after save
    loadQuotes();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (quote: Quote) => {
    setCurrentQuote(quote);
    setFormData({
      quote: quote.quote,
      author: quote.author
    });
    setShowForm(true);
  };

  const handleDelete = (quote: Quote) => {
    // Here you would make an API call to delete the quote
    // For now, we'll just show a success message
    toast({
      title: "Quote deleted",
      description: "The quote has been removed"
    });
    // Update the UI by filtering out the deleted quote
    setQuotes(quotes.filter(q => q.quote !== quote.quote || q.author !== quote.author));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-divine-dark">Quote Management</h2>
        <Button 
          onClick={() => {
            setShowForm(!showForm);
            setCurrentQuote(null);
            setFormData({ quote: '', author: '' });
          }}
          className="flex items-center gap-2"
        >
          {showForm ? 'Cancel' : (
            <>
              <Plus className="w-4 h-4" />
              New Quote
            </>
          )}
        </Button>
      </div>

      {showForm ? (
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 border p-4 rounded-md bg-divine-light/5">
          <h3 className="text-lg font-medium text-divine-dark mb-4">
            {currentQuote ? 'Edit Quote' : 'Create New Quote'}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Input 
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input 
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              {currentQuote ? 'Update Quote' : 'Create Quote'}
            </Button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <div className="text-center py-8">Loading quotes...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No quotes found. Create your first quote.
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((quote, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="max-w-md truncate">{quote.quote}</div>
                    </TableCell>
                    <TableCell>{quote.author}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(quote)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(quote)}
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

export default AdminQuoteManagement;
