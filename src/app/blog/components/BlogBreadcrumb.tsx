import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow, SvgHome } from 'icons/IconsDs';
import Link from 'next/link';

export default function BlogBreadcrumb({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Flex
      layout="row-right"
      className={`mb-8 justify-end md:justify-between w-full ${className} `}
    >
      <Flex className="gap-4 hidden md:flex">
        <SvgHome />
        <Text className="font-bold">·</Text>
        <Text>
          <Link href="/blog">Blog</Link>
        </Text>
        <Text className="font-bold">·</Text>
        <Text className="text-hg-black400">Blog Title</Text>
      </Flex>
      <Flex className="gap-2">
        <SvgArrow className="rotate-180" height={16} width={16} /> Volver
      </Flex>
    </Flex>
  );
}
