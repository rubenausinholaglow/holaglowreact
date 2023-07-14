import { Client } from '@interface/client';
import { Product } from '@interface/product';

export interface TextInputFieldProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface SearchBarProps {
  email: string;
  handleFieldChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleCheckUser: () => void;
  errors_: Array<string>;
  isLoading: boolean;
}

export interface RegistrationFormProps {
  formData: Client;
  handleFieldChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleContinue: () => void;
  errors: Array<string>;
  isLoading: boolean;
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

export interface ProductTableProps {
  products: Product[];
}

export interface CustomButtonFilterProps {
  id: string;
  tag: string;
  onClick: (id: string, tag: string) => void;
  value: string;
}

export interface FilterPageProps {
  onClickFilter: (id: string, inputText: string, tag: string) => void;
}

export interface FilterUtilsProps {
  id: string;
  products: Product[];
}

export interface CustomButtonFilter {
  id: string;
  tag: string;
  onClick: (id: string, isSelected: boolean, tag: string) => void;
  value: string;
}
