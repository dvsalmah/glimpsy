import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/features/layout/components/navbar";
import { Footer } from "@/features/layout/components/footer";

export const metadata: Metadata = {
  title: "Berita Kini - Portal Berita Terpercaya",
  description: "Menyajikan berita terbaru, terkini Indonesia seputar nasional, politik, ekonomi, internasional, olahraga, teknologi, hiburan, gaya hidup",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="antialiased font-sans bg-background text-foreground scroll-smooth">
      <head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

