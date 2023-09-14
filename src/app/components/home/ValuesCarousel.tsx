import { Text } from 'designSystem/Texts/Texts';

const VALUES = [
  'Tus reglas',
  'Sin Cirugía',
  'Resultados Reales',
  'Tu brillo',
  'Equipo médico experto',
  'Tus reglas',
  'Sin Cirugía',
];

// VALUES * 2
const repeatedValues = Array(2).fill(VALUES).flat();

export default function ValuesCarousel() {
  return (
    <div className="bg-hg-primary w-full overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden inline-block animate-horizontalScroll">
        <ul className="inline-block">
          {repeatedValues.map(value => (
            <li className="inline-block pt-2 pb-1 px-6" key={value}>
              <Text size="lg" className="font-medium">
                {value}
              </Text>
            </li>
          ))}
        </ul>
        <ul className="inline-block">
          {repeatedValues.map(value => (
            <li className="inline-block pt-2 pb-1 px-6" key={value}>
              <Text size="lg" className="font-medium">
                {value}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
