export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
    url: string;
  };
}