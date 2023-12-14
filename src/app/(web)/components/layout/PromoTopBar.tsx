import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function PromoTopBar() {
  const ROUTES = useRoutes();

  const { promo } = useGlobalPersistedStore(state => state);

  console.log('promo', promo, isEmpty(promo));

  if (isEmpty(promo)) {
    return <></>;
  }

  return (
    <div className="bg-hg-black w-full overflow-hidden relative">
      <div className="whitespace-nowrap overflow-hidden inline-block animate-horizontalScroll">
        <ul className="inline-block">
          {Array.from({ length: 5 }).map((_, index) => (
            <li className="inline-block pt-2 pb-1 px-6" key={index}>
              <Text disableAnimation size="lg" className="font-medium italic">
                <span className="text-white">DESCUENTOS</span>{' '}
                <span
                  className="text-hg-black"
                  style={{
                    WebkitTextStroke: `1px ${HOLAGLOW_COLORS['secondary']}`,
                  }}
                >
                  BLACK
                </span>{' '}
                <span className="text-hg-primary">FRIDAY</span>
              </Text>
            </li>
          ))}
        </ul>
        <ul className="inline-block">
          {Array.from({ length: 5 }).map((_, index) => (
            <li className="inline-block pt-2 pb-1 px-6" key={index}>
              <Text disableAnimation size="lg" className="font-medium italic">
                <span className="text-white">DESCUENTOS</span>{' '}
                <span
                  className="text-hg-black"
                  style={{
                    WebkitTextStroke: `1px ${HOLAGLOW_COLORS['secondary']}`,
                  }}
                >
                  BLACK
                </span>{' '}
                <span className="text-hg-primary">FRIDAY</span>
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-0">
        <Container isHeader className="h-full">
          <Flex className="h-full justify-end items-center lg:absolute right-4 2xl:mr-20">
            <Button
              id={'tmevent_promo_header_bar'}
              href={`${ROUTES.treatments}/packs`}
              size="sm"
              type="tertiary"
              customStyles="bg-hg-black text-hg-primary border-hg-primary"
            >
              Ver descuentos
            </Button>
          </Flex>
        </Container>
      </div>
    </div>
  );
}
