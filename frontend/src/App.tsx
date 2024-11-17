import "./App.css";
import DashNavbar from "./components/Navbar";
import ProjectDashboard from "./components/ProjectDashboard";

function App() {
	return (
		<div
			style={{
				backgroundColor: "#1b1b1d", // Dark gray background
				height: "100vh",
				width: "100vw",
			}}
		>
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
				<ProjectDashboard />
			</div>
		</div>
	);
}

export default App;
