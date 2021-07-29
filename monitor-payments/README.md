# Monitor Payments app

This is a nodejs app which monitors payment transactions to address ['WWYNX3TKQYVEREVSW6QQP3SXSFOCE3SKUSEIVJ7YAGUPEACNI5UGI4DZCE'](https://github.com/scale-it/algo-builder/blob/master/examples/algob.config-template.js#L20) (this is the master-account defined in our `algob.config.js`) using algorand-indexer.

The app connects to the indexer service (running on `http://localhost:8089` by default), and then queries for new transactions at a constant interval of 1s for the latest round. If a new transaction is received in response, an entry is logged to the console. Eg.
```bash
Server running at http://127.0.0.1:3000/

Received 10 microalgos from addr:EDXG4GGBEHFLNX6A7FGT3F6Z3TQGIU6WVVJNOXGYLVNTLWDOCEJJ35LWJY at round:510

Received 5 microalgos from addr:EDXG4GGBEHFLNX6A7FGT3F6Z3TQGIU6WVVJNOXGYLVNTLWDOCEJJ35LWJY at round:569
...
```

## Usage

NOTE: Make sure that  indexer is up and running on a private-net (connected to `algod` node in [database-updater](https://github.com/algorand/indexer#database-updater)] mode). You can use `make start-indexer` commands in our `/infrastructure` to start the indexer. Read more about setting up and starting the indexer [here](https://github.com/scale-it/algo-builder/blob/develop/infrastructure/README.md#installation-on-local).

Use `yarn install` to install dependencies and run `yarn start` to start the server (on `localhost:3000`). After the server is started, if any new algo payment is made the "to" the address specified above, then it will be logged to the console.

For example, try running `./shop` template and buy a concert ticket. It's reciever is the master-account address specified above. After a purchase, you will notice an entry is logged to the console, specifying the payment sender and amount.