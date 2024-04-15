import { Button } from 'designSystem/Buttons/Buttons';

import { SUBSCRIPTIONS } from '../../planes/mockedData';

export default function PlanesBottomBar({
  selectedOption,
}: {
  selectedOption: string;
}) {
  const OPTIONS_VALUES = ['0', '1', '2'];

  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 z-40 pointer-events-none ${
        OPTIONS_VALUES.includes(selectedOption)
          ? 'translate-y-[0%]'
          : 'translate-y-[105%]'
      }`}
    >
      <div className="p-4 mx-w-xl bg-white rounded-t-[40px]">
        <Button
          size="lg"
          type="derma"
          href="#"
          className="pointer-events-auto w-full"
          customStyles="px-2"
        >
          {!OPTIONS_VALUES.includes(selectedOption)
            ? 'Elige tu plan'
            : `Continuar con ${SUBSCRIPTIONS[Number(selectedOption)].title}`}
        </Button>
      </div>
    </div>
  );
}
