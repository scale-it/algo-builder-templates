/* global AlgoSigner */
import { CHAIN_NAME } from '../algosigner.config';

const LAST_ROUND = 'last-round';
const CONFIRMED_ROUND = 'confirmed-round';

const waitForConfirmation = async function (txId) {
  let response = await AlgoSigner.algod({
    ledger: CHAIN_NAME,
    path: '/v2/status',
  });
  console.log(response);
  let lastround = response[LAST_ROUND];
  while (true) {
    const pendingInfo = await AlgoSigner.algod({
      ledger: CHAIN_NAME,
      path: `/v2/transactions/pending/${txId}`,
    });
    if (
      pendingInfo[CONFIRMED_ROUND] !== null &&
      pendingInfo[CONFIRMED_ROUND] > 0
    ) {
      //Got the completed Transaction
      return (
        'Transaction ' +
        txId +
        ' confirmed in round ' +
        pendingInfo[CONFIRMED_ROUND]
      );
    }
    lastround++;
    await AlgoSigner.algod({
      ledger: CHAIN_NAME,
      path: `/v2/status/wait-for-block-after/${lastround}`,
    });
  }
};

async function transferASA(asaId, sndrAddr, recvAddr, amount) {
  try {
    const txParams = await AlgoSigner.algod({
      ledger: CHAIN_NAME,
      path: '/v2/transactions/params',
    });
    const txn = {
      fee: txParams['min-fee'],
      firstRound: txParams[LAST_ROUND],
      lastRound: txParams[LAST_ROUND] + 1000,
      genesisHash: txParams['genesis-hash'],
      genesisID: txParams['genesis-id'],
      from: sndrAddr,
      type: 'axfer',
      assetIndex: asaId,
      amount: amount,
      to: recvAddr,
    };
    let signedTxn = await AlgoSigner.sign(txn);
    let signedTxnBlob = new Uint8Array(Buffer.from(signedTxn.blob, 'base64'));
    let sentTx = await AlgoSigner.send({
      ledger: CHAIN_NAME,
      tx: signedTxnBlob,
    });
    let resp = await waitForConfirmation(sentTx.txId);
    return 'Asset transfer transaction successfull. ' + resp;
  } catch (error) {
    console.error(error);
    return 'ASA Transfer Unsuccessful. Error: ' + error.message;
  }
}

export default transferASA;
