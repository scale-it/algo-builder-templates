import './App.css';
import Signer from "./components/signer";
import { Typography } from '@material-ui/core'

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <Typography variant="h4"> Simple React App Using AlgoSigner </Typography>
        <Signer />
      </header>
    </div>
  );
}

export default App;
