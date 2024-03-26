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
    //schedule: `/dashboard/schedule?flowwwToken=${user?.flowwwToken}`,
    menu: '/dashboard/menu',
    //home: `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`,
    checkOut: '/dashboard/checkout',
    checkIn: {
      //root: `/dashboard/checkin?clinicId=${storedClinicId}`,
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
};

export default ROUTES;
