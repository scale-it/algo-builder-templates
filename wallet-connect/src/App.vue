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
      Disconnect AlgoSigner
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CHAIN_NAME } from "./config/algosigner.config";
import { WalletType } from "./types/enum.types";
import WalletStore from "./store/WalletStore";
declare var AlgoSigner: any; // eslint-disable-line

export default defineComponent({
  name: "App",
  data() {
    return {
      walletAddress: "",
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
          break;
        case WalletType.WALLET_CONNECT:
          break;
        default:
          console.warn("Wallet %s not supported", e.target.value);
      }
    },
    async connectAlgoSigner() {
      try {
        const algoSignerResponse = await AlgoSigner.connect({
          ledger: CHAIN_NAME,
        });
        this.setWalletType(WalletType.ALGOSIGNER);
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
