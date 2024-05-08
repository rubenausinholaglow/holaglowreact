import CheckHydration from '@utils/CheckHydration';
import { isMobileSSR, isTabletSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

const INGREDIENTS = [
  {
    name: 'Ácido azelaico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoAzelaico.jpg',
    concentration: '15-20%',
    tags: ['Melasma', 'Acné', 'Rosácea'],
    description:
      'El ácido azelaico es un principio activo con diversas propiedades. Tiene efectos antiinflamatorios, antibacterianos y previene la formación de puntos negros. Se utiliza con éxito desde hace años en el tratamiento del acné y la rosácea.',
  },
  {
    name: 'Vitamina A',
    imgSrc: '/images/derma/landingPrecios/ingredients/vitaminaA.jpg',
    concentration: '0,006-0,1%',
    tags: ['Melasma', 'Acné', 'Antiaging'],
    description:
      'La vitamina A es conocida por sus propiedades integrales para el cuidado de la piel. Pertenece al grupo de los retinoides y es especialmente eficaz para combatir las imperfecciones de la piel gracias a sus propiedades antiinflamatorias, comedolíticas y anticomedógenas.',
  },
  {
    name: 'Peróxido de benzoilo',
    imgSrc: '/images/derma/landingPrecios/ingredients/peroxidoDeBenzoilo.jpg',
    concentration: '2,5%',
    tags: ['Acné'],
    description:
      'El peróxido de benzoilo es un ingrediente activo utilizado en el tratamiento del acné. Después de aplicarse aumenta el oxígeno en las capas superiores de la piel y conduce a una reducción del número de bacterias responsables del acné.',
  },
  {
    name: 'Niacinamida',
    imgSrc: '/images/derma/landingPrecios/ingredients/niacinamida.jpg',
    concentration: '4%',
    tags: ['Melasma', 'Acné', 'Rosácea'],
    description:
      'También es conocida como vitamina B3 y tiene numerosos efectos positivos sobre la piel. Puede conducir a una mejora significativa en la apariencia de la piel, reduciendo los poros dilatados, igualando el tono desigual de la piel y reduciendo las líneas finas y las arrugas.',
  },
  {
    name: 'Clindamicina',
    imgSrc: '/images/derma/landingPrecios/ingredients/clindamicina.jpg',
    concentration: '1%',
    tags: ['Acné'],
    description:
      'La clindamicina es un antibiótico eficaz que se utiliza específicamente para tratar afecciones de la piel como el acné. Actúa suprimiendo el crecimiento de la bacteria Propionibacterium.',
  },
  {
    name: 'Eritromicina',
    imgSrc: '/images/derma/landingPrecios/ingredients/eritromicina.jpg',
    concentration: '2%',
    tags: ['Acné', 'Rosácea', 'Antiaging'],
    description:
      'Es un antibiótico que inhibe el crecimiento de bacterias en la piel y ayuda a reducir la inflamación. La eritromicina es particularmente útil para pacientes sensibles a otros tratamientos.',
  },
  {
    name: 'Metronidazol',
    imgSrc: '/images/derma/landingPrecios/ingredients/metronidazol.jpg',
    concentration: '0,75%',
    tags: ['Rosácea'],
    description:
      'Es un antibiótico con propiedades antibacterianas, antiinflamatorias y de vasoconstricción particularmente útiles para reducir el enrojecimiento y los vasos sanguíneos visibles.',
  },
  {
    name: 'Ivermectina',
    imgSrc: '/images/derma/landingPrecios/ingredients/ivermectina.jpg',
    concentration: '1%',
    tags: ['Rosácea'],
    description:
      'Es eficaz principalmente gracias a sus efectos antiinflamatorios y antiparasitarios. Actúa sobre la superpoblación de ácaros Demodex que vive naturalmente en la piel y que puede provocar reacciones inflamatorias en algunos pacientes con rosácea.',
  },
];

const COMPLEMENTS = [
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/espumaLimpiadora.png',
    name: 'Espuma limpiadora',
    volume: '150ml',
    description:
      'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    activePrinciples:
      'Ácido glicólico 2%, Avena 2%, Manzanilla 2%, Base foam de limpieza',
  },
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/protectorSolar.png',
    name: 'Protector solar 50+',
    volume: '50ml',
    description:
      'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    activePrinciples:
      'Ácido hialurónico, Colágeno natural, Filtros solares en base de emulsión sin grasa',
  },
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/crema.png',
    name: 'Crema de día específica',
    volume: '50ml',
    description:
      'Crema elegida por tu médico específicamente para tus necesidades. Incluye la aplicación de esta crema en tu rutina de día para conseguir tus objetivos.',
    activePrinciples: '',
  },
];

