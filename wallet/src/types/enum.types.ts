export enum WalletType {
	NONE = "",
	ALGOSIGNER = "AlogSigner",
	MY_ALGO = "My Algo Connect",
	WALLET_CONNECT = "Wallet Connect",
}

// algosigner ledger name [ MainNet | TestNet | <private_net_display_name> ]
export enum ChainType {
	MainNet = "MainNet",
	TestNet = "TestNet",
	Private = "your_private_netowkr"  // replace it with your private network
}
