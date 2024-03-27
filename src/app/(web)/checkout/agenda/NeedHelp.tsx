import { SvgCalling } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function NeedHelp({ className = '' }: { className?: string }) {
  const { selectedClinic } = useSessionStore(state => state);

  return (
    <Flex
      layout="col-left"
      className={`bg-derma-secondary300 p-3 gap-3 md:relative w-full md:rounded-2xl ${className}`}
    >
      <Text className="font-semibold">
        ¿La cita que necesitas no está disponible?
      </Text>
      <Flex layout="row-left" className="gap-4 items-center w-full">
        <a href="tel:+34 682 417 208" id="tmevent_agenda_call">
          <Button size="xl" type="secondary">
            <SvgCalling className="mr-2" />
            {selectedClinic && (
              <div>
                <Text size="xs" className="whitespace-nowrap font-light">
                  Llámanos al
                </Text>
                <Text className="whitespace-nowrap">
                  {selectedClinic.phone}
                </Text>
              </div>
            )}
          </Button>
        </a>
        <Text size="xs">Te ayudaremos a agendar tu tratamiento</Text>
      </Flex>
    </Flex>
  );
}
