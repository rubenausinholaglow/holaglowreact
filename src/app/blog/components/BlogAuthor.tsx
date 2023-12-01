import { Professional } from '@interface/clinic';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BlogAuthor({
  className = '',
  professional,
}: {
  className?: string;
  professional: Professional;
}) {
  console.log(professional);

  return (
    <Flex
      layout="col-center"
      className={`rounded-3xl bg-hg-cream500 py-8 px-4 ${className} gap-4`}
    >
      <Title className="text-3xl font-bold">
        Nuestra{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>autora</Underlined>
      </Title>
      <Image
        alt={professional.name}
        src={professional.urlPhoto}
        height={800}
        width={1000}
        className="aspect-[5/6] w-full"
      />

      <Title size="2xl" className="text-center w-full">
        {professional.tittleAbbreviation} {professional.name.split(' ')[1]}
      </Title>
      <Text>{professional.title}</Text>
      <Text>Núm. Col. {professional.collegiateNumber}</Text>
      <Text className="text-center">{professional.description}</Text>
    </Flex>
  );
}
