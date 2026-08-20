import { NewsPost } from "@/features/news/types/news";
import { CATEGORY_MAP } from "@/features/news/types/news";
import { fetchNewsByCategory } from "@/features/news/services/newsService";

export async function fetchArticleByLink(link: string): Promise<NewsPost | null> {
  const categories = Object.keys(CATEGORY_MAP);
  
  try {
    const postsLists = await Promise.all(
      categories.map((cat) => fetchNewsByCategory(cat))
    );

    const allPosts = postsLists.flat();
    
    const post = allPosts.find((p) => p.link === link);
    
    if (!post) {
      return null;
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching article by link "${link}":`, error);
    return null;
  }
}
