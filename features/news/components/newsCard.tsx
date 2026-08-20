import Link from "next/link";
import React from "react";
import { NewsPost } from "@/features/news/types/news";
import { formatDate, slugify } from "@/shared/lib/utils";
import { Dot } from "lucide-react";

interface NewsCardProps {
  post: NewsPost;
}

export function NewsCard({ post }: NewsCardProps) {
  const slug = slugify(post.title);

  return (
    <article className="group flex flex-col bg-card overflow-hidden hover:-translate-y-0.5 transition-all duration-300 text-xs md:text-sm">
      <Link
        href={`/article/${slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-muted block"
      >
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
            Tidak ada gambar
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">

        <h3 className="text-foreground font-bold text-base leading-snug mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          <Link href={`/article/${slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-4 mt-auto">
          {post.description}
        </p>
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider mb-2.5">
          <span className="text-accent uppercase font-semibold">
            {post.category || ""}
          </span>
          <Dot className="w-5 h-5" />
          <span className="text-foreground font-normal">
            {formatDate(post.pubDate, "short")}
          </span>
        </div>
      </div>
    </article>
  );
}
