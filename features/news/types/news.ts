import type { Comment } from "@/features/comments/types/comment";

export interface NewsPost {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category?: string;
  comments?: Comment[];
}

export interface NewsResponseData {
  link: string;
  description: string;
  title: string;
  image: string;
  posts: NewsPost[];
}

export interface NewsApiResponse {
  success: boolean;
  message: string | null;
  data: NewsResponseData;
}

export const CATEGORY_MAP = {
  "terbaru": "terbaru",
  "nasional": "nasional",
  "internasional": "internasional",
  "ekonomi": "ekonomi",
  "olahraga": "olahraga",
  "teknologi": "teknologi",
  "hiburan": "hiburan",
  "gaya hidup": "gayaHidup"
} as const;

export type IndonesianCategory = keyof typeof CATEGORY_MAP;
export type ApiCategory = typeof CATEGORY_MAP[IndonesianCategory];
