import { SvgCream, SvgCreams, SvgDehydration, SvgHairCare, SvgSkinCare } from 'icons/Icons';

export const MULTISTEP_QUESTIONS: any = [
  {
    step: 1,
    questions: [
      {
        icon: SvgCream,
        text: 'Sí, a diario',
      },
      {
        icon: SvgCreams,
        text: 'Si, pero sólo a veces',
      },
      {
        icon: SvgDehydration,
        text: 'No, nunca',
      },
    ],
  },
  {
    step: 2,
    questions: ['18 - 25', '26 - 35', '36 - 45', '46 - 55', '56 - 65', '+ 65'],
  },
];

export const MULTISTEP_TREATMENTS: any = [
  {
    category: 'Tercio Superior',
    imgSrc: '/images/passport/treatmentZones/2.svg',
    treatments: [
      {
        name: 'Líneas de expresión',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Flacidez',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Abrir mirada',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Calidad de la piel',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
    ],
  },
  {
    category: 'Tercio medio',
    imgSrc: '/images/passport/treatmentZones/3.svg',
    treatments: [
      {
        name: 'Líneas de expresión',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Flacidez',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Calidad de la piel',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Ojeras',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
    ],
  },
  {
    category: 'Tercio inferior',
    imgSrc: '/images/passport/treatmentZones/4.svg',
    treatments: [
      {
        name: 'Líneas de expresión',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Flacidez',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Aumento de labios',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Sonrisa gingival',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
      {
        name: 'Bruxismo',
        price: 250,
        landing: 'http://www.holaglow.com/landing-1',
      },
    ],
  },
  {
    category: 'Piel',
    icon: SvgSkinCare,
    treatments: [
      {
        name: 'Hidratación',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Luminosidad',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Manchas',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Poros',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Acné',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
    ],
  },
  {
    category: 'Pelo',
    icon: SvgHairCare,
    treatments: [
      {
        name: 'Caída',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Volumen',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
      {
        name: 'Luminosidad',
        price: 250,
        landing: 'http://www.holaglow.com/landing-2',
      },
    ],
  },
];
