import { AlgoOpt } from 'pipeline-ui';
import React, { Component } from 'react';

import { APP_ID } from "../constant";
import { readLocalStorage } from "../utility";

class AppOptIn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <AlgoOpt
                appId={readLocalStorage(APP_ID)}
            />
        </>
    }
}

export default AppOptIn;
