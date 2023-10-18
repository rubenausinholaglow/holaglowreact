import { Product } from '@interface/product';
import CategoryIcon from 'app/components/common/CategoryIcon';
import { getProductCardColor } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductHeader({ product }: { product: Product }) {
  const DEFAULT_IMG_SRC = '/images/product/fakeProduct.png';

  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard.png`
  );
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
        <div
          className="relative aspect-[3/2] rounded-t-2xl md:rounded-2xl md:mt-8"
          style={{
            background: getProductCardColor(product.cardBackgroundColor),
          }}
        >
          <Image
            src={imgSrc}
            onError={() => setImgSrc(DEFAULT_IMG_SRC)}
            alt="fakeImg"
            fill
            objectFit="contain"
            className="scale-[110%] -translate-y-[5%]"
          />
        </div>
      </div>
    </Container>
  );
}
