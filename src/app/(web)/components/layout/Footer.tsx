'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

import FooterFirstBlock from './FooterFirstBlock';
import FooterIntro from './FooterIntro';
import FooterSecondBlock from './FooterSecondBlock';

export function Footer() {
  const { clinics } = useGlobalPersistedStore(state => state);

  return (
    <Container className="pb-20 pt-12 md:pt-16 px-0 md:px-4">
      <Flex layout="col-left" className="gap-12 md:flex-row">
        <FooterIntro />
        <FooterFirstBlock />
        <FooterSecondBlock clinics={clinics} />
      </Flex>
    </Container>
  );
}
