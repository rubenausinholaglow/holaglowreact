import { useState } from "react";
import { PromoCodeResponse, ValidatePromoCodeRequest, Wallet } from "@interface/wallet";
import FinanceService from "@services/FinanceService";
import { useSessionStore } from "app/stores/globalStore";



export const usePromoUser = () => {
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
    const { setWalletClient, setPromoCode, promoCode } = useSessionStore(state => state);

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
        setPromoCode(promo);
        return promo;
    }

    const fetchWalletBalance  = async (id : string) : Promise<Wallet> => {
        const fetchedWallet = await FinanceService.getWalletBalance(id);
        setWallet(fetchedWallet);
        setWalletClient(fetchedWallet );
        return fetchedWallet;
    }
    
    return {
        wallet,
        promoCode,
        validatePromoCode,
        fetchWalletBalance 
    }
}