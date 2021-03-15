# algorand-builder-templates

Dapps templates for [Algorand Builder](https://github.com/scale-it/algorand-builder). Use these templates to quickly setup/get started with your Dapp implementation.

## Usage
Each template is a single project (with 1 package.json file) comprising of the following:
 - An `algob` project : Used to deploy ASA's, stateless and stateful contracts using algob `deployer` object. Use `algob deploy` to deploy your `/scripts`. Sample algob project can  be found [here](https://github.com/scale-it/algorand-builder/tree/master/packages/algob/sample-project), check the project readme.md for more details.
   Read more about `@algorand-builder/algob` [here](https://github.com/scale-it/algorand-builder/tree/master/packages/algob).
 - [create-react-app](https://github.com/facebook/create-react-app): React js application for your frontend of web dApp. You can use the `AlgoSigner` global object in your app to use it's API's. Example can be found in `/bare` template.

   Deployment information (using `algob deploy` above) is stored in  `checkpoints` (in `/artifacts`) from which user can import information directly (loading `.yaml` file in react-app).

## Add new template / Update existing template

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features/templates

To add a new dapp template or update an existing one, feel free to create a pull request from your fork to this repo.

The project development is open and you can observe progress through [Pivotal tracker board](https://www.pivotaltracker.com/n/projects/2452320).
You can also chat with us through discord on the `#algorand-builder` channel on algorand [discord](https://discord.com/invite/hbcUSuw).
