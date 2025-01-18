import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import FileExplorer from './FileExplorer/FileExplorer';
import CodeEditor from './CodeEditor/CodeEditor';
import Terminal from './Terminal/Terminal';
import Branching from './Branching/Branching';



function App() {
  return (
    <div className="App">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} className = "FileExplorer">
          <FileExplorer />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={80}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} className = "CodeEditor">
              <CodeEditor />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={30}>
              <PanelGroup direction="horizontal">
                <Panel defaultSize={60} className = "Terminal">
                  <Terminal />
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={40} className = "Branching">
                  <Branching/>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </div>
  );
}

export default App;