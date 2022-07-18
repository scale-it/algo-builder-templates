import { AlgoAppCall } from 'pipeline-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class IncreaseCounter extends Component {
    render() {
        return <>
            <AlgoAppCall
                appId={this.props.appId}
                appArgs={[]}
            />
        </>
    }
}

IncreaseCounter.propTypes = {
    appId: PropTypes.number,
};

export default IncreaseCounter;
