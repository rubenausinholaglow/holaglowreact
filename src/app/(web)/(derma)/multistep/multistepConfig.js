export const PAINS_AND_SYMPTOMS = [
  {
    name: 'Melasma',
    value: 2,
    img: '/images/derma/multistep/pains/melasma.jpg',
    symptoms: [
      'Manchas extensas de forma irregular',
      'Manchas en las mejillas',
      'Manchas en nariz',
      'Manchas sobre el labio',
    ],
    feedback: {
      ingredients: ['Ácido retinoico', 'Hidroquinona'],
    },
  },
  {
    name: 'Acné',
    value: 0,
    img: '/images/derma/multistep/pains/acne.jpg',
    symptoms: [
      'Formación de costras de erupciones en la piel',
      'Quistes',
      'Pápulas (protuberancias rojas)',
      'Pústulas (protuberancias rojas con pus)',
      'Enrojecimiento alrededor de las erupciones',
      'Cicatrización de la piel',
      'Espinillas negras',
      'Milia (pequeños quistes blancos o amarillentos)',
    ],
  },
  {
    name: 'Rosácea',
    value: 1,
    img: '/images/derma/multistep/pains/rosacea.jpg',
    symptoms: [
      'Enrojecimiento',
      'Granitos rojos',
      'Hinchazón',
      'Ardor',
      'Vasos sanguíneos visibles',
      'Piel gruesa',
      'Nariz agrandada',
    ],
  },
  {
    name: 'Antiaging',
    value: 3,
    img: '/images/derma/multistep/pains/calidadPiel.jpg',
    symptoms: [
      'Manchas',
      'Falta de luminosidad',
      'Flacidez',
      'Líneas finas de expresión',
      'Arrugas profundas',
      'Pérdida de densidad      ',
    ],
  },
];

export const GENDER = [
  { title: 'Femenino', value: 0 },
  { title: 'Masculino', value: 1 },
  { title: 'No binario', value: 2 },
];

export const LACTANCY = [
  { title: 'Sí', value: 1 },
  { title: 'No', value: 3 },
];

export const AGES = [
  { title: '18-24', value: 0 },
  { title: '25-34', value: 1 },
  { title: '35-44', value: 2 },
  { title: '45-54', value: 3 },
  { title: '55-64', value: 4 },
  { title: '65 o más', value: 5 },
];

export const SKIN_TYPES = [
  {
    title: 'Piel seca',
    value: 1,
    img: '/images/derma/multistep/skinType/dry.svg',
    text: 'Tu piel está tensa, escamosa o te pica (especialmente con el frío)',
  },
  {
    title: 'Piel normal',
    value: 2,
    img: '/images/derma/multistep/skinType/normal.svg',
    text: 'Tu piel no es particularmente seca, grasa ni sensible',
  },
  {
    title: 'Piel grasa',
    value: 3,
    img: '/images/derma/multistep/skinType/oily.svg',
    text: 'Tu piel es naturalmente más grasa, lo que a menudo da lugar a una tez brillante',
  },
  {
    title: 'Piel mixta',
    value: 4,
    img: '/images/derma/multistep/skinType/mixed.svg',
    text: 'Tu piel está en parte seca y en parte grasa (especialmente en la nariz, la barbilla y la frente)',
  },
  {
    title: 'No se mi tipo de piel',
    value: 5,
    img: '/images/derma/multistep/skinType/dontKnow.svg',
    text: '',
  },
];

export const SKIN_SENSITIVITIES = [
  { title: 'Muy sensible', value: 3 },
  { title: 'Algo sensible', value: 2 },
  { title: 'Poco sensible', value: 1 },
];

export const SKIN_COLORS = [
  {
    title: 'Muy clara',
    description: 'Pieles que no se broncean y se queman con excesiva facilidad',
    value: 0,
    color: '#FFE6E0',
  },
  {
    title: 'Clara',
    description: 'Pieles que se broncean muy poco y se queman con facilidad',
    value: 1,
    color: '#EBD2C3',
  },
  {
    title: 'Morena clara',
    description: 'Pieles que llegan a broncearse y se queman moderadamente',
    value: 2,
    color: '#D8BDB1',
  },
  {
    title: 'Morena',
    description: 'Se broncean con facilidad y sufren pocas quemaduras',
    value: 3,
    color: '#B87E69',
  },
  {
    title: 'Morena oscura',
    description:
      'Se broncean rápidamente y con gran intensidad. Quemaduras poco frecuentes',
    value: 4,
    color: '#653121',
  },
  {
    title: 'Oscura',
    description: 'Se broncean intensamente y no se queman',
    value: 5,
    color: '#3C201C',
  },
];

