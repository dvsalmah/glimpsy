import { NewsPost, NewsApiResponse } from "@/features/news/types/news";
import { CATEGORY_MAP } from "@/features/news/types/news";

const BASE_URL = "https://api-berita-indonesia-iota.vercel.app";

export async function fetchNewsByCategory(category: string): Promise<NewsPost[]> {
  const normalized = category.toLowerCase();
  
  let apiKey: string = "terbaru";
  let displayCategory: string = "Terbaru";
  
  for (const [indoName, apiValue] of Object.entries(CATEGORY_MAP)) {
    if (indoName === normalized || apiValue === normalized) {
      apiKey = apiValue;
      displayCategory = indoName.charAt(0).toUpperCase() + indoName.slice(1);
      break;
    }
  }

  try {
    const res = await fetch(`${BASE_URL}/cnn/${apiKey}/`, {
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news. Status: ${res.status}`);
    }

    const json: NewsApiResponse = await res.json();
    if (!json.success || !json.data || !json.data.posts) {
      return [];
    }

    return json.data.posts.map((post) => ({
      ...post,
      category: displayCategory,
      comments: post.comments || [],
    }));
  } catch (error) {
    console.error(`Error fetching news for category "${category}":`, error);
    return [];
  }
}
