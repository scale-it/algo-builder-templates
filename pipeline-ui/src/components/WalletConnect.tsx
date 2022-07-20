import { Component } from 'react';
const { AlgoAddress, Pipeline, AlgoSignerButton } = require('pipeline-ui');

interface WalletConnectProps {
	updateAddress: Function;
}

interface WalletConnectState {
	Algaddress: string;
}

class WalletConnect extends Component<WalletConnectProps, WalletConnectState> {
	constructor(props: WalletConnectProps) {
		super(props);
		this.state = {
			Algaddress: '',
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
					returnTo={'Algaddress'}
				/>
				<br />
				<AlgoAddress address={this.state.Algaddress} />
				<br />
			</>
		);
	}
}

export default WalletConnect;
