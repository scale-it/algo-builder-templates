/* global AlgoSigner */
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback } from 'react';
import { CHAIN_NAME } from '../algosigner.config';
import { connect } from 'react-redux';
import {
    updateWalletAddressAction,
} from '../action/actions';

const WalletConnect = ({ walletAddress, updateWalletAddressAction }) => {
    console.log("asd", walletAddress)
    const check = useCallback(async () => {
        connectAlgoSigner();
    }, []);

    const connectAlgoSigner = async () => {
        try {
            const algoSignerResponse = await AlgoSigner.connect({
                ledger: CHAIN_NAME,
            });
            console.log("Connected to AlgoSigner:", algoSignerResponse);
            getUserAccount();
        } catch (e) {
            console.error(e);
        }
    }

    const getUserAccount = async () => {
        const userAccount = await AlgoSigner.accounts({
            ledger: CHAIN_NAME,
        });
        if (userAccount && userAccount.length) {
            console.log("addr", userAccount[0].address)
            updateWalletAddressAction(userAccount[0].address)
        }
    }

    return (
        <div className="algoSigner">
            <Typography variant="h5">Connect with Algosigner</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={check}
                style={{
                    margin: "5px 0px 5px 0px",
                }}
            >
                Connect
            </Button>
            <Typography>
                <code>{walletAddress}</code>
            </Typography>
        </div>
    );
};

WalletConnect.propTypes = {
    walletAddress: PropTypes.string,
    updateWalletAddressAction: PropTypes.func,
};

WalletConnect.defaultProps = {
    walletAddress: "",
    updateWalletAddressAction: null,
};

const mapStateToProps = (state) => ({
    walletAddress: state.walletAddress,
});

const mapDispatchToProps = (dispatch) => ({
    updateWalletAddressAction: (walletAddress) => dispatch(updateWalletAddressAction(walletAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletConnect);
