import "./DataActivity.css";
import TerminalComponent from "./components/TerminalComponent";
import Notebook from "./components/Notebook";
import Tree from "./components/Tree";
import { useParams } from "react-router-dom";

const DataActivity: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <div className="container">
      <div className="notebook">
        <Notebook />
      </div>
      <div className="terminal">
        <TerminalComponent />
      </div>
      <div className="branch">
        <Tree />
      </div>
      <div className="llm"></div>
    </div>
  );
};

export default DataActivity;
