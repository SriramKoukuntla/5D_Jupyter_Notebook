import "./DataActivity.css";
import TerminalComponent from "./components/TerminalComponent";
import Notebook from "./components/Notebook";
import Tree from "./components/Tree";
import { useEffect, useState } from "react";

function DataActivity({ id: string }: any) {
	const [treeData, setTreeData] = useState<any>([]);
	useEffect(() => {
		const getProject = async (id: string) => {
			const res = await fetch(
				`localhost:8080/api/project/getProject/${id}`
			);
			const data = await res.json();
			setTreeData(data.tree);
		};
	});

	return (
		<div className="container">
			<div className="notebook">
				<Notebook />
			</div>
			<div className="terminal">
				<TerminalComponent />
			</div>
			<div className="branch">
				<Tree inputData={treeData} />
			</div>
			<div className="llm"></div>
		</div>
	);
}
export default DataActivity;
