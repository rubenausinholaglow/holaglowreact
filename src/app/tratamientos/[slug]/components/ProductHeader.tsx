import { Product } from '@interface/product';
import CategoryIcon from 'app/components/common/CategoryIcon';
import { getProductCardColor, useImageProps } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductHeader({ product }: { product: Product }) {
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);

  return (
    <Container className="p-0 md:px-4 md:flex gap-16 justify-between md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
        <Title size="2xl" className="font-bold mb-4 md:mt-8">
          {product.title}
        </Title>
        <Text className="text-hg-black500 mb-4">
          {product.extraInformation?.resultDescription}
        </Text>
        <Flex className="gap-2">
          {product.category.map(category => {
            return (
              <Button
                key={category.name}
                type="tertiary"
                customStyles="border-none pl-1 mb-8"
              >
                <CategoryIcon category={category.name} className="mr-2" />
                {category.name}
              </Button>
            );
          })}
        </Flex>
      </Container>
      <div className="md:w-1/2">
        <div className="relative aspect-[3/2] w-full">
          <div
            className="absolute inset-0 top-[10%] rounded-3xl"
            style={{
              background: getProductCardColor(product.cardBackgroundColor),
            }}
          />

          <Image
            alt={product.title}
            width={600}
            height={400}
            src={imgSrc}
            onError={() => setNextImgSrc()}
            className={`relative ${alignmentStyles} rounded-3xl w-[66%]`}
          />
        </div>
      </div>
    </Container>
  );
}
