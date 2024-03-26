'use client';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  return (
    <>
      <header
        id="header"
        className="z-30 w-full top-0 sticky transition-all ml-64 mt-8 mb-2"
      >
        <div className="flex items-center text-center">
          <p>/ {pathName.toString().substring(5, pathName.length)}</p>
        </div>
      </header>
    </>
  );
}
