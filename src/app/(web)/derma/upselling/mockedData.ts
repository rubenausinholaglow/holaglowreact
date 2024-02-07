export const DERMA_TYPES = ['Antiaging', 'Acné', 'Rosácea', 'Manchas'];

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
  },
];

export const DERMA_PRODUCTS = [
  {
    type: [0, 1, 2, 3],
    title: 'Espuma limpiadora',
    subTitle: '150ml',
    text: 'Este mousse limpiador para todo tipo de pieles emulsiona perfectamente los residuos de la superficie de la piel y favorece la renovación celular gracias a su composición con ácido glicólico.',
    info: 'Activos principales: Ácido glicólico 2%, avena 2%, manzanilla 2%, base foam de limpieza.',
    id: '7905398d-d1e8-4dc6-aeb3-0a717cda7b86',
  },
  {
    type: [0, 1, 2, 3],
    title: 'Crema contorno de ojos',
    subTitle: '30ml',
    text: 'La zona periocular es especialmente vulnerable, por eso, el objetivo principal de este contorno con ácido hialurónico es regular la hidratación y redensificar la piel mejorando su firmeza.',
    info: 'Activos principales: Colágeno natural 5%, ácido hialurónico, matrixyl 3000® 2%, rhamnosoft® 1%, argireline® 5%, eyeseryl® 10%, alfa-bisabolol 0.5%, aceite de germen de trigo, aceite de jojoba.',
    id: '461cad36-7618-4baf-8c0e-c9490877f07f',
  },
  {
    type: [0, 1, 2, 3],
    title: 'Protector solar 50+',
    subTitle: '50ml',
    text: 'Un protector de alto espectro como este te ayudará a prevenir el envejecimiento prematuro de tu piel protegiéndola de los efectos dañinos del sol y aportando hidratación dejando un tacto aterciopelado.',
    info: 'Activos principales: Ácido hialurónico, colágeno natural, filtros solares en base de emulsión sin grasa.',
    id: 'f093662a-2fd7-444e-92ee-862e067533b5',
  },
  {
    type: [0],
    title: 'Crema antiaging Plus day',
    subTitle: '50ml',
    text: 'Esta crema es un tratamiento diurno específico para atenuar el envejecimiento de la piel y lograr la redensificación cutánea suavizando las arrugas y mejorando la textura.',
    info: 'Activos principales: Coenzima Q-10 0.1%, matrixyl 3000® 3%, isoflavonas liposomadas 5%, superóxido dismutasa 0.25%, bisabolol 1%, hammamelis 10%, aloe vera, vitamina E, amonio glicirrinato 1%.',
    id: '9e397127-5bc9-4397-a3a5-ec2d9aaf6bce',
  },
  {
    type: [1],
    title: 'Gel cuidado intensivo glicólico',
    subTitle: '50ml',
    text: 'Reduce y regula la producción de sebo con una suave exfoliación, además de suavizar la sequedad y la irritación gracias a los componentes calmantes de este tratamiento específico para el acné.',
    info: 'Activos principales: Cytobiol™ Iris A² 4%, ácido glicólico tamponado 3%, ácido salicílico 2%, manzanilla 4%, hammamelis 8%: ácido hialurónico, rhamnosoft®.',
    id: '6a572c6e-abb3-4b05-b2fc-9b54e1712d6b',
  },
  {
    type: [2],
    title: 'Crema pieles enrojecidas',
    subTitle: '50ml',
    text: 'Alivia, calma y protege tu piel sensible y reactiva con tendencia a enrojecerse ante factores externos con este tratamiento para la rosácea. Aporta también hidratación y nutrición para defender la barrera cutánea.',
    info: 'Activos principales: Manteca de moringa 7%, aceite de almendras dulces 5%, rhamnosoft 3%, aceite de germen de trigo 3%, aceite de aguacate 3%, árnica 3%, ruscus 3%, caléndula 3%, extracto de ginkgo 3%, mirtilo 3%, aloe vera 1%, aceite de árbol de té 1%, bisabolol 0.8%, regaliz 0.5% y microsilver BG™ 0.15%.',
    id: '4d2271b4-0554-4061-86a6-aea50e61b83e',
  },
  {
    type: [3],
    title: 'Crema cuidado piel con manchas',
    subTitle: '50ml',
    text: 'Esta crema despigmentante de día está compuesta por una fórmula exclusiva para reducir la formación de melanina, contribuir a la renovación celular y conseguir un tono uniforme de tu piel.',
    info: 'Activos principales: Factor natural de hidratación 5%, isoflavonas de soja liposomadas 2%, moléculas señal derivadas de la leche activadas y estabilizadas 5%, glicerol 3%, lisado de bifidobacterias 5%, aloe vera, activos de bellis perennis 4%, polipéptido Bioactivos (Citoquinas) 0.5%, filtro solar.',
    id: '8c4775db-8dbc-4c90-ba8f-4a9c023f030d',
  },
];
