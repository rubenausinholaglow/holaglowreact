import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

const SUBSCRIPTIONS = {
  trimestral: {
    title: 'Suscripción trimestral',
    bgColor: 'bg-derma-primary/60',
    tag: {
      text: 'El más popular',
      styles: 'bg-hg-primary derma-primary/60',
    },
    price: {
      value: '75€',
      subtitle: 'Pago cada 3 meses',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada cada 3 meses',
      },
      {
        icon: 'SvgCalendarSearch',
        text: 'Seguimiento mensual con tu médico',
      },
      {
        icon: 'SvgRefreshSquare',
        text: 'Ajuste del tratamiento según evolución',
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
      },
    ],
  },
  unica: {
    title: 'Compra única',
    bgColor: 'bg-white',
    tag: {},
    price: {
      value: '99€',
      subtitle: 'En un solo pago',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada de 3 meses',
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
      },
    ],
  },
};

export default function OptionsPrices() {
  return (
    <Container className="bg-white/50 py-4 rounded-2xl -mt-4">
      <ul className="flex flex-col md:flex-row gap-4 w-full">
        <li className="p-4 rounded-2xl bg-derma-primary/60">
          <DynamicIcon
            family="default"
            name="SvgCream"
            height={24}
            width={24}
          />
          <DynamicIcon
            family="default"
            name="SvgVerify"
            height={24}
            width={24}
          />
          <DynamicIcon
            family="default"
            name="SvgRefreshSquare"
            height={24}
            width={24}
          />
          <Text className="text-center">Tratamiento personalizado</Text>
        </li>
        <li className="p-4 rounded-2xl bg-derma-secondary500">
          <Text className="text-center">Tratamiento personalizado</Text>
        </li>
      </ul>

      <Flex className="justify-center">
        <Button type="derma">Empezar análisi de piel</Button>
      </Flex>
    </Container>
  );
}
