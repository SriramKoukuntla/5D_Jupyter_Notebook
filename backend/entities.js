import WebSocket from "ws";
import axios from "axios";

const JUPYTER_URL = "http://127.0.0.1:8888";
const TOKEN = "7a9f1acc7ee40ec044822595fa9eddb566ace21992335448";

let kernelId = null;
let kerWS = null;

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
				console.log("WebSocket connection to kernel opened.");
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
				console.log("WebSocket connection to kernel closed.");
			});
		}
	});
}

export async function createKernelAndWS() {
	await createKernel();
	await createKernelWS();
}

export function getKernelId() {
	return kernelId;
}

export function getKernelWS() {
	return kerWS;
}
