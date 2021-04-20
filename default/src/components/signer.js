/* global AlgoSigner */
import './signer.css';

import { Button, Container, CssBaseline, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback, useState } from 'react';

import * as YAMLData from '../../artifacts/scripts/asaDeploy.js.cp.yaml';
import { LEDGER } from '../algosigner.config';
import ASATransfer from './asaTransfer';

const spacing = '50px 50px 50px 50px';

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

const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    if (typeof AlgoSigner !== 'undefined') {
      return 'AlgoSigner is installed.';
    }
    return 'AlgoSigner is NOT installed.';
  }, []);

  return (
    <ExampleAlgoSigner
      title="Check if algosigner is installed"
      buttonText="Check"
      buttonAction={action}
    />
  );
};

const Connect = () => {
  const action = useCallback(async () => {
    try {
      const response = await AlgoSigner.connect({
        ledger: LEDGER,
      });
      return JSON.stringify(response, null, 2);
    } catch (e) {
      return JSON.stringify(e.message, null, 12);
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="Connect with Algosigner"
      buttonText="Connect"
      buttonAction={action}
    />
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

const SendASA = () => {
  let asaData = YAMLData.default.default.asa;
  let deployedASAName;
  let deployedASAId;
  let asaId;
  for (const [key, value] of Object.entries(asaData)) {
    deployedASAName = key;
    deployedASAId = value.assetIndex;
  }

  const [result, setResult] = useState('');

  const action1 = useCallback(async () => {
    asaId = deployedASAId;
  });

  const action2 = useCallback(async () => {
    asaId = prompt('Please enter ASA ID');
  });

  const transfer = useCallback(async () => {
    try {
      let receiver = document.getElementById('recvAddr').value;
      if (receiver === '') {
        return "Please enter receiver's address.";
      }
      let sender = document.getElementById('sndrAddr').value;
      if (sender === '') {
        return "Please enter sender's address.";
      }
      let amount = document.getElementById('amount').value;
      if (amount === '') {
        return 'Please enter amount.';
      }
      if (!Number(asaId)) {
        return 'Entered ASA ID is not a number.';
      }
      if (!Number(amount)) {
        return 'Entered amount is not a number.';
      }
      const r = await ASATransfer(
        Number(asaId),
        sender,
        receiver,
        Number(amount)
      );
      setResult(r);
    } catch (e) {
      console.error(e);
      setResult(JSON.stringify(e, null, 2));
    }
  }, []);
  return (
    <div>
      <Typography variant="h5" style={{ margin: { spacing } }}>
        ASA Transfer using AlgoSigner
      </Typography>
      <div>
        <PopupState variant="popover" popupId="popup-menu">
          {popupState => (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                {...bindTrigger(popupState)}
                style={{
                  margin: { spacing },
                }}
              >
                Choose ASA
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    action1();
                  }}
                >
                  {deployedASAName}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    action2();
                  }}
                >
                  Other
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <TextField
          id="sndrAddr"
          label="Sender's Account Address"
          variant="outlined"
          color="secondary"
          style={{
            margin: { spacing },
          }}
        />
        <TextField
          id="recvAddr"
          label="Receiver's Account Address"
          variant="outlined"
          color="secondary"
          style={{
            margin: { spacing },
          }}
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          color="secondary"
          style={{
            margin: { spacing },
          }}
        />
      </div>
      <ExampleAlgoSigner
        title=""
        buttonText="Send ASA"
        buttonAction={transfer}
      />
      <Typography>
        <code>{result}</code>
      </Typography>
    </div>
  );
};

export default function Signer() {
  return (
    <Container>
      <CssBaseline />
      <CheckAlgoSigner />
      <Connect />
      <GetAccounts />
      <GetTxParams />
      <SendASA />
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
