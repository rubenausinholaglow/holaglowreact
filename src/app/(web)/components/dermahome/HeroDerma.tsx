import { Flex } from 'designSystem/Layouts/Layouts';
import Image from 'next/image';

export default function HomeHeroDerma() {
  return (
    <Flex
      layout="col-center"
      className="bg-gradient-15deg from-10% from-hg-secondary300 to-hg-pink pt-16 -mt-16"
    >
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
