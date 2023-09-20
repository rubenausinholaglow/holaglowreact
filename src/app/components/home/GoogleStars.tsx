import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgGoogle, SvgStar } from 'icons/IconsDs';

export default function GoogleStars() {
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
