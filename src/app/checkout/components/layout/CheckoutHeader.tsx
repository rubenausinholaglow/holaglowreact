import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';
import { SvgHolaglow } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function CheckoutHeader() {
  const router = useRouter();

  return (
    <Container>
      <Flex layout="row-between" className="py-4 md:py-6">
        <SvgHolaglow className="text-hg-secondary md:h-[29px] md:w-[120px]" />
        <Button size="sm" type="tertiary" onClick={() => router.back()}>
          <SvgArrowSmallLeft className="mr-2" />

          <span className="hidden md:block">Volver atrás</span>
          <span className="md:hidden">Atrás</span>
        </Button>
      </Flex>
    </Container>
  );
}
