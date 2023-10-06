import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

export default function ProductPriceCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { deviceSize } = useGlobalPersistedStore(state => state);

  return (
    <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
      <Accordion value="accordion">
        <AccordionItem value="accordion">
          <AccordionTrigger
            className={`${!deviceSize.isMobile ? 'pointer-events-none' : ''}`}
          >
            <Flex layout="col-left" className="p-3">
              <Flex layout="row-between" className="w-full">
                <Text
                  size="xl"
                  className="text-hg-secondary font-semibold md:text-2xl"
                >
                  {product.price} €
                </Text>
                <Flex layout="row-right">
                  {index === 0 ? (
                    <Text
                      size="xs"
                      className="py-1 px-2 bg-hg-pink/20 text-hg-pink rounded-md"
                    >
                      Básico
                    </Text>
                  ) : product.isPack ? (
                    <Text
                      size="xs"
                      className="py-1 px-2 bg-hg-turquoise/20 text-hg-turquoise rounded-md"
                    >
                      Oferta especial
                    </Text>
                  ) : (
                    <Text
                      size="xs"
                      className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                    >
                      Upgrade
                    </Text>
                  )}

                  {deviceSize.isMobile && (
                    <>
                      <SvgAdd
                        height={24}
                        width={24}
                        className="ml-4 group-radix-state-open:hidden"
                      />
                      <SvgMinus
                        height={24}
                        width={24}
                        className="ml-4 hidden group-radix-state-open:block"
                      />
                    </>
                  )}
                </Flex>
              </Flex>
              <Text className="font-semibold md:text-lg">{product.title}</Text>
            </Flex>
          </AccordionTrigger>

          <AccordionContent>
            <div className="bg-hg-black50 p-3 w-full rounded-xl">
              {isEmpty(product.packUnities) ? (
                <Flex layout="row-left">
                  <SvgInjection
                    height={16}
                    width={16}
                    className="text-hg-secondary mr-2"
                  />
                  <Text size="sm">{product.description}</Text>
                </Flex>
              ) : (
                <Flex layout="col-left" className="gap-1">
                  {product.packUnities.map((item, index) => (
                    <>
                      <p>és un pack!</p>
                      {/* <ProductPackItem
                      item={item}
                      key={index}
                      showDropdown={showDropdown}
                    /> */}
                    </>
                  ))}
                </Flex>
              )}

              {product?.packMoreInformation && (
                <Accordion>
                  <AccordionItem value="accordion">
                    <AccordionContent>
                      <p className="pl-5 pt-3 pb-0 text-sm md:text-md">
                        {product?.packMoreInformation}
                      </p>
                    </AccordionContent>
                    <AccordionTrigger>
                      <span className="text-hg-secondary underline block text-left pt-3 pl-5 text-sm md:text-md">
                        + info
                      </span>
                    </AccordionTrigger>
                  </AccordionItem>
                </Accordion>
              )}

              {product.isPack ? (
                <Button
                  type="tertiary"
                  className="mt-4"
                  //onClick={() => setShowDropdown(!showDropdown)}
                >
                  Seleccionar viales
                </Button>
              ) : (
                <Button
                  type="tertiary"
                  customStyles="bg-hg-primary md:mt-4"
                  /* onClick={() => {
                    setSelectedTreatments([product]);
                  }} */
                  href={ROUTES.checkout.clinics}
                >
                  Reservar cita
                  <SvgArrow height={16} width={16} className="ml-2" />
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
