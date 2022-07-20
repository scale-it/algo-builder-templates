import { Component } from 'react';
import { types, WebMode } from '@algo-builder/web';
import {Button} from "@material-ui/core";
declare var AlgoSigner: any; // eslint-disable-line

interface IncreaseCounterProps {
    addr: string;
    appId: number;
}
 
class IncreaseCounter extends Component<IncreaseCounterProps, {}>  {

    appCall = () => {
        const webMode: WebMode = new WebMode(AlgoSigner, "TestNet");
        const tx: types.ExecParams[] = [{
            type: types.TransactionType.CallApp,
            sign: types.SignType.SecretKey,
            fromAccount: {
                addr: this.props.addr,
                sk: new Uint8Array(0),
            },
            appID: this.props.appId,
            payFlags: {},
        }];
        webMode.executeTx(tx)
    }

    render() {
        return <>
        <Button variant="contained" onClick={this.appCall}>Increase Counter</Button>
            <br />
        </>
    }
}

export default IncreaseCounter;
