import { Professional } from 'app/types/clinic';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProfessionalCard({
  professional,
  className = '',
}: {
  professional: Professional;
  className?: string;
}) {
  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <Flex
        layout="col-center"
        className="text-center shadow-centered-secondary rounded-3xl "
      >
        <div className="w-full mb-4">
          <Image
            alt={professional.name}
            height={300}
            width={250}
            src={professional.urlPhoto}
            className="w-full rounded-t-3xl overflow-hidden"
          />
        </div>

        <Flex
          layout="col-left"
          className="bg-white w-full rounded-b-3xl overflow-hidden py-6 px-4 text-sm gap-2"
        >
          <Text className="font-gtUltra font-light text-hg-secondary text-drxl">
            {professional.name}
          </Text>
          <Text>{professional.title}</Text>
          <Text>Núm. Col. {professional.collegiateNumber}</Text>
          <Text>
            <b>15</b> años ejerciendo
          </Text>
          <Text>
            <b>1090</b> pacientes satisfechos
          </Text>
          <Text>
            {professional.city}La encontrarás en nuestra clínica de{' '}
            <a href="#">Barcelona</a>
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
