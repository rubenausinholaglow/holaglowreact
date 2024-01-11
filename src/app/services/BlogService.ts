import Bugsnag from '@bugsnag/js';
import { Post } from '@interface/blog';

export default class blogService {
  static async getBlogPosts(): Promise<Post[]> {
    try {
      const url = `${process.env.NEXT_PUBLIC_BLOG_API}Blog`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
        Bugsnag.notify('Error getBlogPosts' + res);
        return [];
      }
    } catch (err) {
      Bugsnag.notify('Error getBlogPosts' + err);
      return [];
    }
  }
}
