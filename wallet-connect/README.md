# Wallet-Connect Template

This template shows how to connect a AlgoSigner wallet with a Vue.js app.

# Config

The file present at `/src/config/algosigner.config.ts` is used for ledger name (MainNet, TestNet, Private-Net). By default it is being set to MainNet.

# Supported Wallets

The follwing wallets are supported:
- AlgoSigner
- My Algo Connect
- Wallet Connect

# Functionality

### `Connect`

Click on Connect button to connect to AlgoSigner. This will dislay wallet address below on successful connection.

### `Disconnect`

Click on Disconnect button to disconnect to AlgoSigner. This will remove wallet address below Connect button and disconnect from wallet.

## Building

### `yarn dev`

Runs the vue app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles vue in production mode and optimizes the build for the best performance.
