import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function ButtonTests() {
  return (
    <MainLayoutSSR hideFooter>
      <Container className="py-24">
        <Flex className="w-full gap-4 mb-24 flex-wrap">
          <Button type="primary" size="xl">
            Default
            <SvgArrow className="ml-4" />
          </Button>
          <button>
            <Flex className="bg-hg-secondary rounded-full text-white text-lg py-4 px-6 font-semibold">
              Button-Flex
            </Flex>
          </button>
          <Flex className="bg-hg-secondary rounded-full text-white text-lg py-4 px-6 font-semibold">
            FlexItem
          </Flex>
          <button>
            <Flex className="flex bg-hg-secondary rounded-full text-white text-lg items-center py-4 px-6 font-semibold justify-between">
              Test alignment
              <SvgArrow className="ml-4" />
            </Flex>
          </button>
        </Flex>
      </Container>
    </MainLayoutSSR>
  );
}
