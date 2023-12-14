import { Professional } from '@interface/clinic';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BlogAuthor({
  className = '',
  professional,
}: {
  className?: string;
  professional: Professional;
}) {
  return (
    <Container
      className={`rounded-3xl bg-hg-cream500 py-8 ${className} gap-4 md:p-16`}
    >
      <Flex
        layout="col-left"
        className="md:flex-row gap-8 md:gap-16 items-center"
      >
        <Image
          alt={professional.name}
          src={professional.urlPhoto}
          height={800}
          width={1000}
          className="aspect-[5/6] w-full md:w-[280px] shrink-0"
        />

        <Flex layout="col-left" className="gap-3 items-center">
          <Text size="lg" className="text-center md:text-left w-full font-bold">
            {professional.name}, {professional.title} en Holaglow
          </Text>
          <Text className="text-center md:text-left w-full">
            {professional.authorDescription}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}
