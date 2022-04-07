import { WalletType } from "./enum.types";
import { WebMode } from "@algo-builder/web";

export interface WalletStoreState {
	walletKind: WalletType;
	webMode: WebMode;
}
