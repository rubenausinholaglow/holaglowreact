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
  Frakmenta
}

export interface PaymentInitResponse {
  id: string;
  url: string;
  referenceId: string;
  embeddedReference: string;
}
