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
    <ul className="bg-hg-lime w-full mb-12 text-center">
      {VALUES.map(value => (
        <li className="inline-block py-3 px-6" key={value.name}>
          <Text size="lg" className="font-medium">
            {value.name}
          </Text>
        </li>
      ))}
    </ul>
  );
}
