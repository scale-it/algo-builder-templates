# Initial Setup

## `algob` setup

The first and foremost task should be to get started with `algob` cli. Install `Algo Builder` using either of the following commands :

```bash
yarn global add @algo-builder/algob
```
or
```bash
npm install -g @algo-builder/algo
```
If you want to use `algob` with latest, not released version visit [here](https://github.com/scale-it/algo-builder#installation).

The detailed documentation of `algob`can be found [here](https://github.com/scale-it/algo-builder#readme).

NOTE: Please make sure that `yarn global bin` is in your `PATH` directory, to do so execute the following command:

```bash
export PATH="$(yarn global bin):$PATH"
```

## `AlgoSigner` setup

AlgoSigner provides a very user friendly browser extension. The extension can be easily added by visiting chrome store. To know more about AlgoSigner and to get started with it visit [here](https://github.com/PureStake/algosigner#readme).

Before running react app with AlgoSigner:
- Make sure to add your network config to the AlgoSigner extension (display name, id, algod_url, token). Read [this](https://github.com/PureStake/algosigner#custom-networks) for more information on setting up your wallet in algosigner for custom network.
- Add your ledger name (display name) in `algorand.config.js` for private-net, otherwise it would be "TestNet" or "MainNet"
- Custom accounts for private-net in `algob.config.js` can be used within `AlgoSigner.algod` API, but to use them with `AlgoSigner.Accounts`, you need to go to the algosigner extension UI -> import existing account (within your private-net configuration) -> add the account mneumonic (say john's in algob.config.js). Then that account will show in your algosigner wallet as well.

### Sample private-net config for AlgoSigner extension

- Display Name: This is the ledger name of your private-net config. It should be same as `CHAIN_NAME` in `/src/algosigner.config.js`.
- Network ID: This is `<network_name>-<network_id>`. network_name, network_id can be found in `./path_to_node/genesis.json` ("network" & "id" fields).
- Network Algod URL: This is `http://<network_host>:<network_port>`. network_host, network_port can be found in `./path_to_node/algod.net`.
- Network Indexer URL: Similar to above, this is URL for indexer.
- Network Headers: You need to add your `<algod_token>` and `<indexer_token>` here. <indexer_token> could be blank if not needed. Format
  - ```
    {"Algod":{"X-Algo-API-Token":"<algod_token>"},"Indexer":{"X-Algo-API-Token":"<indexer_token>"}}
    ```
```
Display Name = private-net
Network ID = private-v1
Network Algod URL = http://localhost:4001
Network Indexer URL = // blank
Network Headers = {"Algod":{"X-Algo-API-Token":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"Indexer":{"X-Algo-API-Token":""}}
```