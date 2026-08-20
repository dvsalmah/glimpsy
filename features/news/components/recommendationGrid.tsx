import { NewsPost } from "@/features/news/types/news";
import { NewsCard } from "./newsCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface GridProps {
  currentPosts: NewsPost[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
  totalResults: number;
  postsPerPage: number;
}
const generatePagination = (current: number, total: number) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export function RecommendationGrid({
  currentPosts, loading, error, searchQuery, setSearchQuery,
  currentPage, setCurrentPage, totalPages, totalResults, postsPerPage,
}: GridProps) {
  const startIdx = totalResults === 0 ? 0 : (currentPage - 1) * postsPerPage + 1;
  const endIdx = Math.min(currentPage * postsPerPage, totalResults);
  const pages = generatePagination(currentPage, totalPages);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-accent rounded-xs" />
            <h3 className="text-base font-extrabold text-foreground font-sans">Rekomendasi Untuk Anda</h3>
          </div>
        <div className="relative max-w-md w-full md:w-80">
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari disini"
            className="w-full bg-card text-foreground border border-border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground shadow-sm"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
            <div key={i} className="aspect-[16/10] bg-muted animate-pulse rounded-xl h-60 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="w-full py-16 text-center text-destructive font-medium">{error}</div>
      ) : currentPosts.length === 0 ? (
        <div className="w-full py-16 text-center text-muted-foreground font-medium">
          Tidak ada berita yang cocok.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {currentPosts.map((post, index) => (
              <div key={post.title} className={index>=4 ? "hidden md:block" : ""}>
                <NewsCard post={post} />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 border-t border-border pt-6">
            <span className="text-xs font-semibold text-muted-foreground self-start sm:self-auto">
              Menampilkan <span className="text-foreground">{startIdx}</span> - <span className="text-foreground">{endIdx}</span> dari <span className="text-foreground">{totalResults}</span> entri
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {pages.map((page, i) => {
                    if (page === "...") {
                      return (
                        <span key={`ellipsis-${i}`} className="hidden sm:flex w-8 h-8 items-center justify-center text-sm font-medium text-muted-foreground">
                          ...
                        </span>
                      );
                    }

                    const isCurrent = page === currentPage;
                    const isMobileVisible = isCurrent || page === currentPage - 1 || page === currentPage + 1;

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-8 h-8 items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isCurrent
                            ? "flex bg-accent text-white"
                            : `${isMobileVisible ? "flex" : "hidden sm:flex"} text-muted-foreground hover:bg-muted hover:text-foreground`
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-transparent cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
