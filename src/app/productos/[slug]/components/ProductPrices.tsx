import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import {
  SvgAdd,
  SvgArrow,
  SvgInjection,
  SvgMinus,
  SvgTimeLeft,
} from 'icons/IconsDs';

export default function ProductPrices({ product }: { product: Product }) {
  console.log(product);

  return (
    <div className="bg-gradient from-hg-secondary500 to-hg-primary300">
      <Container className="py-12">
        <Flex layout="col-left" className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6">
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              Personaliza
            </Underlined>{' '}
            tu experiencia
          </Title>

          <Flex layout="col-left" className="w-full gap-4 mb-12">
            <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
              <Accordion isOpen>
                <AccordionTrigger>
                  <Flex layout="col-left" className="p-3">
                    <Flex layout="row-between" className="w-full">
                      <Text
                        size="xl"
                        className="text-hg-secondary font-semibold"
                      >
                        {product.price} €
                      </Text>
                      <Flex layout="row-right">
                        <Text
                          size="xs"
                          className="py-1 px-2 bg-hg-pink/20 text-hg-pink rounded-md"
                        >
                          Básico
                        </Text>

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
                      </Flex>
                    </Flex>
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <Flex
                      layout="col-left"
                      className="bg-hg-black50 p-3 gap-4 rounded-xl"
                    >
                      <Flex layout="row-left">
                        <SvgInjection
                          height={16}
                          width={16}
                          className="text-hg-secondary mr-2"
                        />
                        {product.description}
                      </Flex>

                      <Button type="tertiary" customStyles="bg-hg-primary">
                        Reservar cita
                        <SvgArrow height={16} width={16} className="ml-2" />
                      </Button>
                    </Flex>
                  </div>
                </AccordionContent>
              </Accordion>
            </Flex>

            <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
              <Accordion>
                <AccordionTrigger>
                  <Flex layout="col-left" className="p-3">
                    <Flex layout="row-between" className="w-full">
                      <Text
                        size="xl"
                        className="text-hg-secondary font-semibold"
                      >
                        359 €
                      </Text>
                      <Flex layout="row-right">
                        <Text
                          size="xs"
                          className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                        >
                          Upgrade
                        </Text>
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
                      </Flex>
                    </Flex>
                    <Text className="font-semibold">
                      Aumento de labios + mesoterapia
                    </Text>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <Flex
                      layout="col-left"
                      className="bg-hg-black50 p-3 gap-4 rounded-xl"
                    >
                      <Flex layout="row-left">
                        <SvgInjection
                          height={16}
                          width={16}
                          className="text-hg-secondary mr-2"
                        />
                        {product.description}
                      </Flex>

                      <Button type="tertiary" customStyles="bg-hg-primary">
                        Reservar cita
                        <SvgArrow height={16} width={16} className="ml-2" />
                      </Button>
                    </Flex>
                  </div>
                </AccordionContent>
              </Accordion>
            </Flex>

            <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
              <Accordion>
                <AccordionTrigger>
                  <Flex layout="col-left" className="p-3">
                    <Flex layout="row-between" className="w-full">
                      <Text
                        size="xl"
                        className="text-hg-secondary font-semibold"
                      >
                        439 €
                      </Text>
                      <Flex layout="row-right">
                        <Text
                          size="xs"
                          className="py-1 px-2 bg-hg-turquoise/20 text-hg-turquoise rounded-md"
                        >
                          Oferta especial
                        </Text>
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
                      </Flex>
                    </Flex>
                    <Text className="font-semibold">
                      Pack prevención
                      <br />
                      ¡Tú eliges la zona!
                    </Text>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <Flex
                      layout="col-left"
                      className="bg-hg-black50 p-3 gap-4 rounded-xl"
                    >
                      <Flex layout="row-left">
                        <SvgInjection
                          height={16}
                          width={16}
                          className="text-hg-secondary mr-2"
                        />
                        {product.description}
                      </Flex>

                      <Button type="tertiary" customStyles="bg-hg-primary">
                        Reservar cita
                        <SvgArrow height={16} width={16} className="ml-2" />
                      </Button>
                    </Flex>
                  </div>
                </AccordionContent>
              </Accordion>
            </Flex>
          </Flex>

          <Flex layout="col-left" className="w-full gap-4 mb-12">
            <Flex
              layout="col-left"
              className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
            >
              <Text className="font-semibold mb-4 p-2">Microneedling</Text>

              <Flex layout="col-left" className="gap-4 w-full">
                <Flex
                  layout="col-left"
                  className="bg-hg-black50 p-3 gap-2 rounded-xl w-full"
                >
                  <Flex layout="row-between" className="w-full">
                    <Text size="xl" className="text-hg-secondary font-semibold">
                      89 €
                    </Text>

                    <Button type="tertiary" customStyles="bg-hg-primary">
                      Reservar cita
                      <SvgArrow height={16} width={16} className="ml-2" />
                    </Button>
                  </Flex>

                  <Flex layout="row-left">
                    <SvgTimeLeft
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text size="sm">1 sesión</Text>
                  </Flex>
                </Flex>

                <Flex
                  layout="col-left"
                  className="bg-hg-black50 p-3 gap-2 rounded-xl w-full"
                >
                  <Flex layout="row-between" className="w-full">
                    <Text size="xl" className="text-hg-secondary font-semibold">
                      229 €
                    </Text>

                    <Button type="tertiary" customStyles="bg-hg-primary">
                      Reservar cita
                      <SvgArrow height={16} width={16} className="ml-2" />
                    </Button>
                  </Flex>

                  <Flex layout="row-left">
                    <SvgTimeLeft
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text size="sm">3 sesiones</Text>
                  </Flex>
                </Flex>

                <Flex
                  layout="col-left"
                  className="bg-hg-black50 p-3 gap-2 rounded-xl w-full"
                >
                  <Flex layout="row-between" className="w-full">
                    <Text size="xl" className="text-hg-secondary font-semibold">
                      399 €
                    </Text>

                    <Button type="tertiary" customStyles="bg-hg-primary">
                      Reservar cita
                      <SvgArrow height={16} width={16} className="ml-2" />
                    </Button>
                  </Flex>

                  <Flex layout="row-left">
                    <SvgTimeLeft
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text size="sm">6 sesiones</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
