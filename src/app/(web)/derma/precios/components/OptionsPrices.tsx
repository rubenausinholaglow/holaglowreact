import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

const SUBSCRIPTIONS = [
  {
    title: 'Suscripción trimestral',
    imgSrc: '/images/derma/landingPrecios/rutinaHolaglow.png',
    bgColor: 'bg-white',
    tag: {
      text: 'El más popular',
      styles:
        'bg-hg-primary rounded-full px-3 py-2 inline-block ml-auto text-xs text-derma-primary font-semibold',
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
  {
    title: 'Compra única',
    imgSrc: '/images/derma/landingPrecios/rutinaHolaglow.png',
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
];

export default function OptionsPrices() {
  return (
    <div className="bg-derma-secondary300 py-4 pb-16">
      <Container className="bg-white/50 py-4 rounded-2xl -mt-4">
        <ul className="flex flex-col md:flex-row gap-4 w-full">
          {SUBSCRIPTIONS.map(subscription => (
            <li
              className={`flex flex-col p-4 justify-center rounded-xl ${subscription.bgColor}`}
              key={subscription.title}
            >
              {subscription.tag?.text && (
                <p className={subscription.tag.styles}>
                  {subscription.tag.text}
                </p>
              )}
              <Text className="text-lg md:text-xl font-semibold mb-2">
                {subscription.title}
              </Text>
              <Text className="text-3xl font-bold">
                {subscription.price.value}
              </Text>
              <Text className="text-sm">{subscription.price.subtitle}</Text>

              <ul className="border-t border-hg-black500 flex-flex-col gap-3">
                {subscription.bullets.map(bullet => (
                  <li key={bullet.text}>
                    <DynamicIcon
                      family="default"
                      name={bullet.icon}
                      height={20}
                      width={20}
                    />
                    {bullet.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Flex className="justify-center">
          <Button type="derma">Empezar análisi de piel</Button>
        </Flex>
      </Container>
    </div>
  );
}
