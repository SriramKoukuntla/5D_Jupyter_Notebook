import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css'; // Import xterm styles

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const commandBufferRef = useRef(''); // Buffer to hold user input before "Enter"

  useEffect(() => {
    const xterm = new Terminal({
      cursorBlink: true,
      rows: 20,
      cols: 80,
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
      },
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xtermRef.current = xterm;

    // Attach xterm to the DOM
    if (terminalRef.current) {
      xterm.open(terminalRef.current);
      fitAddon.fit();
    }

    // Welcome message
    xterm.writeln('Welcome to the Xterm.js Terminal');
    xterm.writeln('Type commands below:');
    xterm.writeln('');

    // Handle user input
    xterm.onData((data) => {
      if (data === '\r') {
        // Handle "Enter" key (Carriage Return)
        xterm.write('\r\n'); // Move to a new line
        const command = commandBufferRef.current.trim(); // Get command from buffer
        commandBufferRef.current = ''; // Clear buffer

        if (command) {
          // Echo the entered command (you can replace this with actual command handling)
          xterm.writeln(`You typed: ${command}`);
        }
      } else if (data === '\u007F') {
        // Handle Backspace
        if (commandBufferRef.current.length > 0) {
          commandBufferRef.current = commandBufferRef.current.slice(0, -1);
          xterm.write('\b \b'); // Remove the last character visually
        }
      } else {
        // Append to the buffer and display typed characters
        commandBufferRef.current += data;
        xterm.write(data);
      }
    });

    // Clean up on unmount
    return () => xterm.dispose();
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ width: '100%', height: '400px', backgroundColor: '#1e1e1e' }}
    ></div>
  );
};

export default TerminalComponent;

