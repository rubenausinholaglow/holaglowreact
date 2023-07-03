export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
    const phoneRegex = /^[679]{1}[0-9]{8}$/;
    return phoneRegex.test(phone);
};

