/* global AlgoSigner */

import './signer.css';

import { MyAlgoWalletSession, WallectConnectSession } from '@algo-builder/web';
import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useCallback, useState } from 'react';

import { CHAIN_NAME, Wallets } from '../config';
import { PaymentWidget } from './payment-widget';

const WalletExample = () => {
  const [result, setResult] = useState({});
  const [error, setError] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(Wallets.ALGOSIGNER);

  const handleWalletChange = event => {
    setError('');
    setSelectedWallet(event.target.value);
  };

  const action = useCallback(async () => {
    try {
      switch (selectedWallet) {
        case Wallets.ALGOSIGNER:
          await AlgoSigner.connect({
            ledger: CHAIN_NAME,
          });
          break;
        case Wallets.MY_ALGO: {
          const connector = new MyAlgoWalletSession(CHAIN_NAME)
          await connector.connectToMyAlgo();
          setResult(connector)
          break;
        }
        case Wallets.WALLET_CONNECT: {
          const connector = new WallectConnectSession(CHAIN_NAME);
          await connector.create(true);
          connector.onConnect((error, response) => console.log(error, response));
          setResult(connector)
          break;
        }
        default:
          setError('Please select a wallet');
      }
    } catch (e) {
      return JSON.stringify(e.message, null, 12);
    }
  }, [selectedWallet, result]);

  return (
    <div className="mb-medium">
      <div className="mb-medium">
        <FormControl>
          <FormLabel id="wallet-form">Select Wallet</FormLabel>
          <RadioGroup
            color="primary"
            row
            aria-labelledby="wallet-form"
            name="row-radio-buttons-group"
            value={selectedWallet}
            onChange={handleWalletChange}
          >
            <FormControlLabel
              value={Wallets.ALGOSIGNER}
              control={<Radio color="primary" />}
              label="AlgoSigner"
            />
            <FormControlLabel
              value={Wallets.WALLET_CONNECT}
              control={<Radio color="primary" />}
              label="Wallet Connect"
            />
            <FormControlLabel
              value={Wallets.MY_ALGO}
              control={<Radio color="primary" />}
              label="My Algo Wallet"
            />
          </RadioGroup>
        </FormControl>
        {error && <div className="error">{error}</div>}
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={action}
            style={{
              margin: '5px 0px 5px 0px',
            }}
          >
            Connect
          </Button>
        </div>
      </div>
      <div className="mb-medium">
        <Typography variant="h5">Queen concert ticket</Typography>
        <PaymentWidget
          buttonText="Buy (5 ALGO)"
          amount={5e6}
          selectedWallet={selectedWallet}
          connector={result}
        />
      </div>
      <div className="mb-medium">
        <Typography variant="h5">Beyonce concert ticket</Typography>
        <PaymentWidget
          buttonText="Buy (10 ALGO)"
          amount={10e6}
          selectedWallet={selectedWallet}
          connector={result}
        />
      </div>
    </div>
  );
};

export default function Signer () {
  return (
    <Container>
      <CssBaseline />
      <WalletExample />
    </Container>
  );
}

