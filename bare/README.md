# Algo Builder Web DApp

This is a boilerplate react and algob project which serves as a template for Dapp using algo builder. It has a single package.json file. `algob` works within the project (using `algob deploy`).

Before running react app with algosigner:
- Make sure to add your network config to the algosigner extension (display name, id, algod_url, token). Read [this](https://github.com/PureStake/algosigner#custom-networks) for more information on setting up your wallet in algosigner for custom network.
- Add your ledger name (display name) in `algorand.config.js` for private-net, otherwise it would be "TestNet" or "MainNet"
- Custom accounts for private-net in `algob.config.js` can be used within `AlgoSigner.algod` API, but to use them with `AlgoSigner.Accounts`, you need to go to the algosigner extension UI -> import existing account (within your private-net configuration) -> add the account mneumonic (say john's in algob.config.js). Then that account will show in your algosigner wallet as well.

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
