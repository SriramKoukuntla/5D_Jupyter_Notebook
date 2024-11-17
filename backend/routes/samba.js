import express from "express";
const router = express.Router();
import fs from "fs";
import axios from "axios";

const apiKey = process.env.SAMBA_KEY;
const cacheFile = "llm_cache.json";

// Load cache or initialize an empty cache
function loadCache() {
	if (fs.existsSync(cacheFile)) {
		return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
	}
	return {};
}

// Save cache to file
function saveCache(cache) {
	fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf8");
}

// Format prompt for SambaNova's LLM
function formatCodePrompt(code) {
	return `
        You are a helpful assistant. Analyze the following code and describe its purpose and functionality in simple terms:

        ### Code:
        ${code}

        Provide a brief explanation in a maximum of 2 sentences.
    `;
}

// Explain code
async function explainCode(code) {
	const cache = loadCache();
	const prompt = formatCodePrompt(code);
	if (cache[prompt]) {
		return cache[prompt];
	}

	try {
		const response = await axios.post(
			"https://api.sambanova.ai/v1/chat/completions",
			{
				model: "Meta-Llama-3.1-8B-Instruct",
				messages: [
					{ role: "system", content: "You are a helpful assistant." },
					{ role: "user", content: prompt },
				],
				temperature: 0.3,
				top_p: 0.9,
			},
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		const result = response.data.choices[0].message.content;
		// Cache the result
		cache[prompt] = result;
		saveCache(cache);

		return result;
	} catch (error) {
		throw error;
	}
}

// Define routes
// Route to explain a code cell
router.post("/explain", async (req, res) => {
	const { cell } = req.body;
	if (!cell || typeof cell !== "string") {
		return res
			.status(400)
			.json({ error: "Invalid or missing code cell input." });
	}
	try {
		const explanation = await explainCode(cell);
		res.json({ explanation });
	} catch (err) {
		res.status(500).json({
			error: "Failed to explain code.",
			details: err.message,
		});
	}
});

// Route to get cache
router.get("/cache", (req, res) => {
	const cache = loadCache();
	res.json(cache);
});

// Route to clear cache
router.delete("/cache", (req, res) => {
	fs.writeFileSync(cacheFile, JSON.stringify({}, null, 2), "utf8");
	res.json({ message: "Cache cleared successfully." });
});

export default router;
