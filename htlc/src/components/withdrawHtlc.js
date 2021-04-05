const YAMLData = require('../../artifacts/cache/htlc.py.yaml');
const algosdk = require("algosdk");

const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const server = "http://localhost";
const port = 4001;
let algodclient = new algosdk.Algodv2(token, server, port);

const waitForConfirmation = async function (algodclient, txId) {
  let response = await algodclient.status().do();
  let lastround = response["last-round"];
  while (true) {
      const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
      if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
          break;
      }
      lastround++;
      await algodclient.statusAfterBlock(lastround).do();
  }
};

async function WithdrawHtlc() {
  try {
    const sender = YAMLData.compiledHash; //"YEUJZXDQAUA3J6WK3RZQJKHCM3S7E6UQF3I6AKRGTIGACFXDKFSKBYCYKU";
    const receiver = prompt('Enter Receiver Address'); //"EDXG4GGBEHFLNX6A7FGT3F6Z3TQGIU6WVVJNOXGYLVNTLWDOCEJJ35LWJY";
    const secret = prompt('Enter Secret'); //"hero wisdom green split loop element vote belt";
    const amount = prompt('Enter Amount'); // 2e6
    const secretBytes = new Uint8Array(Buffer.from(secret)); 

    const lsig = algosdk.makeLogicSig(YAMLData.base64ToBytes, [secretBytes]);
    if (lsig.tag) { lsig.tag = Uint8Array.from(lsig.tag); }

    let params = await algodclient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    console.log(params);

    amount = amount - params.fee;
    let closeToRemaninder = undefined;
    let note = undefined;
    let txn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, params);

    let signedTx = await algosdk.signLogicSigTransactionObject(txn, lsig);
    let sentTx = (await algodclient.sendRawTransaction(signedTx.blob).do());
    console.log("Transaction : " + sentTx.txId);   
    await waitForConfirmation(algodclient, sentTx.txId);

    return "Escrow withdrawal successful.";
  } catch (error) {
    console.error(error);
    return "Escrow Withdrawal Unsuccessful. Error: " + error.message ;
  }
}

export default WithdrawHtlc;