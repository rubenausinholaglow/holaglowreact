import { SVGProps } from 'react';
import * as Icons from 'icons/Icons';

interface DynamicIconProps {
  name: keyof typeof Icons;
}

const DynamicIcon: React.FC<DynamicIconProps & SVGProps<SVGSVGElement>> = ({
  name,
  ...props
}) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;