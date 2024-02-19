export const MULTISTEP_QUESTIONS: any = [
  {
    step: 1,
    section: 'Contexto de la consulta médica',
    title: 'Contexto de la consulta médica',
    description:
      'Selecciona el escenario que mejor describa tu situación actual',
    showTextArea: false,
    questions: [
      {
        title: 'Busco un tratamiento para acné, manchas, rosácea, etc.',
      },
      {
        title:
          'Quiero una rutina facial compatible con el embarazo y/o lactancia',
      },
      {
        title: 'Me preocupa el envejecimiento saludable de mi piel',
      },
      {
        title: 'Los cambios hormonales y/o menopausia afectan a mi piel',
      },
      {
        title: 'Quiero preparar mi piel para un evento o una ocasión especial',
      },
    ],
  },
  {
    step: 2,
    section: 'Necesidades personales',
    title: 'Necesidades personales',
    description:
      'Selecciona todas las inquietudes que te gustaría resolver en la consulta.',
    showTextArea: true,
    placeholder: 'Escribe aquí otras inquietudes',
    questions: [
      {
        title: 'Acné',
      },
      {
        title: 'Manchas',
      },
      {
        title: 'Enrojecimiento/Rosácea',
      },
      {
        title: 'Piel Seca',
      },
      {
        title: 'Piel Grasa',
      },
      {
        title: 'Arrugas',
      },
      {
        title: 'Cicatrices',
      },
    ],
  },
  {
    step: 3,
    section: 'Información adicional',
    title: '¿Te gustaría contarnos algo más?',
    description:
      'Cuanta más información nos proporciones, mejor podremos asesorarte sobre tus objetivos y preocupaciones de la piel.',
    showTextArea: true,
    questions: [],
    placeholder:
      'Por ejemplo: cualquier medicación (ten en cuenta que nuestros médicos no pueden recetar online antibióticos orales ni medicamentos, como Roaccutane y Spironolactone), tratamientos recibidos anteriormente, alergias, características de su estilo de vida, etc.',
  },
];
