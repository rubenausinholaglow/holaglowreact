import React, { useEffect, useState } from 'react';
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
        height="50"
        width="190"
        alt={altText}
      />
      <p className="text-center text-lg">{title}</p>
    </Link>
  );
};

export default DashboardMenuItem;
