import React, { useEffect, useState } from 'react';
import ArrayDisplay from './ArrayDisplay';
import ComparisonModal from './ComparisonModal';
import useSortingVisualizer from '../hooks/useSortingVisualizer';
import { ALGORITHM_INFO } from '../utils/arrayUtils';

const ComparisonView = ({ initialArray, size, speed, alg1, alg2, isGlobalSorting, onStop }) => {
    const visualizer1 = useSortingVisualizer(size, speed);
    const visualizer2 = useSortingVisualizer(size, speed);
    const [showModal, setShowModal] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Sync initial arrays
        visualizer1.setArray([...initialArray]);
        visualizer2.setArray([...initialArray]);
        setHasStarted(false);
        setShowModal(false);
    }, [initialArray]);

    useEffect(() => {
        if (isGlobalSorting) {
            visualizer1.changeAlgorithm(alg1);
            visualizer2.changeAlgorithm(alg2);
            visualizer1.startSorting();
            visualizer2.startSorting();
            setHasStarted(true);
            setShowModal(false);
        }
    }, [isGlobalSorting, alg1, alg2]);

    useEffect(() => {
        if (hasStarted && !visualizer1.isSorting && !visualizer2.isSorting) {
            // Wait a small bit to ensure stats are updated and animations finished
            const timer = setTimeout(() => {
                if (visualizer1.stats.comparisons > 0 || visualizer2.stats.comparisons > 0) {
                    setShowModal(true);
                    setHasStarted(false);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [visualizer1.isSorting, visualizer2.isSorting, hasStarted]);

    return (
        <div className="comparison-container">
            <div className="visualizer-box">
                <h4>{ALGORITHM_INFO[alg1].name}</h4>
                <ArrayDisplay
                    array={visualizer1.array}
                    activeIndices={visualizer1.activeIndices}
                    sortedIndices={visualizer1.sortedIndices}
                    pivotIndices={visualizer1.pivotIndices}
                />
                <div className="mini-stats">
                    <span>Comparisons: {visualizer1.stats.comparisons}</span>
                    <span>Swaps: {visualizer1.stats.swaps}</span>
                    <span>Time: {visualizer1.stats.executionTime}ms</span>
                </div>
            </div>
            <div className="visualizer-box">
                <h4>{ALGORITHM_INFO[alg2].name}</h4>
                <ArrayDisplay
                    array={visualizer2.array}
                    activeIndices={visualizer2.activeIndices}
                    sortedIndices={visualizer2.sortedIndices}
                    pivotIndices={visualizer2.pivotIndices}
                />
                <div className="mini-stats">
                    <span>Comparisons: {visualizer2.stats.comparisons}</span>
                    <span>Swaps: {visualizer2.stats.swaps}</span>
                    <span>Time: {visualizer2.stats.executionTime}ms</span>
                </div>
            </div>

            {showModal && (
                <ComparisonModal
                    alg1Data={{ name: ALGORITHM_INFO[alg1].name, stats: visualizer1.stats }}
                    alg2Data={{ name: ALGORITHM_INFO[alg2].name, stats: visualizer2.stats }}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ComparisonView;
