const { runtime } = require('@algo-builder/algob');

exports.mkParam = function (senderAccount, receiverAddr, amount, payFlags) {
  return {
    type: runtime.types.TransactionType.TransferAlgo,
    sign: runtime.types.SignType.SecretKey,
    fromAccount: senderAccount,
    toAccountAddr: receiverAddr,
    amountMicroAlgos: amount,
    payFlags: payFlags,
  };
};
