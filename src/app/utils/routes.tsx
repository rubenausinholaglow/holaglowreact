const ROUTES = {
  home: '/',
  treatments: '/tratamientos',
  checkout: {
    clinics: '/checkout/clinicas',
    type: '/checkout/tipo-cita',
    treatments: '/checkout/treatments',
    schedule: '/checkout/agenda',
    contactForm: '/checkout/contactform',
    confirmation: '/checkout/confirmation',
  },
  clinics: '/clinicas',
  aboutUs: '/quienes-somos',
  blog: '/blog',
  dashboard: {
    crisalix: '/dashboard/crisalix',
    menu: '/dashboard/menu',
    checkOut: '/dashboard/checkout',
    checkIn: {
      treatments: '/dashboard/checkin/treatments',
      agenda: '/dashboard/checkin/agenda',
      thankYou: '/dashboard/checkin/welcome',
      contactForm: '/dashboard/checkin/treatments',
      badRequest: '/dashboard/checkin/badRequest',
      confirmation: '/dashboard/checkin/confirmation',
    },
  },
  crm: {
    authentication: '/crm',
    menu: '/crm/menu',
  },
  statics: {
    termsAndConditions: '/aviso-legal',
    privacyPolicy: '/politica-de-privacidad',
  },
  landings: {
    pv: '/start-landing',
  },
  derma: {
    home: 'https://derma.holaglow.com',
    precios: '/precios',
    clinics: '/clinicas',
    aboutUs: '/quienes-somos',
    privacyPolicy: '/politica-de-privacidad',
    termsAndConditions: '/aviso-legal',
    multistep: {
      start: '/multistep/start',
      pains: '/multistep/pains',
      symptoms: '/multistep/symptoms',
      skinType: '/multistep/skin-type',
      skinSensibility: '/multistep/skin-sensitivity',
      allergy: '/multistep/allergy',
      illness: '/multistep/illness',
      medication: '/multistep/medication',
      lactating: '/multistep/lactancy',
      gender: '/multistep/gender',
      age: '/multistep/age',
      feedback: '/multistep/feedback',
      pictures: '/multistep/pictures',
      extraInfo: '/multistep/extra-info',
      form: '/multistep/form',
      payment: '/multistep/payment',
      thankyou: '/multistep/thank-you',
      planes: '/multistep/planes',
    },
  },
};

export default ROUTES;
