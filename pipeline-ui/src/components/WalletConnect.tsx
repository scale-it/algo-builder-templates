import { Component } from 'react';
const { AlgoAddress, Pipeline, AlgoSignerButton } = require('pipeline-ui');

interface WalletConnectProps {
	updateAddress: Function;
}

interface WalletConnectState {
	address: string;
}

class WalletConnect extends Component<WalletConnectProps, WalletConnectState> {
	constructor(props: WalletConnectProps) {
		super(props);
		this.state = {
			address: '',
		};
	}

	myWallet = Pipeline.init();
	wallet = (addr: string) => {
		this.props.updateAddress(addr);
	};

	render() {
		return (
			<>
				<AlgoSignerButton
					context={this}
					onChange={this.wallet}
					returnTo={'address'}
				/>
				<br />
				<AlgoAddress address={this.state.address} />
				<br />
			</>
		);
	}
}

export default WalletConnect;
