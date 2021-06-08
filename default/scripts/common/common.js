const { types } = require('@algo-builder/runtime');

exports.mkParam = function (senderAccount, receiverAddr, amount, payFlags) {
  return {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: senderAccount,
    toAccountAddr: receiverAddr,
    amountMicroAlgos: amount,
    payFlags: payFlags,
  };
};
