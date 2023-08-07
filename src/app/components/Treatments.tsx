import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Text, Underlined } from 'components/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { HOLAGLOW_COLORS } from 'utils/colors';

import TreatmentCard from './TreatmentCard';
import TreatmentCarousel from './TreatmentCarousel';

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

export default async function Treatments() {
  const treatments: Product[] = await ProductService.getAllProducts();

  let filteredTreatments: Product[] = [];

  if (!isEmpty(treatments)) {
    filteredTreatments = treatments.slice(0, 6);
  }

  if (isEmpty(treatments)) {
    return <></>;
  }

  return (
    <div className="bg-[#EFE8E2]/50 overflow-hidden">
      <Container className="py-12">
        <Text className="text-[64px] leading-[72px] font-bold mb-12 max-w-[75%]">
          Resultados irresistibles{' '}
          <Underlined color={HOLAGLOW_COLORS['lime']}>sin cirugía</Underlined>
        </Text>
        <ul className="flex gap-3 mb-12">
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

        {/*         <ul className="flex flex-row gap-10">
          {filteredTreatments.map(treatment => (
            <li key={treatment.id}>
              <TreatmentCard treatment={treatment} />
            </li>
          ))}
        </ul> */}

        <TreatmentCarousel treatments={filteredTreatments} />
      </Container>
    </div>
  );
}
