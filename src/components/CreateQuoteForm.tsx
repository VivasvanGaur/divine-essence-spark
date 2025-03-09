
import { useState } from "react";
import { createQuote } from "@/lib/api";
import { toast } from "sonner";

const CreateQuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quote: "",
    author: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.quote || !formData.author) {
        toast.error("Please fill in both quote and author fields");
        setIsSubmitting(false);
        return;
      }
      
      await createQuote(formData);
      
      toast.success("Quote created successfully!");
      setShowSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        quote: "",
        author: ""
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to create quote:", error);
      toast.error("Failed to create quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="divine-card p-6 md:p-8">
      <h2 className="text-2xl font-serif text-divine-dark font-semibold mb-6">Submit a New Quote</h2>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
          Quote submitted successfully! Thank you for your contribution.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="quote" className="block text-divine-dark font-medium mb-2">
              Quote <span className="text-red-500">*</span>
            </label>
            <textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              required
              rows={4}
              className="divine-input w-full p-3"
              placeholder="Enter an inspiring quote..."
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-divine-dark font-medium mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="divine-input w-full p-3"
              placeholder="Enter the quote author"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
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
                Submitting...
              </span>
            ) : (
              'Submit Quote'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuoteForm;
