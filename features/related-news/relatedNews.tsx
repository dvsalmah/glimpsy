import React from "react";
import Link from "next/link";
import { NewsPost } from "@/features/news/types/news";
import { NewsCard } from "@/features/news/components/newsCard";

interface RelatedNewsProps {
  posts: NewsPost[];
  currentTitle: string;
}

export function RelatedNews({ posts, currentTitle }: RelatedNewsProps) {
  const relatedPosts = posts
    .filter((post) => post.title !== currentTitle)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="w-full font-sans">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <h3 className="text-lg font-bold text-foreground">
            Berita Terkait
          </h3>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold text-accent border border-accent hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors duration-150"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <NewsCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
