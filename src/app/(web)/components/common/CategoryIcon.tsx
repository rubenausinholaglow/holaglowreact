import Image from 'next/image';

const CATEGORY_ICONS: any = {
  Relleno: {
    src: 'rellenos.svg',
  },
  'Calidad Piel': {
    src: 'calidad-piel.svg',
  },
  Arrugas: {
    src: 'arrugas.svg',
  },
  'Caida del pelo': {
    src: 'caida-pelo.svg',
  },
  Lifting: {
    src: 'lifting.svg',
  },
  Otros: {
    src: 'otros.svg',
  },
  Médico: {
    src: 'otros.svg',
  },
  Packs: {
    src: 'Pack.svg',
  },
};

export default function CategoryIcon({
  category,
  className = '',
}: {
  category: string;
  className?: string;
}) {
  if (!CATEGORY_ICONS[category]?.src) {
    return <></>;
  }

  return (
    <Image
      src={`/images/filters/categories/${CATEGORY_ICONS[category].src}`}
      width={33}
      height={33}
      alt={category}
      className="shrink-0 mr-2"
    />
  );
}
