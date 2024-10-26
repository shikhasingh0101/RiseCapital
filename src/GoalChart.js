import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js'; // Import registerables

// Register all required components
Chart.register(...registerables);

function GoalChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // To hold the chart instance

    useEffect(() => {
        // Destroy previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create new chart
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Investment Goals',
                    data: data.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup function to destroy the chart on component unmount
        return () => {
            chartInstance.current.destroy();
        };
    }, [data]); // Re-run effect when data changes

    return <canvas ref={chartRef}></canvas>;
}

export default GoalChart;
