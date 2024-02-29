import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgCalendar } from 'app/icons/Icons';
import { SvgEuro, SvgTimeLeft, SvgTimer } from 'app/icons/IconsDs';
import { EmlaType, Product } from 'app/types/product';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';

const ProductVideo = dynamic(() => import('./ProductVideo'), { ssr: false });
const ProductSelectorButton = dynamic(() => import('./ProductSelectorButton'), {
  ssr: false,
});

export default function ProductInfoSSR({ product }: { product: Product }) {
  const productVideoSrc = product.videoUrl
    ? product.videoUrl
    : '/videos/pdp.mp4';

  return (
    <Container className="p-0 md:px-0 md:pb-0 md:py-0 mx-auto w-full">
      <div className="md:flex gap-8 justify-between items-start md:bg-hg-cream md:p-6 md:rounded-2xl w-full">
        <Container className="mt-8 md:mt-0 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <Title size="xl" className="font-bold mb-8">
            Tu tratamiento
          </Title>
          <ul className="flex flex-col pb-4 w-full mb-4">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              {!isEmpty(product.appliedProducts)
                ? product.appliedProducts.map(item => {
                    const iconName = item.icon.split('/')[0] || 'SvgCross';
                    const iconFamily:
                      | 'default'
                      | 'category'
                      | 'suggestion'
                      | 'service' =
                      (item.icon.split('/')[1] as 'default') || 'default';

                    return (
                      <Flex key={item.titlte} className="items-start">
                        <DynamicIcon
                          height={24}
                          width={24}
                          className="mr-3 text-hg-secondary shrink-0"
                          name={iconName}
                          family={iconFamily}
                        />

                        <Text size="lg">{item.titlte}</Text>
                      </Flex>
                    );
                  })
                : product.description}
            </li>
            {(product.sessions > 0 || product.applicationTimeMinutes > 0) && (
              <li className="mb-4 pb-4 border-b border-hg-black flex">
                <div
                  className={`flex relative md:justify-center flex-col w-full`}
                >
                  {product.sessions > 0 && (
                    <>
                      <div className={`flex-1 flex items-start pr-4w-full`}>
                        <SvgTimeLeft
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3"
                        />
                        <div>
                          <Text size="lg">
                            {product.sessions.toString()}{' '}
                            {product.sessions === 1 ? 'sesión' : 'sesiones'}
                          </Text>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>
            )}

            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgTimer
                height={24}
                width={24}
                className="text-hg-secondary mr-3"
              />
              <div>
                <Text size="lg">
                  {product.emlaType === EmlaType.Required
                    ? product.applicationTimeMinutes * 2 + ''
                    : product.applicationTimeMinutes.toString()}{' '}
                  minutos
                </Text>
              </div>
            </li>

            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <SvgCalendar
                height={24}
                width={24}
                className="text-hg-secondary mr-3"
              />
              <div className="flex flex-col">
                {product.durationMin >= 30 ? (
                  <Text size="lg">
                    {(product.durationMin / 30).toString()}
                    {product.durationMax == product.durationMin && ' meses'}
                    {product.durationMax != product.durationMin &&
                      '-' + (product.durationMax / 30).toString() + ' meses'}
                  </Text>
                ) : (
                  <Text size="lg">Permanente</Text>
                )}
              </div>
            </li>

            <li className="pb-4 flex">
              <SvgEuro
                height={24}
                width={24}
                className="text-hg-secondary mr-3"
              />
              <div className="flex flex-col">
                <Text size="lg">desde {product.price} €</Text>
              </div>
            </li>
          </ul>

          <ProductSelectorButton product={product} />
        </Container>
        <div className="md:w-2/5 shrink-0">
          <ProductVideo src={productVideoSrc} />
        </div>
      </div>
    </Container>
  );
}
