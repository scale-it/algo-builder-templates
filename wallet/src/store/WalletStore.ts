import { defineStore } from "pinia";
import { WalletType, WalletStoreState } from "../types";

export default defineStore("WalletStore", {
	state: (): WalletStoreState => {
		return {
			walletKind: WalletType.NONE,
		};
	},
	actions: {
		setWalletType(walletType: WalletType) {
			this.walletKind = walletType;
		},
	},
});
