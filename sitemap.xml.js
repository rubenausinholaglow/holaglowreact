import { BlogService } from '@services/BlogService';
import { ProductService } from '@services/ProductService';
import { createSitemap } from 'sitemap';


async function fetchAndGenerateSitemap() {
  try {
    const products = await ProductService.getAllProducts();
    const productSitemapData  = generateSitemap(products);

    const blogs = await BlogService.getBlogPosts();
    const blogSitemapData = generateBlogSitemap(blogs);

    const staticSitemapData = [
      { url: '/clinicas', changefreq: 'daily', priority: 0.7 },
      { url: '/quienes-somos', changefreq: 'daily', priority: 0.7 },
    ];

    const allSitemapData = [...productSitemapData, ...blogSitemapData, ...staticSitemapData];

    const sitemap = createSitemap({
      hostname: 'https://holaglow.com',
      cacheTime: 600000, 
      urls: allSitemapData,
    });

    
    const xml = sitemap.toString();
    
    console.log(xml);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function generateSitemap(products) {
  return products.map((product) => ({
    url: `/tratamientos/${product.extraInformation.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }));
}

function generateBlogSitemap(blogs) {
  return blogs.map((blog) => ({
    url: `/blog/${blog.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }));
}


fetchAndGenerateSitemap();