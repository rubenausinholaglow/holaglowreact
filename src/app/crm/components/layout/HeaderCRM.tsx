import { Container, Flex } from 'designSystem/Layouts/Layouts';

export default function Header() {
  return (
    <>
      <header
        id="header"
        className="z-30 w-full top-0 sticky transition-all bg-white rounded-xl"
      >
        <Container>
          <Flex
            layout="row-between"
            className="w-full relative py-4 lg:py-5 justify-between lg:justify-center"
          >
            <div>User: Jordi</div>
          </Flex>
        </Container>
      </header>
    </>
  );
}
