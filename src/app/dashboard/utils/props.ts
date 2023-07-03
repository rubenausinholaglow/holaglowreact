import { Client } from '../interface/client';

export interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchBarProps {
  email: string;
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleCheckUser: () => void;
}

export interface RegistrationFormProps {
  formData: Client;
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleContinue: () => void;
  isVisible: boolean;
}

export interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export interface DashboardMenuItemProps {
  iconSrc: string;
  altText: string;
  title: string;
  link: string;
}