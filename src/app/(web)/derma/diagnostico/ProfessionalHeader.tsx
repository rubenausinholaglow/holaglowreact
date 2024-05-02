import dayjs from 'dayjs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProfessionalHeader({ diagnosis }: { diagnosis: any }) {
  return (
    <Flex layout="row-left" className="w-full mb-6">
      {diagnosis.professional?.urlPhoto && (
        <Image
          alt={diagnosis.professional?.name}
          height={48}
          width={48}
          src={diagnosis.professional?.urlPhoto}
          className="rounded-full overflow-hidden mr-2"
        />
      )}
      <Text className="text-xs">
        <span className="font-semibold">{diagnosis.professional?.name}</span>
        {' · '}
        <span className="text-hg-black400">
          Publicado hace {dayjs().diff(dayjs(diagnosis?.creationDate), 'day')}{' '}
          días
        </span>
      </Text>
    </Flex>
  );
}