export default function IngredientsPrices() {
  const visibleComplements = isMobileSSR() ? 1 : isTabletSSR() ? 2 : 3;

  return (
    <div className="bg-derma-secondary300 py-4 pb-16">
      <Container className="mb-8">
        <Title size="2xl" className="text-derma-primary mb-4">
          Bases de un tratamiento efectivo
        </Title>
        <Text className="font-gtUltra font-light text-xldr mb-2">
          Crema facial personalizada
        </Text>
        <Text className="text-hg-black500">
          Tu crema personalizada llevará una combinación única de principios
          activos para tu piel seleccionados por tu médico.
        </Text>
      </Container>
      <FullWidthCarousel className="pb-8" isDerma>
        {INGREDIENTS.map(ingredient => (
          <Flex
            layout="col-left"
            className="w-full pr-6 gap-2"
            key={ingredient.name}
          >
            <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 mb-2 py-4 overflow-hidden">
              <Image
                alt={ingredient.name}
                src={ingredient.imgSrc}
                fill
                className="scale-110 object-contain"
              />
            </Flex>

            <Text className="text-lg font-semibold">{ingredient.name}</Text>
            <Text className="">
              Concentración{' '}
              <span className="font-semibold">{ingredient.concentration}</span>
            </Text>

            <ul className="flex gap-2">
              {ingredient.tags.map(tag => (
                <li
                  key={tag}
                  className="px-2 py-1 rounded-full bg-derma-primary100 text-derma-primary text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <Text className="text-sm text-hg-black500">
              {ingredient.description}
            </Text>
          </Flex>
        ))}
      </FullWidthCarousel>

      <Container>
        <Text className="font-gtUltra font-light text-xldr mb-2">
          Cremas complementarias
        </Text>
        <Text className="text-hg-black500 mb-8">
          Trabajan de manera conjunta con la crema personalizada para sacar el
          máximo partido de tu tratamiento.
        </Text>
      </Container>
      <Container className="px-0 md:px-4">
        <CheckHydration>
          <Carousel
            hasDots={isMobileSSR()}
            hasControls={
              !isMobileSSR() && COMPLEMENTS.length > visibleComplements
            }
            controlStyles="px-4"
            className="relative pb-12"
            isIntrinsicHeight
            visibleSlides={visibleComplements}
            infinite={false}
            sliderStyles="md:gap-10"
            isDerma
          >
            {COMPLEMENTS.map(complement => {
              return (
                <Flex
                  key={complement.name}
                  layout="col-left"
                  className="bg-white p-4 rounded-2xl h-full mr-4 ml-4 md:mr-0 md:ml-0 gap-4"
                >
                  <Image
                    src={complement.imgSrc}
                    height={392}
                    width={328}
                    alt={complement.name}
                    className="max-h-[196px] w-auto mx-auto mb-4"
                  />
                  <Text className="text-xl font-semibold">
                    {complement.name}
                  </Text>
                  <Text className="">{complement.volume}</Text>
                  <Text className="text-sm text-hg-black500">
                    {complement.description}
                  </Text>
                  {!isEmpty(complement.activePrinciples) && (
                    <Text className="p-4 bg-derma-primary/20 text-hg-black500 rounded-xl text-sm w-full">
                      <span className="font-semibold">
                        Activos principales:
                      </span>{' '}
                      {complement.activePrinciples}
                    </Text>
                  )}
                </Flex>
              );
            })}
          </Carousel>
        </CheckHydration>

        <Flex className="justify-center">
          <Button
            type="derma"
            size="xl"
            customStyles="px-16"
            href={ROUTES.derma.multistep.start}
            id="tmevent_derma_prices_cosmetics_button"
          >
            Empezar análisis de piel
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
