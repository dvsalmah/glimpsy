"use client";

import React, { useState } from "react";
import { Comment } from "@/features/comments/types/comment";
import { CommentItem } from "./commentItem";
import { CommentForm } from "./commentForm";

interface CommentSectionProps {
  initialComments?: Comment[];
}

let idCounter = 0;
const getUniqueId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

export function CommentSection({ initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (text: string) => {
    setComments([
      {
        id: getUniqueId("c"),
        author: "Tamu Pembaca",
        avatar: "TP",
        pubDate: new Date().toISOString(),
        text: text,
        replies: [],
      },
      ...comments,
    ]);
  };

  const handleAddReply = (commentId: string, replyText: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: getUniqueId("r"),
                author: "Tamu Pembaca",
                avatar: "TP",
                pubDate: new Date().toISOString(),
                text: replyText,
              },
            ],
          }
          : c
      )
    );
  };

  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  return (
    <section className="w-full bg-card p-5 md:p-6 font-sans mt-8 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-accent rounded-full" />
        <h3 className="text-lg font-bold text-foreground">Komentar</h3>
        <span className="text-xs bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full">{totalComments}</span>
      </div>

      <CommentForm onAddComment={handleAddComment} />

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Belum ada komentar. Jadilah yang pertama berkomentar!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onAddReply={handleAddReply} />
          ))
        )}
      </div>
    </section>
  );
}
