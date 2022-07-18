import { AlgoAddress, MultiWalletConnect, Pipeline } from 'pipeline-ui';
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

        return <div>
            <MultiWalletConnect
                wallet={this.myWallet}
                context={this}
                returnTo={"Algaddress"}
                onChange={this.wallet}
            />
            <br />
            <AlgoAddress address={this.state.Algaddress} />
            <br />
        </div>
    }
}

WalletConnect.propTypes = {
    updateAddress: PropTypes.any,
};

export default WalletConnect;