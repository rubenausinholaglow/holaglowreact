import { User } from "./appointment";

export interface Wallet {
    user : User;
    amountBalance: number;
}

export interface ValidatePromoCodeRequest {
    code: string;
    userId?: string;
}

export interface PromoCodeResponse {
    code: string;
    amount: number;
}