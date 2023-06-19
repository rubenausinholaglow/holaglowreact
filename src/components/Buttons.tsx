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
  const hoverStyles = 'hover:bg-[#7516E9]/10';
  const styles = `bg-[#F7F9FC] rounded-lg py-2 px-3 ${hoverStyles} ${className}`;

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
