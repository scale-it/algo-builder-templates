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
      <div class="header" v-if="walletAddress">
        <p>Address: {{ walletAddress }}</p>
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
import { defineComponent } from "vue";
import { NetworkType, WalletType } from "./types";
import { toAddress, amount, applicationId } from "./constants";
import WalletStore from "./store/WalletStore";
import {
  MyAlgoWalletSession,
  WallectConnectSession,
  WebMode,
  types as wtypes,
} from "@algo-builder/web";
import { convertMicroAlgoToAlgo } from "./utility";
declare var AlgoSigner: any; // eslint-disable-line

export default defineComponent({
  name: "App",
  data() {
    return {
      walletAddress: "",
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
    async connectWallet(e: any) {
      if (e.target.value) {
        let walletType = e.target.value;
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
        let networkType = e.target.value;
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
        let myAlgo = new MyAlgoWalletSession(this.walletStore.network);
        await myAlgo.connectToMyAlgo();
        this.walletStore.setWebMode(myAlgo);
        if (myAlgo.accounts.length) {
          this.walletAddress = myAlgo.accounts[0].address;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async connectWalletConnect() {
      try {
        let walletConnector = new WallectConnectSession(
          this.walletStore.network
        );
        await walletConnector.create(true);
        this.walletStore.setWebMode(walletConnector);
        walletConnector.onConnect((error, response) => {
          if (response.wcAccounts.length) {
            this.walletAddress = response.wcAccounts[0];
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
        this.walletAddress = userAccount[0].address;
      }
    },
    handleLogOut() {
      console.log("Wallet Disconnected");
      this.walletAddress = "";
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
            fromAccount: { addr: this.walletAddress, sk: new Uint8Array(0) },
            toAccountAddr: toAddress,
            amountMicroAlgos: amount,
            payFlags: { totalFee: 1000 },
          },
        ];
        let response = await webMode.executeTx(txParams);
        this.transactionMessage =
          algo + " Algos has been trasnferred on this address: " + toAddress;
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
            fromAccount: { addr: this.walletAddress, sk: new Uint8Array(0) },
            appID: applicationID,
            payFlags: { totalFee: 1000 },
          },
        ];
        let response = await webMode.executeTx(execParams);
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
