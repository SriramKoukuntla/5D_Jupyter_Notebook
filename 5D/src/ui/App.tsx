import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

function App() {
  return (
    <div className="App">
      <PanelGroup direction="horizontal">
        <Panel>
          left
        </Panel>
        <PanelResizeHandle />
        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              top
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <PanelGroup direction="horizontal">
                <Panel>
                  left
                </Panel>
                <PanelResizeHandle />
                <Panel>
                  right
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