import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import ProductCarousel from 'app/components/product/ProductCarousel';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgDiamond } from 'icons/Icons';
import { isEmpty } from 'lodash';

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

export default async function HomeProducts() {
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
        <Title size="2xl" className="font-bold mb-12 max-w-[75%]">
          Resultados irresistibles{' '}
          <Underlined color={HOLAGLOW_COLORS['lime']}>sin cirugía</Underlined>
        </Title>
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

        <ProductCarousel treatments={filteredTreatments} />
      </Container>
    </div>
  );
}
