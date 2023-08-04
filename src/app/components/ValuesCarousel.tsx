import { Text } from 'components/Texts';

const VALUES = [
  { name: 'Tus reglas' },
  { name: 'Sin Cirugía' },
  { name: 'Resultados Reales' },
  { name: 'Tu brillo' },
  { name: 'Equipo médico experto' },
  { name: 'Tus reglas' },
  { name: 'Sin Cirugía' },
  { name: 'Resultados Reales' },
];

export default function ValuesCarousel() {
  return (
    <ul className="bg-hg-lime w-full mb-12 h-[42px] overflow-hidden">
      {VALUES.map(value => (
        <li className="inline-block py-2 px-6" key={value.name}>
          <Text size="xl">{value.name}</Text>
        </li>
      ))}
    </ul>
  );
}
