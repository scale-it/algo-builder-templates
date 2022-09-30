/* global AlgoSigner */
import "./signer.css";

import {
	Button,
	Container,
	CssBaseline,
	Typography,
	TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useCallback, useState } from "react";
import { WithdrawHtlc } from "./withdrawHtlc";
import { CHAIN_NAME } from "../algosigner.config";

const spacing = "10px";

const ExampleAlgoSigner = ({ title, buttonText, buttonAction }) => {
	const [result, setResult] = useState("");

	const check = useCallback(async () => {
		const r = await buttonAction();
		setResult(r);
	}, [buttonAction]);

	return (
		<div className="algoSigner">
			<Typography variant="h5">{title}</Typography>

			<Button
				variant="contained"
				color="primary"
				onClick={check}
				style={{
					margin: "5px 0px 5px 0px",
				}}
			>
				{buttonText}
			</Button>

			<Typography>
				<pre>
					<code>{result}</code>
				</pre>
			</Typography>
		</div>
	);
};

const Connect = () => {
	const action = useCallback(async () => {
		try {
			const response = await AlgoSigner.connect({
				ledger: CHAIN_NAME,
			});
			return JSON.stringify(response, null, 2);
		} catch (e) {
			return JSON.stringify(e.message, null, 12);
		}
	}, []);

	return (
		<ExampleAlgoSigner
			title="Connect with Algosigner"
			buttonText="Connect"
			buttonAction={action}
		/>
	);
};

const GetAccounts = () => {
	const action = useCallback(async () => {
		try {
			const accts = await AlgoSigner.accounts({
				ledger: CHAIN_NAME,
			});
			return JSON.stringify(accts, null, 2);
		} catch (e) {
			return JSON.stringify(e.message, null, 12);
		}
	}, []);

	return (
		<ExampleAlgoSigner
			title="Get Accounts"
			buttonText="Get Accounts"
			buttonAction={action}
		/>
	);
};

const GetEscrowDetails = () => {
	const action = useCallback(async () => {
		try {
			const r = await AlgoSigner.algod({
				ledger: CHAIN_NAME,
				path: `/v2/transactions/params`,
			});
			return JSON.stringify(r, null, 2);
		} catch (e) {
			return JSON.stringify(e.message, null, 12);
		}
	}, []);

	return (
		<ExampleAlgoSigner
			title="Get Escrow Details"
			buttonText="Get Escrow Info"
			buttonAction={action}
		/>
	);
};

const WithdrawEscrow = () => {
	const action = useCallback(async () => {
		try {
			let receiver = document.getElementById("recvAddr").value;
			if (receiver === "") {
				return "Please enter receiver's address.";
			}
			let secret = document.getElementById("secret").value;
			if (secret === "") {
				return "Please enter secret(hash pre-image).";
			}
			let amount = document.getElementById("amount").value;
			if (amount === "") {
				return "Please enter amount.";
			}
			if (!BigInt(amount)) {
				return "Entered amount is not a number or bigint.";
			}
			return await WithdrawHtlc(receiver, secret, BigInt(amount));
		} catch (e) {
			console.error(e);
			return JSON.stringify(e, null, 2);
		}
	}, []);
	return (
		<div>
			<form
				style={{
					marginBottom: "25px",
				}}
				noValidate
				autoComplete="off"
			>
				<Typography variant="h5" style={{ marginBottom: "25px" }}>
					Transaction Parameters
				</Typography>
				<TextField
					id="recvAddr"
					label="Receiver's Account Address"
					variant="outlined"
					color="secondary"
					style={{
						padding: spacing,
					}}
				/>
				<TextField
					id="secret"
					label="Secret (Hash Pre-Image)"
					variant="outlined"
					color="secondary"
					style={{
						padding: spacing,
					}}
				/>
				<TextField
					id="amount"
					type="number"
					label="Amount"
					variant="outlined"
					color="secondary"
					style={{
						padding: spacing,
					}}
				/>
			</form>
			<ExampleAlgoSigner
				title="Withdraw HTLC Escrow using Algob"
				buttonText="Withdraw HTLC Escrow"
				buttonAction={action}
			/>
		</div>
	);
};

export default function Signer() {
	return (
		<Container>
			<CssBaseline />
			<Connect />
			<GetAccounts />
			<GetEscrowDetails />
			<WithdrawEscrow />
		</Container>
	);
}

ExampleAlgoSigner.propTypes = {
	title: PropTypes.string,
	buttonText: PropTypes.string,
	buttonAction: PropTypes.func,
};

ExampleAlgoSigner.defaultProps = {
	title: "",
	buttonText: "",
	buttonAction: null,
};
