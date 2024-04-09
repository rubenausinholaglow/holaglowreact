import { SvgHolaglowHand } from 'app/icons/Icons';
import { Professional } from 'app/types/clinic';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProfessionalCard({
  isDerma = false,
  professional,
  className = '',
}: {
  isDerma?: boolean;
  professional: Professional;
  className?: string;
}) {
  return (
    <div className={`p-4 flex flex-col h-full ${className}`}>
      <Flex
        layout="col-center"
        className="flex-grow text-center shadow-centered-secondary rounded-3xl md:flex-row"
      >
        <div className="w-full bg-gradient from-white from-0% via-hg-secondary300/30 via-80% to-white rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none md:rounded-bl-3xl overflow-hidden pt-2 md:relative md:h-full">
          <Image
            alt={professional.name}
            height={250}
            width={250}
            src={professional.urlPhoto}
            className="w-full scale-110 translate-y-[10%] md:hidden"
          />

          <Image
            alt={professional.name}
            fill
            objectFit="cover"
            src={professional.urlPhoto}
            className={`hidden md:block ${!isDerma && 'pt-6'}`}
          />
        </div>

        <Flex
          layout="col-left"
          className="flex-grow md:h-full bg-white w-full rounded-bl-3xl rounded-br-3xl md:rounded-bl-none md:rounded-r-3xl overflow-hidden py-6 px-4 md:px-6 text-sm gap-2"
        >
          <SvgHolaglowHand
            className={`hidden md:block h-14 w-14 ${
              isDerma ? 'text-derma-primary500/20' : 'text-hg-secondary500'
            }`}
          />
          <Text
            className={`font-gtUltra font-light ${
              isDerma ? 'text-derma-primary' : 'text-hg-secondary'
            } text-xldr md:text-2xl`}
          >
            {professional.tittleAbbreviation}. {professional.name}
          </Text>
          <Text>{professional.title}</Text>
          <Text>Núm. Col. {professional.collegiateNumber}</Text>
          <Text>La encontrarás en nuestra clínica de {professional.city}</Text>
        </Flex>
      </Flex>
    </div>
  );
}
