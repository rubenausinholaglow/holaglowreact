import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function WhatsIncludedDerma() {
  return (
    <div className="bg-derma-primary500 rounded-3xl -mt-4 -mb-4 md:mt-0 md:mb-0 md:pb-16 relative md:bg-transparent">
      <Container className="py-4 overflow-hidden md:bg-derma-primary500 md:rounded-3xl md:p-6">
        <Flex
          layout="col-left"
          className="items-center relative md:justify-center md:flex-row md:gap-12 md:items-start"
        >
          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Title
              isAnimated
              size="2xl"
              className="text-white font-gtUltraBold font-bold mb-4 md:mb-8"
            >
              Qué incluye el precio
            </Title>
            <Text className="text-hg-black500 md:w-full md:text-lg mb-6 md:mb-12 md:text-white">
              Para una piel mejor cuidada, tus médicos te están esperando
            </Text>

            <Flex
              layout="row-between"
              className="p-8 bg-derma-primary300 rounded-full w-full hidden md:flex"
            >
              <Button
                size="lg"
                type="tertiary"
                customStyles="bg-derma-primary text-derma-primary100 border-none"
              >
                Comienza ahora
              </Button>

              <SvgArrow className="h-10 w-10 text-derma-primary" />
            </Flex>
          </Flex>

          <Flex layout="col-left" className="relative z-10 md:w-1/2">
            <Flex
              layout="col-left"
              className="bg-derma-secondary300 rounded-2xl p-4 shadow-centered-black"
            >
              <Text className="text-lg font-bold text-hg-black700 mb-4">
                Pago único
              </Text>
              <ul className="flex flex-col gap-4 w-full text-hg-black500 mb-4">
                {[
                  'Consulta de <b class="text-hg-black700">12 min</b> con el dermatólogo',
                  'Receta online para crema formulada especialmente para tu piel <b class="text-hg-black700">59 €</b>',
                ].map(item => (
                  <li className="border-hg-black flex" key={item}>
                    <div className="flex relative md:justify-center flex-col w-full">
                      <div className="flex-1 flex items-start pr-4 w-full">
                        <SvgArrow
                          height={20}
                          width={20}
                          className="text-derma-primary500 mr-3 shrink-0 rotate-45"
                        />
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Flex layout="col-center" className="w-full gap-4">
                <Image
                  src="/images/derma/home/cream.png"
                  alt="Holaglow"
                  width={200}
                  height={444}
                  className="w-[130px] shrink-0"
                />

                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none bg-derma-primary text-derma-primary300 md:hidden"
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
