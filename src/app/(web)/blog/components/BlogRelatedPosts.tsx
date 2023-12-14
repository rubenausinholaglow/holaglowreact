import { Category } from '@interface/product';
import { SvgArrow } from 'app/icons/IconsDs';
import { Post } from 'app/types/blog';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Link from 'next/link';

export default function BlogRelatedPosts({
  className = '',
  posts,
  categories,
}: {
  className?: string;
  posts?: Post[];
  categories: Category[];
}) {
  function filterPostsByCategories(
    posts: Post[],
    targetCategories: Category[]
  ) {
    return posts.filter(post => {
      return post.categories.some(postCategory =>
        targetCategories.some(
          targetCategory => postCategory.name === targetCategory.name
        )
      );
    });
  }

  if (!posts) {
    return <></>;
  }

  const filteredPosts = filterPostsByCategories(posts, categories);

  return (
    <Flex layout="col-left" className={`w-full ${className}`}>
      <Text className="text-xl font-semibold mb-8">Post relacionados</Text>

      <ul className="flex flex-col gap-6 w-full">
        {filteredPosts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex gap-4 items-start text-hg-secondary"
            >
              <SvgArrow className="rotate-45 h-8 w-8 text-hg-black shrink-0" />
              <Text className="text-lg font-medium">{post.title}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
