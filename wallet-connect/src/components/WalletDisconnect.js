import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import {
    disconnectWalletAction
} from '../action/actions';

const WalletDisconnect = ({ disconnectWalletAction }) => {
    const logout = useCallback(async () => {
        disconnectWalletAction();
    }, []);

    return (
        <div className="algoSigner">
            <Typography variant="h5">Disconnect the Algosigner</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={logout}
                style={{
                    margin: "5px 0px 5px 0px",
                }}
            >
                Disconnect
            </Button>
        </div>
    );
};

WalletDisconnect.propTypes = {
    disconnectWalletAction: PropTypes.func,
};

WalletDisconnect.defaultProps = {
    disconnectWalletAction: null,
};

const mapDispatchToProps = (dispatch) => ({
    disconnectWalletAction: () => dispatch(disconnectWalletAction()),
});

export default connect(null, mapDispatchToProps)(WalletDisconnect);
