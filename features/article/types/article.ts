export interface Article {
  title: string;
  pubDate: string;
  category: string;
  thumbnail: string;
  paragraphs: string[];
  link: string;
}

export interface ArticleResponse {
  success: boolean;
  message: string | null;
  data: Article;
}
