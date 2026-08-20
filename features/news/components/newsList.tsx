import React from "react";
import { NewsPost } from "@/features/news/types/news";
import { NewsCard } from "./newsCard";

interface NewsListProps {
  posts: NewsPost[];
  className?: string;
}

export function NewsList({ posts, className = "" }: NewsListProps) {
  if (posts.length === 0) {
    return (
      <div className="w-full py-4 text-center text-muted-foreground text-xs font-sans">
        Tidak ada berita.
      </div>
    );
  }

  return (
    <div className={`w-full font-sans ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map((post) => (
          <NewsCard key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
}
