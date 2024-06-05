import { useState } from "react";
import { PromoCodeResponse, ValidatePromoCodeRequest, Wallet } from "@interface/wallet";
import FinanceService from "@services/FinanceService";
import { useGlobalPersistedStore } from "app/stores/globalStore";



export const usePromoUserHook = () => {
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
    const { setWalletClient } = useGlobalPersistedStore(state => state);

    const validatePromoCode = async (validatePromoCode: ValidatePromoCodeRequest) : Promise<PromoCodeResponse> => {
        const promo = await FinanceService.validatePromoCode(validatePromoCode);
        if(promo.errorMessage && promo.errorMessage?.length > 0)
        {
            return promo;
        }
        const newWallet : Wallet = {
            user: undefined,
            amountBalance: promo.amount,
            promoCode: promo.code
        }
        setWalletClient(newWallet);
        return promo;
    }

    const getWalletBalance = async (id : string) : Promise<Wallet> => {
        const wallet = await FinanceService.getWalletBalance(id);
        setWallet(wallet);
        setWalletClient(wallet);
        return wallet;
    }

 


    return {
        wallet,
        validatePromoCode,
        getWalletBalance
    }
}