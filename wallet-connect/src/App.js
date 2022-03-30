import "./App.css";
import { Typography } from "@material-ui/core";
import React from "react";
import AlgoSigner from "./components/AlgoSigner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4">
          Simple React App Using AlgoSigner with state management{" "}
        </Typography>
        <AlgoSigner />
      </header>
    </div>
  );
}

export default App;
