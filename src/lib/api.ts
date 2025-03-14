
import { toast } from "@/components/ui/use-toast";
import { BlogPost } from "@/components/BlogCard";

// Update API base URL to match your Laravel backend
const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to connect to the server",
    });
    throw error;
  }
}

// Updated Blog API endpoints to match Laravel response structure
export async function getAllBlogs(): Promise<BlogPost[]> {
  const response = await fetchApi<any[]>("/blogs");
  
  // Map Laravel response to match our frontend BlogPost type
  return response.map(blog => ({
    id: blog.id.toString(),
    title: blog.title,
    excerpt: blog.content.substring(0, 150) + '...', // Create excerpt from content
    category: blog.tag,
    date: new Date(blog.created_at).toLocaleDateString(),
    imageSrc: blog.image || undefined
  }));
}

export async function getBlogById(id: string): Promise<BlogPost> {
  const blog = await fetchApi<any>(`/blogs/${id}`);
  
  // Map Laravel response to match our frontend BlogPost type
  return {
    id: blog.id.toString(),
    title: blog.title,
    excerpt: blog.content.substring(0, 150) + '...', // Create excerpt from content
    category: blog.tag,
    date: new Date(blog.created_at).toLocaleDateString(),
    imageSrc: blog.image || undefined,
    content: blog.content // Add full content
  };
}

// Quote API endpoints
export interface Quote {
  quote: string;
  author: string;
}

export async function getRandomQuote(): Promise<Quote> {
  // Updated to handle the nested response structure with success and data properties
  const response = await fetchApi<{success: boolean, data: {id: number, quote: string, author: string, created_at: string, updated_at: string}}>("/quotes/daily");
  
  // Extract the quote data from the nested structure
  return {
    quote: response.data.quote,
    author: response.data.author
  };
}

export async function getAllQuotes(): Promise<Quote[]> {
  // Updated to handle potential nested response structure
  const response = await fetchApi<any>("/quotes/list");
  
  // Handle both potential response formats
  const quotes = Array.isArray(response) ? response : 
                (response.data && Array.isArray(response.data)) ? response.data : [];
  
  // Map Laravel response to match our frontend Quote type
  return quotes.map(quote => ({
    quote: quote.quote,
    author: quote.author
  }));
}
