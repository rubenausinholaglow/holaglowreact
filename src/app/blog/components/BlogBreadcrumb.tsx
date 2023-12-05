import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow, SvgHome } from 'icons/IconsDs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogBreadcrumb({
  className = '',
  title,
}: {
  className?: string;
  title: string;
}) {
  const router = useRouter();

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
        <Text className="text-hg-black400">{title}</Text>
      </Flex>
      <Flex className="gap-2 cursor-pointer" onClick={() => router.back()}>
        <SvgArrow className="rotate-180" height={16} width={16} /> Volver
      </Flex>
    </Flex>
  );
}
