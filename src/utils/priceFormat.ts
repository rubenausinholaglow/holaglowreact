import { FormatMoney } from 'format-money-js';

const fm = new FormatMoney({
  decimals: 2,
  separator: '.',
  decimalPoint: ',',
  leadZeros: false,
});

export const priceFormat = (number: number) => fm.from(number);
