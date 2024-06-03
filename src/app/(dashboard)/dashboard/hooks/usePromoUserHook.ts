import { useState } from "react";
import { Wallet } from "@interface/wallet";
import FinanceService from "@services/FinanceService";



export const usePromoUserHook = () => {
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

    const validatePromoCode = async (code: string) : Promise<boolean> => {
        const isValid = await FinanceService.validatePromoCode(code);
        return isValid;
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