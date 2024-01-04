import  BlogService  from '@services/BlogService';

export default async function sitemap() {
    const sitemapData = generateSitemap();
    const blogs = await BlogService.getBlogPosts();

    const blog = blogs.map(b => {
        return {
         url: `/blog/${b.slug}`,
        changefreq: 'daily',
        priority: 0.7,
        }
    })

    const allSitemapData = [...sitemapData, ...blog];

    return allSitemapData;
}

function generateSitemap() {
  const pages = [
    { url: '/', changefreq: 'daily', priority: 0.7 },
    { url: '/tratamientos', changefreq: 'monthly', priority: 0.5 },
    { url: '/blog', changefreq: 'yearly', priority: 0.3 },
    { url: '/clinicas', changefreq: 'yearly', priority: 0.3 },
    { url: '/quienes-somos', changefreq: 'yearly', priority: 0.3 }
  ];
  return pages;
}
