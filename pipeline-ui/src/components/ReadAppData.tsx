import { Component } from 'react';
const { AlgoReadAppGlobal} = require('pipeline-ui');

interface ReadAppDataProps {
    appId: number;
 }

interface ReadAppDataState {
    globalState: any;
 }

class ReadAppData extends Component<ReadAppDataProps,  ReadAppDataState> {

    constructor(props: ReadAppDataProps) {
        super(props);
        this.state = {
            globalState: 0
        }
    }

    render() {
        return <>
            <AlgoReadAppGlobal appId={this.props.appId} context={this} returnTo={"globalState"} />
            <h4>{"Counter: " + (this.state.globalState.length && this.state?.globalState[0]?.value?.uint ? this.state.globalState[0].value.uint : 0)}</h4>
        </>
    }
}

export default ReadAppData;
