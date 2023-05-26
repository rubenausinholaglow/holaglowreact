import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const fullTailwindConfig = resolveConfig(tailwindConfig);
const hgColors = fullTailwindConfig.theme.colors.hg;

export const HOLAGLOW_COLORS: any = {
  'hg-500': hgColors[500],
  'hg-400': hgColors[400],
  'hg-300': hgColors[300],
  'hg-200': hgColors[200],
  'hg-100': hgColors[100],
};
