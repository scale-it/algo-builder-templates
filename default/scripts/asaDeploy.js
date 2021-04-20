const { balanceOf } = require('@algo-builder/algob');

/*
  Create "gold" Algorand Standard Asset (ASA).
  Accounts are loaded from config.
  To use ASA, accounts have to opt-in. Owner is opt-in by default.
*/
async function run(runtimeEnv, deployer) {
  console.log('[gold]: Script has started execution!');

  // we start with extracting acocunt objects from the config.
  const goldOwner = deployer.accountsByName.get('alice');

  // Let's deploy ASA. The following commnad will open the `assets/asa.yaml` file and search for
  // the `gold` ASA. The transaction can specify standard transaction parameters. If skipped
  // node suggested values will be used.
  const asaInfo = await deployer.deployASA('gold', {
    creator: goldOwner,
  });
  console.log(asaInfo);

  // In asa.yaml we only added `john` to opt-in accounts. Let's add `bob` as well using the
  // script;
  await deployer.optInAcountToASA('gold', 'bob', {});

  // to interact with an asset we need asset ID. We can get it from the returned object:
  const assetID = asaInfo.assetIndex;

  // we can inspect the balance of the goldOnwer. It should equal to the `total` value defined
  // in the asa.yaml.
  await balanceOf(deployer, goldOwner.addr, assetID);

  console.log('[gold]: Script execution has finished!');
}

module.exports = { default: run };
