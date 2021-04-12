/* global AlgoSigner */
import './signer.css';

import { Button, Container, CssBaseline, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback, useState } from 'react';
import WithdrawHtlc from './withdrawHtlc';
import { LEDGER } from '../algosigner.config';

const ExampleAlgoSigner = ({ title, buttonText, buttonAction }) => {
  const [result, setResult] = useState('');

  const check = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <div className="algoSigner">
      <Typography variant="h5">{title}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={check}
        style={{
          margin: '5px 0px 5px 0px',
        }}
      >
        {buttonText}
      </Button>

      <Typography>
        <code>{result}</code>
      </Typography>
    </div>
  );
};

const GetAccounts = () => {
  const action = useCallback(async () => {
    try {
      const accts = await AlgoSigner.accounts({
        ledger: LEDGER,
      });
      return JSON.stringify(accts, null, 2);
    } catch (e) {
      return JSON.stringify(e.message, null, 12);
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="Get Accounts"
      buttonText="Get Accounts"
      buttonAction={action}
    />
  );
};

const GetTxParams = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.algod({
        ledger: LEDGER,
        path: `/v2/transactions/params`,
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);
  return (
    <ExampleAlgoSigner
      title="Get Transaction Params"
      buttonText="Get Tx Params"
      buttonAction={action}
    />
  );
};

const WithdrawEscrow = () => {
  const action = useCallback(async () => {
    try {
      let receiver = document.getElementById("recvAddr").value;
      if (receiver === ""){  return "Please enter receiver's address."}
      let secret = document.getElementById("secret").value;
      if (secret === ""){  return "Please enter secret(hash pre-image)."}
      let amount = document.getElementById("amount").value;
      if (amount === ""){  return "Please enter amount."}
      if (!Number(amount)) { return "Entered amount is not a number."}
      return await WithdrawHtlc(receiver, secret, Number(amount));
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);
  return (
    <form noValidate autoComplete="off">
      <TextField 
        required 
        id="recvAddr" 
        label="Receiver's Account Address" 
        variant="outlined" 
        color="secondary" 
        style={{
          margin: '5px 5px 5px 5px',
        }}
      />
      <TextField 
        required 
        id="secret" 
        label="Secret (Hash Pre-Image)" 
        variant="outlined" 
        color="secondary" 
        style={{
          margin: '5px 5px 5px 5px',
        }}
      />
      <TextField 
        required 
        id="amount" 
        label="Amount" 
        variant="outlined" 
        color="secondary" 
        typeof="number" 
        style={{
          margin: '5px 5px 5px 5px',
        }}
      />
      <ExampleAlgoSigner
        title="Withdraw HTLC Escrow using Algob"
        buttonText="Withdraw HTLC Escrow"
        buttonAction={action}
      />
    </form>
  );
};

export default function Signer() {
  return (
    <Container>
      <CssBaseline />
      <GetAccounts />
      <GetTxParams />
      <WithdrawEscrow />
    </Container>
  );
}

ExampleAlgoSigner.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
};

ExampleAlgoSigner.defaultProps = {
  title: '',
  buttonText: '',
  buttonAction: null,
};
