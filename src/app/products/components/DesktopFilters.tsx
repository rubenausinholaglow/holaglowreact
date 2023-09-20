import ClinicFilter from 'app/components/filters/ClinicFilter';
import ZoneFilter from 'app/components/filters/ZoneFilter';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function DesktopFilters({
  showDesktopFilters,
  setShowDesktopFilters,
}: {
  showDesktopFilters: string;
  setShowDesktopFilters: (value: string) => void;
}) {
  return (
    <Flex layout="col-left">
      <Flex className="gap-16 items-start">
        <Flex layout="col-left">
          <Text size="sm" className="mb-4 font-semibold">
            Zona de la cara
          </Text>
          <ZoneFilter className="mb-8" isDesktop />
        </Flex>
        <Flex layout="col-left">
          <Text size="sm" className="mb-4 font-semibold">
            Clínicas
          </Text>
          <ClinicFilter className="mb-8" />
        </Flex>
      </Flex>

      <Button
        type="tertiary"
        onClick={() =>
          setShowDesktopFilters(
            showDesktopFilters === 'true' ? 'false' : 'true'
          )
        }
      >
        Cerrar
      </Button>
    </Flex>
  );
}
