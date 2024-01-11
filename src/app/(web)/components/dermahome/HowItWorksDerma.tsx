import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HowItWorksDerma() {
  return (
    <div className="bg-derma-primary100">
      <Container className="py-12">
        <Title
          isAnimated
          size="2xl"
          className="font-gtUltraBold text-derma-primary text-left font-bold mb-8"
        >
          Cómo funciona
        </Title>
        <ul className="flex flex-col w-full gap-8">
          {[
            {
              text: 'Reserva tu consulta',
              description: 'Loren Ipsum',
              icon: '/images/derma/home/calendar.svg',
            },
            {
              text: 'Visita médica online',
              description: 'Loren Ipsum',
              icon: '/images/derma/home/online.svg',
            },
            {
              text: 'Plan de cuidado en casa',
              description: 'Loren Ipsum',
              icon: '/images/derma/home/box.svg',
            },
          ].map((item, index) => (
            <li className="flex text-hg-black500" key={item.text}>
              <div className="flex relative md:justify-center flex-col w-full">
                <div className="flex-1 flex items-start w-full">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={48}
                    height={44}
                    className="mr-6 shrink-0"
                  />
                  <Flex layout="col-left" className="gap-4 w-full">
                    <Text className="text-sm">Paso {index + 1}</Text>
                    <Text className="text-lg text-derma-primary font-semibold">
                      {item.text}
                    </Text>
                    <Text>{item.description}</Text>
                  </Flex>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
