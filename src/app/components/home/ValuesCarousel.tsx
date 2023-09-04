import { Text } from 'designSystem/Texts/Texts';

const VALUES = [
  { name: 'Tus reglas' },
  { name: 'Sin Cirugía' },
  { name: 'Resultados Reales' },
  { name: 'Tu brillo' },
  { name: 'Equipo médico experto' },
  { name: 'Tus reglas' },
  { name: 'Sin Cirugía' },
];

export default function ValuesCarousel() {
  return (
    <div className="bg-hg-lime w-full overflow-hidden">
      <div className="whitespace-nowrap overflow-hidden inline-block animate-horizontalScroll">
        <ul className="inline-block">
          {VALUES.map(value => (
            <li className="inline-block pt-2 pb-1 px-6" key={value.name}>
              <Text size="lg" className="font-medium">
                {value.name}
              </Text>
            </li>
          ))}
        </ul>
        <ul className="inline-block">
          {VALUES.map(value => (
            <li className="inline-block pt-2 pb-1 px-6" key={value.name}>
              <Text size="lg" className="font-medium">
                {value.name}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*     <ul className="bg-hg-lime w-full mb-12 text-center">
      {VALUES.map(value => (
        <li className="inline-block py-3 px-6" key={value.name}>
          <Text size="lg" className="font-medium">
            {value.name}
          </Text>
        </li>
      ))}
    </ul> */
