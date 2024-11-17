import { useEffect, useState } from "react";
import Tree from "react-d3-tree";

interface treeData {
	name: string;
	children: treeData[];
	attributes: {
		code: string;
		output: string;
		images: string;
		desc: string;
		stage: "Pre-Processing" | "Visualization" | "Modeling";
		parent: string;
	};
}

const TreeGraph = ({ inputData }: { inputData: treeData[] }) => {
	const [treeData, setTreeData] = useState<treeData[]>([]);
	useEffect(() => {
		if (inputData) {
			setTreeData(inputData);
		}
	});

	return treeData.length != 0 ? <Tree data={treeData} /> : null;
};

export default TreeGraph;
