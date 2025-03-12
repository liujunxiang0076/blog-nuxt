export interface Post {
  id?: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  summary?: string;
  image?: string;
  tags?: string[];
  category?: string;
}

export interface Header {
  level: number;
  title: string;
} 
