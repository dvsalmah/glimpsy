import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Artikel Tidak Ditemukan
      </h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Mohon maaf, halaman atau berita yang Anda cari tidak tersedia atau mungkin sudah dihapus.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition-opacity"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}