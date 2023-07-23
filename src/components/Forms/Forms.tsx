import { ReactNode } from 'react';

export const Input = ({
  type,
  value,
  name,
  onChange,
  className,
  children,
  ...props
}: {
  type: 'email' | 'number' | 'text' | 'tel';
  value: string;
  name: string;
  onChange?: (event: any) => void;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <input
      type="email"
      value={value}
      name={name}
      className={className ? className : ''}
      placeholder="Introduce tu teléfono, email o DNI"
      {...props}
    ></input>
  );
};
