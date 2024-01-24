import { SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

export default function GoogleStars({
  isDerma = false,
  hideOnDesktop = true,
}: {
  isDerma?: boolean;
  hideOnDesktop?: boolean;
}) {
  return (
    <Container className="mb-2 md:mb-6">
      <Flex
        layout={isDerma ? 'row-left' : 'row-center'}
        className={`gap-2 ${hideOnDesktop ? 'md:hidden' : ''}`}
      >
        <SvgStar className="-mt-1" />
        <span>4,7</span>
        <SvgGoogle />
      </Flex>
    </Container>
  );
}
