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
        // Cache the results
        cache[prompt] = result;
        saveCache(cache);

		return result;
	} catch (error) {
		throw error;
	}
}


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

module.exports = router;
