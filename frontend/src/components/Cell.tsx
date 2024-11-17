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

  // Handle Tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      // Get current cursor position and textarea value
      const { selectionStart, selectionEnd } = e.target;
      const value = code;

      // Insert a tab character
      const updatedCode =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);

      // Update code and maintain cursor position
      setCode(updatedCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
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
        onKeyDown={handleKeyDown} // Attach the keydown handler
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
