import { Professional } from '@interface/clinic';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
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
      <Text className="text-3xl font-bold mb-8 md:text-5xl">
        <Underlined color={HOLAGLOW_COLORS['primary']}>Escrito</Underlined> por:
      </Text>
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
          <Title size="xl" className="text-center md:text-left w-full">
            {professional.tittleAbbreviation} {professional.name.split(' ')[1]}
          </Title>
          <Text className="text-center md:text-left text-lg w-full">
            {professional.title}
          </Text>
          {professional.collegiateNumber && (
            <Text className="text-center md:text-left text-lg w-full">
              Núm. Col. {professional.collegiateNumber}
            </Text>
          )}
          <Text className="text-center md:text-left w-full">
            {professional.description}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}
