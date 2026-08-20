"use client";

import Link from "next/link";
import React, { useState } from "react";
import { NewsPost } from "@/features/news/types/news";
import { formatDate, slugify } from "@/shared/lib/utils";
import { ChevronLeft, ChevronRight, CornerRightUp, MoveUpRight } from "lucide-react";

interface HeroSlidersProps {
  posts: NewsPost[];
}

export function HeroSliders({ posts }: HeroSlidersProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderPosts = posts.slice(0, 5);

  if (sliderPosts.length === 0) {
    return (
      <div className="w-full h-80 bg-muted animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground font-sans">
        Memuat headline berita
      </div>
    );
  }

  const currentPost = sliderPosts[activeIndex];
  const slug = slugify(currentPost.title);

  return (
    <div className="relative w-full bg-card p-6 md:p-8 overflow-hidden font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 flex flex-col justify-center h-full">
          <div className="flex items-center gap-3 text-xs font-semibold mb-3">
            <span className="bg-primary/10 text-accent px-2.5 py-1 rounded-md uppercase tracking-wider">
              {currentPost.category || "Headline"}
            </span>
            <span className="text-muted-foreground">{formatDate(currentPost.pubDate, "long")}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4 hover:text-accent transition-colors duration-200">
            <Link href={`/article/${slug}`}>{currentPost.title}</Link>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">{currentPost.description}</p>
          <Link href={`/article/${slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
            Baca Selengkapnya
            <MoveUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="md:col-span-6">
          <Link href={`/article/${slug}`} className="block relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-inner">
            {currentPost.thumbnail ? (
              <img src={currentPost.thumbnail} alt={currentPost.title} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500 ease-out" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Tidak ada gambar</div>
            )}
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 pt-4">
        <div
          onClick={() => setActiveIndex((prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length)}
          className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </div>

        <span className="text-sm font-medium text-muted-foreground">
          <span className="font-bold text-foreground">{activeIndex + 1}</span>
          <span className="mx-2 text-muted-foreground/50">dari</span>
          <span className="font-semibold">{sliderPosts.length}</span>
        </span>

        <div
          onClick={() => setActiveIndex((prev) => (prev + 1) % sliderPosts.length)}
          className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
