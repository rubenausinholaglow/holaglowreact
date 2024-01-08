import BlogService from '@services/BlogService';
import ProductService from '@services/ProductService';

export default async function sitemap() {
  const sitemapData = generateSitemap();
  const blogs = await BlogService.getBlogPosts();

  const blog = blogs.map(b => {
    return {
      url: `https://www.holaglow.com/blog/${b.slug}`,
      changefreq: 'daily',
      priority: 0.7,
    };
  });

  const products = await ProductService.getAllProducts();

  const filteredProducts = products
    .filter(p => p.type === 1 || p.type === 2)
    .map(p => ({
      url: `https://www.holaglow.com/tratamientos/${p.extraInformation.slug}`,
      changefreq: 'daily',
      priority: 0.7,
    }));

  const allSitemapData = [...sitemapData, ...filteredProducts, ...blog];

  return allSitemapData;
}

function generateSitemap() {
  const pages = [
    {
      url: 'https://www.holaglow.com',
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.holaglow.com/tratamientos',
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.holaglow.com/blog',
      changefreq: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.holaglow.com/clinicas',
      changefreq: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.holaglow.com/quienes-somos',
      changefreq: 'monthly',
      priority: 0.3,
    },
  ];
  return pages;
}
