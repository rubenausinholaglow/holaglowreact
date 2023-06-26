import Link from 'next/link';
import { ReactNode } from 'react';

export const Button = ({
  route = '',
  className = '',
  children,
  onClick = undefined,
  ...rest
}: {
  route?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  rest?: any;
}) => {
  const hoverStyles = '';
  const styles = `rounded-lg py-2 px-3 ${hoverStyles} ${className}`;

  if (route) {
    return (
      <Link href={route} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
