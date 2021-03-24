/* global AlgoSigner */
import { LEDGER } from '../algosigner.config';
import * as YAMLData from '../../artifacts/cache/htlc.py.yaml';

const algosdk = require("algosdk");

async function WithdrawHtlc() {
  try {

    const sndrAddr = prompt("Enter Escrow Address");
    const recvAddr = prompt("Enter Receiver Address");
    const secret = prompt("Enter Secret");
    const secretBytes = new Uint8Array(Buffer.from(secret)); 

    const txParams = await AlgoSigner.algod({
      ledger: LEDGER,
      path: `/v2/transactions/params`,
    });

    const lsig = algosdk.makeLogicSig(YAMLData.base64ToBytes, [secretBytes]);
    if (lsig.tag) { lsig.tag = Uint8Array.from(lsig.tag); }

    let tx = {
      type: 'pay',
      from: sndrAddr,
      to: recvAddr,
      amount: 0,
      suggestedParams : {
        fee: 0,
        genesisID: txParams["genesis-id"],
        genesisHash: txParams["genesis-hash"],
        firstRound: txParams['last-round'],
        lastRound: txParams['last-round'] + 1000,
      },
      rekeyTo: undefined
    };

    let txn = await algosdk.makePaymentTxnWithSuggestedParamsFromObject(tx);
    console.log("Transaction object created.");

    let signedTx = await algosdk.signLogicSigTransactionObject(txn, lsig);
    console.log("Transaction object signed logically.");

    let resp = AlgoSigner.send({
      ledger: LEDGER,
      tx: signedTx.blob
    });
    console.log("Transaction sent using AlgoSigner.");
    console.log("Response: ", resp);

    return "Escrow withdrawal successful.";
  } catch (error) {
    console.error(error);
    return error.message ;
  }
}

export default WithdrawHtlc;