import { ReactNode } from 'react';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function DermaStepHeader({
  intro,
  title,
  children,
}: {
  intro: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="w-full md:w-1/2">
      <Text className="text-xs text-derma-primary500 mb-1">{intro}</Text>
      <Title className="text-derma-primary font-light mb-1">{title}</Title>
      {children}
    </div>
  );
}
