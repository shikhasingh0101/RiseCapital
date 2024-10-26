import React, { useEffect, useState } from 'react';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/recommendations');
                
                // Log the response status and body
                console.log('Response Status:', response.status);
                const textResponse = await response.text();
                console.log('Response:', textResponse); // Log the response body
        
                if (!response.ok) {
                    throw new Error(`Fetch error: ${textResponse}`);
                }
        
                // Attempt to parse the response as JSON
                const data = JSON.parse(textResponse);
                setRecommendations(data);
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        
        

        fetchRecommendations();
    }, []);

    if (loading) {
        return <div>Loading recommendations...</div>;
    }

    if (error) {
        return <div>Error fetching recommendations: {error}</div>;
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li> // Adjust this to match your data structure
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;
