import { Product } from '@interface/product';
import { useSessionStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import * as icon from 'icons/IconsDs';
import { SvgArrow } from 'icons/IconsDs';

export default function ProductSessionGroupedPriceCard({
  product,
}: {
  product: Product;
}) {
  const { setSelectedTreatments } = useSessionStore(state => state);

  return (
    <div className="w-full">
      <Flex
        layout="row-between"
        className="items-start bg-hg-black50 p-3 rounded-xl"
      >
        <div className="w-full">
          <>
            <Text
              size="xl"
              className="w-full text-hg-secondary font-semibold mb-3 "
            >
              {product.price} €
            </Text>
          </>
          <Flex layout="col-left" className="w-full rounded-xl">
            <Flex className="text-sm ">
              <icon.SvgTimeLeft
                className="text-hg-secondary mr-2"
                height={16}
                width={16}
              />
              {product.sessions}{' '}
              {product.sessions === 1 ? 'sesión' : 'sesiones'}
            </Flex>
          </Flex>
        </div>
        <Button
          type="tertiary"
          className="shrink-0"
          customStyles="bg-hg-primary"
          onClick={() => {
            setSelectedTreatments([product]);
          }}
          href={ROUTES.checkout.clinics}
        >
          Reservar cita
          <SvgArrow height={16} width={16} className="ml-2" />
        </Button>
      </Flex>
    </div>
  );
}
