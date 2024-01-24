'use client';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  return (
    <>
      <header
        id="header"
        className="z-30 w-full top-0 sticky transition-all ml-64 mt-14"
      >
        <div>{pathName.toString().substring(4, pathName.length)}</div>
      </header>
    </>
  );
}
