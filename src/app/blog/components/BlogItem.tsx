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
  showButton = false,
}: {
  className?: string;
  post: Post;
  index: number;
  showButton?: boolean;
}) {
  return (
    <div className={className}>
      <Link href={`/blog/${post.slug}`}>
        <Image
          src={`/images/blog/post${index}.png`}
          alt="placeholder"
          height={400}
          width={600}
          className="w-full rounded-3xl mb-8"
        />
      </Link>

      <div className="w-full">
        <BlogCategories className="mb-8" categories={post.categories} />

        <Link href={`/blog/${post.slug}`}>
          <Text
            className={`mb-4 transition-all ${
              showButton ? 'text-3xl font-bold' : 'text-xl font-semibold'
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

        {showButton && (
          <Button
            size="lg"
            type="tertiary"
            className="mb-8"
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
