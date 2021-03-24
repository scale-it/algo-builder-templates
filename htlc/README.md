# HTLC dApp Template

## Hash-Time-Lock-Contract Example in Typescript using PyTeal

There exists a descriptive example explaining how HTLC contracts work with Algo-Builder. It can be found [here](https://github.com/scale-it/algo-builder/tree/master/examples/htlc-pyteal-ts).

Read [here](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) for more information about the HTLC pattern.

Files:

* `assets/htlc.py` : It is the HTLC. SHA256 function is used for hashing. <br />
        secret value : `sample secret key` hashed with sha256 will be used in this code.
* `scripts/deploy.ts` : It is used to create and fund HTLC contract account which is defined in `assets/htlc.py`.


### Adding private-net config to algosigner extension

- Display Name: This is the ledger name of your private-net config. It should be same as `LEDGER` in `/src/algosigner.config.js`.
- Network ID: This is `<network_name>-<network_id>`. network_name, network_id can be found in `./path_to_node/genesis.json` ("network" & "id" fields).
- Network Algod URL: This is `http://<network_host>:<network_port>`. network_host, network_port can be found in `./path_to_node/algod.net`.
- Network Indexer URL: Similar to above, this is URL for indexer.
- Network Headers: You need to add your `<algod_token>` and `<indexer_token>` here. <indexer_token> could be blank if not needed. Format
  - ```
    {"Algod":{"X-Algo-API-Token":"<algod_token>"},"Indexer":{"X-Algo-API-Token":"<indexer_token>"}}
    ```

## Available Scripts

In the project directory, you can run:

### Deploy HTLC Escrow Account

```
yarn run algob deploy
```

### `yarn start`

Runs the react app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
