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

const [treeData, setTreeData] = useState<treeData[]>([]);

const TreeGraph = ({ inputData }: { inputData: treeData[] }) => {
	useEffect(() => {
		if (inputData) {
			setTreeData(inputData);
		}
	});

	return <Tree data={treeData} />;
};

export default TreeGraph;
