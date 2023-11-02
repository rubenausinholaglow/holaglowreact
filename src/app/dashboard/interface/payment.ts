export interface PaymentProductRequest {
  id: string;
  amount: number;
  method: PaymentMethod;
  bank: PaymentBank;
  paymentReference: string;
}

export enum PaymentMethod {
  Cash,
  CreditCard,
  Financing,
  Others,
}

export enum PaymentBank {
  None,
  Alma,
  Pepper,
  Cash,
  Stripe,
  CreditCard,
}
