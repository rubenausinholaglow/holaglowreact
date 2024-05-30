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

export const DERMA_GENERIC_PRODUCTS = [
  {
    title: 'Espuma limpiadora',
    toggle: 'Mantén tu piel limpia para mejorar el efecto de la rutina',
    isNightRoutine: true,
    img: '/images/derma/landingPrecios/ingredients/espumaLimpiadora.png',
    carouselImg: [
      '/images/derma/products/espumaLimpiadora/espumaLimpiadora1.jpg',
      '/images/derma/products/espumaLimpiadora/espumaLimpiadora2.jpg',
      '/images/derma/products/espumaLimpiadora/espumaLimpiadora3.jpg',
      '/images/derma/products/espumaLimpiadora/espumaLimpiadora4.jpg',
    ],
    subTitle: '150ml',
    text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    info: 'Activos principales: Ácido glicólico 2%, avena 2%, manzanilla 2%, base foam de limpieza',
    benefits: [
      'Espuma dermoprotectora de limpieza para el cuidado diario de la piel',
      'Elimina impurezas y el exceso de grasa',
      'Deja la piel limpia y mate',
    ],
    useMethod: [
      'Aplicar una generosa cantidad en las manos y extender por el rostro húmedo durante 1 minuto',
      'Aclarar con agua abundante',
      'Uso externo',
    ],
    id: '7905398d-d1e8-4dc6-aeb3-0a717cda7b86',
  },
  {
    title: 'Crema de día',
    toggle: 'Crema de día preparada por tu médico',
    isNightRoutine: false,
    img: '/images/derma/landingPrecios/ingredients/crema.png',
    carouselImg: [
      '/images/derma/products/cremaDeDia/cremaDeDia1.jpg',
      '/images/derma/products/cremaDeDia/cremaDeDia2.jpg',
      '/images/derma/products/cremaDeDia/cremaDeDia3.jpg',
      '/images/derma/products/cremaDeDia/cremaDeDia4.jpg',
    ],
    subTitle: '50ml',
    text: 'Crema elegida por tu médico específicamente para tus necesidades. Incluye la aplicación de esta crema en tu rutina de día para conseguir tus objetivos',
    info: '',
    benefits: [
      'Crema de día específica para tus objetivos (melasma, rosácea, acné o antiarrugas)',
      'Elegida por tu médico para complementar tu tratamiento',
      'Actúa durante el día cuando no se puede aplicar la crema personalizada de noche',
    ],
    useMethod: [
      'Aplicar por las mañanas sobre la piel limpia con un suave masaje',
      'Evitar el contacto con mucosas',
      'Uso externo',
    ],
    customizedProps: [
      {
        pain: 0, //Acné
        text: 'Esta crema de día actúa sobre las causas del acné combinando activos que ayudan a controlar la proliferación bacteriana y generar un aspecto uniforme de la piel.',
        info: 'Activos principales: Cytobiol Iris A2, Ácido glicólico tamponado, Ácido salicílico, Manzanilla, Hamamelis, Caléndula, Ácido hialurónico y Rhamnosoft.',
        benefits: [
          'Hidrata y cuida la piel con tendencia acnéica',
          'Regula la proliferación bacteriana gracias a los ácidos glicólico y salicílico y sus activos naturales',
        ],
        useMethod: [
          'Aplicar sobre la piel limpia con un suave masaje para facilitar la completa absorción',
          'Suspender el uso si aparece irritación',
          'Evitar el contacto con mucosas',
        ],
      },
      {
        pain: 1, //Rosácea
        text: 'Esta crema de día actúa sobre el enrojecimiento e irritaciones leves en el rostro gracias a su efecto sobre la microbiota y el refuerzo de la barrera cutánea.',
        info: 'Activos principales: Aceite de árbol del té, Microsilver BG, Rhamnosoft, Aceite de germen de trigo, almendras y aguacate, Lípidos de moringa, Arnica, Ruscus, Ginkgo, Biloba, Consuelda, Caléndula, Aloe vera, Mirtilo, Regaliz, Alfa-Bisabolol.',
        benefits: [
          'Alivia calma y protege pieles sensibles',
          'Aporta activos necesarios para controlar la microbiota y mejora la barrera cutánea',
          'Hidrata, nutre y aporta bienestar a las pieles alteradas',
        ],
        useMethod: [
          'Aplicar por la mañana en todo el rostro',
          'Debido al empleo de una base natural, es posible que el producto presente distintas tonalidades',
          'Uso externo',
        ],
      },
      {
        pain: 2, //Melasma
        text: 'Esta crema de día actúa sobre las manchas faciales gracias a su efecto despigmentante.',
        info: 'Activos principales: Factor natural de hidratación, Isoflavonas de soja liposomadas, Moléculas señal derivadas de la leche activadas y estabilizadas, Glicerol, Lisado de bifidobacterias, Aloe vera, Activo de bellis perennis, Polipéptidos bioactivos (Citoquinas) y filtro solar de titanio.',
        benefits: [
          'Contiene activos cosméticos despigmentantes',
          'Actúa aclarando la mancha o melasma',
          'Bloquea la formación de melanina e impide la repigmentación',
        ],
        useMethod: [
          'Usar 1 o 2 veces como crema de día',
          'Aplicar en la cara con un suave masaje',
          'Repetir la aplicación en caso de exposición solar intensa',
          'Evitar el contacto con mucosas',
        ],
      },
      {
        pain: 3, //Antiaging
        text: 'Esta crema de día actúa sobre los principales signos visibles del envejecimiento en el rostro reduciendo la profundidad de las arrugas y las líneas de expresión.',
        info: 'Activos principales: Coenzima Q10, Matrixyl 3000, Isoflavonas liposomadas, Superóxido dismutasa, Bisabolol, Hamamelis, Aloe vera, Vitamina E, Amonio Glicirrinato.',
        benefits: [
          'Con los últimos y más eficaces activos antiedad',
          'Reduce arrugas, líneas de expresión, pequeñas manchas e imperfecciones',
          'Se observa su efecto regenerador del sustrato dérmico en la 1ª semana de uso',
        ],
        useMethod: [
          'Usar como crema de día',
          'Aplicar en la cara con un suave masaje',
          'Evitar el contacto con mucosas',
        ],
      },
    ],
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
  },
  {
    title: 'Protector solar 50+',
    toggle: 'Protege tu piel de los efectos de la radiación ultravioleta',
    isNightRoutine: false,
    img: '/images/derma/landingPrecios/ingredients/protectorSolar.png',
    carouselImg: [
      '/images/derma/products/protectorSolar/protectorSolar1.jpg',
      '/images/derma/products/protectorSolar/protectorSolar2.jpg',
      '/images/derma/products/protectorSolar/protectorSolar3.jpg',
      '/images/derma/products/protectorSolar/protectorSolar4.jpg',
    ],
    subTitle: '50ml',
    text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado',
    info: 'Activos principales: Ácido hialurónico, colágeno natural, filtros solares en base de emulsión sin grasa.',
    benefits: [
      'Protección solar diaria con hidratación y nutrición',
      'Mantiene los niveles óptimos de hidratación y cuidado de la piel en la exposición solar',
      'Aporta elasticidad y turgencia',
      'Acabado seco y tacto aterciopelado',
      'No contiene perfume, alérgenos y no comedogénico. ',
    ],
    useMethod: [
      'Aplicar cada vez que se precise hidratación y protección solar',
      'Aplicar cada 2 horas en caso de exposición solar intensa',
      'Evitar el contacto con los ojos',
    ],
    id: 'f093662a-2fd7-444e-92ee-862e067533b5',
  },
  {
    title: 'Crema formulada',
    img: '/images/derma/landingPrecios/ingredients/cremaFormulada.png',
    carouselImg: ['/images/derma/products/cremaFormulada/cremaFormulada.png'],
    toggle: 'Diseñada y elaborada exclusivamente para ti',
    isNightRoutine: false,
    subTitle: '50ml',
    text: 'Crema diseñada por el médico con los ingredientes activos que necesita tu piel y en su justa medida para lograr la mayor efectividad. Al ser personalizada, no la encontrarás en ningún otro sitio',
    info: '',
    benefits: [
      'Formulada por el médico para con los principios activos que necesita tu piel',
      'Ingredientes de alta calidad en la concentración justa para tus objetivos',
      'Mayor eficacia que las cremas genéricas',
    ],
    useMethod: [
      'Aplicar por la noche sobre la piel limpia con un suave masaje para facilitar la completa absorción',
      'Empezar aplicando una pequeña cantidad y aumentar progresivamente según las indicaciones del médico',
      'Evitar el contacto con mucosas',
    ],
    customizedProps: [
      {
        pain: 0, //acné
        text: 'Crema diseñada por el médico con los ingredientes activos que necesita tu piel y en su justa medida para lograr la mayor efectividad. Al ser personalizada, no la encontrarás en ningún otro sitio.',
        ingredients: [],
        info: '',
        benefits: [
          'Formulada por el médico para con los principios activos que necesita tu piel',
          'Ingredientes de alta calidad en la concentración justa para tus objetivos',
          'Mayor eficacia que las cremas genéricas',
        ],
        useMethod: [
          'Aplicar por la noche sobre la piel limpia con un suave masaje para facilitar la completa absorción',
          'Empezar aplicando una pequeña cantidad y aumentar progresivamente según las indicaciones del médico',
          'Evitar el contacto con mucosas',
        ],
      },

      {
        pain: 1, //Rosácea
        text: 'Crema diseñada por el médico con los ingredientes activos que necesita tu piel para reducir la rosácea. Al ser personalizada, no la encontrarás en ningún otro sitio.',
        ingredients: ['Niacinamida', 'Ácido azelaico'],
        info: '',
        benefits: [
          'Mayor efectividad que las cremas genéricas al ser personalizada y contener principios activos médicos',
          'Tiene efectos antiinflamatorios, antibacterianos y previene la formación de puntos negros',
          'También ayuda a igualar el tono desigual de la piel y ayuda a reducir las líneas finas y las arrugas.',
        ],
        useMethod: [
          'Aplicar por la noche sobre la piel limpia con un suave masaje para facilitar la completa absorción',
          'Empezar aplicando una pequeña cantidad y aumentar progresivamente según las indicaciones del médico',
          'Evitar el contacto con mucosas',
        ],
      },
      {
        pain: 2, //Melasma
        text: 'Crema diseñada por el médico con los ingredientes activos que necesita tu piel para reducir el melasma. Al ser personalizada, no la encontrarás en ningún otro sitio.',
        ingredients: [
          'Ácido retinoico',
          'Hidroquinona',
          'Vitamina C',
          'Vitamina E',
          'Ácido glicólico',
          'Ácido kójico',
        ],
        info: '',
        benefits: [
          'Mayor efectividad que las cremas genéricas al ser personalizada y contener principios activos médicos',
          'Efecto despigmentante para unificar el tono',
          'Deja una textura lisa y uniforme en la piel',
        ],
        useMethod: [
          'Aplicar por la noche sobre la piel limpia con un suave masaje para facilitar la completa absorción',
          'Empezar aplicando una pequeña cantidad y aumentar progresivamente según las indicaciones del médico',
          'Evitar el contacto con mucosas',
        ],
      },
      {
        pain: 3, //Antiaging
        text: 'Crema diseñada por el médico con los ingredientes activos que necesita tu piel para reducir los signos visibles del envejecimiento en el rostro. Al ser personalizada, no la encontrarás en ningún otro sitio.',
        ingredients: [
          'Ácido retinoico',
          'Nicotinamida',
          'Vitamina C',
          'Vitamina E',
          'Ácido glicólico',
        ],
        info: '',
        benefits: [
          'Mayor efectividad que las cremas genéricas al ser personalizada y contener principios activos médicos',
          'Produce una rápida renovación de las células',
          'Deja un tono uniforme en la piel y una textura lisa',
        ],
        useMethod: [
          'Aplicar por la noche sobre la piel limpia con un suave masaje para facilitar la completa absorción',
          'Empezar aplicando una pequeña cantidad y aumentar progresivamente según las indicaciones del médico',
          'Evitar el contacto con mucosas',
        ],
      },
    ],
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
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
  /*{
    title: 'Envío trimestral',
    id: '17c3b810-d810-45e0-b732-3283ea632d77',
    subtitle:
      'Tu rutina personalizada para 3 meses con seguimiento médico mensual',
    imgSrc: '/images/derma/landingPrecios/rutinaSeguimiento.png',
    bgColor: 'bg-white',
    tag: {},
    price: {
      value: '75 €',
      discount: '-25%',
      oldValue: 'PVP: 99 €',
      subtitle: 'Pago cada 3 meses',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina de 4 pasos para',
        isEnabled: true,
      },
      {
        icon: 'SvgCalendarSearch',
        text: 'Seguimiento mensual con tu médico',
        isEnabled: true,
      },
      {
        icon: 'SvgBox',
        text: 'Envío gratis, de 3 a 5 días en tu casa',
        isEnabled: true,
      },
      {
        icon: 'SvgVerify',
        text: 'Mejor piel en 90 días*',
        isEnabled: true,
      },
    ],
    bottomBar: 'Cancela en cualquier momento',
  },*/
  {
    title: 'Compra única',
    id: '2ee9da6f-4fad-42fc-b717-0b67d49ef0cf',
    subtitle: 'Este pack te servirá para los próximos 3 meses',
    imgSrc: '/images/derma/landingPrecios/rutina.png',
    bgColor: 'bg-white',
    tag: {},
    price: {
      value: '75 €',
      subtitle: '(Equivalente a 25€/mes)',
    },
    bullets: [
      {
        icon: 'SvgCream',
        text: 'Rutina personalizada de 4 pasos',
        isEnabled: true,
      },
      {
        icon: 'SvgCalendarSearch',
        text: 'Revisión de tu piel a los 90 días con el médico',
        isEnabled: true,
      },
      {
        icon: 'SvgBox',
        text: 'Envío gratis, de 3 a 5 días en tu casa',
        isEnabled: true,
      },
      {
        icon: 'SvgVerify',
        text: 'Mejor piel en 90 días*',
        isEnabled: true,
      },
    ],
  },
  /* {
    title: 'Sólo receta',
    id: '7f01ff68-eb9c-4b9b-83b8-efaec37e49e7',
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
    ],
  }, */
];
