import MainLayoutSSR from 'app/(web)/components/layout/MainLayoutSSR';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function ButtonTests() {
  return (
    <MainLayoutSSR hideFooter>
      <Container className="py-24">
        <Title className="mb-8">Old Buttons</Title>
        <Flex className="w-full gap-4 mb-24">
          <Button type="primary" size="xl">
            Test alignment
            <SvgArrow className="ml-4" />
          </Button>
        </Flex>

        <Title className="mb-8">New Buttons</Title>
        <Flex className="w-full gap-4 mb-24">
          <button className="flex bg-hg-secondary text-white py-4 px-6 font-semibold rounded-full text-lg items-center">
            Test alignment
            <SvgArrow className="ml-4" />
          </button>
        </Flex>
      </Container>
    </MainLayoutSSR>
  );
}
