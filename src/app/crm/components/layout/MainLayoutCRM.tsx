import React from 'react';

export default function MainLayout({
  hideHeader = false,
  children,
}: {
  hideHeader?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="transition-all h-screen overflow-hidden flex-col w-full bg-gradient-15deg from-hg-primary300 to-hg-secondary500">
      {children}
    </main>
  );
}
