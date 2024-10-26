// Portfolio.jsx
import React from 'react';
import './Portfolio.css';

function Portfolio({ investments }) {
    return (
        <div className="portfolio-container">
            <h3>Your Portfolio</h3>
            {investments.length === 0 ? (
                <p>No investments found in your portfolio.</p>
            ) : (
                <ul className="portfolio-list">
                    {investments.map((investment, index) => (
                        <li key={index} className="portfolio-item">
                            <div className="investment-details">
                                <h4>{investment.name}</h4>
                                <p>Shares: {investment.shares}</p>
                                <p>Purchase Price: ${investment.purchasePrice.toFixed(2)}</p>
                            </div>
                            <div className="investment-values">
                                <p className="current-value">Current Value: ${investment.currentValue.toFixed(2)}</p>
                                <p className="growth">Growth: {investment.growth}%</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Portfolio;
