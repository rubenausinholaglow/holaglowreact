import { HOLAGLOW_COLORS } from 'app/utils/colors';
import * as icon from 'icons/categories';
import { twMerge } from 'tailwind-merge';

const CATEGORY_ICONS: any = {
  Relleno: {
    name: 'Relleno',
    color: HOLAGLOW_COLORS['turquoise'],
  },
  'Calidad Piel': {
    name: 'CalidadPiel',
    color: HOLAGLOW_COLORS['tertiary'],
  },
  Arrugas: {
    name: 'Arrugas',
    color: HOLAGLOW_COLORS['orange'],
  },
  'Caida del pelo': {
    name: 'CaidaPelo',
    color: HOLAGLOW_COLORS['magenta'],
  },
  Lifting: {
    name: 'Lifting',
    color: HOLAGLOW_COLORS['pink'],
  },
  Otros: {
    name: 'Otros',
    color: HOLAGLOW_COLORS['black400'],
  },
};

export default function CategoryIcon({
  category,
  className = '',
  hasBackground = false,
}: {
  category: string;
  className?: string;
  hasBackground?: boolean;
}) {
  const iconComponentName = `Svg${CATEGORY_ICONS[category]?.name}`;

  if (!CATEGORY_ICONS[category]?.name) {
    return <></>;
  }

  const IconComponent = (icon as any)[iconComponentName] || null;
  const borderColorStyle = `${CATEGORY_ICONS[category].color}`;

  console.log(borderColorStyle);

  const backgroundColorStyle = `${
    !hasBackground ? '#ffffff' : `${CATEGORY_ICONS[category].color}33`
  }`;

  console.log(borderColorStyle, backgroundColorStyle);

  return (
    <IconComponent
      height={32}
      width={32}
      fill={CATEGORY_ICONS[category].color}
      className={`rounded-full bg-hg-white p-1 border ${className}`}
      style={{
        borderColor: borderColorStyle,
        backgroundColor: backgroundColorStyle,
      }}
    />
  );
}
