import { Post } from 'app/types/blog';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import Link from 'next/link';

import BlogCategories from './BlogCategories';

export default function BlogItem({
  className = '',
  post,
  isHighlightedPost = false,
  activeCategories,
}: {
  className?: string;
  post: Post;
  index: number;
  isHighlightedPost?: boolean;
  activeCategories?: string[];
}) {
  if (!activeCategories) {
    return <></>;
  }

  const isVisible =
    activeCategories.length === 0 ||
    (activeCategories.length > 0 &&
      post.categories.some(category =>
        activeCategories.includes(category.name)
      ));

  return (
    <div
      className={`w-full ${className} ${
        isHighlightedPost
          ? 'md:flex md:gap-16 border-b border-hg-black md:pb-8'
          : ''
      } ${!isVisible && !isHighlightedPost ? 'hidden' : ''}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={isHighlightedPost ? 'w-full md:w-1/2 md:shrink-0' : ''}
      >
        <div className="aspect-[3/2] relative rounded-3xl overflow-hidden mb-8">
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}post/${post.id}.jpg`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="w-full">
        <BlogCategories
          className={isHighlightedPost ? 'mb-6' : 'mb-4'}
          categories={post.categories}
        />

        <Link href={`/blog/${post.slug}`}>
          <Text
            as={isHighlightedPost ? 'h1' : 'h2'}
            className={`mb-4 transition-all ${
              isHighlightedPost
                ? 'text-3xl md:text-5xl font-bold'
                : 'text-xl font-semibold'
            }`}
          >
            {post.title}
          </Text>
        </Link>
        <Text size="xs" className={isHighlightedPost ? 'mb-4' : ''}>
          Por {post.author}.{' '}
          <span className="text-hg-black500">
            {dayjs(post.creationDate).format('D MMMM, YYYY')}
          </span>
        </Text>

        {isHighlightedPost && (
          <Button
            size="lg"
            type="tertiary"
            className="mb-8 md:hidden"
            customStyles="bg-hg-black border-hg-primary text-hg-primary"
            href={`/blog/${post.slug}`}
          >
            Leer más
          </Button>
        )}
      </div>
    </div>
  );
}
