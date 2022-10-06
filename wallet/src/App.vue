<template>
	<div class="header">
		<select @change="handleNetworkChange">
			<option :value="0" :key="0">Select a network</option>
			<option
				v-for="option in networkAvailable"
				:value="option.value"
				:key="option.id"
			>
				{{ option.value }}
			</option>
		</select>
		<div class="header" v-if="walletStore.network">
			<select @change="connectWallet">
				<option :value="0" :key="0">Select a wallet</option>
				<option
					v-for="option in walletsAvailable"
					:value="option.value"
					:key="option.id"
				>
					{{ option.value }}
				</option>
			</select>

			<div class="header" v-if="currentAddress">
				<select @change="setCurrentAddress">
					<option :value="0" :key="0">Select a account</option>
					<option v-for="addr in walletAddresses" :value="addr" :key="addr">
						{{ addr }}
					</option>
				</select>
			</div>

			<div class="header" v-if="currentAddress">
				<p>Address: {{ currentAddress }}</p>
				<button
					type="button"
					class="walletButton"
					@click="executeTx(this.amount)"
				>
					Send 10 Algo
				</button>
				<button
					type="button"
					class="walletButton"
					@click="executeAppTx(this.applicationId)"
				>
					Application Call
				</button>
				<p v-if="transactionMessage">{{ transactionMessage }}</p>
				<button type="button" class="walletButton" @click="handleLogOut">
					Disconnect {{ walletStore.walletKind }}
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { NetworkType, WalletType } from "./types";
import { toAddress, amount, applicationId } from "./constants";
import WalletStore from "./store/WalletStore";
import {
	MyAlgoWalletSession,
	WallectConnectSession,
	WebMode,
	types as wtypes,
	mainnetURL,
	testnetURL,
} from "@algo-builder/web";
import { convertMicroAlgoToAlgo } from "./utility";
import { HttpNetworkConfig } from "@algo-builder/web/build/types";
import { betanetURL } from "@algo-builder/web/build/lib/constants";
declare var AlgoSigner: any; // eslint-disable-line

