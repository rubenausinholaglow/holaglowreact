import { User } from "./appointment";

export interface Wallet {
    user? : User | undefined;
    amountBalance: number;
    promoCode? : string;
}

export interface ValidatePromoCodeRequest {
    code: string;
    userId?: string;
}

export interface PromoCodeResponse {
    code: string;
    amount: number;
    errorMessage?: string;
}