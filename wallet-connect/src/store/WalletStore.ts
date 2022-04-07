import { defineStore } from "pinia";
import { WalletType, WalletStoreState } from "../types";
import { WebMode } from "@algo-builder/web";

export default defineStore("WalletStore", {
	state: (): WalletStoreState => {
		return {
			walletKind: WalletType.NONE,
			webMode: <WebMode>{}
		};
	},
	getters: {
		getWebMode(state: WalletStoreState) {
			return state.webMode;
		}
	},
	actions: {
		setWalletType(walletType: WalletType) {
			this.walletKind = walletType;
		},
		setWebMode(webMode: WebMode) {
			console.log("WebMode Initialized", webMode);
			this.webMode = webMode;
		},
	},
});