export default defineComponent({
	name: "App",
	data() {
		return {
			currentAddress: "",
			walletAddresses: new Array<string>(),
			transactionMessage: "",
			amount: amount,
			applicationId: applicationId,
			walletsAvailable: [
				{
					id: 1,
					value: WalletType.ALGOSIGNER,
				},
				{
					id: 2,
					value: WalletType.MY_ALGO,
				},
				{
					id: 3,
					value: WalletType.WALLET_CONNECT,
				},
			],
			networkAvailable: [
				{
					id: 1,
					value: NetworkType.MainNet,
				},
				{
					id: 2,
					value: NetworkType.TestNet,
				},
				{
					id: 3,
					value: NetworkType.BetaNet,
				},
				{
					id: 4,
					value: NetworkType.LocalNet,
				},
			],
		};
	},
	setup() {
		const walletStore = WalletStore();
		return {
			walletStore,
		};
	},
	methods: {
		getWalletUrlConfig(type: NetworkType): HttpNetworkConfig {
			switch (type) {
				case NetworkType.MainNet:
					return {
						token: "",
						server: mainnetURL,
						port: "",
					};
				case NetworkType.TestNet:
					return {
						token: "",
						server: testnetURL,
						port: "",
					};
				case NetworkType.BetaNet:
					return {
						token: "",
						server: betanetURL,
						port: "",
					};
				// add your local net config here
				case NetworkType.LocalNet:
					return {
						token:
							"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
						server: "http://localhost",
						port: 4001,
					};
				default:
					return {
						token: "",
						server: "",
						port: "",
					};
			}
		},
		async setCurrentAddress(e: any) {
			if (e.target.value) {
				this.currentAddress = e.target.value;
			}
			console.log(JSON.stringify(this.currentAddress));
		},
		async connectWallet(e: any) {
			if (e.target.value) {
				const walletType = e.target.value;
				switch (walletType) {
					case WalletType.ALGOSIGNER: {
						this.connectAlgoSigner();
						break;
					}
					case WalletType.MY_ALGO: {
						this.connectMyAlgoWallet();
						break;
					}
					case WalletType.WALLET_CONNECT: {
						this.connectWalletConnect();
						break;
					}
					default:
						console.warn("Wallet %s not supported", walletType);
				}
				this.walletStore.setWalletType(walletType);
			}
		},
		async handleNetworkChange(e: any) {
			if (e.target.value) {
				this.handleLogOut();
				const networkType = e.target.value;
				this.walletStore.setNetworkType(networkType);
			}
		},
		async connectAlgoSigner() {
			try {
				const webMode = new WebMode(AlgoSigner, this.walletStore.network);
				this.walletStore.setWebMode(webMode);
				const algoSignerResponse = await AlgoSigner.connect({
					ledger: this.walletStore.network,
				});
				this.walletStore.setWalletType(WalletType.ALGOSIGNER);
				console.log("Connected to AlgoSigner:", algoSignerResponse);
				await this.getUserAccount();
			} catch (e) {
				console.error(e);
			}
		},
		async connectMyAlgoWallet() {
			try {
				const myAlgo = new MyAlgoWalletSession(
					this.getWalletUrlConfig(this.walletStore.network)
				);
				await myAlgo.connectToMyAlgo();
				this.walletStore.setWebMode(myAlgo);
				if (myAlgo.accounts.length) {
					this.walletAddresses = myAlgo.accounts.map((acc) => acc.address);
					this.currentAddress = myAlgo.accounts[0].address;
				}
			} catch (e) {
				console.error(e);
			}
		},
		async connectWalletConnect() {
			try {
				const walletConnector = new WallectConnectSession(
					this.getWalletUrlConfig(this.walletStore.network)
				);
				await walletConnector.create(true);
				this.walletStore.setWebMode(walletConnector);
				walletConnector.onConnect((error, response) => {
					if (response.accounts.length) {
						this.walletAddresses = response.accounts;
						this.currentAddress = response.accounts[0];
					}
				});
			} catch (e) {
				console.error(e);
			}
		},
		async getUserAccount() {
			const userAccount = await AlgoSigner.accounts({
				ledger: this.walletStore.network,
			});
			if (userAccount && userAccount.length) {
				this.walletAddresses = userAccount.map(
					(acc: { address: string }) => acc.address
				);
				this.currentAddress = userAccount[0].address;
			}
		},
		handleLogOut() {
			console.log("Wallet Disconnected");
			this.currentAddress = "";
			this.walletAddresses = [];
			this.transactionMessage = "";
			this.walletStore.setWalletType(WalletType.NONE);
			this.walletStore.setNetworkType(NetworkType.NONE);
		},
		async executeTx(amount: number) {
			try {
				const webMode = this.walletStore.getWebMode;
				const algo: number = convertMicroAlgoToAlgo(amount);
				const txParams: wtypes.ExecParams[] = [
					{
						type: wtypes.TransactionType.TransferAlgo,
						sign: wtypes.SignType.SecretKey,
						fromAccount: { addr: this.currentAddress, sk: new Uint8Array(0) },
						toAccountAddr: toAddress,
						amountMicroAlgos: amount,
						payFlags: { totalFee: 1000 },
					},
				];
				const response = await toRaw(webMode).executeTx(txParams);
				this.transactionMessage =
					algo + " Algos has been transferred to this address: " + toAddress;
				console.log(response);
			} catch (error) {
				console.warn(error);
			}
		},
		async executeAppTx(applicationID: number) {
			try {
				const webMode = this.walletStore.getWebMode;
				const execParams: wtypes.ExecParams[] = [
					{
						type: wtypes.TransactionType.CallApp,
						sign: wtypes.SignType.SecretKey,
						fromAccount: { addr: this.currentAddress, sk: new Uint8Array(0) },
						appID: applicationID,
						payFlags: { totalFee: 1000 },
					},
				];
				const response = await toRaw(webMode).executeTx(execParams);
				this.transactionMessage = "App has been called.";
				console.log(response);
			} catch (error) {
				console.warn(error);
			}
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
