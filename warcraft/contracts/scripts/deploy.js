const {
  executeTransaction, convert
} = require('@algo-builder/algob');
const { types } = require('@algo-builder/web');

async function run (runtimeEnv, deployer) {
  const masterAccount = deployer.accountsByName.get('master-account');

  const algoTxnParams = {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    toAccountAddr: managerAcc.addr,
    amountMicroAlgos: 10e6,
    payFlags: {}
  };

  const asaInfo = await deployer.deployASA('warcraft-token', { creator: masterAccount });
  console.log('Warcraft Token: ', asaInfo.assetIndex);

  const appManager = convert.addressToPk(masterAccount.addr);

  const placeholderParam = {
    TMPL_WARCRAFT_TOKEN: asaInfo.assetIndex
  };
  // Create Application
  const appInfo = await deployer.deployApp(
    'stateful.py',
    'clear.py', {
      sender: masterAccount,
      localInts: 1,
      localBytes: 0,
      globalInts: 1,
      globalBytes: 2,
      appArgs: [appManager]
    }, {}, placeholderParam);
    console.log('Warcraft(Stateful) App: ', appInfo.appID);

  const scInitParam = {
    TMPL_APPLICATION_ID: appInfo.appID
  };
  const escrow = await deployer.loadLogic('escrow.py', scInitParam);
  console.log("Escrow address: ", escrow.address());

  algoTxnParams.toAccountAddr = escrow.address();
  await executeTransaction(deployer, algoTxnParams);

  let appArgs = [
    'str:update_escrow',
    convert.addressToPk(escrow.address())
  ];

  const appCallParams = {
    type: types.TransactionType.CallNoOpSSC,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    appID: appInfo.appID,
    payFlags: {},
    appArgs: appArgs
  };
  await executeTransaction(deployer, appCallParams);

  console.log('Escrow updated!');
}

module.exports = { default: run };
