import { Flex } from 'designSystem/Layouts/Layouts';
import Image from 'next/image';

export default function HomeHeroDerma() {
  return (
    <Flex layout="col-center" className="md:flex-row">
      <Image
        src="/images/derma/home/homeDerma.png"
        alt="Holaglow"
        width={790}
        height={780}
        className="w-full"
      />
    </Flex>
  );
}
