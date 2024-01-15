import resolveConfig from 'tailwindcss/resolveConfig';

// @ts-ignore
import tailwindConfig from '../../../tailwind.derma.config';

const fullTailwindConfig = resolveConfig(tailwindConfig);

const hgColors: any = fullTailwindConfig?.theme?.colors?.hg || {};

export const DERMA_COLORS = hgColors;
