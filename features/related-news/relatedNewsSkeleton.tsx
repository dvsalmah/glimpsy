import React from "react";

export function RelatedNewsSkeleton() {
  return (
    <section className="w-full font-sans">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent rounded-full" />
          <h3 className="text-lg font-extrabold text-foreground">
            Berita Terkait
          </h3>
        </div>
        <div className="text-xs font-semibold text-accent border border-accent hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors duration-150">
          Lihat Semua
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-4 h-flex">
            <div className="h-4 w-full rounded bg-muted animate-pulse mb-2"></div>
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse mb-2"></div>
            <div className="h-4 w-1/2 rounded bg-muted animate-pulse"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
