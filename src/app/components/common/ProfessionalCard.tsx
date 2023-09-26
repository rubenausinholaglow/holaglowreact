'use client';

import { useState } from 'react';
import { Professional } from '@interface/clinic';
import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
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
        <div className="relative aspect-square w-full mb-4">
          <Image
            alt={professional.name}
            fill
            src={professional.urlPhoto}
            className="object-cover rounded-3xl"
          />
        </div>

        <Text className="font-semibold">{professional.name}</Text>
        <Text size="xs">{professional.title}</Text>
        <Text size="xs">Núm. Col. {professional.collegiateNumber}</Text>
        <Text size="xs" className="text-hg-black500">
          {professional.city}
        </Text>
      </Flex>
    </div>
  );
}
