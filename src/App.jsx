import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import ArrayDisplay from './components/ArrayDisplay';
import ComparisonView from './components/ComparisonView';
import useSortingVisualizer from './hooks/useSortingVisualizer';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'comparison'
  const [algCompare1, setAlgCompare1] = useState('bubble');
  const [algCompare2, setAlgCompare2] = useState('quick');

  const visualizer = useSortingVisualizer();

  const handleModeToggle = () => {
    visualizer.reset();
    setViewMode(prev => prev === 'single' ? 'comparison' : 'single');
  };

  return (
    <div className="app-container">
      <ControlPanel
        {...visualizer}
        generateNewArray={visualizer.reset}
        viewMode={viewMode}
        setViewMode={setViewMode}
        algCompare1={algCompare1}
        setAlgCompare1={setAlgCompare1}
        algCompare2={algCompare2}
        setAlgCompare2={setAlgCompare2}
      />

      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>{viewMode === 'single' ? 'Standard Visualization' : 'Comparison Mode'}</h2>
          </div>
        </header>

        <section className="visualization-area">
          {viewMode === 'single' ? (
            <ArrayDisplay
              array={visualizer.array}
              activeIndices={visualizer.activeIndices}
              sortedIndices={visualizer.sortedIndices}
              pivotIndices={visualizer.pivotIndices}
            />
          ) : (
            <ComparisonView
              initialArray={visualizer.array}
              size={visualizer.size}
              speed={visualizer.speed}
              alg1={algCompare1}
              alg2={algCompare2}
              isGlobalSorting={visualizer.isSorting}
              onStop={() => visualizer.reset()}
            />
          )}
        </section>

        <footer className="main-footer">
          <div className="legend">
            <div className="legend-item"><span className="square active"></span> Comparison/Swap</div>
            <div className="legend-item"><span className="square pivot"></span> Pivot</div>
            <div className="legend-item"><span className="square sorted"></span> Sorted</div>
          </div>
          <div className="personal-footer">
            Made with coffee and love ❤️ by&nbsp;
            <a href="https://github.com/remilsalim" target="_blank" rel="noopener noreferrer">
              remilsalim
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
