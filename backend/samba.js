const fs = require("fs");
const axios = require("axios");

// SambaNova API key
const apiKey = "45da1703-7bd2-4001-aac0-583b0168a35f";
//cache file
const cacheFile = "llm_cache.json";

//Load cache or initialize an empty cache
function loadCache() {
    if (fs.existsSync(cacheFile)) {
        return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    }
    return {};
}

//Save cache to file
function saveCache(cache) {
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf8");
}

// Function to load and parse the Jupyter notebook
function loadNotebook(notebookPath) {
  const notebook = fs.readFileSync(notebookPath, "utf8");
  return JSON.parse(notebook);
}

// Function to extract code and markdown content from the notebook
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

// Function to format the prompt for SambaNova's LLM
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

// Function to send the notebook content to SambaNova's LLM
async function summarizeNotebook(notebookPath) {
  const cache = loadCache();
  const notebook = loadNotebook(notebookPath);
  const { codeCells, markdownCells } = extractNotebookContent(notebook);
  const prompt = formatPrompt(codeCells, markdownCells);
  if (cache[prompt]) {
    console.log("Cache hit! Returning cached response.");
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
    console.error("Error fetching LLM response:", error.response?.data || error.message);
    throw error;
  }
}

// Main workflow
const notebookPath = "example_notebook.ipynb"; // Replace with your notebook path
summarizeNotebook(notebookPath)
  .then((summary) => {
    console.log("Notebook Summary:\n", summary);
  })
  .catch((err) => {
    console.error("Failed to summarize notebook:", err);
  });
