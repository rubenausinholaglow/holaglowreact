import { SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function GoogleStars() {
  return (
    <Button type="white">
      <Flex className="gap-2">
        <SvgStar className="-mt-1" />
        <span>4,7</span>
        <SvgGoogle />
      </Flex>
    </Button>
  );
}
