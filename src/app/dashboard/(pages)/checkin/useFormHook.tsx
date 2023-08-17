import { useState } from 'react';

interface FormData {
  email: string;
  phone: string;
}

interface ValidationErrors {
  email?: string;
  phone?: string;
}

const useFormHook = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (fieldName: keyof FormData, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format (10 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      // You can perform any further actions here, e.g., sending data to a server
      console.log('Form submitted:', formData);
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

export default useFormHook;
