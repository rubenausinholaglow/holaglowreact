import { isMobileSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';

export default function StartButton() {
  return (
    <Button
      size={isMobileSSR() ? 'lg' : 'xl'}
      type="dermaDark"
      href={ROUTES.derma.multistep.pains}
      id="tmevent_derma_start"
    >
      Empezar
      <SvgArrow className="ml-4" height={16} width={16} />
    </Button>
  );
}
