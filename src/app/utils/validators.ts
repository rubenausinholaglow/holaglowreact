export const phoneValidationRegex = /^[679]{1}[0-9]{8}$/;
export const postalCodeValidationRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validDomains = [
    'gmail.com',
    'hotmail.com',
    'hotmail.es',
    'hotmail.fr',
    'hotmail.it',
    'yahoo.es',
    'yahoo.com',
    'icloud.com',
    'holaglow.com',
    'outlook.com',
    'outlook.es',
    'live.com',
    'me.com',
    'msn.com',
    'telefonica.net',
  ];

  const isValidFormat = emailRegex.test(email);

  if (!isValidFormat) {
    return false;
  }

  const [, domain] = email.split('@');
  const isDomainValid = validDomains.includes(domain);

  return isDomainValid;
};

export const validatePhone = (phone: string) => {
  return phoneValidationRegex.test(phone);
};

export const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
