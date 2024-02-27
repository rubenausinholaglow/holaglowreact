import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgCalendar } from 'app/icons/Icons';
import { SvgTimeLeft, SvgTimer } from 'app/icons/IconsDs';
import { EmlaType, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function ProductInfoSSR({ product }: { product: Product }) {
  let discountedPrice = null;

  if (product && !isEmpty(product.discounts)) {
    discountedPrice = getDiscountedPrice(product);
  }

  /* 
  const [discountedPrice, setDiscountedPrice] = useState<null | number>(null);
  const {
    cart,
    addItemToCart,
    getQuantityOfProduct,
    removeSingleProduct,
    applyItemDiscount,
  } = useCartStore(state => state);

  const [pendingDiscount, setPendingDiscount] = useState(false);

  useEffect(() => {
    if (setBottomBarThreshold && typeof window !== 'undefined') {
      const videoElement = document.querySelector('video');

      setBottomBarThreshold(videoElement ? videoElement.offsetTop : 1200);
    }
  }, []);

  useEffect(() => {
    if (pendingDiscount) {
      const discountedPrice = getDiscountedPrice(product);

      if (discountedPrice !== null) {
        applyItemDiscount(cart[cart.length - 1].uniqueId, discountedPrice, '€');
        setPendingDiscount(false);
      }
    }
  }, [pendingDiscount]);

  useEffect(() => {
    if (product && !isEmpty(product.discounts)) {
      setDiscountedPrice(getDiscountedPrice(product));
    }
  }, [product]); */

  return (
    <Container className="p-0 md:px-0 md:pb-0 md:py-0 mx-auto w-full">
      <div className="md:flex gap-8 justify-between items-start md:bg-hg-cream md:p-6 md:rounded-2xl w-full">
        <Container className="mt-8 md:mt-0 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <ul className="flex flex-col pb-4 w-full">
            <li className="mb-4 pb-4 border-b border-hg-black flex">
              <div>
                {!isEmpty(product.appliedProducts) ? (
                  product.appliedProducts.map(item => {
                    const iconName = item.icon.split('/')[0] || 'SvgCross';
                    const iconFamily:
                      | 'default'
                      | 'category'
                      | 'suggestion'
                      | 'service' =
                      (item.icon.split('/')[1] as 'default') || 'default';

                    return (
                      <div
                        key={item.titlte}
                        className="flex flex-row items-start mb-1"
                      >
                        <DynamicIcon
                          height={24}
                          width={24}
                          className="mr-3 mt-1 text-hg-secondary shrink-0"
                          name={iconName}
                          family={iconFamily}
                        />

                        <Text size="lg" className="font-semibold mb-1 md:mb-2">
                          {item.titlte}
                        </Text>
                      </div>
                    );
                  })
                ) : (
                  <Text>product.description</Text>
                )}
                <Text className="pl-9">Producto aplicado</Text>
              </div>
            </li>

            {(product.sessions > 0 || product.applicationTimeMinutes > 0) && (
              <li className="mb-4 pb-4 border-b border-hg-black flex ">
                <div className="flex relative md:justify-center flex-col w-full">
                  {product.sessions > 0 && (
                    <>
                      <div className="flex-1 flex items-start pr-4 w-full">
                        <SvgTimeLeft
                          height={24}
                          width={24}
                          className="text-hg-secondary mr-3 mt-1"
                        />
                        <div>
                          <Text
                            size="lg"
                            className="font-semibold mb-1 md:mb-2"
                          >
                            {product.sessions.toString()}{' '}
                            {product.sessions === 1 ? 'sesión' : 'sesiones'}
                          </Text>
                          <Text>Número de sesiones</Text>
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
                className="text-hg-secondary mr-3 mt-1"
              />
              <div>
                <Text size="lg" className="font-semibold mb-1 md:mb-2">
                  {product.emlaType === EmlaType.Required
                    ? product.applicationTimeMinutes * 2 + ''
                    : product.applicationTimeMinutes.toString()}{' '}
                  minutos
                </Text>
                <Text>Tiempo de aplicación</Text>
              </div>
            </li>

            <li className="pb-4 flex">
              <SvgCalendar
                height={24}
                width={24}
                className="text-hg-secondary mr-3 mt-1"
              />
              <div className="flex flex-col">
                {product.durationMin >= 30 ? (
                  <Text size="lg" className="font-semibold mb-1 md:mb-2">
                    {(product.durationMin / 30).toString()}
                    {product.durationMax == product.durationMin && ' meses'}
                    {product.durationMax != product.durationMin &&
                      '-' + (product.durationMax / 30).toString() + ' meses'}
                  </Text>
                ) : (
                  <Text size="lg" className="font-semibold mb-1 md:mb-2">
                    Permanente
                  </Text>
                )}
                <Text>Duración del tratamiento</Text>
              </div>
            </li>
          </ul>
          <Button
            size="xl"
            type="tertiary"
            customStyles="bg-hg-primary"
            className="mb-12 md:mb-0 hidden md:block md:mt-auto"
            href="#prices"
            id="tmevent_click_book_anchor_button"
          >
            <span className="inline-block mr-1">
              Reserva cita {product.isPack ? '' : 'desde'}
            </span>

            {discountedPrice && (
              <span className="inline-block line-through font-normal mr-1">
                {product.price} €
              </span>
            )}
            <span className="font-semibold text-lg">
              {discountedPrice ? discountedPrice : product.price} €
            </span>
          </Button>
        </Container>

        <div className="md:w-2/5 shrink-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={product.videoUrl ? product.videoUrl : '/videos/pdp.mp4'}
            className="w-full h-full block bg-black object-center md:rounded-xl"
          />
        </div>
      </div>
    </Container>
  );
}
