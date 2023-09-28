import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductExplanation({ product }: { product: Product }) {
  return (
    <Container className="gap-16 justify-between py-12 px-0 md:px-4 md:flex md:pb-24">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <Title size="2xl" className="font-bold mb-6">
          <Underlined color={HOLAGLOW_COLORS['secondary700']}>
            Procedimiento
          </Underlined>{' '}
          con ácido hialurónico
        </Title>
        <Text className="text-hg-black500 mb-6">
          El ácido hialurónico es una sustancia presente de forma natural en
          nuestro organismo clave para el buen funcionamiento de nuestra piel.
          Su función es atraer y retener las moléculas de agua. De esta manera,
          cuando inyectamos ácido hialurónico en los labios, logramos aumentar
          el volumen y la hidratación de la zona. Al tratarse de una sustancia
          natural, el ácido hialurónico es reabsorbible, por tanto, sus efectos
          son reversibles y disminuyen gradualmente con el paso del tiempo,
          hasta los doce meses posteriores de su aplicación. El relleno de
          labios con ácido hialurónico es un tratamiento estético sencillo,
          rápido y no invasivo, es decir, los efectos secundarios son muy leves
          y no requiere tiempo de recuperación.
        </Text>

        <Text size="xl" className="mb-4 font-semibold">
          Beneficios del relleno de labios
        </Text>
        <Text className="text-hg-black500 mb-6">
          Dicen que una sonrisa puede cambiar el mundo, por eso, queremos
          ayudarte a que nunca dejes de presumir de la tuya. El relleno de
          labios con ácido hialurónico es una solución eficaz y segura para
          conseguir:
        </Text>
      </Container>
      <div className="md:w-1/2">
        <Container className="md:px-0">
          <Text size="xl" className="mb-4 font-semibold">
            Cuáles son las zonas de aplicación
          </Text>
          <Text className="text-hg-black500 mb-8">
            Te explicamos las zonas de aplicación del tratamiento, aunque pueden
            variar según tus necesidades y la valoración del médico.
          </Text>

          <div className="relative aspect-[4/3] mb-8">
            <Image
              src="/images/product/fakeProductExample1.png"
              alt="fakeImg"
              fill
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          <ul className="flex flex-col mb-4 w-full">
            <li className="mb-6 pb-6 border-b border-hg-black flex">
              <div className="flex border border-hg-secondary rounded-full h-10 w-10 items-center justify-center text-hg-secondary mr-4 shrink-0">
                1
              </div>
              <div>
                <Text className="font-semibold mb-4">Labio superior</Text>
                <Text>
                  Se inyectan hilos de gel de ácido hialurónico con una aguja
                  muy fina en las capas superficiales del labio.
                </Text>
              </div>
            </li>
            <li className="flex">
              <div className="flex border border-hg-secondary rounded-full h-10 w-10 items-center justify-center text-hg-secondary mr-4 shrink-0">
                2
              </div>
              <div>
                <Text className="font-semibold mb-4">Labio inferior</Text>
                <Text>
                  Su aplicación se lleva a cabo de forma sutil y paulatina para
                  poder valorar el resultado.
                </Text>
              </div>
            </li>
          </ul>
        </Container>
      </div>
    </Container>
  );
}
