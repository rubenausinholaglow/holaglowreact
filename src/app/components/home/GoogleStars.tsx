'use client';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgGoogle, SvgStar } from 'icons/IconsDs';

export default function GoogleStars() {
  const deviceSize = useGlobalPersistedStore(state => state.deviceSize);
  if (deviceSize.isMobile) {
    return (
      <Container isWider className="mb-2">
        <Flex layout="row-center" className="gap-2">
          <SvgStar className="-mt-1" />
          <span>4,7</span>
          <SvgGoogle />
        </Flex>
      </Container>
    );
  }
}
