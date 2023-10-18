import { Product } from '@interface/product';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgCalendar } from 'icons/Icons';
import { SvgInjection, SvgTimeLeft, SvgTimer } from 'icons/IconsDs';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <Container className="p-0 md:px-4 md:pb-16">
      <div className="md:flex gap-16 justify-between md:bg-hg-cream md:p-6 md:rounded-2xl">
        <Container className="mt-8 md:mt-0 md:px-0 md:w-1/2 md:flex md:flex-col md:justify-center md:items-start">
          <ul className="flex flex-col mb-4 w-full">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgInjection
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold mb-1 md:mb-2">
                  {product.description}
                </Text>
                <Text>Producto aplicado</Text>
              </div>
            </li>
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgTimeLeft
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold mb-1 md:mb-2">
                  {product.sessions.toString()}{' '}
                  {product.sessions === 1 ? 'sesión' : 'sesiones'}
                </Text>
                <Text>Número de sesiones</Text>
              </div>
            </li>
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgTimer
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold mb-1 md:mb-2">
                  {product.applicationTimeMinutes.toString()} minutos
                </Text>
                <Text>Tiempo de aplicación</Text>
              </div>
            </li>
            {product.durationMin > 30 && (
              <li className="pb-4 flex">
                <SvgCalendar
                  height={24}
                  width={24}
                  className="text-hg-secondary mr-3 mt-1"
                />
                <div>
                  <Text size="lg" className="font-semibold mb-1 md:mb-2">
                    {(product.durationMin / 30).toString()} -{' '}
                    {(product.durationMax / 30).toString()} meses
                  </Text>
                  <Text>Duración del tratamiento</Text>
                </div>
              </li>
            )}
          </ul>

          <Button
            size="xl"
            type="tertiary"
            bgColor="bg-hg-primary"
            className="hidden md:block md:mt-auto"
          >
            <Link href="#prices" className="hover:text-inherit">
              Reserva cita desde{' '}
              <span className="inline-block text-xl font-bold underline ml-2">
                {product.price} €
              </span>
            </Link>
          </Button>
        </Container>
        <div className="md:w-1/2">
          {/*<div className="relative aspect-[6/5] md:rounded-2xl">
            <Image
              src="/images/product/fakeProductExample1.png"
              alt="fakeExample"
              fill
              objectFit="cover"
              className="md:rounded-xl"
            />
            </div> */}
        </div>
      </div>
    </Container>
  );
}
