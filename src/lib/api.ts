
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
        // Only set Content-Type for non-FormData requests
        ...(!(options.body instanceof FormData) && {"Content-Type": "application/json"}),
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

// New function to create a blog post
export async function createBlog(blogData: FormData): Promise<any> {
  return await fetchApi('/blogs', {
    method: 'POST',
    body: blogData
  });
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

// Fixed function to update a blog post with correct HTTP method
export async function updateBlog(id: string, blogData: FormData): Promise<any> {
  // Add _method=PUT to the FormData for Laravel method spoofing
  blogData.append('_method', 'PUT');
  
  return await fetchApi(`/blogs/${id}`, {
    method: 'POST', // Using POST with _method=PUT for FormData
    body: blogData
  });
}

// New function to delete a blog post
export async function deleteBlog(id: string): Promise<any> {
  return await fetchApi(`/blogs/${id}`, {
    method: 'DELETE'
  });
}

// Quote API endpoints
export interface Quote {
  id?: number;
  quote: string;
  author: string;
}

export async function getRandomQuote(): Promise<Quote> {
  // Updated to handle the nested response structure with success and data properties
  const response = await fetchApi<{success: boolean, data: {id: number, quote: string, author: string, created_at: string, updated_at: string}}>("/quotes/daily");
  
  // Extract the quote data from the nested structure
  return {
    id: response.data.id,
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
    id: quote.id,
    quote: quote.quote,
    author: quote.author
  }));
}

// New function to update a quote
export async function updateQuote(id: number, quoteData: any): Promise<any> {
  return await fetchApi(`/quotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(quoteData)
  });
}

// New function to delete a quote
export async function deleteQuote(id: number): Promise<any> {
  return await fetchApi(`/quotes/${id}`, {
    method: 'DELETE'
  });
}
