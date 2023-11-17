import CategorySelector from 'app/components/filters/CategorySelector';
import ClinicFilter from 'app/components/filters/ClinicFilter';
import FilterText from 'app/components/filters/FilterText';
import PackTypeFilter from 'app/components/filters/PackTypeFilter';
import PriceFilter from 'app/components/filters/PriceFilter';
import ZoneFilter from 'app/components/filters/ZoneFilter';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function DesktopFilters({
  showDesktopFilters,
  setShowDesktopFilters,
  isDashboard,
}: {
  showDesktopFilters: boolean;
  setShowDesktopFilters: (value: boolean) => void;
  isDashboard: boolean;
}) {
  if (isDashboard)
    return (
      <Flex layout="col-left" className="bg-white gap-2 mr-2">
        <Flex layout="col-left" className="w-full">
          <Text size="sm" className="mb-4 font-semibold">
            Zona
          </Text>
          <ZoneFilter className="mb-8" />
        </Flex>
        <Flex layout="col-left" className="w-full">
          <Text size="sm" className="mb-4 font-semibold">
            Precio
          </Text>
          <PriceFilter className="mb-8" />
        </Flex>
        <Flex layout="col-left" className="w-full">
          <CategorySelector className="mb-4 inner-flex" isStacked />
        </Flex>
        <Flex layout="col-left" className="w-full">
          <PackTypeFilter />
        </Flex>
        <Flex layout="col-left" className="w-full">
          <FilterText />
        </Flex>
        <Button
          type="tertiary"
          customStyles="group-hover:bg-hg-secondary100"
          onClick={() => setShowDesktopFilters(!showDesktopFilters)}
        >
          Cerrar
        </Button>
      </Flex>
    );
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
        customStyles="group-hover:bg-hg-secondary100"
        onClick={() => setShowDesktopFilters(!showDesktopFilters)}
      >
        Cerrar
      </Button>
    </Flex>
  );
}
