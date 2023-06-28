import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Button = ({
  type = 'primary',
  route = '',
  className = '',
  onClick = undefined,
  children,
  ...rest
}: {
  type: 'primary' | 'secondary' | 'inverted';
  route?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  rest?: any;
}) => {
  const StylesConfig = {
    primary: 'bg-[#7516E9] text-white rounded-full px-4 py-2',
    secondary: 'text-[#7516E9] border border-[#E2E7F0] rounded-full px-4 py-2',
    inverted: 'text-[#7516E9] border border-[#E2E7F0] rounded-full px-4 py-2',
  };

  const styles = twMerge(`${StylesConfig[type]} ${className}`);

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
