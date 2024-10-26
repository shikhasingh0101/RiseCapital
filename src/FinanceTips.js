import React, { useState, useEffect } from 'react';

function FinanceTips() {
    const [tip, setTip] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTip = async () => {
            console.log("Fetching finance tip..."); // Logging fetch initiation
            try {
                // Using a public API for random advice
                const response = await fetch('https://api.adviceslip.com/advice');
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                console.log("Fetched data:", data); // Check the fetched data
                setTip(data.slip.advice); // Access the advice from the response
            } catch (err) {
                console.error("Fetch error:", err); // Log the error
                setError('Failed to fetch finance tip: ' + err.message);
            }
        };
        
        fetchTip(); // Call the fetch function
    }, []);

    return (
        <div>
            <h3>Daily Financial Tip</h3>
            {error ? <p>{error}</p> : <p>{tip}</p>}
        </div>
    );
}

export default FinanceTips;
