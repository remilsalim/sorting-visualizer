import React from 'react';
import '../styles/ComparisonModal.css';

const ComparisonModal = ({ alg1Data, alg2Data, onClose }) => {
    const { name: name1, stats: stats1 } = alg1Data;
    const { name: name2, stats: stats2 } = alg2Data;

    const getWinner = () => {
        if (stats1.executionTime < stats2.executionTime) return name1;
        if (stats2.executionTime < stats1.executionTime) return name2;

        // Tie breaker 1: comparisons
        if (stats1.comparisons < stats2.comparisons) return name1;
        if (stats2.comparisons < stats1.comparisons) return name2;

        return 'Draw';
    };

    const winner = getWinner();

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Comparison Verdict</h2>

                <div className="results-grid">
                    <div className={`result-card ${winner === name1 ? 'winner' : ''}`}>
                        <h3>{name1}</h3>
                        <div className="stat-row">
                            <span>Time:</span>
                            <strong>{stats1.executionTime}ms</strong>
                        </div>
                        <div className="stat-row">
                            <span>Comparisons:</span>
                            <strong>{stats1.comparisons}</strong>
                        </div>
                        <div className="stat-row">
                            <span>Swaps:</span>
                            <strong>{stats1.swaps}</strong>
                        </div>
                        {winner === name1 && <div className="winner-badge">FASTEST</div>}
                    </div>

                    <div className="vs-divider">VS</div>

                    <div className={`result-card ${winner === name2 ? 'winner' : ''}`}>
                        <h3>{name2}</h3>
                        <div className="stat-row">
                            <span>Time:</span>
                            <strong>{stats2.executionTime}ms</strong>
                        </div>
                        <div className="stat-row">
                            <span>Comparisons:</span>
                            <strong>{stats2.comparisons}</strong>
                        </div>
                        <div className="stat-row">
                            <span>Swaps:</span>
                            <strong>{stats2.swaps}</strong>
                        </div>
                        {winner === name2 && <div className="winner-badge">FASTEST</div>}
                    </div>
                </div>

                <div className="verdict-footer">
                    {winner === 'Draw' ? (
                        <p>It's a perfect draw!</p>
                    ) : (
                        <p><strong>{winner}</strong> is the winner!</p>
                    )}
                    <button className="btn btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ComparisonModal;
