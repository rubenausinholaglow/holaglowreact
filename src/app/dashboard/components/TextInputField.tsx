import React from 'react';

import { TextInputFieldProps } from '../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange = undefined,
  error = '',
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700 text-left">{label}</label>}
      <input
        placeholder={placeholder ? placeholder : ''}
        className="border rounded-2xl px-4 py-2 mr-4 w-full text-hg-black text-xs h-16 focus:outline-none"
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
