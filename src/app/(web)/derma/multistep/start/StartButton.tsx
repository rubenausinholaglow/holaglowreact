import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';

export default function StartButton() {
  return (
    <Button
      type="dermaDark"
      className=""
      href="/multistep/steps"
      id="tmevent_derma_start"
    >
      Pedir rutina
      <SvgArrow className="ml-4" height={16} width={16} />
    </Button>
  );
}
