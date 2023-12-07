import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'types/blog';

import BlogCategories from './BlogCategories';

export default function BlogItem({
  className = '',
  post,
  index,
  isHighlightedPost = false,
  activeCategories,
}: {
  className?: string;
  post: Post;
  index: number;
  isHighlightedPost?: boolean;
  activeCategories: string[];
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
        <Image
          src={`/images/blog/post${index}.png`}
          alt="placeholder"
          height={400}
          width={600}
          className="w-full rounded-3xl mb-8"
        />
      </Link>

      <div className="w-full">
        <BlogCategories className="mb-6" categories={post.categories} />

        <Link href={`/blog/${post.slug}`}>
          <Text
            className={`mb-4 transition-all ${
              isHighlightedPost
                ? 'text-3xl md:text-5xl font-bold'
                : 'text-xl font-semibold'
            }`}
          >
            {post.title}
          </Text>
        </Link>
        <Text size="xs" className="mb-8">
          Por Dr. {post.author}.{' '}
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
