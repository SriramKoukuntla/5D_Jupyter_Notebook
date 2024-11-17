import WebSocket from "ws";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

let kernelId = null;
let kerWS = null;
let supabase = null;

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
			kerWS.on("open", async () => {
				console.log("WebSocket connection to kernel opened.");
				return resolve({ kernelId, kerWS }); // Resolve once the connection opens
			});

			kerWS.on("error", (error) => {
				console.error("WebSocket error:", error.message);
				return reject(error);
			});

			kerWS.on("close", () => {
				return resolve("WebSocket connection to kernel closed.");
			});
		}
	});
}

async function startDatabase() {
	try {
		const supabaseUrl = process.env.SUPABASE_URL;
		const supabaseKey = process.env.SUPABASE_KEY;
		supabase = createClient(supabaseUrl, supabaseKey);
		if (supabase) {
			console.log("Connected to supabase!");
		}
	} catch (error) {
		console.error(error);
	}
}

async function createKernelAndWS() {
	await createKernel();
	await createKernelWS();
}

export async function startServer() {
	dotenv.config();
	createKernelAndWS();
	startDatabase();
}

export function getKernelId() {
	return kernelId;
}

export function getKernelWS() {
	return kerWS;
}

export function getDatabaseConnection() {
	return supabase;
}
