import { SVGProps } from 'react';
import * as dsIcon from 'icons/IconsDs';
import * as suggestionIcons from 'icons/suggestionIcons';

export default function DynamicIcon({
  name = 'SvgCross',
  family = 'default',
  className = '',
}: {
  name: string;
  family?: 'default' | 'suggestions';
  className?: string;
}) {
  const iconComponentName = name;
  const iconFamily = family === 'suggestions' ? suggestionIcons : dsIcon;
  const IconComponent = (iconFamily as any)[iconComponentName] || null;

  if (!IconComponent) {
    return <></>;
  }

  return <IconComponent className={className} />;
}
