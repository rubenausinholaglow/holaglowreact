import ROUTES from '@utils/routes';
import { SvgCheck } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const ITEMS = [
  {
    title: 'Análisis de tu piel',
    text: 'Responde un breve cuestionario sobre tu piel y sus síntomas y sube 3 fotos. Todo 100% online.',
    color: '#112959',
  },
  {
    title: 'Diagnóstico en 48 horas',
    text: 'Te asignaremos uno de nuestros médicos para hacer el diagnóstico y elaborar la receta de tu crema facial personalizada.',
    color: '#1B8290',
  },
  {
    title: 'Recibe tu rutina en casa',
    text: 'En solo 3-5 días recibirás tus cremas y la receta para poder encargar tu crema personalizada en la farmacia',
    color: '#21C5B0',
  },
  {
    title: 'Seguimiento de tu médico',
    text: 'Selecciona la opción de suscripción para evaluar el progreso y ajustar la rutina cuando sea necesario.',
    color: '#4DE2C6',
  },
];

export default function TimeLineDerma() {
  return (
    <Container className="py-12">
      <Title
        isAnimated
        size="2xl"
        className="text-derma-primary text-left mb-8 md:mb-16"
      >
        Resultados visibles en 4 pasos
      </Title>
      <Flex className="gap-16 items-start">
        <ul className="w-full md:w-1/2">
          {ITEMS.map(item => (
            <li
              className={`w-full flex items-start gap-4 border-l-[2px] ml-4 pb-12`}
              style={{ borderColor: item.color }}
              key={item.text}
            >
              <SvgCheck
                className={`h-6 w-6 p-0.5 rounded-full shrink-0 -ml-[14px]`}
                style={{
                  backgroundColor: item.color,
                  color: item.color,
                }}
              />
              <Flex layout="row-left" className="md:flex-col w-full">
                <Flex layout="col-left" className="gap-2 w-full">
                  <Text className="font-semibold">{item.title}</Text>
                  <Text className="text-sm">{item.text}</Text>
                </Flex>
              </Flex>
            </li>
          ))}
          <li>
            <SvgArrow className="text-[#4DE2C6] h-5 w-5 rotate-90 relative left-[7px] -top-[20px]" />
          </li>
        </ul>
        <Image
          src="/images/derma/home/retratoSonsoles.jpg"
          height={472}
          width={544}
          alt="Sonsoles Espi"
          className="hidden md:block w-1/2 rounded-2xl"
        />
      </Flex>

      <Button type="derma" size="xl" href={ROUTES.derma.multistep.start}>
        Empezar análisis
      </Button>
    </Container>
  );
}
