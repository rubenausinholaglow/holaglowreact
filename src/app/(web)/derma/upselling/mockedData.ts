export const DERMA_TYPES = ['Antiaging', 'Acné', 'Rosácea', 'Manchas'];

export const DERMA_ROUTINES = [
  {
    imgSrc: '/images/derma/upselling/seguimiento.png',
    name: 'Revisión online con tu dermatólogo estético',
    price: '49€',
    discountedPrice: '59€',
    cta: 'Reservar cita',
    bullets: [
      'Evalúa la tolerancia de tu piel a la crema personalizada',
      'Valora los resultados obtenidos y define próximos pasos',
      'Prevén efectos indeseados, como sequedad o irritación',
    ],
  },
  {
    imgSrc: '/images/derma/upselling/rutinaFacial.png',
    name: 'Rutina facial',
    price: '129€',
    discountedPrice: '129€',
    cta: 'Comprar tu rutina',
    bullets: [
      'Potencia los resultados de tu crema personalizada',
      'Cuatro productos seleccionados por dermatólogos estéticos',
      'Envío gratis (de 3 a 5 días naturales)',
    ],
  },
  {
    imgSrc: '/images/derma/upselling/packDerma.png?v=45354',
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
  },
];

export const DERMA_PRODUCTS = [
  {
    type: [0, 1, 2, 3],
    title: 'Espuma limpiadora',
    subTitle: '150ml',
    text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    info: 'Activos principales: Ácido glicólico 2%, avena 2%, manzanilla 2%, base foam de limpieza.',
  },
  {
    type: [0, 1, 2, 3],
    title: 'Crema contorno de ojos',
    subTitle: '30ml',
    text: 'La zona periocular es especialmente vulnerable, por eso, el objetivo principal de este contorno con ácido hialurónico es regular la hidratación y redensificar la piel mejorando su firmeza.',
    info: 'Activos principales: Colágeno natural 5%, ácido hialurónico, matrixyl 3000® 2%, rhamnosoft® 1%, argireline® 5%, eyeseryl® 10%, alfa-bisabolol 0.5%, aceite de germen de trigo, aceite de jojoba.',
  },
  {
    type: [0, 1, 2, 3],
    title: 'Protector solar 50+',
    subTitle: '50ml',
    text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    info: 'Activos principales: Ácido hialurónico, colágeno natural, filtros solares en base de emulsión sin grasa.',
  },
  {
    type: [0],
    title: 'Crema antiaging Plus day',
    subTitle: '50ml',
    text: 'Esta crema es un tratamiento diurno específico para atenuar el envejecimiento de la piel y lograr la redensificación cutánea suavizando las arrugas y mejorando la textura.',
    info: undefined,
  },
  {
    type: [1],
    title: 'Gel cuidado intensivo glicólico',
    subTitle: '50ml',
    text: 'Reduce y regula la producción de sebo con una suave exfoliación, además de suavizar la sequedad y la irritación gracias a los componentes calmantes de este tratamiento específico para el acné.',
    info: 'Activos principales: Cytobiol™ Iris A² 4%, ácido glicólico tamponado 3%, ácido salicílico 2%, manzanilla 4%, hammamelis 8%: ácido hialurónico, rhamnosoft®.',
  },
  {
    type: [2],
    title: 'Crema pieles enrojecidas - Hidronutrición',
    subTitle: '50ml',
    text: 'Alivia, calma y protege tu piel sensible y reactiva con tendencia a enrojecerse ante factores externos con este tratamiento para la rosácea. Aporta también hidratación y nutrición para defender la barrera cutánea.',
    info: undefined,
  },
  {
    type: [3],
    title: 'Crema cuidado piel con manchas',
    subTitle: '50ml',
    text: 'Esta crema despigmentante de día está compuesta por una fórmula exclusiva para reducir la formación de melanina, contribuir a la renovación celular y conseguir un tono uniforme de tu piel.',
    info: undefined,
  },
];
