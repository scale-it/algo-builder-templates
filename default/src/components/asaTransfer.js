/* global AlgoSigner */
import algosdk from 'algosdk';

import { networks } from '../../algob.config';
import { LEDGER } from '../algosigner.config';

const algodClient = new algosdk.Algodv2(
  networks.default.token,
  networks.default.host,
  networks.default.port
);

async function ASATransfer(asaId, sndrAddr, recvAddr, amount) {
  try {
    const txParams = await AlgoSigner.algod({
      ledger: LEDGER,
      path: '/v2/transactions/params',
    });
    const txn = {
      fee: txParams['min-fee'],
      firstRound: txParams['last-round'],
      lastRound: txParams['last-round'] + 1000,
      genesisHash: txParams['genesis-hash'],
      genesisID: txParams['genesis-id'],
      from: sndrAddr,
      type: 'axfer',
      assetIndex: asaId,
      amount: amount,
      to: recvAddr,
    };
    console.log(txn);
    let signedTxn = await AlgoSigner.sign(txn);
    let sentTxn = await algodClient.sendRawTransaction(signedTxn.blob).do();
    return (
      'Asset transfer transaction successfully sent. ' + JSON.stringify(sentTxn)
    );
  } catch (error) {
    console.error(error);
    return 'ASA Transfer Unsuccessful. Error: ' + error.message;
  }
}

export default ASATransfer;
