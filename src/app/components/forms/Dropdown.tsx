import Select from 'react-select';
import { Options } from '@interface/dropdown';
import { HOLAGLOW_COLORS } from 'app/utils/colors';

export default function Dropdown({
  options,
  ...rest
}: {
  options: Options[];
  [key: string]: any;
}) {
  const dropdownStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      paddingTop: '5px',
      paddingBottom: '5px',
      borderRadius: '12px',
      background: state.hasValue
        ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
        : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
      borderColor: state.isFocused
        ? `${HOLAGLOW_COLORS['secondary']}`
        : `${HOLAGLOW_COLORS['black']}`,
    }),
    singleValue: (baseStyles: any, state: any) => ({
      ...baseStyles,
      color: state.hasValue
        ? `${HOLAGLOW_COLORS['secondary']}`
        : `${HOLAGLOW_COLORS['black300']}`,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
  };

  return (
    <Select
      options={options}
      className={`w-full mb-2 ${rest.className}`}
      styles={dropdownStyles}
      {...rest}
    />
  );
}
