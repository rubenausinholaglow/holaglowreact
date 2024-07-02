import { ReactNode } from 'react';

export const Input = ({
  type,
  value,
  name,
  onChange,
  className,
  children,
  placeholder,
  ...props
}: {
  type: 'email' | 'number' | 'text' | 'tel';
  value: string;
  name: string;
  onChange?: (event: any) => void;
  className?: string;
  children?: ReactNode;
  placeholder?: string;
}) => {
  return (
    <input
      type="email"
      value={value}
      name={name}
      className={className ? className : ''}
      placeholder={placeholder}
      {...props}
    ></input>
  );
};
