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

// Function to load and parse the Jupyter notebook
function loadNotebook(notebookPath) {
	const notebook = fs.readFileSync(notebookPath, "utf8");
	return JSON.parse(notebook);
}

// Function to extract content
function extractNotebookContent(notebook) {
	const codeCells = [];
	const markdownCells = [];
	notebook.cells.forEach((cell) => {
		if (cell.cell_type === "code") {
			codeCells.push(cell.source.join(""));
		} else if (cell.cell_type === "markdown") {
			markdownCells.push(cell.source.join(""));
		}
	});
	return { codeCells, markdownCells };
}

// Format prompt for SambaNova's LLM
function formatPrompt(codeCells, markdownCells) {
	return `
        You are a helpful assistant. Analyze and summarize the following Jupyter Notebook:

        ### Markdown Content (Descriptive Text):
        ${markdownCells.join("\n")}

        ### Code Content (Python Code):
        ${codeCells.join("\n")}

        Summarize what this notebook represents and describe the meaning of the code in a maximum of 3 sentences.
    `;
}

// Summarize notebook
async function summarizeNotebook(notebookPath) {
	const cache = loadCache();
	const notebook = loadNotebook(notebookPath);
	const { codeCells, markdownCells } = extractNotebookContent(notebook);
	const prompt = formatPrompt(codeCells, markdownCells);
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
		// Cache the results
		cache[prompt] = result;
		saveCache(cache);

		return result;
	} catch (error) {
		throw error;
	}
}

// Define routes
// Route to summarize a notebook
router.post("/summarize", async (req, res) => {
	const { notebookPath } = req.body;
	if (!notebookPath || !fs.existsSync(notebookPath)) {
		return res
			.status(400)
			.json({ error: "Invalid or missing notebook path." });
	}
	try {
		const summary = await summarizeNotebook(notebookPath);
		res.json({ summary });
	} catch (err) {
		res.status(500).json({
			error: "Failed to summarize notebook.",
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
