'use client';

import Image from 'next/image';

import { isMobile } from '../layout/Breakpoint';

export default function HeroImage() {
  const imgSrc = isMobile()
    ? '/images/home/bg.png'
    : '/images/home/bg-desktop.png';

  return (
    <Image
      src={imgSrc}
      fill
      alt="holaglow"
      objectFit="cover"
      objectPosition="bottom"
      priority
    />
  );
}
