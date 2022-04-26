import { defineStore } from "pinia";
import { WalletType, WalletStoreState, WebModeTypes, NetworkType } from "../types";

export default defineStore("WalletStore", {
	state: (): WalletStoreState => {
		return {
			walletKind: WalletType.NONE,
			webMode: <WebModeTypes>{},
			network: NetworkType.NONE
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
			console.log("WebMode Initialized: ", webMode);
			this.webMode = webMode;
		},
		setNetworkType(network: NetworkType) {
			console.log("Network Changed: ", network);
			this.network = network;
		},
	},
});
