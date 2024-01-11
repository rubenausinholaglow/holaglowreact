import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function WhatsIncludedDerma() {
  return (
    <Container className="pt-6 pb-4 overflow-hidden">
      <Flex
        layout="col-left"
        className="gap-4 items-center relative md:justify-center md:flex-row"
      >
        <Flex layout="col-left" className="relative z-10 md:w-1/2">
          <Title
            isAnimated
            size="2xl"
            className="text-white font-gtUltraBold font-bold mb-4 lg:pr-[20%]"
          >
            Qué incluye el precio
          </Title>
          <Text className="text-hg-black500 md:w-full md:text-lg mb-12">
            Para una piel mejor cuidada, tus médicos te están esperando
          </Text>

          <Flex layout="col-left" className="bg-[#F7F3F0] rounded-2xl p-4">
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
                customStyles="border-none bg-derma-primary text-derma-primary300"
              >
                Comienza ahora
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
