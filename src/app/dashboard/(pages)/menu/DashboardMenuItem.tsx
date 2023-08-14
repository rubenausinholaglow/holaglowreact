'use client';
import { Flex } from 'components/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import Image from 'next/image';
import Link from 'next/link';

import { DashboardMenuItemProps } from '../../utils/props';

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({
  iconSrc,
  altText,
  title,
  link,
}) => {
  return (
    <Link href={link}>
      <Image
        className="mx-auto"
        src={iconSrc}
        height="30"
        width="150"
        alt={altText}
      />
      <p className="text-center text-sm">{title}</p>
    </Link>
  );
};

export default DashboardMenuItem;
