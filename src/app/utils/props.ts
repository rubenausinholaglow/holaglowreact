import { Dispatch, SetStateAction } from 'react';
import { Client } from 'app/types/client';
import { Product } from 'app/types/product';

export interface TextInputFieldProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hasNoValidation?: boolean;
  type? : string
  setBackgroundIcon? : boolean
}

export interface SearchBarProps {
  email: string;
  handleFieldChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleCheckUser: () => void;
  errors: Array<string>;
  isLoading: boolean;
}

export interface RegistrationFormProps {
  formData?: Client;
  handleFieldChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleContinue?: () => void;
  errors?: Array<string>;
  isLoading?: boolean;
  redirect?: boolean;
  isDashboard?: boolean;
  hasContinueButton?: boolean;
  isEmbed?: boolean;
  page?: string;
  setClientData?: Dispatch<SetStateAction<Client>>;
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
  target: string;
}

export interface ProductTableProps {
  products: Product[];
  showFilters: boolean;
}

export interface CustomButtonFilterProps {
  id: string;
  tag: string;
  onClick: (id: string, tag: string) => void;
  value: string;
  selected: boolean;
}

export interface FilterPageProps {
  onClickFilter: (id: string, inputText: string, tag: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  slug: string;
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

export interface AlmaProps {
  amountFinance: string;
  onUrlPayment: (id: string, url: string, referencePayment: string) => void;
}
