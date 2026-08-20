import React from "react";
import { formatDate } from "@/shared/lib/utils";

interface ArticleContentProps {
  title: string;
  pubDate: string;
  category: string;
  thumbnail: string;
  paragraphs: string[];
  link: string;
}

export function ArticleContent({
  title,
  pubDate,
  category,
  thumbnail,
  paragraphs,
  link,
}: ArticleContentProps) {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4">
          {title}
        </h1>
        
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="bg-primary/10 text-accent px-2.5 py-1 rounded-md uppercase tracking-wider">
            {category}
          </span>
          <span className="text-muted-foreground font-medium">
            {formatDate(pubDate, "long")}
          </span>
        </div>
      </header>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-inner mb-3">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Tidak ada gambar
          </div>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground italic mb-8 border-b border-border pb-4 leading-relaxed">
        Selengkapnya dapat dibaca melalui tautan resmi: <a href={link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">{link}</a>
      </p>

      <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
        {paragraphs.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </>
  );
}
