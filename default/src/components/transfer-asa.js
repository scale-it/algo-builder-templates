/* global AlgoSigner */
import React from 'react';

import { CHAIN_NAME } from '../algosigner.config';
import { types, WebMode } from "@algo-builder/web";

const CONFIRMED_ROUND = 'confirmed-round';

async function transferASA(asaId, sndrAddr, recvAddr, amount) {
  try {
    const web = new WebMode(AlgoSigner, CHAIN_NAME);
    const tx = {
      type: types.TransactionType.TransferAsset,
      sign: types.SignType.SecretKey,
      fromAccountAddr: sndrAddr,
      toAccountAddr: recvAddr,
      amount: amount,
      assetID: asaId,
      payFlags: { totalFee: 1000 }
    };
    let response = await web.executeTransaction(tx);
    console.log(response);
    const confirmedTxInfo = {
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
