'use client';

//import { useEffect, useLayoutEffect, useState } from 'react';
import { useGlobalStore } from 'app/web/stores/globalStore';

export default function CustomHtml({
  children,
}: {
  children: React.ReactNode;
}) {
  const isModalOpen = useGlobalStore(state => state.isModalOpen);
  const isMainScrollEnabled = useGlobalStore(
    state => state.isMainScrollEnabled
  );

  return (
    <html
      lang="en"
      className={`max-h-screen h-full bg-white text-hg-black overflow-hidden ${
        isModalOpen || !isMainScrollEnabled
          ? 'overflow-hidden'
          : 'overflow-auto'
      } `}
    >
      {children}
    </html>
  );
}
