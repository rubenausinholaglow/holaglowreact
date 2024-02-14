'use client';

import { Professional } from 'app/types/clinic';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProfessionalCard({
  professional,
  className = '',
}: {
  professional: Professional;
  className?: string;
}) {
  return (
    <div className={`flex flex-col overflow-hidden h-full ${className}`}>
      <Flex layout="col-center" className="text-center gap-2">
        <div className="w-full mb-4">
          <Image
            alt={professional.name}
            height={300}
            width={250}
            src={professional.urlPhoto}
            className="w-full"
          />
        </div>

        <Text className="font-semibold">{professional.name}</Text>
        <Text size="xs" className="text-center">
          {professional.title}
        </Text>
        <Text size="xs">Núm. Col. {professional.collegiateNumber}</Text>
        <Text size="xs" className="text-hg-black500">
          {professional.city}
        </Text>
      </Flex>
    </div>
  );
}
