import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/poppins-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
});

export const gtUltra = localFont({
  src: [
    {
      path: '../../public/fonts/gtultramedian-light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/gtultramedian-bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gtUltra',
});

export const poppinsTest = localFont({
  src: [
    {
      path: '../../public/fonts/poppinsTest-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppinsTest-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppinsTest-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppinsTest-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppinsTest',
});
