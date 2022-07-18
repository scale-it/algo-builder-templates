import { AlgoDeploy } from 'pipeline-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { APP_ID } from "../constant";
import approval_program from '../teal/approval_program.txt';
import clear_program from '../teal/clear_program.txt';
import { clearLocalStorage, storeInLocalStorage } from "../utility";

class Deploy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            program: "",
            clearProgram: "",
            appArgs: [],
            bytesInts: [1, 1, 1, 1],
            appIndex: undefined
        }
    }

    getContract = async () => {
        let approval_program_data = await fetch(approval_program)
        this.setState({ program: await approval_program_data.text() })
        let clear_program_data = await fetch(clear_program)
        this.setState({ clearProgram: await clear_program_data.text() })
    }

    componentDidMount() {
        this.getContract();
    }

    handleChange = (value) => {
        // clear previous app id before storing new one
        clearLocalStorage();
        storeInLocalStorage(APP_ID, value);
    }

    render() {
        return <>
            <AlgoDeploy
                tealProgram={this.state.program}
                tealClear={this.state.clearProgram}
                bytesInts={this.state.bytesInts}
                appArgs={this.state.appArgs}
                onChange={this.handleChange}
            />
            <br />
        </>
    }
}

Deploy.propTypes = {
    updateAddress: PropTypes.func,
};

export default Deploy;
