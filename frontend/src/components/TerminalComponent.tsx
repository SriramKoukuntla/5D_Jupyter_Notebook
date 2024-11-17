import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const TerminalComponent: React.FC = () => {
	// Refs with proper TypeScript types
	const terminalRef = useRef<HTMLDivElement | null>(null);
	const term = useRef<Terminal | null>(null);
	const fitAddon = useRef<FitAddon | null>(null);
	const inputBuffer = useRef<string>("");

	useEffect(() => {
		// Initialize xterm and add-ons
		term.current = new Terminal({
			cursorBlink: true,
			theme: {
				background: "#1e1e1e",
				foreground: "#ffffff",
			},
		});

		fitAddon.current = new FitAddon();
		term.current.loadAddon(fitAddon.current);

		// Attach terminal to the DOM
		if (terminalRef.current) {
			term.current.open(terminalRef.current);
			fitAddon.current.fit();
		}

		// Handle terminal resize
		const handleResize = () => {
			if (fitAddon.current) {
				fitAddon.current.fit();
			}
		};

		window.addEventListener("resize", handleResize);

		// Clean up on unmount
		return () => {
			term.current?.dispose();
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const handleChange = async () => {
			if (term.current) {
				term.current.writeln("Welcome to xterm.js terminal!");
				const prompt = () => {
					term.current?.write("\r\n$ ");
				};

				prompt();

				term.current.onKey(async ({ key, domEvent }) => {
					if (!term.current) return;

					if (domEvent.key === "Enter") {
						// Print the current input buffer
						console.log("!" + inputBuffer.current);
						const res = await fetch(
							"http://localhost:8080/api/runpy",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json", // Indicating that you're sending JSON
								},
								body: JSON.stringify({
									code: "!" + inputBuffer.current,
								}),
							}
						);

						const data = await res.json();
						term.current.write("\n" + data.output);
						// Clear the input buffer and show a new prompt
						console.log(data);
						inputBuffer.current = "";
						prompt();
					} else if (domEvent.key === "Backspace") {
						if (inputBuffer.current.length > 0) {
							inputBuffer.current = inputBuffer.current.slice(
								0,
								-1
							);
							// Remove the last character visually
							term.current.write("\b \b");
						}
					} else {
						term.current.write(key);
						inputBuffer.current += key;
					}
				});
			}
		};
		handleChange();
	}, []);

	return (
		<div
			ref={terminalRef}
			style={{
				width: "100%",
				height: "80%",
				backgroundColor: "#1e1e1e",
				justifyContent: "left",
			}}
		/>
	);
};

export default TerminalComponent;
