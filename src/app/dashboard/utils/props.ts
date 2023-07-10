import { Client } from '@interface/client';
import { Product } from '@interface/product';

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

export interface ProductTableProps {
  products: Product[];
  selectedFilter : string;
//  cart: string[];
//  addToCart: (productId: string) => void;
}

export interface CustomButtonFilterProps {
  id: string;
  tag: string;
  onClick: (id: string, isSelected : boolean, tag : string) => void;
  value: string;
}

export interface FilterPageProps {
  onClickFilter: (id: string, inputText : string, allow : boolean) => void;
}

export interface FilterUtilsProps {
  id: string;
  products: Product[];
}