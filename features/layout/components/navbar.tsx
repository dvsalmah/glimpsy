"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Beranda", categoryKey: "" },
  { name: "Terbaru", categoryKey: "terbaru" },
  { name: "Hiburan", categoryKey: "hiburan" },
  { name: "Gaya Hidup", categoryKey: "gaya hidup" },
  { name: "Olahraga", categoryKey: "olahraga" },
  { name: "Nasional", categoryKey: "nasional" },
  { name: "Internasional", categoryKey: "internasional" },
];

function NavbarContent({ isScrolled, isMobile = false }: { isScrolled: boolean; isMobile?: boolean }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-4 items-start w-full" : "items-center space-x-6 py-1 scrollbar-none overflow-hidden"}`}>
      {NAV_ITEMS.map((item) => {
        const isActive =
          (item.categoryKey === "" && !searchParams.get("category")) ||
          (item.categoryKey !== "" && activeCategory === item.categoryKey);

        const href = item.categoryKey
          ? `/?category=${encodeURIComponent(item.categoryKey)}`
          : "/";

        const textColor = isMobile
          ? isActive
            ? "text-accent font-bold border-accent"
            : "text-foreground hover:text-text border-transparent"
          : isScrolled
            ? isActive
              ? "text-accent font-bold border-accent"
              : "text-foreground hover:text-text border-transparent"
            : isActive
              ? "text-white font-bold border-white"
              : "text-white/90 hover:text-white border-transparent";

        return (
          <Link
            key={item.name}
            href={href}
            className={`text-xs md:text-sm lg:text-base font-medium whitespace-nowrap transition-all duration-200 border-b-3 pb-1.5 pt-1.5 ${textColor}`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY < 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showOriginalColor = menuOpen || isScrolled;
  const textColor = showOriginalColor ? "text-foreground" : "text-white"; 
  const headerBg = menuOpen
    ? "bg-background" 
    : isScrolled
      ? "bg-background/0 backdrop-blur-none"
      : "bg-accent/90 backdrop-blur-md";
  const MenuIcon = menuOpen? X : Menu;

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto flex max-w-full h-16 md:h-20 lg:h-26 items-center justify-between px-6 md:px-8 md:py-5 lg:px-18 lg:py-8">
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <img 
            src="/logo.svg" 
            className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-300 ${showOriginalColor ? "" : "brightness-0 invert"}`} 
          />
          <span className={`text-xl font-bold tracking-tight font-sans transition-colors duration-300 ${textColor}`}>
            Berita Kini
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-end flex-1 pr-8">
          <Suspense fallback={
            <div className="h-6 w-full bg-background animate-pulse rounded" />
          }>
            <NavbarContent isScrolled={isScrolled} />
          </Suspense>
        </nav>
        
        <div className="flex items-center gap-1">
          <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded hover:bg-slate-500/10 transition-colors"
          aria-label="Toggle menu"
        >
          <MenuIcon className={`h-6 w-6 transition-colors duration-300 cursor-pointer ${textColor}`} />
        </button>
          </div>
        </div>
      </header>
      <div 
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div 
        className={`fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-4 overflow-y-auto" onClick={() => setMenuOpen(false)}>
          <Suspense fallback={<div className="flex-1 bg-background animate-pulse rounded" />}>
            <NavbarContent isScrolled={isScrolled} isMobile={true} />
          </Suspense>
        </div>
      </div>
  </>
  );
}