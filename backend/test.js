import WebSocket from "ws";
import axios from "axios";
import {
	createKernelAndTerminal,
	getKernelId,
	getKernelWS,
	getTerminalId,
	getTerminalWS,
} from "./entities.js";

// Function to execute code in the kernel
function executeCodeInKernel(code) {
	const ws = getKernelWS();
	if (!ws || ws.readyState !== WebSocket.OPEN) {
		console.error(
			"WebSocket is not open. Please create the kernel and WebSocket first."
		);
		return;
	}

	const message = {
		header: {
			msg_id: `execute_${Date.now()}`, // Unique ID for each request
			username: "user",
			session: "session_1",
			msg_type: "execute_request",
			version: "5.3",
		},
		parent_header: {},
		metadata: {},
		content: {
			code: code, // Code to execute
			silent: false,
		},
	};

	ws.send(JSON.stringify(message));
}

const dependency = async () => {
	const termWS = getTerminalWS();

	if (!termWS || termWS.readyState !== WebSocket.OPEN) {
		console.error(
			"Terminal WebSocket is not open. Please create it first."
		);
		return;
	}

	// Command to install the dependency
	const installCommand = `pip install pandas\n`;
	termWS.send(installCommand);
};
// Example usage
const code = async () => {
	try {
		executeCodeInKernel(`
		import pandas as pd

		# Create a DataFrame
		data = {'Name': ['Alice', 'Bob', 'Charlie'],
				'Age': [25, 30, 35],
				'City': ['New York', 'Los Angeles', 'Chicago']}
		df = pd.DataFrame(data)

		# Filter rows where Age > 25
		filtered_df = df[df['Age'] > 25]

		# Print summary
		summary = df.describe()

		filtered_df, summary
	`);
	} catch (error) {
		console.error("Error:", error.message);
	}
};

await createKernelAndTerminal();
dependency();
code();
