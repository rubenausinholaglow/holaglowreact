import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';

export default function StartButton() {
  return (
    <Button
      type="dermaDark"
      size="xl"
      className="md:mx-0 mb-10"
      href="/multistep/steps"
      id="tmevent_derma_start"
    >
      Empezar
      <SvgArrow className="ml-4" height={24} width={24} />
    </Button>
  );
}
