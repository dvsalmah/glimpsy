"use client";

import { useState, useEffect } from "react";
import { ThemeToggleButton2 } from "@/shared/components/skiper4";
import { useThemeToggle } from "@/shared/components/skiper26";
import { cn } from "@/shared/lib/utils";

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
}

export function ThemeToggle({ className, isScrolled = true }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "circle-blur",
    start: "top-right",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 w-10"></div>;

  return (
    <ThemeToggleButton2 
      isDark={isDark}
      onToggle={toggleTheme}
      className={cn("h-10 w-10 cursor-pointer", className)}
      isScrolled={isScrolled}
    />
  );
}