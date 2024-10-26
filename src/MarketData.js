import React, { useState, useEffect } from 'react';

function MarketData() {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/marketdata');
                if (!response.ok) {
                    throw new Error('Failed to fetch market data');
                }
                const data = await response.json();
                setMarketData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, []);

    if (loading) return <div>Loading real-time market data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Real-Time Market Data</h3>
            {Object.entries(marketData).map(([name, price], index) => (
                <div key={index}>
                    <p>{name}: ${price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

export default MarketData;
