import Link from 'next/link';
import { ReactNode } from 'react';

export const Button = ({
  route = '',
  className = '',
  children,
  onClick = undefined,
}: {
  route?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const hoverStyles = 'hover:bg-slate-200/80';
  const styles = `bg-slate-100 border border-slate-300 rounded-lg py-2 px-3 ${hoverStyles} ${className}`;

  if (route) {
    return (
      <Link href={route} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};
