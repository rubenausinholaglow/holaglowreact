import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgArrow } from 'icons/IconsDs';
import Image from 'next/image';

import BlogCategories from './BlogCategories';

export default function BlogBreadcrumb({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Flex layout="row-right" className={className}>
      <Flex className="gap-2 text-sm">
        <SvgArrow className="rotate-180" height={16} width={16} /> Volver
      </Flex>
    </Flex>
  );
}
