'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DashboardMenuItemProps } from '../../utils/props';

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({
  iconSrc,
  altText,
  title,
  link,
  target,
}) => {
  return (
    <Link href={link} target={target}>
      <Image
        className="mx-auto"
        src={iconSrc}
        height="30"
        width="150"
        alt={altText}
      />
      <p className="text-center text-sm text-white">{title}</p>
    </Link>
  );
};

export default DashboardMenuItem;
