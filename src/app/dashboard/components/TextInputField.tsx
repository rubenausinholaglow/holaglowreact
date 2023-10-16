import React from 'react';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { TextInputFieldProps } from '../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange = undefined,
  hasNoValidation,
  error = '',
}) => {
  function getBackgroundIcon() {
    if (!isEmpty(error)) {
      return 'url("/images/forms/error.svg") no-repeat center right 12px';
    }
    if (value.length > 0 && hasNoValidation) {
      return 'url("/images/forms/formCheck.svg") no-repeat center right 12px';
    }

    return '';
  }

  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-700 text-left">{label}</label>}
      <input
        placeholder={placeholder ? placeholder : ''}
        className={twMerge(
          `border border-hg-black300 rounded-2xl px-4 py-2 mr-4 w-full text-hg-black h-16 focus:outline-none ${
            value.length > 0 && hasNoValidation ? 'border-hg-black' : ''
          }`
        )}
        type="text"
        value={value}
        onChange={onChange}
        style={{
          background: getBackgroundIcon(),
        }}
      />
      {error.length > 0 && (
        <p className="text-hg-error text-left text-sm ml-2 mt-2">{error}</p>
      )}
    </div>
  );
};
export default TextInputField;
