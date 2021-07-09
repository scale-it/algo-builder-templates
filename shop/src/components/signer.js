/* global AlgoSigner */
import './signer.css';

import { Button, Container, CssBaseline, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback, useState } from 'react';

import { CHAIN_NAME } from '../algosigner.config';

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
        ledger: CHAIN_NAME,
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

export default function Signer() {
  return (
    <Container>
      <CssBaseline />
      <CheckAlgoSigner />
      <Connect />
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
