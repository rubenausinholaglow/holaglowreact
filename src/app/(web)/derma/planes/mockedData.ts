export const DERMA_TYPES = ['Antiaging', 'Acné', 'Rosácea', 'Manchas'];
export const DERMA_TYPES_IDS = [
  'eba8be72-269d-4b02-8e08-76f96ccd2fd9',
  'cb4afcbd-ae49-4e5e-839f-9d854bf498c8',
  'f0b521ba-d2dd-4254-8f30-e47c7f8c87b2',
  '2aecd538-4012-4dab-9499-ed37b0cfa28f',
];
export const DERMA_BUNDLE_TYPES_IDS = [
  '3a87dc89-a933-4afa-bb2d-74822c9f8674',
  '95979be2-f753-4030-a2b7-e7f876de36ea',
  '74a587fb-32df-45c0-ba1e-f6b57d2442ce',
  '351abfc1-d6b7-4141-9c7c-2ade9d8aca8a',
];

export const DERMA_ROUTINES = [
  {
    imgSrc: '/images/derma/upselling/seguimiento.png',
    modalImgSrc: '/images/derma/upselling/seguimiento.png',
    name: 'Revisión online con tu dermatólogo estético',
    price: '49€',
    discountedPrice: '59€',
    cta: 'Reservar cita',
    bullets: [
      'Evalúa la tolerancia de tu piel a la crema personalizada',
      'Valora los resultados obtenidos y define próximos pasos',
      'Prevén efectos indeseados, como sequedad o irritación',
    ],
    id: 1,
  },
  {
    imgSrc: '/images/derma/upselling/rutinaFacial.png',
    modalImgSrc: '/images/derma/upselling/rutinaFacial.png',
    name: 'Rutina facial',
    price: '129€',
    discountedPrice: '129€',
    cta: 'Comprar tu rutina',
    bullets: [
      'Potencia los resultados de tu crema personalizada',
      'Cuatro productos seleccionados por dermatólogos estéticos',
      'Envío gratis (de 3 a 5 días naturales)',
    ],
    id: 2,
  },
  {
    imgSrc: '/images/derma/upselling/packDerma.png',
    modalImgSrc: '/images/derma/upselling/packDermaModal.png',
    name: 'Programa completo: Rutina facial + Revisión online',
    price: '139€',
    discountedPrice: '198€',
    cta: 'Lo quiero todo',
    bullets: [
      'Potencia los resultados de tu crema personalizada',
      'Cuatro productos seleccionados por dermatólogos',
      'Envío gratis (de 3 a 5 días naturales)',
      'Valora los resultados obtenidos y define próximos pasos con tu dermatólogo',
    ],
    id: 3,
  },
];

export const DERMA_PRODUCTS = [
  {
    title: 'Espuma limpiadora',
    subTitle: '150ml',
    text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    info: 'Activos principales: Ácido glicólico 2%, avena 2%, manzanilla 2%, base foam de limpieza.',
    id: '7905398d-d1e8-4dc6-aeb3-0a717cda7b86',
  },
  {
    title: 'Protector solar 50+',
    subTitle: '50ml',
    text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    info: 'Activos principales: Ácido hialurónico, colágeno natural, filtros solares en base de emulsión sin grasa.',
    id: 'f093662a-2fd7-444e-92ee-862e067533b5',
  },
  {
    title: 'Crema personalizada',
    subTitle: '50ml',
    text: 'Crema elegida por tu médico específicamente para tus necesidades. Incluye la aplicación de esta crema en tu rutina de día para conseguir tus objetivos.',
    info: '',
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
  },
  {
    title: 'Receta de crema formulada',
    subTitle: '',
    text: 'Te enviamos la receta de tu crema facial formulada. Preséntala en tu farmacia más cercana para que la elaboren según las indicaciones del médico y disfrutar de una crema diseñada exclusivamente para ti con ingredientes testados médicamente.',
    info: '',
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
  },
];

export const DERMA_APPOINTMENT_IMAGE = [
  {
    // consulta online
    ids: ['2ee9da6f-4fad-42fc-b717-0b67d49ef0cf'],
    imgSrc: DERMA_ROUTINES[0].modalImgSrc,
  },
  {
    // revision online
    ids: ['7f01ff68-eb9c-4b9b-83b8-efaec37e49e7'],
    imgSrc: DERMA_ROUTINES[0].modalImgSrc,
  },
  {
    // rutina facial
    ids: DERMA_TYPES_IDS,
    imgSrc: DERMA_ROUTINES[1].modalImgSrc,
  },
  {
    // rutina facial + seguimiento
    ids: DERMA_BUNDLE_TYPES_IDS,
    imgSrc: DERMA_ROUTINES[2].modalImgSrc,
  },
];
