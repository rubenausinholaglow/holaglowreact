import Professionals from 'app/components/common/Professionals';
import MainLayout from 'app/components/layout/MainLayout';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export const metadata = {
  title: 'El equipo detrás de Holaglow',
  description:
    'Queremos cambiar el significado de la medicina estética como una opción más de autocuidado y de la expresión personal.',
};
export default function StaticClinics() {
  return (
    <MainLayout>
      <div
        className="bg-gradient from-hg-secondary500 to-hg-primary300 py-12 md:py-20"
        id="prices"
      >
        <Container>
          <div className="md:flex md:flex-row gap-12 items-center">
            <Flex layout="col-left" className="md:w-1/2 mb-4 md:mb-0">
              <Title isAnimated size="2xl" className="font-bold mb-4">
                My glow,{' '}
                <Underlined color={HOLAGLOW_COLORS['primary']}>
                  my rules
                </Underlined>
              </Title>
              <Text isAnimated size="xl" className="">
                Holaglow es la nueva cara de la medicina estética que dice adiós
                a los prejuicios y reafirma que la belleza es lo que a ti te de
                la gana
              </Text>
            </Flex>
            <div className="md:w-1/2 aspect-square relative">
              <Image
                alt="Sobre nosotros"
                src="/images/statics/aboutUs.webp"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </Container>
      </div>
      <Professionals className="py-12 md:py-16" />
      <Container>
        <Flex className="pb-12 md:pb-16">
          <ul className="flex flex-col gap-12">
            <li className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full aspect-[2/1] md:w-1/5 md:aspect-square relative shrink-0">
                <Image
                  alt="Sobre nosotros"
                  src="/images/statics/myGlowMyRules.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Title isAnimated className="mb-4">
                  Tú pones las reglas
                </Title>
                <Text isAnimated className="text-hg-black500 md:text-lg">
                  Hacemos fácil la medicina estética. La información y la
                  transparencia forman parte de nuestra esencia. Nosotros te
                  contamos sin tabúes todo lo que debes saber para que pongas
                  tus propias reglas. Creemos que la belleza real se basa en la
                  autenticidad.
                </Text>
              </div>
            </li>

            <li className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full aspect-[2/1] md:w-1/5 md:aspect-square relative shrink-0 md:order-2">
                <Image
                  alt="Conviértete en el centro"
                  src="/images/statics/centro.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Title isAnimated className="mb-4">
                  Conviértete en el centro
                </Title>
                <Text isAnimated className="text-hg-black500 md:text-lg">
                  Es tu momento. Ponemos el foco en ti. Disfruta de una
                  experiencia hecha a la medida de todas las personas que ven en
                  la medicina estética el mejor aliado para deslumbrar en su día
                  a día.
                </Text>
              </div>
            </li>

            <li className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full aspect-[2/1] md:w-1/5 md:aspect-square relative shrink-0">
                <Image
                  alt="Resultados reales"
                  src="/images/statics/resultadosReales.webp"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <Title isAnimated className="mb-4">
                  Resultados reales
                </Title>
                <Text isAnimated className="text-hg-black500 md:text-lg">
                  Tus objetivos son los nuestros. Nuestro equipo médico experto
                  selecciona cada producto especialmente para ti, ajustándose a
                  tus necesidades y deseos. Queremos que disfrutes de tu glow.
                </Text>
              </div>
            </li>
          </ul>
        </Flex>
      </Container>
      <div className="bg-hg-secondary100 py-12 md:py-16">
        <Container>
          <Title isAnimated size="2xl" className="font-bold mb-12 md:mb-16">
            Medicina estética{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary']}>
              a tu medida
            </Underlined>
          </Title>

          <div className="w-full relative aspect-[3/1] mb-12 md:mb-16">
            <Image
              alt="holaglow"
              src={'/images/statics/clinics2.webp'}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <Flex layout="col-left" className="md:flex-row gap-8 md:gap-12">
            <div>
              <Text size="xl" className="font-semibold mb-2">
                Equipo médico experto
              </Text>
              <Text className="text-hg-black500">
                Nuestros doctores expertos en medicina estética cuentan con una
                extensa experiencia que les permite aplicar nuestra selección de
                tratamientos con la mayor seguridad.
              </Text>
            </div>
            <div>
              <Text size="xl" className="font-semibold mb-2">
                Tratamientos no invasivos
              </Text>
              <Text className="text-hg-black500">
                Nuestro equipo médico ha hecho una selección de tratamientos
                estéticos validados para obtener los mejores resultados con el
                menor tiempo de post-tratamiento posible.
              </Text>
            </div>
            <div>
              <Text size="xl" className="font-semibold mb-2">
                Productos de calidad
              </Text>
              <Text className="text-hg-black500">
                Todos los productos que empleamos han sido seleccionados
                cuidadosamente con criterios de calidad y seguridad para obtener
                los resultados deseados.
              </Text>
            </div>
          </Flex>
        </Container>
      </div>
    </MainLayout>
  );
}
