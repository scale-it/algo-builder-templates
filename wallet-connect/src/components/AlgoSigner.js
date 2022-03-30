import { CssBaseline } from '@material-ui/core';
import React from 'react';
import WalletConnect from './WalletConnect'
import WalletDisconnect from './WalletDisconnect'

const AlgoSigner = () => {
  return (
    <>
      <CssBaseline />
      < WalletConnect />
      <WalletDisconnect />
    </>
  );
}

export default AlgoSigner;
