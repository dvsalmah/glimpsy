import React, { useState } from "react";
import { Comment } from "@/features/comments/types/comment";
import { formatDate } from "@/shared/lib/utils";
import { Avatar } from "@/shared/components/avatar";

interface CommentItemProps {
  comment: Comment;
  onAddReply: (commentId: string, text: string) => void;
}

export function CommentItem({ comment, onAddReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onAddReply(comment.id, replyText.trim());
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5"><Avatar name={comment.author} /></div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="font-extrabold text-sm text-foreground">{comment.author}</h4>
            <span className="text-[10px] text-muted-foreground">{formatDate(comment.pubDate, "time")}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => setIsReplying(true)} className="text-xs font-bold text-accent hover:underline cursor-pointer">Balas</button>
          </div>

          {isReplying && (
            <div className="flex gap-3 mt-4 bg-muted p-3 rounded-lg border border-border">
              <div className="flex-shrink-0 mt-1"><Avatar name="Tamu Pembaca" /></div>
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  rows={2} value={replyText} onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan Anda..."
                  className="w-full bg-card border border-border rounded-md p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground text-foreground leading-relaxed resize-none"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button" onClick={() => { setIsReplying(false); setReplyText(""); }}
                    className="border border-border hover:bg-muted text-foreground font-bold text-[10px] px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
                  >Batal</button>
                  <button
                    type="button" onClick={handleSubmitReply}
                    className="bg-accent hover:opacity-90 text-primary-foreground font-bold text-[10px] px-3.5 py-1.5 rounded-md transition-opacity cursor-pointer"
                  >Kirim Balasan</button>
                </div>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-border space-y-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5"><Avatar name={reply.author} /></div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <h5 className="font-extrabold text-xs text-foreground">{reply.author}</h5>
                      <span className="text-[9px] text-muted-foreground">{formatDate(reply.pubDate, "time")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
