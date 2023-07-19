import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const fullTailwindConfig = resolveConfig(tailwindConfig);

const hgColors: any = fullTailwindConfig?.theme?.colors?.hg || {};

console.log(hgColors);

export const HOLAGLOW_COLORS = hgColors;
