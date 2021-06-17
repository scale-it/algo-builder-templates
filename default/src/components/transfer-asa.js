/* global AlgoSigner */
import React from 'react';

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
      return pendingInfo;
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
    console.log('SignedTx ', signedTxn);
    let sentTx = await AlgoSigner.send({
      ledger: CHAIN_NAME,
      tx: signedTxn.blob,
    });
    console.log('Sent transaction ', sentTx);

    let response = await waitForConfirmation(sentTx.txId);
    const confirmedTxInfo = {
      txId: sentTx.txId,
      assetIndex: asaId,
      confirmedRound: response[CONFIRMED_ROUND],
    };
    return [
      false,
      <pre key={''}>
        {'ASA transfer successful ' +
          '\n' +
          JSON.stringify(confirmedTxInfo, null, 2)}
      </pre>,
    ];
  } catch (error) {
    console.error(error);
    return [true, 'ASA Transfer Unsuccessful. Error: ' + error.message];
  }
}

export default transferASA;
