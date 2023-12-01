import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
import { SvgExport, SvgFacebook, SvgX } from 'icons/socialIcons';
import Link from 'next/link';

export default function BlogRelatedPosts({
  className = '',
  categories = [],
}: {
  className?: string;
  categories: string[];
}) {
  return (
    <Flex layout="col-left" className={`w-full ${className}`}>
      <Text className="text-xl font-semibold mb-8">Post relacionados</Text>

      <ul className="flex flex-col gap-6 w-full">
        <li>
          <Link
            href="htpps://www.google.es"
            className="flex gap-4 items-start text-hg-secondary"
          >
            <SvgArrow className="rotate-45 h-8 w-8 text-hg-black" />
            <Text className="text-lg font-medium">
              Loren Ipsum fk.ghn edkg hkds
            </Text>
          </Link>
        </li>
        <li>
          <Link
            href="htpps://www.google.es"
            className="flex gap-4 items-start text-hg-secondary"
          >
            <SvgArrow className="rotate-45 h-8 w-8 text-hg-black" />
            <Text className="text-lg font-medium">Loren Ipsum</Text>
          </Link>
        </li>
        <li>
          <Link
            href="htpps://www.google.es"
            className="flex gap-4 items-start text-hg-secondary"
          >
            <SvgArrow className="rotate-45 h-8 w-8 text-hg-black" />
            <Text className="text-lg font-medium">Loren Ipsum</Text>
          </Link>
        </li>
        <li>
          <Link
            href="htpps://www.google.es"
            className="flex gap-4 items-start text-hg-secondary"
          >
            <SvgArrow className="rotate-45 h-8 w-8 text-hg-black" />
            <Text className="text-lg font-medium">Loren Ipsum</Text>
          </Link>
        </li>
        <li>
          <Link
            href="htpps://www.google.es"
            className="flex gap-4 items-start text-hg-secondary"
          >
            <SvgArrow className="rotate-45 h-8 w-8 text-hg-black" />
            <Text className="text-lg font-medium">Loren Ipsum</Text>
          </Link>
        </li>
      </ul>
    </Flex>
  );
}
