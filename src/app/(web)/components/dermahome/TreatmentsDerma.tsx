import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const TREATMENTS = [
  {
    name: 'Acné',
    imgUrl: '/images/derma/home/pains/acne.jpg',
  },
  {
    name: 'Melasma',
    imgUrl: '/images/derma/home/pains/melasma.jpg',
  },
  {
    name: 'Rosácea',
    imgUrl: '/images/derma/home/pains/rosacea.jpg',
  },
  {
    name: 'Calidad de piel',
    imgUrl: '/images/derma/home/pains/calidadPiel.jpg',
  },
];

export default function TreatmentsDerma() {
  return (
    <div className="bg-derma-secondary300/70 pb-12 overflow-hidden">
      <Container className="pt-12 pb-4 overflow-hidden">
        <Title size="xl" className="mb-4 text-derma-tertiary font-thin">
          Soluciones para cada tipo de piel
        </Title>

        <ul className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-4 md:gap-6 text-derma-tertiaryDark">
          {TREATMENTS.map(treatment => (
            <li
              key={treatment.name}
              className="p-4 md:py-6 rounded-2xl bg-derma-secondary500"
            >
              <Image
                src={treatment.imgUrl}
                alt={treatment.name}
                height={500}
                width={500}
                className="rounded-xl"
              />
              <Text className="text-center md:text-lg">{treatment.name}</Text>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
