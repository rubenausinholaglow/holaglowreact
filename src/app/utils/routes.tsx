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
      skinSensitivity: '/derma/multistep/skin-sensitivity',
      alergies: '/derma/multistep/alergies',
      illnesses: '/derma/multistep/illnesses',
      medicines: '/derma/multistep/medicines',
      lactancy: '/derma/multistep/lactancy',
      gender: '/derma/multistep/gender',
      pictures: '/derma/multistep/pictures',
      form: '/derma/multistep/form',
    },
  },
};

export default ROUTES;
