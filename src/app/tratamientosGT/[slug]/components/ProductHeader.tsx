import { Product } from '@interface/product';
import { AnimateOnViewport } from 'app/components/common/AnimateOnViewport';
import CategoryIcon from 'app/components/common/CategoryIcon';
import { getProductCardColor, useImageProps } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgGlow } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function ProductHeader({ product }: { product: Product }) {
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);

  return (
    <Container className="p-0 md:px-4 md:flex gap-16 justify-between md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
        <Title
          isAnimated
          size="2xl"
          className="font-bold mb-4 md:mt-8 font-gtUltraBold text-4xl"
        >
          {product.title}
        </Title>
        <Text isAnimated className="text-hg-black500 mb-4">
          {product.extraInformation?.resultDescription}
        </Text>
        <AnimateOnViewport>
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
        </AnimateOnViewport>
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

          {!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' && (
            <Flex
              layout="row-center"
              className="bg-hg-black rounded-full p-1 px-2 absolute top-[36px] md:top-[46px] left-[4px] m-2"
            >
              <SvgGlow
                height={12}
                width={12}
                className="text-hg-primary mr-1"
              />
              <Text className="text-hg-secondary" size="xs">
                B.<span className="text-hg-primary">Friday</span>
              </Text>
            </Flex>
          )}
        </div>
      </div>
    </Container>
  );
}
