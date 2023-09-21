import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import Image from 'next/image';

export default function ProductIntro({ product }: { product: Product }) {
  return (
    <Container className="p-0 md:px-4 md:flex gap-16 justify-between">
      <Container className="md:w-auto md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
        <Title size="2xl" className="font-bold mb-4 md:mt-8">
          {product.title}
        </Title>
        <Text className="text-hg-black500 mb-4">
          El relleno o aumento de labios con ácido hialurónico es un tratamiento
          estético que se adapta a tus deseos: aumentar, perfilar, hidratar o
          difuminar las líneas de expresión en tu sonrisa.
        </Text>
        {product.category.map(category => (
          <Button
            key={category.name}
            type="tertiary"
            customStyles="border-none pl-1 mb-8"
          >
            <SvgDiamond
              height={32}
              width={32}
              fill={HOLAGLOW_COLORS['secondary']}
              className="mr-2 border rounded-full p-1 bg-white"
              style={{
                borderColor: `${HOLAGLOW_COLORS['secondary']}`,
              }}
            />
            {category.name}
          </Button>
        ))}
      </Container>
      <div className="relative aspect-[3/2] bg-hg-secondary700 rounded-t-2xl md:w-1/2 md:rounded-2xl md:mt-8">
        <Image
          src="/images/product/fakeProduct.png"
          alt="fakeImg"
          fill
          objectFit="contain"
          className="scale-[110%] -translate-y-[5%]"
        />
      </div>
    </Container>
  );
}
