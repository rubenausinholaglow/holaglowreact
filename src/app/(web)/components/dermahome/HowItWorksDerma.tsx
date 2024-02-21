import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function HowItWorksDerma() {
  return (
    <Container className="py-12 md:pb-0">
      <TitleDerma
        isAnimated
        size="2xl"
        className="text-derma-primary text-left mb-8 md:mb-16"
      >
        Cómo funciona
      </TitleDerma>
      <ul className="flex flex-col w-full gap-8 md:gap-16 md:flex-row md:mb-16">
        {[
          {
            text: 'Pide tu cita',
            description:
              'Cuéntanos en el formulario cómo es tu piel y pide cita online con el dermatólogo estético.',
            icon: '/images/derma/home/calendar.svg',
          },
          {
            text: 'Videollamada con el médico',
            description:
              'Reúnete con tu médico en una videollamada para analizar tus objetivos y evaluar el posible tratamiento.',
            icon: '/images/derma/home/online.svg',
          },
          {
            text: 'Recibe tu rutina personalizada',
            description:
              'Te enviamos las 3 cremas definidas por el médico y una receta para tu crema facial personalizada.',
            icon: '/images/derma/home/box.svg',
          },
        ].map((item, index) => (
          <li className="flex text-hg-black500 md:w-1/3" key={item.text}>
            <Flex layout="row-left" className="md:flex-col w-full">
              <Image
                src={item.icon}
                alt={item.text}
                width={48}
                height={44}
                className="mr-6 shrink-0 self-start md:mb-4"
              />
              <Flex layout="col-left" className="gap-4 w-full">
                <Text className="text-sm">Paso {index + 1}</Text>
                <Text className="text-lg text-derma-primary font-semibold">
                  {item.text}
                </Text>
                <Text>{item.description}</Text>
              </Flex>
            </Flex>
          </li>
        ))}
      </ul>
    </Container>
  );
}
