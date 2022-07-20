import { Component } from 'react';
const { Pipeline } = require('pipeline-ui');

interface ReadAppDataProps {
	appId: number;
}

interface ReadAppDataState {
	counter: number;
}

class ReadAppData extends Component<ReadAppDataProps, ReadAppDataState> {
	constructor(props: ReadAppDataProps) {
		super(props);
		this.state = {
			counter: 0,
		};
	}

	componentDidMount(): void {
		setInterval(async () => {
			console.log(Pipeline.main);
			const res = await Pipeline.readGlobalState(this.props.appId);
			if (
				res.length &&
				res[0]?.value?.uint &&
				res[0]?.value?.uint !== this.state.counter
			) {
				this.setState({ counter: res[0]?.value?.uint });
			}
		}, 10000);
	}

	render() {
		return (
			<>
				<h4>{'Counter: ' + this.state.counter}</h4>
			</>
		);
	}
}

export default ReadAppData;
