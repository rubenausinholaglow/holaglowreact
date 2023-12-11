import { Product } from '@interface/product';
import { useSessionStore } from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import * as icon from 'icons/IconsDs';
import { SvgArrow } from 'icons/IconsDs';

export default function ProductSessionPriceCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { setSelectedTreatments } = useSessionStore(state => state);
  const ROUTES = useRoutes();

  return (
    <div className="w-full">
      <Flex
        layout="row-between"
        className="items-start bg-hg-black50 p-3 rounded-xl md:flex-col"
      >
        <div className="w-full">
          <Text
            size="xl"
            className="w-full text-hg-secondary font-semibold mb-3 md:mb-0 md:px-3 md:pt-3 md:text-2xl"
          >
            {product.price} €
          </Text>
          <Text
            size="lg"
            className="w-full hidden font-semibold mb-3 md:block md:px-3 md:pb-3"
          >
            {product.title}
          </Text>
          <Flex
            layout="col-left"
            className="w-full md:bg-hg-black100 md:p-4 rounded-xl"
          >
            <Flex className="text-sm md:mx-3 ">
              <icon.SvgTimeLeft
                className="text-hg-secondary mr-2"
                height={16}
                width={16}
              />
              {product.sessions}{' '}
              {product.sessions === 1 ? 'sesión' : 'sesiones'}
            </Flex>
            <Button
              id={'click_book_button_prices'}
              type="tertiary"
              className="hidden md:block shrink-0"
              customStyles="bg-hg-primary md:mt-4"
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
        <Button
          id={'click_book_button_prices'}
          type="tertiary"
          className="md:hidden shrink-0"
          customStyles="bg-hg-primary md:mt-4"
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
