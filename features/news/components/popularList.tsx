import Link from "next/link";
import React from "react";
import { NewsPost } from "@/features/news/types/news";
import { formatDate, slugify } from "@/shared/lib/utils";
import { Dot } from "lucide-react";

interface PopularListProps {
  posts: NewsPost[];
  layout?: "row" | "sidebar";
}

export function PopularList({ posts, layout = "row" }: PopularListProps) {
  const popularPosts = posts.length > 5 ? posts.slice(5, 8) : posts.slice(0, 3);

  if (popularPosts.length === 0) {
    return (
      <div className="w-full py-4 text-center text-muted-foreground text-xs font-sans">
        Tidak ada berita populer saat ini.
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      <div
        className={
          layout === "row"
            ? "grid grid-cols-1 md:grid-cols-3 gap-6"
            : "flex flex-col gap-5"
        }
      >
        {popularPosts.map((post, idx) => {
          const slug = slugify(post.title);
          const rank = idx + 1;

          return (
            <div
              key={post.title}
              className={`flex items-start gap-4 p-4 rounded-xl bg-card hover:shadow-md duration-200 ${
                layout === "row" ? "h-full" : ""
              }`}
            >
              <div className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-muted">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">
                    No Image
                  </div>
                )}
                <div className="absolute top-1 left-1 flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-xs font-extrabold shadow-sm">
                  {rank}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between h-20 min-w-0">
                <h4 className="text-foreground font-bold text-xs leading-snug line-clamp-3 hover:text-accent transition-colors">
                  <Link href={`/article/${slug}`}>{post.title}</Link>
                </h4>
                
                <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground mt-1">
                  <span className="text-accent font-semibold uppercase">
                    {post.category || "Terpopuler"}
                  </span>
                  <Dot className="w-4 h-4" />
                  <span>{formatDate(post.pubDate, "short")}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
