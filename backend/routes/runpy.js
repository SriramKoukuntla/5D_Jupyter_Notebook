import { getKernelWS } from "../entities.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const code = req.body.code;
		const ws = getKernelWS();
		if (!ws || ws.readyState !== 1) {
			console.error(
				"WebSocket is not open. Please create the kernel and WebSocket first."
			);
			return res.status(500).json({
				error: "WebSocket is not open. Please create the kernel and WebSocket first.",
			});
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

		const output = await sendMessage(ws, message);
		// Send a JSON response with the output
		res.json({ output });
	} catch (error) {
		res.status(500).json(error);
	}
});

async function sendMessage(kerWS, message) {
	return new Promise((resolve, reject) => {
		const msgId = message.header.msg_id;
		let output = ""; // To accumulate results
		let errorOccurred = false;

		const handleMessage = (data) => {
			const response = JSON.parse(data);

			// Match the response to the request
			if (response.parent_header?.msg_id === msgId) {
				if (
					response.msg_type === "status" &&
					response.content.execution_state === "idle"
				) {
					// Kernel is done processing
					kerWS.off("message", handleMessage); // Clean up listener
					if (!errorOccurred) {
						resolve(output); // Resolve with accumulated output
					}
				} else if (response.msg_type === "stream") {
					// Handle stream outputs (e.g., print statements)
					output += response.content.text;
				} else if (response.msg_type === "execute_result") {
					// Handle execution result
					output += response.content.data["text/plain"];
				} else if (response.msg_type === "error") {
					// Handle errors
					errorOccurred = true;
					reject(new Error(response.content.evalue));
				}
			}
		};

		// Listen for the response
		kerWS.on("message", handleMessage);

		// Send the message
		if (kerWS.readyState === 1) {
			kerWS.send(JSON.stringify(message), (err) => {
				if (err) {
					kerWS.off("message", handleMessage); // Clean up listener
					reject(new Error("Failed to send message"));
				}
			});
		} else {
			reject(new Error("WebSocket is not open"));
		}
	});
}

export default router;
