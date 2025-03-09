
import { toast } from "@/components/ui/use-toast";
import { BlogPost } from "@/components/BlogCard";

// Replace with your actual API base URL
const API_BASE_URL = "http://localhost:8000/api";

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

// Blog API endpoints
export async function getAllBlogs(): Promise<BlogPost[]> {
  return fetchApi<BlogPost[]>("/blogs");
}

export async function getBlogById(id: string): Promise<BlogPost> {
  return fetchApi<BlogPost>(`/blogs/${id}`);
}

// Quote API endpoints
export interface Quote {
  quote: string;
  author: string;
}

export async function getRandomQuote(): Promise<Quote> {
  return fetchApi<Quote>("/quotes/daily");
}

export async function getAllQuotes(): Promise<Quote[]> {
  return fetchApi<Quote[]>("/quotes/list");
}
