import { FormatMoney } from 'format-money-js';

const fm = new FormatMoney({
  decimals: 2,
  separator: '.',
  decimalPoint: ',',
});

export const priceFormat = (number: number) => fm.from(number);
