import React from 'react';

import { TextInputFieldProps } from '../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange = () => {},
  error = '',
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700 mb-2">{label}</label>}
      <input
        placeholder={placeholder ? placeholder : ''}
        className="border rounded-lg px-4 py-3 mr-4 w-full"
        type="text"
        value={value}
        onChange={onChange}
      />
      {error.length > 0 && (
        <p className="text-red-500 text-left text-sm ml-2 mt-2">{error}</p>
      )}
    </div>
  );
};
export default TextInputField;
