import CategorySelector from 'app/(web)/components/filters/CategorySelector';
import ClinicFilter from 'app/(web)/components/filters/ClinicFilter';
import FilterText from 'app/(web)/components/filters/FilterText';
import PackTypeFilter from 'app/(web)/components/filters/PackTypeFilter';
import PriceFilter from 'app/(web)/components/filters/PriceFilter';
import ZoneFilter from 'app/(web)/components/filters/ZoneFilter';
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
      <div className="absolute inset-0">
        <Flex
          layout="col-left"
          className="bg-white p-4 rounded-r-2xl h-[80vh] overflow-y-auto w-full gap-8"
        >
          <FilterText className="mb-0" />
          <Flex layout="col-left" className="w-full">
            <Text size="sm" className="font-semibold">
              Zona
            </Text>
            <ZoneFilter />
          </Flex>
          <Flex layout="col-left" className="w-full">
            <Text size="sm" className="font-semibold">
              Precio
            </Text>
            <PriceFilter />
          </Flex>
          <Flex layout="col-left" className="w-full">
            <CategorySelector isDashboard className="inner-flex" isStacked />
          </Flex>
          <Flex layout="col-left" className="w-full">
            <PackTypeFilter />
          </Flex>
          <Button
            type="tertiary"
            customStyles="group-hover:bg-hg-secondary100"
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
          >
            Cerrar
          </Button>
        </Flex>
      </div>
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
        id={'tmevent_filters'}
        type="tertiary"
        customStyles="group-hover:bg-hg-secondary100"
        onClick={() => setShowDesktopFilters(!showDesktopFilters)}
      >
        Cerrar
      </Button>
    </Flex>
  );
}
