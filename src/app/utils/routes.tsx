const ROUTES = {
  home: '/',
  treatments: '/tratamientos',
  checkout: {
    clinics: '/checkout/clinicas',
    type: '/checkout/tipo-cita',
    treatments: '/checkout/treatments',
    schedule: '/checkout/agenda',
    contactForm: '/checkout/contactform',
    thankYou: '/checkout/confirmation',
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
    multistep: {
      start: 'demra/multistep/start',
      pains: '/derma/multistep/pains',
      symptoms: '/derma/multistep/symptoms',
      skinType: '/derma/multistep/skin-type',
      skinSensibility: '/derma/multistep/skin-sensitivity',
      allergy: '/derma/multistep/allergy',
      illness: '/derma/multistep/illness',
      medication: '/derma/multistep/medication',
      lactating: '/derma/multistep/lactancy',
      gender: '/derma/multistep/gender',
      pictures: '/derma/multistep/pictures',
      extraInfo: '/derma/multistep/extra-info',
      form: '/derma/multistep/form',
      ns: {
        extraInfo: '/derma/multistep/ns/extra-info',
        skinType: '/derma/multistep/ns/skin-type',
        skinSensibility: '/derma/multistep/ns/skin-sensitivity',
        lactating: '/derma/multistep/ns/lactancy',
        form: '/derma/multistep/ns/form',
      },
    },
  },
};

export default ROUTES;
