import { WalletType } from "./enum.types";
import {
	MyAlgoWalletSession,
	WallectConnectSession,
	WebMode
} from "@algo-builder/web";

export type WebModeTypes = WebMode | MyAlgoWalletSession | WallectConnectSession;

export interface WalletStoreState {
	walletKind: WalletType;
	webMode: WebModeTypes;
}
