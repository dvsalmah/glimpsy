import { Comment } from "@/features/comments/types/comment";

let tempId = 0;
const generateTempId = () => `temp_${++tempId}`;

export const commentService = {

  addComment: async (text: string, postId?: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: generateTempId(),
      author: "Tamu Pembaca",
      avatar: "TP",
      text: text.trim(),
      pubDate: new Date().toISOString(),
      replies: [],
    };
  },

  addReply: async (parentCommentId: string, text: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: generateTempId(),
      author: "Tamu Pembaca",
      avatar: "TP",
      text: text.trim(),
      pubDate: new Date().toISOString(),
      replies: [],
    };
  },
};
