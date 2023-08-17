import resolveConfig from 'tailwindcss/resolveConfig';

// @ts-ignore
import tailwindConfig from '../../../../tailwind.config';

const fullTailwindConfig = resolveConfig(tailwindConfig);

const hgColors: any = fullTailwindConfig?.theme?.colors?.hg || {};

export const HOLAGLOW_COLORS = hgColors;
