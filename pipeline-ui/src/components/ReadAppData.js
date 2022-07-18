import { AlgoReadAppGlobal } from 'pipeline-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ReadAppData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        return <>
            <AlgoReadAppGlobal appId={this.props.appId} context={this} returnTo={"counter"} />
            <h4>{"Counter: " + (this.state.counter.length && this.state?.counter[0]?.value?.uint ? this.state.counter[0].value.uint : 0)}</h4>
        </>
    }
}

ReadAppData.propTypes = {
    appId: PropTypes.number,
};

export default ReadAppData;
