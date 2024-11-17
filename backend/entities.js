import WebSocket from "ws";
import axios from "axios";

const JUPYTER_URL = "http://127.0.0.1:8888";
const TOKEN = "f29adc571c49445f78088c6ef9a2dcddeafd808daba89c69";

let kernelId = null;
let kerWS = null;
let termId = null;
let termWS = null;

async function createKernel() {
	const kernelResponse = await axios.post(
		`${JUPYTER_URL}/api/kernels?token=${TOKEN}`,
		{ name: "python3" }
	);
	kernelId = kernelResponse.data.id;
	console.log(`Kernel created with ID: ${kernelId}`);
}

async function createKernelWS() {
	const wsUrl = `${JUPYTER_URL.replace(
		"http",
		"ws"
	)}/api/kernels/${kernelId}/channels?token=${TOKEN}`;
	kerWS = new WebSocket(wsUrl);

	return new Promise((resolve, reject) => {
		if (kerWS) {
			kerWS.on("open", () => {
				console.log("WebSocket connection opened.");
				resolve({ kernelId, kerWS }); // Resolve once the connection opens
			});

			kerWS.on("error", (error) => {
				console.error("WebSocket error:", error.message);
				reject(error);
			});

			kerWS.on("message", (data) => {
				const message = JSON.parse(data);
				if (message.msg_type === "execute_result") {
					console.log("Result:", message.content.data["text/plain"]);
				}

				// Handle stream outputs for print() statements
				if (message.msg_type === "stream") {
					console.log("Output:", message.content.text);
				}

				// Handle errors
				if (message.msg_type === "error") {
					console.error("Error:", message.content.evalue);
				}
			});

			kerWS.on("close", () => {
				console.log("WebSocket connection closed.");
			});
		}
	});
}

async function createTerminal() {
	try {
		const response = await axios.post(
			`${JUPYTER_URL}/api/terminals?token=${TOKEN}`
		);
		termId = response.data.name; // Terminal ID
		console.log(`Terminal created with ID: ${termId}`);
	} catch (error) {
		console.error(
			"Error creating terminal:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
}

async function createTerminalWS() {
	try {
		const wsUrl = `${JUPYTER_URL.replace(
			"http",
			"ws"
		)}/terminals/websocket/${termId}?token=${TOKEN}`;
		termWS = new WebSocket(wsUrl);

		return new Promise((resolve, reject) => {
			termWS.on("open", () => {
				console.log("WebSocket connection to terminal opened.");
				resolve(termWS);
			});

			termWS.on("message", (data) => {
				console.log("Terminal output:", data.toString());
			});

			termWS.on("error", (error) => {
				console.error("WebSocket error:", error.message);
				reject(error);
			});

			termWS.on("close", () => {
				console.log("WebSocket connection to terminal closed.");
			});
		});
	} catch (error) {
		console.error("Error connecting to terminal WebSocket:", error.message);
		throw error;
	}
}

export async function createKernelAndTerminal() {
	await createKernel();
	await createKernelWS();
	await createTerminal();
	await createTerminalWS();
}

export function getKernelId() {
	return kernelId;
}

export function getKernelWS() {
	return kerWS;
}

export function getTerminalId() {
	return termId;
}

export function getTerminalWS() {
	return termWS;
}
