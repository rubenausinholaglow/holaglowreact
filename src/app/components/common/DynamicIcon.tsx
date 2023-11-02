import * as categoryIcons from 'icons/categoryIcons';
import * as defaultIcons from 'icons/IconsDs';
import * as serviceIcons from 'icons/serviceIcons';
import * as suggestionIcons from 'icons/suggestionIcons';

export default function DynamicIcon({
  name = 'SvgCross',
  family = 'default',
  height = 24,
  width = 24,
  className = '',
}: {
  name?: string;
  family?: 'default' | 'suggestion' | 'service' | 'category';
  height?: number;
  width?: number;
  className?: string;
}) {
  let iconComponentName: string;
  let IconComponent: React.ComponentType<any> | null = null;

  switch (family) {
    case 'default':
      iconComponentName = name;
      IconComponent = (defaultIcons as any)[iconComponentName] || null;
      break;
    case 'suggestion':
      iconComponentName = name;
      IconComponent = (suggestionIcons as any)[iconComponentName] || null;
      break;
    case 'service':
      iconComponentName = name;
      IconComponent = (serviceIcons as any)[iconComponentName] || null;
      break;
    case 'category':
      iconComponentName = name;
      IconComponent = (categoryIcons as any)[iconComponentName] || null;
      break;
    default:
      break;
  }

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} height={height} width={width} />;
}
