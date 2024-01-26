import React from 'react';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { TextInputFieldProps } from '../../../utils/props';

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  labelClassName = '',
  inputClassName = '',
  placeholder,
  value,
  type = 'text',
  onChange = undefined,
  onBlur = undefined,
  disableBgIcons = false,
  error = '',
}) => {
  function getBackgroundIcon() {
    if (disableBgIcons) {
      return '';
    }
    if (!isEmpty(error)) {
      return 'url("/images/forms/error.svg") #ffffff no-repeat center right 12px';
    }
    if (value.length > 0) {
      return 'url("/images/forms/formCheck.svg") #ffffff no-repeat center right 12px';
    }

    return '';
  }

  return (
    <div className="flex flex-col relative">
      {label && (
        <label className={`text-gray-700 text-left ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder ? placeholder : ''}
        className={twMerge(
          `border border-hg-black300 rounded-2xl px-4 py-2 mr-4 w-full text-hg-black h-16 focus:outline-none ${
            value.length > 0 ? 'border-hg-black' : ''
          } ${inputClassName}`
        )}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ background: getBackgroundIcon() }}
      />
      {error.length > 0 && (
        <p className="text-hg-error text-left text-sm ml-2 mt-2">{error}</p>
      )}
    </div>
  );
};
export default TextInputField;
