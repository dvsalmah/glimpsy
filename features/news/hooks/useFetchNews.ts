import { useState, useEffect } from "react";
import { NewsPost } from "@/features/news/types/news";
import { fetchNewsByCategory } from "@/features/news/services/newsService";

export function useFetchNews(initialCategory: string = "terbaru") {
  const [category, setCategory] = useState<string>(initialCategory);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 8;

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNewsByCategory(category);
        if (active) {
          setPosts(data);
          setCurrentPage(1);
        }
      } catch {
        if (active) {
          setError("Gagal memuat berita. Silakan coba lagi.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [category]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalResults = filteredPosts.length;
  const totalPages = Math.ceil(totalResults / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return {
    category,
    setCategory,
    posts,
    filteredPosts,
    currentPosts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults,
    postsPerPage,
  };
}
