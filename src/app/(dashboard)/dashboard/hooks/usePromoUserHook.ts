import { useState } from "react";
import { PromoCodeResponse, ValidatePromoCodeRequest, Wallet } from "@interface/wallet";
import FinanceService from "@services/FinanceService";



export const usePromoUserHook = () => {
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

    const validatePromoCode = async (validatePromoCode: ValidatePromoCodeRequest) : Promise<PromoCodeResponse> => {
        const promo = await FinanceService.validatePromoCode(validatePromoCode);
        return promo;
    }

    const getWalletBalance = async (id : string) : Promise<Wallet> => {
        const wallet = await FinanceService.getWalletBalance(id);
        setWallet(wallet);
        return wallet;
    }


    return {
        wallet,
        validatePromoCode,
        getWalletBalance,
    }
}