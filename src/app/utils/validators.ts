import { isEmpty } from "lodash";

export const phoneValidationRegex = /^[679]{1}[0-9]{8}$/;

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

export function validatePhoneInput(phoneNumber: string) : boolean {
    if (
      phoneNumber.length > 3 &&
      phoneNumber.startsWith('+34') &&
      phoneValidationRegex.test(phoneNumber.replace(/\D/g, '').slice(-9))
    ) {
      return false;
    }

    if (
      phoneNumber.length > 3 &&
      phoneNumber.startsWith('+34') &&
      !phoneValidationRegex.test(phoneNumber.replace(/\D/g, '').slice(-9))
    ) {
      return true;
    }

    if (isEmpty(phoneNumber) || phoneNumber === '+' || phoneNumber === '+34') {
      return true;
    }

    return false;
  }