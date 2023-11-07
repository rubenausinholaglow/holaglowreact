'use client';

import { useEffect } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

function BlackFriday() {
  const { deviceSize } = useGlobalPersistedStore(state => state);

  return (
    <Container className="px-0 pt-8 md:pt-12">
      <div
        className={`relative ${
          deviceSize.isMobile ? 'aspect-[39/78]' : 'aspect-[2432/1096]'
        }`}
      >
        <Image
          src={`/images/home/bf-bg${deviceSize.isMobile ? '' : '-desk'}.png`}
          className="object-fill"
          fill
          alt="black friday holaglow"
        />
        <Flex
          layout="col-center"
          className="absolute left-4 right-4 top-[35%] bottom-0 md:top-[58%] gap-12 md:gap-4"
        >
          <Text
            disableAnimation
            className="text-ellipsis text-center md:text-right uppercase italic text-white px-4 w-full text-lg font-medium md:mr-[13%]"
          >
            Descuentos especiales
            <br />
            sólo hoy
          </Text>
          <Button
            size="xl"
            disableAnimation
            type="secondary"
            className="mx:auto md:ml-auto md:mr-[13%]"
            customStyles="bg-hg-primary border-none text-hg-black font-bold px-12"
          >
            Ver descuentos
          </Button>
        </Flex>
      </div>
    </Container>
  );
}

export default function HomePromo() {
  const { promo } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    console.log(promo);
  }, [promo]);

  if (promo.title === 'Black Friday') {
    return <BlackFriday />;
  }

  return <></>;
}
