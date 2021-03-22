![image](https://github.com/scale-it/algo-builder/blob/master/media/logo.svg) 
# Algo Builder Templates

Dapps templates for [Algo Builder](https://github.com/scale-it/algo-builder). Use these templates to quickly setup/get started with your Dapp implementation.

Distributed Applications or dApps are basically decentralized applications. The templates in this repository are extremely helpful and easy to use. They are designed and implemented in such a way that they can provide the aspiring developers a headstart in building dApps based on `Algorand Blockchain`. The templates heavily use [algosdk](https://github.com/algorand/js-algorand-sdk), [algo-builder](https://github.com/scale-it/algo-builder) and [Algosigner](https://github.com/PureStake/algosigner).

The detailed description about each template and how t prperly use them can be found in their respective folders.

## Usage
Each template is a single project (with 1 package.json file) comprising of the following:
 - An `algob` project : Used to deploy ASA's, stateless and stateful contracts using algob `deployer` object. Use `algob deploy` to deploy your `/scripts`. Sample algob project can  be found [here](https://github.com/scale-it/algo-builder/tree/master/packages/algob/sample-project), check the project `README.md` for more details.
   Read more about `@algo-builder/algob` [here](https://github.com/scale-it/algo-builder/tree/master/packages/algob).
 - [create-react-app](https://github.com/facebook/create-react-app): React js application for your frontend of web dApp. You can use the `AlgoSigner` global object in your app to use it's API's. Example can be found in `/bare` template.

   Deployment information (using `algob deploy` above) is stored in  `checkpoints` (in `/artifacts`) from which user can import information directly (loading `.yaml` file in react-app).

The templates can be easily imported or unboxed using the `algob unbox-template` command. To know how to use `algob` cli, visit [here](https://github.com/scale-it/algo-builder#installation) or simply run the following commands :

```bash

yarn global add "@algo-builder/algob"

export PATH="$(yarn global bin):$PATH"
```


The tutorial to use the command is as follows:

`algob unbox-template <template-name> <destination-directory> --force (flag)`
 - if `destination-directory` is not passed then `pwd` will be used
 - if `template-name` is not passed, then by default template "/bare" is unboxed
 - if `--force` is passed, then files are overwritten
 - if `template-name` passed is not present as an existing template, the command provides an interactive way to choose from the existing templates.
 - If `--force` is not used and there are conflicting files, then user is made to choose whether to overwrite those files or not.
 - The command also asks if the user wants to install the dependencies as a part of the current process.


## Add new template / Update existing template

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features/templates

To add a new dapp template or update an existing one, feel free to create a pull request from your fork to this repo.

The project development is open and you can observe progress through [Pivotal tracker board](https://www.pivotaltracker.com/n/projects/2452320).
You can also chat with us through discord on the `#algo-builder` channel on algorand [discord](https://discord.com/invite/hbcUSuw).
