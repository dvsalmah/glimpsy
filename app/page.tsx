"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchNews } from "@/features/news/hooks/useFetchNews";
import { HeroSliders } from "@/features/article/components/hero";
import { PopularList } from "@/features/news/components/popularList";
import { RecommendationGrid } from "@/features/news/components/recommendationGrid";
import { PromoBanner } from "@/features/news/components/promoBanner";

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "terbaru";

  const {
    setCategory,
    posts,
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
  } = useFetchNews(categoryParam);

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam, setCategory]);

  return (
    <div className="w-full bg-background pb-16">
      <section className="mx-auto max-w-7xl pt-8 px-4 sm:px-6 lg:px-8 mb-12">
        <HeroSliders posts={posts} />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-accent rounded-xs" />
            <h3 className="text-base font-extrabold text-foreground font-sans">Berita Terpopuler</h3>
          </div>
        <PopularList posts={posts} layout="row" />
      </section>

      <RecommendationGrid
        currentPosts={currentPosts}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        postsPerPage={postsPerPage}
      />

      <PromoBanner />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh] text-muted-foreground bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-muted-foreground">Memuat Halaman Utama</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
