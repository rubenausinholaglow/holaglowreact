import React from 'react';

import { TextInputFieldProps } from '../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange = () => {},
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700">{label}</label>}
      <input
        placeholder={placeholder ? placeholder : ''}
        className="border rounded-lg px-4 py-2 mr-4 w-full"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default TextInputField;
