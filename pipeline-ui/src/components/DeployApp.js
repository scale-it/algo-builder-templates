import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlgoDeploy } from 'pipeline-ui';
import raw from '../teal/approval_program.txt';
import raw2 from '../teal/clear_program.txt';
import { APP_ID } from "../constant";
import { storeInLocalStorage, clearLocalStorage } from "../utility";

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
        let data = await fetch(raw)
        this.setState({ program: await data.text() })
        let data2 = await fetch(raw2)
        this.setState({ clearProgram: await data2.text() })
    }

    async componentDidMount() {
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
        </>
    }
}

Deploy.propTypes = {
    updateAddress: PropTypes.func,
};

export default Deploy;
