import { useState } from 'react';
import { Slot } from '@interface/slot';
import { SvgCheck } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function SlotList({
  slots = [],
  isDerma = false,
  loadingDays = false,
  clickedHour,
  setClickedHour,
}: {
  slots: Slot[];
  isDerma?: boolean;
  loadingDays?: boolean;
  clickedHour: string | null;
  setClickedHour: any;
}) {
  const { setSelectedSlot } = useSessionStore(state => state);
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const selectHour = async (x: Slot) => {
    toggleClicked();
    setSelectedSlot(x);

    if (isDerma) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Flex className="flex-wrap gap-3">
      {slots.map((slot: Slot) => {
        return (
          <Flex
            key={slot.startTime}
            layout="row-between"
            className={`transition-all text-sm rounded-lg w-20 h-8 ${
              isDerma
                ? 'border-none bg-derma-secondary400'
                : 'border border-hg-black bg-white'
            } ${
              clickedHour === slot.startTime
                ? `${
                    isDerma ? 'bg-derma-primary' : 'bg-hg-secondary'
                  } text-white `
                : ''
            }`}
          >
            <div
              className="w-full cursor-pointer flex justify-center items-center text-xs"
              onClick={async () => {
                if (!loadingDays) {
                  setClickedHour(slot.startTime);
                  await selectHour(slot);
                }
              }}
            >
              {clickedHour === slot.startTime && (
                <SvgCheck className="text-white mr-1 h-4 w-4" />
              )}
              {slot.startTime} h
            </div>
          </Flex>
        );
      })}
    </Flex>
  );
}
