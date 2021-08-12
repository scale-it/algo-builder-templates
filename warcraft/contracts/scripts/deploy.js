const {
  executeTransaction, convert
} = require('@algo-builder/algob');
const { types } = require('@algo-builder/web');

async function run (runtimeEnv, deployer) {
  const masterAccount = deployer.accountsByName.get('master');
  const managerAcc = deployer.accountsByName.get('alice');
  const bobAccount = deployer.accountsByName.get('bob');

  const algoTxnParams = {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    toAccountAddr: managerAcc.addr,
    amountMicroAlgos: 10e6,
    payFlags: {}
  };
  await executeTransaction(deployer, algoTxnParams);
  algoTxnParams.toAccountAddr = bobAccount.addr;
  await executeTransaction(deployer, algoTxnParams);

  const asaInfo = await deployer.deployASA('warcraft-token', { creator: masterAccount });
  console.log('Warcraft Token: ', asaInfo.assetIndex);

  await deployer.optInAcountToASA('warcraft-token', 'bob', {});
  const sendAsaTx = {
    type: types.TransactionType.TransferAsset,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    toAccountAddr: bobAccount.addr,
    amount: 20,
    assetID: asaInfo.assetIndex,
    payFlags: {}
  }
  await executeTransaction(deployer, sendAsaTx);

  const placeholderParam = {
    TMPL_WARCRAFT_TOKEN: asaInfo.assetIndex,
    TMPL_MANAGER: managerAcc.addr
  };
  // Create Application
  const appInfo = await deployer.deployApp(
    'stateful.py',
    'clear.py', {
      sender: masterAccount,
      localInts: 1,
      localBytes: 0,
      globalInts: 1,
      globalBytes: 2
    }, {}, placeholderParam);
    console.log('Warcraft(Stateful) App: ', appInfo.appID);

  const scInitParam = {
    TMPL_APPLICATION_ID: appInfo.appID,
    TMPL_MANAGER: managerAcc.addr
  };
  const escrow = await deployer.loadLogic('escrow.py', scInitParam);
  console.log("Escrow address: ", escrow.address());

  algoTxnParams.toAccountAddr = escrow.address();
  await executeTransaction(deployer, algoTxnParams);
  const optInTx = [
    {
      type: types.TransactionType.TransferAlgo,
      sign: types.SignType.SecretKey,
      fromAccount: managerAcc,
      toAccountAddr: escrow.address(),
      amountMicroAlgos: 0,
      payFlags: {}
    },
    {
      type: types.TransactionType.OptInASA,
      sign: types.SignType.LogicSignature,
      fromAccountAddr: escrow.address(),
      lsig: escrow,
      assetID: asaInfo.assetIndex,
      payFlags: {}
    }
  ];
  await executeTransaction(deployer, optInTx);

  let appArgs = [
    'str:update_escrow',
    convert.addressToPk(escrow.address())
  ];

  const appCallParams = {
    type: types.TransactionType.CallNoOpSSC,
    sign: types.SignType.SecretKey,
    fromAccount: managerAcc,
    appID: appInfo.appID,
    payFlags: {},
    appArgs: appArgs
  };
  await executeTransaction(deployer, appCallParams);

  console.log('Escrow updated!');
}

module.exports = { default: run };
