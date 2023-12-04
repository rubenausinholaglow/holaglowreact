import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { Post } from 'types/blog';

import BlogCategories from './BlogCategories';

export default function BlogIntro({
  className = '',
  post,
  showButton = false,
}: {
  className?: string;
  post: Post;
  showButton?: boolean;
}) {
  return (
    <Flex layout="col-left" className={`md:flex-row md:gap-12 ${className}`}>
      <Image
        src="/images/blog/post1.png"
        alt="placeholder"
        height={400}
        width={600}
        className="w-full md:w-1/2 shrink-0 rounded-3xl mb-8"
      />

      <div className="w-full md:w-1/2">
        <BlogCategories className="mb-8" categories={post.categories} />

        <Title size="2xl" className="font-bold mb-4">
          {post.title}
        </Title>
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
    </Flex>
  );
}
