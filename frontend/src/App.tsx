import "./App.css";
import DataActivity from "./DataActivity";

function App() {
	return (
		<div
			style={{
				width: "100vw",
				position: "absolute",
				top: 0,
				left: 0,
				height: 50,
			}}
		>
			<DataActivity />
		</div>
	);
}

export default App;
