import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgGoogle, SvgStar } from 'icons/IconsDs';

export default function GoogleStars() {
  return (
    <Container isWider className="mb-2 md:mb-6">
      <Flex layout="row-center" className="gap-2 md:hidden ">
        <SvgStar className="-mt-1" />
        <span>4,7</span>
        <SvgGoogle />
      </Flex>
    </Container>
  );
}
