import { SVGProps } from 'react';
import * as dsIcon from 'icons/IconsDs';
import * as suggestionIcons from 'icons/suggestionIcons';

export default function DynamicIcon({
  name = 'SvgCross',
  family = 'default',
  height = 24,
  width = 24,
  className = '',
}: {
  name: string;
  family?: 'default' | 'suggestions';
  height?: number;
  width?: number;
  className?: string;
}) {
  const iconComponentName = name;
  const iconFamily = family === 'suggestions' ? suggestionIcons : dsIcon;
  const IconComponent = (iconFamily as any)[iconComponentName] || null;

  if (!IconComponent) {
    return <></>;
  }

  return <IconComponent className={className} height={height} width={width} />;
}
