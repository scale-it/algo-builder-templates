import { UPDATE_WALLET, DISCONNECT_WALLET } from "./actionTypes";

export const updateWalletAddressAction = (walletAddress) => {
    console.log("action", walletAddress)
    return {
        type: UPDATE_WALLET,
        payload: {
            walletAddress: walletAddress,
        }
    };
}
export const disconnectWalletAction = () => {
    return {
        type: DISCONNECT_WALLET,
    };
}
