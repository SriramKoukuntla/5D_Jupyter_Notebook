import React, { useState } from "react";
import "./Cell.css";

const Cell = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  // Function to simulate code execution
  const executeCode = () => {
    try {
      // Use eval for simplicity; replace with a safer execution method in a real app
      const result = eval(code);
      setOutput(result?.toString() || "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="cell">
      {/* Input Section */}
      <textarea
        className="input"
        placeholder="Type your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Execute Button */}
      <button className="run-button" onClick={executeCode}>
        Run
      </button>

      {/* Output Section */}
      <div className="output-container">
        <h3>Output:</h3>
        <div className="output">{output}</div>
      </div>
    </div>
  );
};

export default Cell;
