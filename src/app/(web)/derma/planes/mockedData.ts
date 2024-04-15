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
    imgSrc: '/images/derma/upselling/rutinaFacial.png',
    modalImgSrc: '/images/derma/upselling/rutinaFacial.png',
    name: 'Descubre más sobre tu rutina personalizada',
    price: '129€',
    discountedPrice: '129€',
    cta: 'Comprar tu rutina',
    bullets: [
      'Potencia los resultados de tu crema personalizada',
      'Tres productos seleccionados por dermatólogos estéticos',
      'Envío gratis (de 3 a 5 días naturales)',
    ],
    id: 2,
  },
];

export const DERMA_PRODUCTS = [
  {
    title: 'Espuma limpiadora',
    toggle: 'Mantén tu piel limpia para mejorar el efecto de la rutina',
    img: '/images/derma/products/espumaLimpiadora.png',
    subTitle: '150ml',
    text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    info: 'Activos principales: Ácido glicólico 2%, avena 2%, manzanilla 2%, base foam de limpieza.',
    id: '7905398d-d1e8-4dc6-aeb3-0a717cda7b86',
    order: 2,
  },
  {
    title: 'Protector solar 50+',
    toggle: 'Protege tu piel para prevenir el envejecimiento prematuro',
    img: '/images/derma/products/protectorSolar.png',
    subTitle: '50ml',
    text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    info: 'Activos principales: Ácido hialurónico, colágeno natural, filtros solares en base de emulsión sin grasa.',
    id: 'f093662a-2fd7-444e-92ee-862e067533b5',
    order: 3,
  },
  {
    title: 'Crema de día específica',
    toggle: 'Crema elegida específicamente por tu médico',
    img: '/images/derma/products/cremaDeDia.png',
    subTitle: '50ml',
    text: 'Crema elegida por tu médico específicamente para tus necesidades. Incluye la aplicación de esta crema en tu rutina de día para conseguir tus objetivos.',
    info: '',
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
    order: 4,
  },
  {
    title: 'Crema personalizada',
    img: '/images/derma/products/cremaFormulada.png',
    toggle: 'Pídela en tu farmacia con la receta que te enviaremos',
    subTitle: '',
    text: 'Te enviamos la receta de tu crema facial formulada. Preséntala en tu farmacia más cercana para que la elaboren según las indicaciones del médico y disfrutar de una crema diseñada exclusivamente para ti con ingredientes testados médicamente.',
    info: '',
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
    order: 1,
  },
];

export const DERMA_APPOINTMENT_IMAGE = [
  {
    // consulta online
    ids: ['2ee9da6f-4fad-42fc-b717-0b67d49ef0cf'],
    imgSrc: '/images/derma/upselling/packDermaJosep.png',
  },
  {
    // revision online
    ids: ['7f01ff68-eb9c-4b9b-83b8-efaec37e49e7'],
    imgSrc: '/images/derma/upselling/packDermaJosep.png',
  },
  {
    // rutina facial
    ids: DERMA_TYPES_IDS,
    imgSrc: '/images/derma/upselling/rutinaFacial.png',
  },
  {
    // rutina facial + seguimiento
    ids: DERMA_BUNDLE_TYPES_IDS,
    imgSrc: '/images/derma/upselling/packDermaModal.png',
  },
];

export const SUBSCRIPTIONS = [
  {
    title: 'Suscripción trimestral',
    subtitle: 'Tu rutina personalizada con seguimiento médico mensual',
    imgSrc: '/images/derma/landingPrecios/rutinaDoctorHolaglow.png',
    bgColor: 'bg-white',
    tag: {
      text: {
        isMobile: '+ popular',
        isDesktop: 'El más popular',
      },
      styles:
        'bg-hg-primary rounded-full px-3 py-1.5 md:py-2 inline-block ml-auto text-xs md:text-sm text-derma-primary font-semibold',
    },
    price: {
      value: '75 €',
      subtitle: 'Pago cada 3 meses',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada cada 3 meses',
        isEnabled: true,
      },
      {
        icon: 'SvgCalendarSearch',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: true,
      },
      {
        icon: 'SvgRefreshSquare',
        text: 'Ajuste del tratamiento según evolución',
        isEnabled: true,
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
        isEnabled: true,
      },
    ],
  },
  {
    title: 'Compra única',
    subtitle: 'Tu rutina personalizada para 3 meses de tratamiento',
    imgSrc: '/images/derma/landingPrecios/rutinaHolaglow.png',
    bgColor: 'bg-white',
    tag: {},
    price: {
      value: '99 €',
      subtitle: 'En un solo pago',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada de 3 meses',
        isEnabled: true,
      },
      {
        icon: 'SvgCross',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: false,
      },
      {
        icon: 'SvgCross',
        text: 'Ajuste del tratamiento según evolución',
        isEnabled: false,
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
        isEnabled: true,
      },
    ],
  },
  {
    title: 'Sólo receta',
    subtitle: 'Receta de tu crema personalizada para pedirla en tu farmacia',
    imgSrc: '/images/derma/landingPrecios/receta.svg',
    bgColor: 'bg-white',
    tag: {},
    price: {
      value: '49 €',
      subtitle: 'En un solo pago',
    },
    bullets: [
      {
        icon: 'SvgReceipt2',
        text: 'Receta de tu crema personalizada',
        isEnabled: true,
      },
      {
        icon: 'SvgCross',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: false,
      },
      {
        icon: 'SvgCross',
        text: 'Ajuste del tratamiento según evolución',
        isEnabled: false,
      },
      {
        icon: 'SvgVerify',
        text: 'Garantía de resultados',
        isEnabled: true,
      },
    ],
  },
];
