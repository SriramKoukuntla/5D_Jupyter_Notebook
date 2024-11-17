import "./App.css";
import DashNavbar from "./components/Navbar";

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
			<DashNavbar />
		</div>
	);
}

export default App;
