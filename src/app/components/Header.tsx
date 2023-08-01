import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text } from 'components/Texts';
import { SvgArrow, SvgHolaglow, SvgUserOctagon } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import Navigation from './Navigation';

export default function Header() {
  return (
    <header>
      <Container>
        <Flex layout="row-center" className="py-6">
          <SvgHolaglow
            height={32}
            width={130}
            fill={HOLAGLOW_COLORS['lightMalva']}
            className="mr-auto"
          />

          <Navigation />

          <Flex layout="row-center" className="ml-auto">
            <Flex layout="row-center">
              <SvgUserOctagon height={24} width={24} fill="transparent" />
              <Text size="sm" className="font-semibold">
                Mi espacio glow
              </Text>
            </Flex>
            <Button
              style="tertiary"
              className="text-hg-black border-hg-black ml-8"
            >
              <Flex layout="row-center">
                <Text size="sm" className="font-semibold">
                  Reserva Cita
                </Text>
                <SvgArrow height={20} width={20} className="rotate-180 ml-2" />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
