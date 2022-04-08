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
    <p v-if="walletAddress">Address: {{ walletAddress }}</p>
    <button
      v-if="walletAddress"
      type="button"
      class="walletButton"
      @click="handleLogOut"
    >
      Disconnect {{ selectedWallet }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WalletType } from "./types/enum.types";
import { ChainType } from "./constants";
import WalletStore from "./store/WalletStore";
import {
  MyAlgoWalletSession,
  WallectConnectSession,
  WebMode,
} from "@algo-builder/web";
declare var AlgoSigner: any; // eslint-disable-line

export default defineComponent({
  name: "App",
  data() {
    return {
      walletAddress: "",
      selectedWallet: WalletType.NONE,
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
      setWalletType: walletStore.setWalletType,
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
        const webMode = new WebMode(AlgoSigner, ChainType.MainNet);
        console.log("WebMode initialized: ", webMode);
        const algoSignerResponse = await AlgoSigner.connect({
          ledger: ChainType.MainNet,
        });
        this.setWalletType(WalletType.ALGOSIGNER);
        console.log("Connected to AlgoSigner:", algoSignerResponse);
        await this.getUserAccount();
      } catch (e) {
        console.error(e);
      }
    },
    async connectMyAlgoWallet() {
      try {
        let myAlgo = new MyAlgoWalletSession(ChainType.MainNet);
        await myAlgo.connectToMyAlgo();
        if (myAlgo.accounts.length) {
          this.walletAddress = myAlgo.accounts[0].address;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async connectWalletConnect() {
      try {
        let walletConnector = new WallectConnectSession(ChainType.MainNet);
        await walletConnector.create(true);
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
        ledger: ChainType.MainNet,
      });
      if (userAccount && userAccount.length) {
        this.walletAddress = userAccount[0].address;
      }
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
