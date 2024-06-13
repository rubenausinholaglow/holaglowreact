export interface PaymentTicketRequest {
  id: string;
  amount: number;
  method: PaymentMethod;
  bank: PaymentBank;
  paymentReference: string;
}
export interface ProductTicketRequest {
  id: string;
}

export enum PaymentMethod {
  Cash,
  CreditCard,
  Financing,
  Others,
  Wallet,
}

export enum PaymentBank {
  None,
  Alma,
  Pepper,
  Cash,
  Stripe,
  CreditCard,
  GooglePay,
  ApplePay,
  Paypal,
  Frakmenta,
  Points,
}

export interface PaymentInitResponse {
  id: string;
  url: string;
  referenceId: string;
  embeddedReference: string;
}
