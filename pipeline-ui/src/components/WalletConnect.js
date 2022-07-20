import { AlgoAddress, Pipeline, AlgoSignerButton } from 'pipeline-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class WalletConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Algaddress: ""
        }
    }

    myWallet = Pipeline.init();
    wallet = (addr) => {
        this.props.updateAddress(addr);
    };

    render() {
        return <>
            <AlgoSignerButton
                context={this}
                onChange={this.wallet}
                returnTo={"Algaddress"}
            />
            <br />
            <AlgoAddress address={this.state.Algaddress} />
            <br />
        </>
    }
}

WalletConnect.propTypes = {
    updateAddress: PropTypes.any,
};

export default WalletConnect;