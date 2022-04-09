<template>
  <div class="header">
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
    <div class="header" v-if="walletAddress">
      <p>Address: {{ walletAddress }}</p>
      <button
        type="button"
        class="walletButton"
        @click="executeTransaction(1e2)"
      >
        Send 10 Algo
      </button>
      <p v-if="transactionMessage">{{ transactionMessage }}</p>
      <button type="button" class="walletButton" @click="handleLogOut">
        Disconnect {{ selectedWallet }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WalletType } from "./types";
import { toAddress, CHAIN_NAME } from "./constants";
import WalletStore from "./store/WalletStore";
import {
  // MyAlgoWalletSession,
  WallectConnectSession,
  WebMode,
  types,
} from "@algo-builder/web";
declare var AlgoSigner: any; // eslint-disable-line
export default defineComponent({
  name: "App",
  data() {
    return {
      walletAddress: "",
      selectedWallet: WalletType.NONE,
      transactionMessage: "",
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
    };
  },
  setup() {
    const walletStore = WalletStore();
    return {
      walletStore,
    };
  },
  methods: {
    async connectWallet(e: any) {
      switch (e.target.value) {
        case WalletType.ALGOSIGNER:
          this.connectAlgoSigner();
          break;
        case WalletType.MY_ALGO:
          this.connectMyAlgoWallet();
          break;
        case WalletType.WALLET_CONNECT:
          this.connectWalletConnect();
          break;
        default:
          console.warn("Wallet %s not supported", e.target.value);
      }
      this.selectedWallet = e.target.value;
    },
    async connectAlgoSigner() {
      try {
        const webMode = new WebMode(AlgoSigner, CHAIN_NAME);
        this.walletStore.setWebMode(webMode);
        const algoSignerResponse = await AlgoSigner.connect({
          ledger: CHAIN_NAME,
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
        // let myAlgo = new MyAlgoWalletSession(CHAIN_NAME);
        // await myAlgo.connectToMyAlgo();
        // if (myAlgo.accounts.length) {
        //   this.walletAddress = myAlgo.accounts[0].address;
        // }
      } catch (e) {
        console.error(e);
      }
    },
    async connectWalletConnect() {
      try {
        // let walletConnector = new WallectConnectSession(CHAIN_NAME);
        // await walletConnector.create(true);
        // walletConnector.onConnect((error, response) => {
        //   if (response.wcAccounts.length) {
        //     this.walletAddress = response.wcAccounts[0];
        //   }
        // });
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
    handleLogOut() {
      console.log("Wallet Disconnected");
      this.walletAddress = "";
      this.walletStore.setWalletType(WalletType.NONE);
    },
    async executeTransaction(amount: number) {
      try {
        const webMode = this.walletStore.getWebMode;
        const txParams: types.ExecParams[] = [
          {
            type: types.TransactionType.TransferAlgo,
            sign: types.SignType.SecretKey,
            fromAccount: { addr: this.walletAddress, sk: new Uint8Array(0) },
            toAccountAddr: toAddress,
            amountMicroAlgos: amount,
            payFlags: { totalFee: 1000 },
          },
        ];
        let response = await webMode.executeTx(txParams);
        this.transactionMessage =
          amount / 1e6 +
          " Algos has been trasnferred on this address: " +
          toAddress;
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
