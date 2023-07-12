import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Link href='/user/budget'>budget</Link>
      <Link href='/user/passport'>passport</Link>
      <Link href='/form'>form</Link>
      <Link href='/test'>test</Link>
    </main>
  );
}
