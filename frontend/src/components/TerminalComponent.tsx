import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const TerminalComponent: React.FC = () => {
	// Refs with proper TypeScript types
	const terminalRef = useRef<HTMLDivElement | null>(null);
	const term = useRef<Terminal | null>(null);
	const fitAddon = useRef<FitAddon | null>(null);

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
		if (term.current) {
			term.current.writeln("Welcome to xterm.js terminal!");
			const prompt = () => {
				term.current?.write("\r\n$ ");
			};

			prompt();

			term.current.onKey(({ key, domEvent }) => {
				if (!term.current) return;

				if (domEvent.key === "Enter") {
					term.current.write("\r\nCommand executed!");
					prompt();
				} else if (domEvent.key === "Backspace") {
					term.current.write("\b \b");
				} else {
					term.current.write(key);
				}
			});
		}
	}, []);

	return (
		<div
			ref={terminalRef}
			style={{
				width: "100%",
				height: "55%",
				backgroundColor: "#1e1e1e",
				justifyContent: "left",
			}}
		/>
	);
};

export default TerminalComponent;
