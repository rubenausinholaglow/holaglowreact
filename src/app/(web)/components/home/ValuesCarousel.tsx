import { Text } from 'designSystem/Texts/Texts';

const VALUES = [
  'Tratamientos personalizados',
  'Sin cirugía',
  'Resultados Naturales',
  'Cuidado de la piel',
  'Wellaging',
];

// VALUES * 2
const repeatedValues = Array(2).fill(VALUES).flat();

export default function ValuesCarousel() {
  return (
    <div className="bg-hg-secondary100 w-full overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden inline-block animate-horizontalScroll">
        <ul className="inline-block">
          {repeatedValues.map((value, index) => (
            <li className="inline-block pt-4 pb-2 px-6" key={value + index}>
              <Text disableAnimation size="lg" className="font-medium">
                {value}
              </Text>
            </li>
          ))}
        </ul>
        <ul className="inline-block">
          {repeatedValues.map((value, index) => (
            <li className="inline-block pt-4 pb-2 px-6" key={value + index}>
              <Text disableAnimation size="lg" className="font-medium">
                {value}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