export const SECONDARY_CONCERNS = [
  'Mejorar la textura de la piel',
  'Luminosidad',
  'Poros dilatados',
  'Líneas finas de expresión',
  'Patas de gallo',
  'Tendencia acnéica',
  'No quiero tratar nada más',
];

export const ROUTINES = [
  { title: 'Sí, una de día y noche', value: 1 },
  { title: 'Sí, una de día', value: 2 },
  { title: 'Sí, una de noche', value: 3 },
  { title: 'No, no sigo ninguna rutina diaria', value: 4 },
];

export const ROUTINE_PRODUCTS = [
  { title: 'Limpiador', value: 1 },
  { title: 'Desmaquillante', value: 2 },
  { title: 'Sérum', value: 3 },
  { title: 'Contorno de ojos', value: 4 },
  { title: 'Crema hidratante', value: 5 },
  { title: 'Antiarrugas', value: 6 },
  { title: 'Exfoliante', value: 7 },
  { title: 'Protector solar', value: 8 },
  { title: 'Ninguno', value: 9 },
  { title: 'Otros', value: 10 },
];

export const ROUTINE_TIME = [
  { title: '10 minutos', value: 1 },
  { title: '20 minutos', value: 2 },
  { title: '30 minutos', value: 3 },
  { title: '1 hora', value: 4 },
  { title: 'Más de 1 hora', value: 5 },
];

export const SUNSCREEN = [
  { title: 'Sí, a diario', value: 1 },
  { title: 'Solo en días soleados', value: 2 },
  { title: 'Alguna vez', value: 3 },
  { title: 'Rara vez', value: 4 },
  { title: 'Nunca', value: 5 },
];

export const ALLERGIES = [
  { title: 'Sí', value: 1 },
  { title: 'No', value: 2 },
  { title: 'No lo se', value: 3 },
];

export const ILLNESSES = [
  { title: 'Sí', value: 1 },
  { title: 'No', value: 2 },
  { title: 'No lo se', value: 3 },
];

export const MEDICINES = [
  { title: 'Sí', value: 1 },
  { title: 'No', value: 2 },
];

export const DERMA_COMPLEMENTS = [
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/espumaLimpiadora.png',
    name: 'Espuma limpiadora',
    smallDescription:
      'Mantén tu piel limpia para mejorar el efecto de la rutina',
    isNightRoutine: true,
    volume: '150ml',
    description:
      'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    activePrinciples:
      'Ácido glicólico 2%, Avena 2%, Manzanilla 2%, Base foam de limpieza',
  },
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/crema.png',
    name: 'Crema de día específica para ',
    smallDescription: 'Crema de día preparada por tu médico',
    isNightRoutine: false,
    volume: '50ml',
    description:
      'Crema elegida por tu médico específicamente para tus necesidades. Incluye la aplicación de esta crema en tu rutina de día para conseguir tus objetivos.',
    activePrinciples: '',
  },
  {
    imgSrc: '/images/derma/landingPrecios/ingredients/protectorSolar.png',
    name: 'Protector solar 50+',
    smallDescription:
      'Protege tu piel de los efectos de la radiación ultravioleta',
    isNightRoutine: false,
    volume: '50ml',
    description:
      'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    activePrinciples:
      'Ácido hialurónico, Colágeno natural, Filtros solares en base de emulsión sin grasa',
  },
];

