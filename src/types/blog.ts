import { Category } from '@interface/product';

export interface Post {
  title: string;
  slug: string;
  summary: string;
  author: string;
  html: string;
  categories: Category[];
  creationDate: Date;
  active: boolean;
}
