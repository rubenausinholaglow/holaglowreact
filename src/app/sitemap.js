import  BlogService  from '@services/BlogService';
import ProductService from '@services/ProductService'

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

    const products = await ProductService.getAllProducts();

    const filteredProducts = products
    .filter((p) => p.type === 1 || p.type === 2)
    .map((p) => ({
        url: `/tratamientos/${p.extraInformation.slug}`,
        changefreq: 'daily',
        priority: 0.7,
    }));

    const allSitemapData = [...sitemapData, ...blog, ...filteredProducts];

    return allSitemapData;
}

function generateSitemap() {
    const pages = [
    { url: '/tratamientos', changefreq: 'monthly', priority: 0.5 },
    { url: '/blog', changefreq: 'yearly', priority: 0.3 },
    { url: '/clinicas', changefreq: 'yearly', priority: 0.3 },
    { url: '/quienes-somos', changefreq: 'yearly', priority: 0.3 }
    ];
    return pages;
}
