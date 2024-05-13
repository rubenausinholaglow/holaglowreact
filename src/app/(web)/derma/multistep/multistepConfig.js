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
      ingredients: [
        {
          name: 'Ácido retinoico',
          subtitle: '0,015% - 0,05% Despigmentante y regenerador',
          extraInfo: '',
          imgUrl: '/images/derma/multistep/ingredients/acidoRetinoico.png',
        },
        {
          name: 'Hidroquinona',
          subtitle: '4% Despigmentante',
          extraInfo:
            '*En verano sustituimos la Hidroquinona por una combinación de Ácido kójico (4%) y Ácido glicólico (8%)',
          imgUrl: '/images/derma/multistep/ingredients/hidroquinona.png',
        },
      ],
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
    value: 4,
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

export const GENDER = [
  { title: 'Femenino', value: 1 },
  { title: 'Masculino', value: 2 },
  { title: 'No binario', value: 3 },
];

export const AGES = [
  { title: '18-24', value: 1 },
  { title: '25-34', value: 2 },
  { title: '35-44', value: 3 },
  { title: '45-54', value: 4 },
  { title: '55-64', value: 5 },
  { title: '65 o más', value: 6 },
];

export const SKIN_SENSITIVITIES = [
  { title: 'Muy sensible', value: 1 },
  { title: 'Algo sensible', value: 2 },
  { title: 'Poco sensible', value: 3 },
];

export const SKIN_COLORS = [
  {
    title: 'Muy clara',
    description: 'Pieles que no se broncean y se queman con excesiva facilidad',
    value: 1,
    color: '#FFE6E0',
  },
  {
    title: 'Clara',
    description: 'Pieles que se broncean muy poco y se queman con facilidad',
    value: 2,
    color: '#EBD2C3',
  },
  {
    title: 'Morena Clara',
    description: 'Pieles que llegan a broncearse y se queman moderadamente',
    value: 3,
    color: '#D8BDB1',
  },
  {
    title: 'Morena',
    description: 'Se broncean con facilidad y sufren pocas quemaduras',
    value: 4,
    color: '#B87E69',
  },
  {
    title: 'Morena oscura',
    description:
      'Se broncean rápidamente y con gran intensidad. Quemaduras poco frecuentes',
    value: 5,
    color: '#653121',
  },
  {
    title: 'Oscura',
    description: 'Se broncean intensamente y no se queman',
    value: 6,
    color: '#3C201C',
  },
];

export const SOMETHING_ELSE = [
  { title: 'Mejorar la textura de la piel', value: 1 },
  { title: 'Luminosidad', value: 2 },
  { title: 'Poros dilatados', value: 3 },
  { title: 'Líneas finas de expresión', value: 4 },
  { title: 'Patas de gallo', value: 5 },
  { title: 'Tendencia acnéica', value: 7 },
  { title: 'No quiero tratar nada más', value: 8 },
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

export const LACTANCY = [
  { title: 'Sí', value: 1 },
  { title: 'No', value: 2 },
];
