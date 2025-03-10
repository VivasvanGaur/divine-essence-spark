
import { useQuery } from '@tanstack/react-query';
import { getAllQuotes } from '@/lib/api';
import Layout from '@/components/Layout';
import { BookOpenIcon } from 'lucide-react';

const AllQuotes = () => {
  const { data: quotes, isLoading, error } = useQuery({
    queryKey: ['all-quotes'],
    queryFn: getAllQuotes
  });

  return (
    <Layout>
      <section className="section-padding bg-white">
        <div className="divine-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading mb-8">
              <span className="text-divine">Wisdom</span> Collection
            </h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-10">
                <div className="w-12 h-12 rounded-full border-2 border-divine border-t-transparent animate-spin" />
                <p className="text-divine-dark/60 text-sm">Loading wisdom collection...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mx-auto mb-6 text-divine-dark/50 w-10 h-10"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-divine-dark/60 text-sm">Could not load wisdom collection. Please try again later.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {quotes?.map((quote, index) => (
                  <div 
                    key={index} 
                    className="divine-card p-6 md:p-8 animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-gold-dark/70 hidden sm:block">
                        <BookOpenIcon size={24} />
                      </div>
                      <div>
                        <blockquote className="font-serif text-lg md:text-xl text-divine-dark mb-4 leading-relaxed">
                          "{quote.quote}"
                        </blockquote>
                        
                        <cite className="block text-divine text-base not-italic font-medium">
                          — {quote.author}
                        </cite>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllQuotes;
