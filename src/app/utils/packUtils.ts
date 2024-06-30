const AHProducts: string[] = [
  '2112', // relleno lineas marioneta
  '2113', // volumen y perfilado de cejas
  '674', // aumento de labios
  '847', // Proyección de pómulos
  '848', // Surco nasogeniano
  '849', // Código de barras
  '852', // Proyección de mentón
  '853', // Proyección de mandíbula
  '857', // Sonrisa gingival
];

const AHProduct1000: string[] = [
  '855', // Rinomodelación
  '854', // Relleno de ojeras
];

const BabyBotox: string[] = ['850', '856']; // 25 uds. arrugas entrecejo y patas de gallo / prevención de arrugas

const Botox: string[] = ['851', '867']; // 50 uds. frente, arrugas entrecejo y patas de gallo / Bruxismo

const Hydrafacial: string[] = ['5519', '2147'];

interface ProductPackSchedule {
  name: string;
  packId: string;
  productId: string[];
}

export const PacksConfigured: ProductPackSchedule[] = [
  {
    name: 'Armonización Facial',
    packId: '973',
    productId: AHProducts,
  },
  {
    name: 'Pack Prevención',
    packId: '970',
    productId: [...AHProducts, ...BabyBotox],
  },
  {
    name: 'Pack Wellaging Basic',
    packId: '972',
    productId: [...AHProducts, ...Botox],
  },
  {
    name: 'Pack Wellaging Esencial',
    packId: '971',
    productId: [...AHProducts, ...Botox],
  },
  {
    name: 'Pack Lifting',
    packId: '5466',
    productId: [...AHProducts, '2015'],
  },
  {
    name: 'Pack Wellaging Plus',
    packId: '974',
    productId: [...AHProducts, ...Botox, ...AHProduct1000],
  },
  {
    name: 'Full Face',
    packId: '5465',
    productId: [...AHProducts, ...Botox, ...AHProduct1000],
  },
  {
    name: 'Pack Cóctel',
    packId: '5487',
    productId: [...AHProducts, ...Botox, ...Hydrafacial],
  },
  {
    name: 'Pack Banquete',
    packId: '5492',
    productId: [
      ...AHProducts,
      ...Botox,
      ...Hydrafacial,
      ...AHProduct1000,
      '925',
      '2109',
    ],
  },
  {
    name: 'Pack Baile',
    packId: '5497',
    productId: [
      ...AHProducts,
      ...Botox,
      ...Hydrafacial,
      ...AHProduct1000,
      '925',
      '2109',
    ],
  },
  {
    name: 'Pack Mirada',
    packId: '5546',
    productId: [...AHProducts, ...Botox, '854'],
  },
  {
    name: 'Armonización Facial Basic',
    packId: '5551',
    productId: [...AHProducts],
  },
];

export function getPackMessage(services: string[]) {
  if (!services.includes('855') && !services.includes('854')) {
    return '*No incluye los tratamientos de rinomodelación ni relleno de ojeras.';
  }

  if (!services.includes('855')) {
    return ' *No incluye el tratamiento de rinomodelación.';
  }

  // cal configurar tots els productes? o directament si no tenen config podem retornar el missatge de que no tenen ni rino ni relleno de ojeras
  return '';
}
