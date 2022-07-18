import './App.css';

import { SwitchNet } from 'pipeline-ui'
import { Card } from 'pipeline-ui'
import React, { useState } from 'react';

import DeployApp from "./components/DeployApp"
import IncreaseCounter from "./components/IncreaseCounter"
import ReadAppData from './components/ReadAppData';
import WalletConnect from "./components/WalletConnect"
import { APP_ID } from './constant';
import { readLocalStorage } from "./utility";

const App = () => {
  const [address, updateAddress] = useState("");
  const [appId, updateAppId] = useState(undefined);

  setInterval(() => {
    const newAppId = readLocalStorage(APP_ID);
    // if previous app id not same as new one
    if (appId != newAppId) {
      updateAppId(newAppId);
    }
  }, 4000);

  return (
    <Card bg={"light-gray"} width={"auto"} maxWidth={"520px"} mx={"auto"}>
      <div className="App">
        <SwitchNet />
        <br />
        <WalletConnect updateAddress={updateAddress} />
        {address.length ? <DeployApp /> : null}
        {(address.length && appId) ? <>
          <IncreaseCounter appId={parseInt(appId)} />
          <ReadAppData appId={parseInt(appId)} />
        </> : null}
      </div>
    </Card >

  );
}

export default App;
