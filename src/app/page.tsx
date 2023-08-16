import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link prefetch={false} href="/user/budget?id=199">
        test budget
      </Link>
      <Link prefetch={false} href="/user/passport?id=62280">
        test passport
      </Link>
      <Link href="/form">multistep</Link>
      <Link href="/dashboard">dashboard</Link>
      <Link href="/web">web</Link>
    </main>
  );
}
