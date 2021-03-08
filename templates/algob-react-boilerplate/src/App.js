import './App.css';

import { Typography } from '@material-ui/core';

import Signer from './components/signer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4">
          {' '}
          Simple React App Using AlgoSigner
          {' '}
        </Typography>
        <Signer />
      </header>
    </div>
  );
}

export default App;
