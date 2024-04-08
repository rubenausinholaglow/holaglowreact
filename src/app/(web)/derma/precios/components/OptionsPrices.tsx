import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const SUBSCRIPTIONS = [
  {
    title: 'Suscripción trimestral',
    imgSrc: '/images/derma/landingPrecios/rutinaDoctorHolaglow.png',
    bgColor: 'bg-white',
    tag: {
      text: 'El más popular',
      styles:
        'bg-hg-primary rounded-full px-3 py-2 inline-block ml-auto text-xs text-derma-primary font-semibold mb-4',
    },
    price: {
      value: '75€',
      subtitle: 'Pago cada 3 meses',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada cada 3 meses',
        isEnabled: true,
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
        isEnabled: true,
      },
      {
        icon: 'SvgCalendarSearch',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: true,
      },
      {
        icon: 'SvgRefreshSquare',
        text: 'Ajuste del tratamiento según evolución',
        isEnabled: true,
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
        isEnabled: true,
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
        isEnabled: true,
      },
      {
        icon: 'SvgCross',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: false,
      },
      {
        icon: 'SvgCross',
        text: 'Ajuste del tratamiento según evolución',
        isEnabled: false,
      },
    ],
  },
];

export default function OptionsPrices() {
  return (
    <div className="bg-derma-secondary300 py-4 pb-16">
      <Container className="bg-white/50 py-4 rounded-2xl -mt-4 md:p-6">
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-8">
          {SUBSCRIPTIONS.map(subscription => (
            <li
              className={`relative flex flex-col p-4 pt-8 md:p-6 md:pt-16 justify-center rounded-xl md:w-1/2 ${subscription.bgColor}`}
              key={subscription.title}
            >
              {subscription.tag?.text && (
                <p
                  className={`absolute top-4 right-4 md:top-6 md_right-6 ${subscription.tag.styles}`}
                >
                  {subscription.tag.text}
                </p>
              )}
              <Image
                src={subscription.imgSrc}
                alt={subscription.title}
                height={200}
                width={200}
                className="mb-4 mx-auto"
              />
              <Text className="text-lg md:text-xl font-semibold mb-2">
                {subscription.title}
              </Text>
              <Text className="text-3xl font-bold text-derma-primary500">
                {subscription.price.value}
              </Text>
              <Text className="text-sm text-derma-primary500">
                {subscription.price.subtitle}
              </Text>

              <ul className="border-t border-hg-black100 mt-4 py-4 flex flex-col gap-4 ">
                {subscription.bullets.map(bullet => (
                  <li
                    key={bullet.text}
                    className="flex gap-3 items-start w-full"
                  >
                    <div
                      className={`flex justify-center items-center rounded-full h-8 w-8 -mt-1 ${
                        bullet.isEnabled
                          ? 'bg-derma-primary/20 text-hg-black'
                          : 'bg-hg-black100 text-hg-error'
                      }`}
                    >
                      <DynamicIcon
                        family="default"
                        name={bullet.icon}
                        height={bullet.isEnabled ? 20 : 14}
                        width={bullet.isEnabled ? 20 : 14}
                      />
                    </div>
                    {bullet.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Flex className="justify-center">
          <Button type="derma" size="xl" customStyles="px-16">
            Empezar análisi de piel
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
