import { Component } from 'react';
import { APP_ID } from "../constant";
import { readLocalStorage } from "../utility";
const { AlgoOpt} = require('pipeline-ui');

class AppOptIn extends Component {

    render() {
        return <>
            <AlgoOpt
                appId={readLocalStorage(APP_ID)}
            />
        </>
    }
}

export default AppOptIn;
