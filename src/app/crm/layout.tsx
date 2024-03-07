import Head from 'next/head';

export const metadata = {
  metadataBase: new URL('https://holaglow.com'),
  title: 'Holaglow - CRM',
  image: '/images/home/OGimagen_Holaglow.jpg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen h-full bg-white text-hg-black">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
