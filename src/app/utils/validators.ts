export const phoneValidationRegex = /^[679]{1}[0-9]{8}$/;

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
