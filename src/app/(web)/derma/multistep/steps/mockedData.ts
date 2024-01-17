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
        title:
          'Busco un tratamiento efectivo para <b>preocupaciones específicas</b> de mi piel',
      },
      {
        title:
          'Quiero una rutina facial compatible con el <b>embarazo y/o lactancia</b>',
      },
      {
        title: 'Me preocupa el <b>envejecimiento saludable</b> de mi piel',
      },
      {
        title:
          'Deseo cuidar mi piel mientras vivo <b>cambios hormonales y/o la menopausia<b/>',
      },
      {
        title:
          'Quiero preparar mi piel para <b>un evento o una ocasión especial</b>',
      },
    ],
  },
  {
    step: 2,
    section: 'Necesidades personales',
    title: 'Necesidades personales',
    description:
      'Selecciona las inquietudes que te gustaría resolver en tu consulta',
    showTextArea: true,
    placeholder: 'Otros',
    questions: [
      {
        title: 'Acné',
      },
      {
        title: 'Cicatrices',
      },
      {
        title: 'Enrojecimiento',
      },
      {
        title: 'Sensibilidad',
      },
      {
        title: 'Pigmentación',
      },
      {
        title: 'Sequedad',
      },
      {
        title: 'Exceso de sebo/grasa',
      },
      {
        title: 'Pérdida de firmeza',
      },
      {
        title: 'Líneas finas',
      },
      {
        title: 'Arrugas',
      },
      {
        title: 'Rosácea',
      },
      {
        title: 'Textura de la piel',
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
