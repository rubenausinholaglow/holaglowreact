'use client';
import React from 'react';
import { TextInputFieldProps } from '../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChange = () => {},
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700">{label}</label>
      <input
        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default TextInputField;
