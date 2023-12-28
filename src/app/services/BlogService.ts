export default class blogService {
  static async getBlogPosts() {
    try {
      const url = `${process.env.NEXT_PUBLIC_BLOG_API}Blog`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
        return '';
      }
    } catch (err) {
      return err;
    }
  }
}
