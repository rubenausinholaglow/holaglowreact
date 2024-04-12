import resolveConfig from 'tailwindcss/resolveConfig';

// @ts-ignore
import tailwindConfig from '../../../tailwind.config';

const fullTailwindConfig = resolveConfig(tailwindConfig);

const hgColors: any = fullTailwindConfig?.theme?.colors?.hg || {};
const dermaColors: any = fullTailwindConfig?.theme?.colors?.derma || {};

export const HOLAGLOW_COLORS = hgColors;
export const DERMA_COLORS = dermaColors;
