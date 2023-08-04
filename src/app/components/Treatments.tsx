import { Container, Flex } from 'components/Layouts/Layouts';
import { Text, Underlined } from 'components/Texts';
import { SvgDiamond } from 'icons/Icons';
import Image from 'next/image';
import { HOLAGLOW_COLORS } from 'utils/colors';

const TREATMENT_TYPES = [
  {
    name: 'Arrugas',
    color: '#ff0000',
  },
  {
    name: 'Calidad de piel',
    color: '#00ff00',
  },
  {
    name: 'Caida de pelo',
    color: '#0000ff',
  },
  {
    name: 'Ácido Hialurónico',
    color: '#aabb00',
  },
  {
    name: 'Efecto lifting',
    color: '#ddccdd',
  },
  {
    name: 'Otros',
    color: '#555555',
  },
];

const TREATMENT_CARDS = [
  {
    title: 'Código de barras + Vitaminas',
    description: '1 vial de ácido hialurónico + vitaminas',
    detail:
      'El tratamiento de código de barras consiste en tratar mediante microinyecciones de ácido hialurónico las arrugas verticales que aparecen alrededor de la boca, justo encima del labio superior. El ácido hialurónico es un componente presente de forma natural en nuestra piel. Al inyectarlo conseguimos atraer a las moléculas de agua aportando más volumen y suavizando las líneas verticales de los labios.   Además, al ser un componente natural se reabsorbe durante los 6 - 12 meses posteriores a la realización del tratamiento.',
  },
  {
    title: 'Peeling Químico Medio',
    description: '2 sesiones',
    detail:
      'El peeling químico es un tratamiento estético no invasivo que utiliza una solución química para exfoliar las capas superiores de la piel y promover su renovación. Con este tratamiento conseguimos mejorar la textura, la tonalidad y la apariencia general de la piel.   En HolaGlow ofrecemos tres tipos de peelings químicos: Básico, Medio y profundo. Peeling básico: Bye acné! Al aplicar este peeling nos focalizamos en la parte más superficial de la piel. Conseguimos reducir el acné y los puntos negros, así cómo reducir las manchas y cicatrices generadas por el acné, luciendo una piel lisa, luminosa y rejuvenecida.  ',
  },
  {
    title: 'Revitalización facial: Mesoterapia Profunda',
    description: '1 sesión de mesoterapia profunda',
    detail:
      'La mesoterapia facial es un tratamiento estético que consiste en aplicar mediante microinyecciones subcutáneas pequeñas dosis de vitaminas y ácido hialurónico, así, conseguimos una mejor apariencia y salud de la piel. El cóctel de vitaminas y ácido hialurónico nos permite nutrir e hidratar la piel, promover la producción de colágeno y elastina, consiguiendo una piel rejuvenecida.   Además, al estimular la piel podemos conseguir reducir la apariencia de arrugas, líneas finas,  reducción de manchas y decoloraciones. ',
  },
  {
    title: 'Aumento de labios',
    description: '1 vial de ácido hialurónico',
    detail:
      'El aumento de labios es un tratamiento estético cada vez más frecuente que consiste en aumentar, perfilar o hidratar tus labios mediante microinyecciones de ácido hialurónico. El ácido hialurónico es un componente presente de forma natural en nuestro organismo. Al inyectarlo en los labios atrae las moléculas de agua aportando más volumen a la zona. Al ser un componente natural este se reabsorbe durante los 6 - 12 meses posteriores a su aplicación.',
  },
  {
    title: 'Código de barras + Vitaminas',
    description: '1 vial de ácido hialurónico + vitaminas',
    detail:
      'El tratamiento de código de barras consiste en tratar mediante microinyecciones de ácido hialurónico las arrugas verticales que aparecen alrededor de la boca, justo encima del labio superior. El ácido hialurónico es un componente presente de forma natural en nuestra piel. Al inyectarlo conseguimos atraer a las moléculas de agua aportando más volumen y suavizando las líneas verticales de los labios.   Además, al ser un componente natural se reabsorbe durante los 6 - 12 meses posteriores a la realización del tratamiento.',
  },
];

export default function Treatments() {
  return (
    <div className="bg-[#EFE8E2]/50">
      <Container className="py-12">
        <Text className="text-[64px] leading-[72px] font-bold mb-12 max-w-[75%]">
          Resultados irresistibles{' '}
          <Underlined color={HOLAGLOW_COLORS['lime']}>sin cirugía</Underlined>
        </Text>
        <ul className="flex gap-3">
          {TREATMENT_TYPES.map(treatment => {
            return (
              <li
                key={treatment.name}
                className="inline-block rounded-full p-1 pr-4 bg-white"
              >
                <Flex layout="row-left">
                  <SvgDiamond
                    height={35}
                    width={35}
                    fill={treatment.color}
                    className="mr-2 border rounded-full p-1"
                    style={{ borderColor: treatment.color }}
                  />
                  <Text size="sm">{treatment.name}</Text>
                </Flex>
              </li>
            );
          })}
        </ul>

        <ul className="flex">
          <li>
            {TREATMENT_CARDS.map(card => (
              <Flex key={card.title} layout="col-left">
                <div className="relative aspect-square">
                  <Image
                    src="/images/fakeImages/Home/prejuiciosValue.png"
                    alt="test"
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
              </Flex>
            ))}
          </li>
        </ul>
      </Container>
    </div>
  );
}
