import { defineStore } from "pinia";
import { WalletType, WalletStoreState, WebModeTypes } from "../types";

export default defineStore("WalletStore", {
	state: (): WalletStoreState => {
		return {
			walletKind: WalletType.NONE,
			webMode: <WebModeTypes>{}
		};
	},
	getters: {
		getWebMode(state) {
			return state.webMode;
		}
	},
	actions: {
		setWalletType(walletType: WalletType) {
			this.walletKind = walletType;
		},
		setWebMode(webMode: WebModeTypes) {
			console.log("WebMode Initialized", webMode);
			this.webMode = webMode;
		},
	},
});
