"use client";

import React, { useState } from "react";
import { Avatar } from "@/shared/components/avatar";

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

export function CommentForm({ onAddComment }: CommentFormProps) {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText.trim());
    setCommentText("");
  };

  return (
    <form onSubmit={handleAddComment} className="mb-8">
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1"><Avatar name="Tamu Pembaca" /></div>
        <div className="flex-1 flex flex-col gap-3 rounded-lg">
          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Apa yang ingin anda tanyakan"
            className="w-full bg-muted border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground text-foreground leading-relaxed resize-none"
            required
          />
          <div className="flex justify-start">
            <button type="submit" className="bg-accent hover:opacity-90 text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-lg transition-opacity cursor-pointer">Kirim</button>
          </div>
        </div>
      </div>
    </form>
  );
}
