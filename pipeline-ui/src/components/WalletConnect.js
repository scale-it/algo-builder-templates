import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MultiWalletConnect, AlgoAddress, Pipeline } from 'pipeline-ui';

class WalletConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Algaddress: ""
        }
    }

    myWallet = Pipeline.init();
    wallet = (event) => {
        console.log("address", event)
        this.props.updateAddress(event);
    };

    render() {

        return <div>
            <MultiWalletConnect
                wallet={this.myWallet}
                context={this}
                returnTo={"Algaddress"}
                onChange={this.wallet}
            />
            <AlgoAddress address={this.state.Algaddress} />
        </div>
    }
}

WalletConnect.propTypes = {
    updateAddress: PropTypes.any,
};

export default WalletConnect;