export const DERMA_INGREDIENTS = [
  {
    name: 'Ácido retinoico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoRetinoico.jpg',
    concentration: '2,5%',
    tags: ['Melasma, Antiaging', 'Acné'],
    concerns: [
      'Mejorar la textura de la piel',
      'Poros dilatados',
      'Líneas finas de expresión',
      'Patas de gallo',
    ],
    feedbackSubtitle: '0,015% - 0,05% Despigmentante y regenerador',
    feedbackExtraInfo: '',
    description: '',
  },
  {
    name: 'Hidroquinona',
    imgSrc: '/images/derma/landingPrecios/ingredients/hidroquinona.jpg',
    concentration: '2,5%',
    tags: ['Melasma'],
    concerns: [
      'Mejorar la textura de la piel',
      'Poros dilatados',
      'Líneas finas de expresión',
      'Patas de gallo',
    ],
    feedbackSubtitle: '4% Despigmentante',
    feedbackExtraInfo:
      '*En verano sustituimos la Hidroquinona por una combinación de Ácido kójico (4%) y Ácido glicólico (8%)',
    description: '',
  },
  {
    name: 'Ácido azelaico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoAzelaico.jpg',
    concentration: '15-20%',
    tags: ['Melasma', 'Acné', 'Rosácea'],
    concerns: [],
    description:
      'El ácido azelaico es un principio activo con diversas propiedades. Tiene efectos antiinflamatorios, antibacterianos y previene la formación de puntos negros. Se utiliza con éxito desde hace años en el tratamiento del acné y la rosácea.',
  },
  {
    name: 'Vitamina A',
    imgSrc: '/images/derma/landingPrecios/ingredients/vitaminaA.jpg',
    concentration: '0,006-0,1%',
    tags: ['Melasma', 'Acné', 'Antiaging'],
    concerns: [],
    description:
      'La vitamina A es conocida por sus propiedades integrales para el cuidado de la piel. Pertenece al grupo de los retinoides y es especialmente eficaz para combatir las imperfecciones de la piel gracias a sus propiedades antiinflamatorias, comedolíticas y anticomedógenas.',
  },
  {
    name: 'Peróxido de benzoilo',
    imgSrc: '/images/derma/landingPrecios/ingredients/peroxidoDeBenzoilo.jpg',
    concentration: '2,5%',
    tags: ['Acné'],
    concerns: [],
    description:
      'El peróxido de benzoilo es un ingrediente activo utilizado en el tratamiento del acné. Después de aplicarse aumenta el oxígeno en las capas superiores de la piel y conduce a una reducción del número de bacterias responsables del acné.',
  },
  {
    name: 'Niacinamida',
    imgSrc: '/images/derma/landingPrecios/ingredients/niacinamida.jpg',
    concentration: '4%',
    tags: [],
    concerns: ['Tendencia acnéica', 'Rosácea'],
    description:
      'También es conocida como vitamina B3 y tiene numerosos efectos positivos sobre la piel. Puede conducir a una mejora significativa en la apariencia de la piel, reduciendo los poros dilatados, igualando el tono desigual de la piel y reduciendo las líneas finas y las arrugas.',
  },
  {
    name: 'Clindamicina',
    imgSrc: '/images/derma/landingPrecios/ingredients/clindamicina.jpg',
    concentration: '1%',
    tags: ['Acné'],
    concerns: [],
    description:
      'La clindamicina es un antibiótico eficaz que se utiliza específicamente para tratar afecciones de la piel como el acné. Actúa suprimiendo el crecimiento de la bacteria Propionibacterium.',
  },
  {
    name: 'Eritromicina',
    imgSrc: '/images/derma/landingPrecios/ingredients/eritromicina.jpg',
    concentration: '2%',
    tags: ['Acné', 'Rosácea', 'Antiaging'],
    concerns: [],
    description:
      'Es un antibiótico que inhibe el crecimiento de bacterias en la piel y ayuda a reducir la inflamación. La eritromicina es particularmente útil para pacientes sensibles a otros tratamientos.',
  },
  {
    name: 'Metronidazol',
    imgSrc: '/images/derma/landingPrecios/ingredients/metronidazol.jpg',
    concentration: '0,75%',
    tags: [],
    concerns: ['Rosácea'],
    description:
      'Es un antibiótico con propiedades antibacterianas, antiinflamatorias y de vasoconstricción particularmente útiles para reducir el enrojecimiento y los vasos sanguíneos visibles.',
  },
  {
    name: 'Ivermectina',
    imgSrc: '/images/derma/landingPrecios/ingredients/ivermectina.jpg',
    concentration: '1%',
    tags: [],
    concerns: ['Rosácea'],
    description:
      'Es eficaz principalmente gracias a sus efectos antiinflamatorios y antiparasitarios. Actúa sobre la superpoblación de ácaros Demodex que vive naturalmente en la piel y que puede provocar reacciones inflamatorias en algunos pacientes con rosácea.',
  },

  {
    name: 'Vitamina C',
    imgSrc: '/images/derma/landingPrecios/ingredients/vitaminaC.jpg',
    tags: [],
    concerns: [
      'Mejorar la textura de la piel',
      'Luminosidad',
      'Patas de gallo',
    ],
    description: '',
  },
  {
    name: 'Vitamina E',
    imgSrc: '/images/derma/landingPrecios/ingredients/vitaminaE.jpg',
    tags: [],
    concerns: ['Luminosidad', 'Patas de gallo'],
    description: '',
  },
  {
    name: 'Ácido glicólico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoGlicolico.jpg',
    tags: ['Acné'],
    concerns: ['Luminosidad', 'Poros dilatados', 'Tendencia acnéica'],
    description: '',
  },
  {
    name: 'Ácido salicílico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoSalicilico.jpg',
    tags: ['Acné'],
    concerns: ['Tendencia acnéica'],
    description: '',
  },
  {
    name: 'Ácido kójico',
    imgSrc: '/images/derma/landingPrecios/ingredients/acidoKojico.jpg',
    tags: ['Acné'],
    concerns: ['Melasma'],
    description: '',
  },
];
