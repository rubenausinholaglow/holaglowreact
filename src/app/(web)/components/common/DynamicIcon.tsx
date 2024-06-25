import * as categoryIcons from 'app/icons/categoryIcons';
import * as olderIcons from 'app/icons/Icons';
import * as defaultIcons from 'app/icons/IconsDs';
import * as serviceIcons from 'app/icons/serviceIcons';
import * as suggestionIcons from 'app/icons/suggestionIcons';

export default function DynamicIcon({
  name = 'SvgCross',
  family = 'default',
  height = 24,
  width = 24,
  className = '',
}: {
  name?: string;
  family?: 'default' | 'older' | 'suggestion' | 'service' | 'category';
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
    case 'older':
      iconComponentName = name;
      IconComponent = (olderIcons as any)[iconComponentName] || null;
      break;
    default:
      break;
  }

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} height={height} width={width} />;
}
