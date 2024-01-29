import { SvgArrow, SvgCheckCircle } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function WhatsIncludedDerma() {
  return (
    <div className="bg-derma-primary500 rounded-3xl -mt-4 -mb-4 md:mt-0 md:mb-0 md:pb-16 relative md:bg-transparent">
      <Container className="py-4 overflow-hidden md:bg-derma-primary500 md:rounded-3xl md:p-6">
        <Flex
          layout="col-left"
          className="items-center relative md:justify-center md:flex-row md:gap-12 md:items-start"
        >
          <Flex layout="col-left" className="relative z-10 md:w-[55%]">
            <TitleDerma
              isAnimated
              size="2xl"
              className="text-white mb-4 md:mb-6"
            >
              Qué incluye el precio
            </TitleDerma>
            <Text className="text-hg-black500 md:w-full md:text-lg mb-6 md:text-white">
              Tu piel merece un cuidado experto y personalizado
            </Text>

            <Flex
              layout="row-between"
              className="p-6 bg-derma-primary300 rounded-full w-full hidden md:flex"
            >
              <Button
                size="xl"
                type="tertiary"
                href="/multistep/start"
                customStyles="border-none bg-derma-primary text-white hover:bg-derma-primary500 hover:text-derma-primary"
              >
                Comienza ahora
              </Button>

              <SvgArrow className="h-12 w-12 text-derma-primary" />
            </Flex>
          </Flex>

          <Flex layout="col-left" className="relative z-10 w-full md:w-[45%]">
            <Flex
              layout="col-left"
              className="bg-derma-secondary300 rounded-2xl p-4 md:p-6 shadow-centered-black w-full"
            >
              <Flex className="gap-4 mb-6">
                <Image
                  src="/images/derma/home/firstAppointment.svg"
                  alt="Primera cita"
                  height={48}
                  width={48}
                />
                <Text className="text-lg font-semibold">Primera consulta</Text>
              </Flex>
              <Text className="text-sm font-semibold mb-6">
                <span className="text-2xl md:text-4xl font-bold">59 €</span>{' '}
                /pago único
              </Text>
              <ul className="flex flex-col gap-4 w-full text-hg-black500 mb-4">
                {[
                  '<span class="font-semibold text-derma-tertiary">Consulta online</span> con tu dermatólogo',
                  'Receta de la <span class="font-semibold text-derma-tertiary">crema facial personalizada</span>',
                  'Recomendación de <span class="font-semibold text-derma-tertiary">rutina facial complementaria</span>',
                ].map(item => (
                  <li className="border-hg-black flex" key={item}>
                    <div className="flex relative md:justify-center flex-col w-full">
                      <div className="flex-1 flex items-start pr-4 w-full">
                        <SvgCheckCircle
                          height={20}
                          width={20}
                          className="text-derma-primary500 mr-3 shrink-0"
                        />
                        <p
                          className="text-sm md:text-md"
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Flex layout="col-center" className="w-full md:gap-4">
                <Image
                  src="/images/derma/home/cream.png?1"
                  alt="Holaglow"
                  width={200}
                  height={444}
                  className="w-[130px] shrink-0"
                />

                <Button
                  type="tertiary"
                  size="lg"
                  href="/multistep/start"
                  customStyles="border-none bg-derma-primary text-white hover:bg-derma-primary500 hover:text-derma-primary md:hidden"
                >
                  Comienza ahora
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
