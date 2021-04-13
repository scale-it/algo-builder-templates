# HTLC dApp Template

## Hash-Time-Lock-Contract Example using PyTeal

There exists a descriptive example explaining how HTLC contracts work with Algo-Builder. It can be found [here](https://github.com/scale-it/algo-builder/tree/master/examples/htlc-pyteal-ts).

Read [here](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) for more information about the HTLC pattern.

NOTE: Please go through `setup.md` first, you can find it [here](https://github.com/scale-it/algo-builder-templates/tree/master/docs/setup.md).

Files:

* `assets/htlc.py` : This is the smart contract implementing HTLC. SHA256 function is used for hashing. <br />
        secret value : `hero wisdom green split loop element vote belt` hashed with sha256 will be used in this code.
        NOTE: The transaction would fail, if wrong secret is provided.
* `scripts/deploy.ts` : It is used to create and fund HTLC contract account which is defined in `assets/htlc.py`.


## Withdrawing from Escrow using React Frontend

Run `yarn start` to start the development server of the frontend. After the frontend is loaded, make sure you are logged in to the `AlgoSigner` plugin and your ledger is the correct one, i.e., `private` and your accounts are loaded properly too.

After that click on the `Withdraw HTLC Escrow`, the webpage will prompt for `receiever's address` and `secret`, Please provide the correct values to unlock and withdraw from the escrow successfully.

If the receiver's address is not Alice's address, then the code will throw some error. The same applies to Bob's address during the escape condition. 
Also, the timeout value(3001) of the HTLC should also be kept in mind while executing the template.

## Available Scripts

In the project directory, you can run:

### Deploy HTLC Escrow Account

Please make sure that you have properly configured the `algob` cli using the steps mentioned in `setup.md`. 

To verify so, try executing the following command:
```bash
algob --help
```

Execute the following command in the root directory of the project to deploy escrow account.
```bash
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
