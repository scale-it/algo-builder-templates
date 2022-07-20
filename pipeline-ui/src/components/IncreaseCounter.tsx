/* global AlgoSigner */
import { WebMode } from '@algo-builder/web';
import { Component } from 'react';
const { AlgoAppCall } = require('pipeline-ui');

interface AppProps {
    appId: number;
 }
 
class IncreaseCounter extends Component<AppProps, {}>  {
    render() {
        return <>
            <AlgoAppCall
                appId={this.props.appId}
                appArgs={[]}
            />
            <br />
        </>
    }
}

export default IncreaseCounter;
