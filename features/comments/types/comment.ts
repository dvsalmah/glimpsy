export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  pubDate: string;
  replies?: Comment[];
}
