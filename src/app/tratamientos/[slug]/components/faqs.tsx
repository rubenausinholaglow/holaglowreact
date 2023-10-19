export interface FAQ = {
  title: string;
  description: string;
};
export const faqItems: Record<string, FAQ[]> = {
  '0.5-vial-inyectable-antiarrugas': [
    {
      title: '¿Podré ver los resultados de manera instantánea?',
      description:
        'Los resultados son inmediatos y visibles desde el primer momento, aunque pueden estar condicionados por la posible inflamación. El resultado óptimo del tratamiento se verá a las tres semanas de la aplicación.',
    },
    {
      title: '¿Cuánto tiempo duran los resultados del ácido hialurónico?',
      description:
        'En Holaglow defendemos una medicina estética que cuida y, para ello, la profesionalidad y la empatía son fundamentales. Todos nuestros doctores comparten el mismo compromiso: ponerse en tu piel, de manera literal y metafóricamente.',
    },
  ],
  'hydrafacial-deluxe': [
    {
      title: '¿La aplicación de ácido hialurónico es dolorosa?',
      description:
        'En Holaglow defendemos una medicina estética que cuida y, para ello, la profesionalidad y la empatía son fundamentales. Todos nuestros doctores comparten el mismo compromiso: ponerse en tu piel, de manera literal y metafóricamente.',
    },
    {
      title: '¿Qué efectos secundarios puede tener el ácido hialurónico?',
      description:
        'En Holaglow defendemos una medicina estética que cuida y, para ello, la profesionalidad y la empatía son fundamentales. Todos nuestros doctores comparten el mismo compromiso: ponerse en tu piel, de manera literal y metafóricamente.',
    },
  ],
};
