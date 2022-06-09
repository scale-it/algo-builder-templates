/* global AlgoSigner */

import './signer.css';

import {
  mainnetURL,
  MyAlgoWalletSession,
  testnetURL,
  WallectConnectSession,
} from '@algo-builder/web';
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

import { Wallets, NetworkTypes } from '../config';
import { PaymentWidget } from './payment-widget';
import { betanetURL } from '@algo-builder/web/build/lib/constants';

function getWalletUrlConfig(networkType) {
  switch (networkType) {
    case NetworkTypes.MAIN_NET:
      return {
        token: '',
        server: mainnetURL,
        port: '',
      };
    case NetworkTypes.TEST_NET:
      return {
        token: '',
        server: testnetURL,
        port: '',
      };
    case NetworkTypes.BETA_NET:
      return {
        token: '',
        server: betanetURL,
        port: '',
      };
    // add your local net config
    case NetworkTypes.PRIVATE_NET:
      return {
        token:
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        server: 'http://localhost',
        port: 4001,
      };
    default:
      return {
        token: '',
        server: '',
        port: '',
      };
  }
}

const WalletExample = () => {
  const [result, setResult] = useState({});
  const [error, setError] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(Wallets.ALGOSIGNER);
  const [selectedtNetwork, setSelectedNetwork] = useState(NetworkTypes.NONE);

  const handleWalletChange = event => {
    setError('');
    setSelectedWallet(event.target.value);
  };

  const handleNetworkChange = event => {
    setSelectedNetwork(event.target.value);
  };

  const action = useCallback(async () => {
    try {
      switch (selectedWallet) {
        case Wallets.ALGOSIGNER:
          await AlgoSigner.connect({
            ledger: selectedtNetwork,
          });
          break;
        case Wallets.MY_ALGO: {
          const connector = new MyAlgoWalletSession(
            getWalletUrlConfig(selectedtNetwork)
          );
          await connector.connectToMyAlgo();
          setResult(connector);
          break;
        }
        case Wallets.WALLET_CONNECT: {
          const connector = new WallectConnectSession(
            getWalletUrlConfig(selectedtNetwork)
          );
          await connector.create(true);
          connector.onConnect((error, response) =>
            console.log(error, response)
          );
          setResult(connector);
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
        <div className="mb-medium">
          <FormControl>
            <FormLabel id="network-form">Select Network</FormLabel>
            <RadioGroup
              color="primary"
              row
              aria-labelledby="network-form"
              value={selectedtNetwork}
              onChange={handleNetworkChange}
            >
              <FormControlLabel
                value={NetworkTypes.MAIN_NET}
                control={<Radio color="primary" />}
                label="Main Net"
              />
              <FormControlLabel
                value={NetworkTypes.TEST_NET}
                control={<Radio color="primary" />}
                label="Test Net"
              />
              <FormControlLabel
                value={NetworkTypes.BETA_NET}
                control={<Radio color="primary" />}
                label="Beta Net"
              />
              <FormControlLabel
                value={NetworkTypes.PRIVATE_NET}
                control={<Radio color="primary" />}
                label="Private Net"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl
          error={error}
          disabled={selectedtNetwork === NetworkTypes.NONE}
        >
          <FormLabel id="wallet-form">Select Wallet</FormLabel>
          <RadioGroup
            color="primary"
            row
            aria-labelledby="wallet-form"
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
          selectedtNetwork={selectedtNetwork}
        />
      </div>
      <div className="mb-medium">
        <Typography variant="h5">Beyonce concert ticket</Typography>
        <PaymentWidget
          buttonText="Buy (10 ALGO)"
          amount={10e6}
          selectedWallet={selectedWallet}
          connector={result}
          selectedtNetwork={selectedtNetwork}
        />
      </div>
    </div>
  );
};

export default function Signer() {
  return (
    <Container>
      <CssBaseline />
      <WalletExample />
    </Container>
  );
}
