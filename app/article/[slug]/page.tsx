import React from "react";
import { fetchNewsByCategory } from "@/features/news/services/newsService";
import { CATEGORY_MAP } from "@/features/news/types/news";
import { PopularList } from "@/features/news/components/popularList";
import { RelatedNews } from "@/features/related-news/relatedNews";
import { CommentSection } from "@/features/comments/components/commentSection";
import { Breadcrumb } from "@/features/article/components/breadcrumb";
import { ArticleContent } from "@/features/article/components/articleContent";
import { slugify } from "@/shared/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const categories = Object.keys(CATEGORY_MAP);
  const postsLists = await Promise.all(
    categories.map((cat) => fetchNewsByCategory(cat))
  );

  const uniquePosts = postsLists.flat().filter(
    (post, idx, self) => self.findIndex((p) => p.title === post.title) === idx
  );

  const activePost = uniquePosts.find((p) => slugify(p.title) === slug);

  if (!activePost) {
    notFound();
  }

  const paragraphs = [
    activePost.description,
    `${activePost.title}`,
  ];

  const displayCategory = activePost.category || "Nasional";

  return (
    <div className="w-full bg-background font-sans">
      <Breadcrumb category={displayCategory} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 p-5 md:p-8">
          <ArticleContent
            title={activePost.title}
            pubDate={activePost.pubDate}
            category={displayCategory}
            thumbnail={activePost.thumbnail}
            paragraphs={paragraphs}
            link={activePost.link}
          />
          <CommentSection initialComments={activePost.comments} />
        </article>

        <aside className="lg:col-span-4 p-5 sticky top-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-accent rounded-xs" />
            <h3 className="text-base font-bold text-foreground font-sans">Berita Terpopuler</h3>
          </div>
          <PopularList posts={uniquePosts} layout="sidebar" />
        </aside>
      </div>

      <div className="mt-12 border-t border-border pt-10">
        <RelatedNews posts={uniquePosts} currentTitle={activePost.title} />
      </div>
    </div>
  );
}
