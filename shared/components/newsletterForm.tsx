"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <p className="text-sm font-semibold text-emerald-400">
        Terima kasih! Anda telah berlangganan.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan email"
        className="w-full bg-secondary text-secondary-foreground rounded-lg pl-4 pr-12 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder-muted-foreground"
        required
      />
      <button
        type="submit"
        className="absolute right-1.5 bg-accent hover:opacity-90 text-primary-foreground p-2 rounded-md transition-opacity cursor-pointer"
        aria-label="Berlangganan"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
