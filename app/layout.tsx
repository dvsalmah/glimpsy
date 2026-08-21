import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/features/layout/components/navbar";
import { Footer } from "@/features/layout/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

import { ThemeProvider } from "@/shared/components/theme-provider";

export const metadata: Metadata = {
  title: "Berita Kini - Portal Berita Terpercaya",
  description: "Menyajikan berita terbaru, terkini Indonesia seputar nasional, politik, ekonomi, internasional, olahraga, teknologi, hiburan, gaya hidup",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={cn("antialiased font-sans bg-background text-foreground scroll-smooth", geist.variable)} suppressHydrationWarning>
      <head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 flex flex-col">
            <div className="max-w-full md:max-w-7xl mx-auto px-4 py-2 md:p-6">
              {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

