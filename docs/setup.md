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

After you have succesfully added the browser extension, kindly configure the extension and add your accounts to the respective ledgers.

### Adding private-net config to AlgoSigner extension

- Display Name: This is the ledger name of your private-net config. It should be same as `LEDGER` in `/src/algosigner.config.js`.
- Network ID: This is `<network_name>-<network_id>`. network_name, network_id can be found in `./path_to_node/genesis.json` ("network" & "id" fields).
- Network Algod URL: This is `http://<network_host>:<network_port>`. network_host, network_port can be found in `./path_to_node/algod.net`.
- Network Indexer URL: Similar to above, this is URL for indexer.
- Network Headers: You need to add your `<algod_token>` and `<indexer_token>` here. <indexer_token> could be blank if not needed. Format
  - ```
    {"Algod":{"X-Algo-API-Token":"<algod_token>"},"Indexer":{"X-Algo-API-Token":"<indexer_token>"}}
    ```