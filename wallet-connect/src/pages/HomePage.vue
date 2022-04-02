<template>
	<div class="header">
		<button type="button" class="walletButton" @click="connectAlgoSigner">
			Connect AlgoSigner
		</button>
		<p v-if="walletAddress">Address: {{ walletAddress }}</p>
		<button type="button" class="walletButton" @click="handleLogOut">
			Disconnect AlgoSigner
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CHAIN_NAME } from "../config/algosigner.config";
import { WalletType } from "../types/enum.types";
import WalletStore from "../store/WalletStore";
declare var AlgoSigner: any; // eslint-disable-line

export default defineComponent({
	data() {
		return {
			walletAddress: "",
		};
	},
	setup() {
		const walletStore = WalletStore();
		return {
			setWalletType: walletStore.setWalletType,
		};
	},
	methods: {
		async connectAlgoSigner() {
			try {
				const algoSignerResponse = await AlgoSigner.connect({
					ledger: CHAIN_NAME,
				});
				this.setWalletType(WalletType.ALGOSIGNER);
				this.selectedWallet = WalletType.ALGOSIGNER;
				console.log("Connected to AlgoSigner:", algoSignerResponse);
				await this.getUserAccount();
			} catch (e) {
				console.error(e);
			}
		},
		async getUserAccount() {
			const userAccount = await AlgoSigner.accounts({
				ledger: CHAIN_NAME,
			});
			if (userAccount && userAccount.length) {
				this.walletAddress = userAccount[0].address;
			}
		},
		updateWallet(address: string, walletName: string) {
			this.$emit("updateWalletAddress", address);
			this.text = walletName;
		},
		handleLogOut() {
			console.log("Wallet Disconnected");
			this.walletAddress = "";
			this.setWalletType(WalletType.NONE);
		},
	},
});
</script>
<style scoped>
.header {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.walletButton {
	width: 20em;
	margin: 5em;
}
</style>
