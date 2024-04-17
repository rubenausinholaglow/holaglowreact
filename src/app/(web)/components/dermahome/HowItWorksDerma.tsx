import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import DynamicIcon from '../common/DynamicIcon';

const ITEMS = [
  {
    text: 'Analizamos tu piel en 48h',
    description:
      'Sin salir de casa y sin largas esperas. Recibe un diagnóstico de tu piel y el plan de tratamiento recomendado.',
    icon: 'SvgTimeLeft',
  },
  {
    text: 'Especialistas en dermatología',
    description:
      'Nuestro equipo de médicos especialistas en dermatología diseñará el tratamiento adaptado a las necesidades de tu piel.',
    icon: 'SvgStethoscope',
  },
  {
    text: 'Rutina facial personalizada',
    description:
      'Recibe en casa la base de tu rutina compuesta por espuma limpiadora, protector solar, crema de día y la receta de tu crema personalizada.',
    icon: 'SvgUsers',
  },
  {
    text: 'Compuestos médicos probados',
    description:
      'Pide la elaboración de tu crema facial personalizada en tu farmacia más cercana (25-40€ según composición).',
    icon: 'SvgMedal',
  },
];

export default function HowItWorksDerma() {
  return (
    <div className="bg-white rounded-2xl md:rounded-none py-12">
      <Container>
        <Title
          isAnimated
          size="2xl"
          className="text-derma-primary text-left mb-8 md:mb-16"
        >
          Una piel sana tiene{' '}
          <span className="line-through text-derma-primary/60">truco</span>{' '}
          ciencia
        </Title>
        <ul className="flex flex-col w-full gap-8 md:gap-16 md:flex-row">
          {ITEMS.map((item, index) => (
            <li
              className="flex md:flex-col items-start md:w-1/4 gap-4"
              key={item.text}
            >
              <DynamicIcon
                name={item.icon}
                height={48}
                width={48}
                className="text-derma-primary500"
              />
              <Flex layout="row-left" className="md:flex-col w-full mt-2">
                <Flex layout="col-left" className="gap-4 w-full">
                  <Text className="text-lg font-semibold">{item.text}</Text>
                  <Text>{item.description}</Text>
                </Flex>
              </Flex>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
