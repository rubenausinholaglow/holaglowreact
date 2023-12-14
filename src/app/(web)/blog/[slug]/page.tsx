import { Post } from 'app/types/blog';
import type { Metadata, ResolvingMetadata } from 'next';

import BlogPost from '../components/BlogPost';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const posts = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API}Blog`).then(
    res => res.json()
  );

  const postData: Post = posts.filter((post: Post) => post.slug === slug)[0];

  return {
    title: postData.metaTitle,
    description: postData.metaDescription,
    alternates: {
      canonical: postData.canonical,
    },
    openGraph: {
      siteName: 'Holaglow.com',
      url: `https://www.holaglow.com/blog/${postData.slug}`,
      title: postData.metaTitle,
      description: postData.metaDescription,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}post/${postData.id}.jpg`,
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  return <BlogPost params={params} />;
}
