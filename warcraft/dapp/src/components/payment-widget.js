/* global AlgoSigner */
import "./signer.css";

import { types, WebMode } from "@algo-builder/web";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useCallback, useState } from "react";

import { CHAIN_NAME } from "../algosigner.config";

const CONFIRMED_ROUND = "confirmed-round";
const toAddress = 'ZY2DK4LQUES2BUJD3YTAGG5A4722PZNAEUTW4M6DGDD5M3MQISTTA67KFA';
const assetIndex = 35;
const appIndex = 38;

/**
 * Get default account address from user's wallet. Returns undefined otherwise.
 * NOTE: Currently this returns the first address from list of account addresses
 *
 * TODO: Update this function to return "current active" account in wallet after
 * https://github.com/PureStake/algosigner/issues/252 is resolved.
 * Task - https://www.pivotaltracker.com/story/show/178760753
 */
async function getDefaultAccountAddr() {
  const walletAccounts =
    (await AlgoSigner.accounts({
      ledger: CHAIN_NAME,
    })) ?? [];

  if (walletAccounts.length) {
    return walletAccounts[0].address;
  }
  return undefined;
}

/**
 * Executes transaction to receive payment of ticket
 * @param fromAddress address of currently active account in wallet
 * @param toAddress address to recieve payment (currently set to master-account)
 * @param amount amount (in ALGOs)
 * @param setLoading setLoading function to set loading state in button
 * @returns response of transaction OR rejection message
 */
async function executePayment(fromAddress, setLoading) {
  try {
    const web = new WebMode(AlgoSigner, CHAIN_NAME);
    const groupTx = [
      {
        type: types.TransactionType.TransferAsset,
        sign: types.SignType.SecretKey,
        fromAccountAddr: fromAddress,
        toAccountAddr: toAddress,
        assetID: assetIndex,
        amount: 1,
        payFlags: {},
      },
      {
        type: types.TransactionType.OptInToApp,
        sign: types.SignType.SecretKey,
        fromAccountAddr: fromAddress,
        toAccountAddr: toAddress,
        appID: appIndex,
        payFlags: {},
      },
    ];
    // show loading state on button while we send & wait for transaction response
    setLoading(true);
    let response = await web.executeTransaction(groupTx);
    console.log(response);
    const confirmedTxInfo = {
      txId: response.txId,
      confirmedRound: response[CONFIRMED_ROUND],
    };

    return [
      <pre key={""}>
        {"Succesfully deposited Token in round: " +
          "\n" +
          JSON.stringify(confirmedTxInfo, null, 2) +
          "\nRegistered user: " + fromAddress}
      </pre>,
    ];
  } catch (error) {
    console.error(error);
    return ["Error Occurred: " + error.message];
  }
}

/**
 * Widget to trigger a purchase on click. Consists of a Button, Loading State
 * and a text prop to show below button (where text is the transaction response)
 * @param buttonText text to display on button
 * @param amount amount(of ticket) in ALGOs to charge user
 */
export const PaymentWidget = ({ buttonText, amount }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const executeTx = useCallback(async () => {
    // This is the master account address present in algob.config.js
    // We will take payments in this address
    const fromAddress = await getDefaultAccountAddr();

    if (fromAddress) {
      setResult("processing...");
      const response = await executePayment(
        fromAddress, 
        setLoading
      );
      setResult(response);
    } else {
      setResult("No accounts found in wallet");
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={executeTx}
        style={{
          margin: "5px 0px 5px 0px",
        }}
      >
        {loading ? (
          <CircularProgress
            color="white"
            style={{
              padding: "8px 8px 8px 8px",
              margin: "-6px 24px -6px 24px",
            }}
          />
        ) : (
          buttonText
        )}
      </Button>

      <Typography>
        <code>{result}</code>
      </Typography>
    </div>
  );
};

PaymentWidget.propTypes = {
  buttonText: PropTypes.string,
  amount: PropTypes.number,
};

PaymentWidget.defaultProps = {
  buttonText: "",
  amount: 0,
};
