import './App.css';
import { useState } from 'react';
import DeployApp from './components/DeployApp';
import IncreaseCounter from './components/IncreaseCounter';
import ReadAppData from './components/ReadAppData';
import WalletConnect from './components/WalletConnect';
import { APP_ID } from './constant';
import { readLocalStorage } from './utility';
const { SwitchNet, Card } = require('pipeline-ui');

const App = () => {
	const [address, updateAddress] = useState<string>('');
	const [appId, updateAppId] = useState<string | undefined>(undefined);

	setInterval(() => {
		const newAppId = readLocalStorage(APP_ID);
		// current app id != new app id generated
		if (appId != newAppId) {
			if (newAppId) {
				updateAppId(newAppId);
			}
		}
	}, 4000);

	return (
		<Card bg={'light-gray'} width={'auto'} maxWidth={'520px'} mx={'auto'}>
			<div className="App">
				<h1>Number Increment App</h1>
				<SwitchNet />
				<br />
				<WalletConnect updateAddress={updateAddress} />
				{address.length ? <DeployApp /> : null}
				{address.length && appId ? (
					<>
						<IncreaseCounter addr={address} appId={parseInt(appId)} />
						<ReadAppData appId={parseInt(appId)} />
					</>
				) : null}
			</div>
		</Card>
	);
};

export default App;
