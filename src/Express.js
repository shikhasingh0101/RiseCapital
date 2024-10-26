const express = require('express');
const cors = require('cors'); // Ensure CORS is installed

const app = express();
const PORT = 3002;

app.use(cors()); // Allow CORS for your frontend

// Sample data to return
const recommendationsData = [
    "Invest in index funds",
    "Diversify your portfolio",
    "Consider retirement accounts"
];

// Define the recommendations route
app.get('/api/recommendations', (req, res) => {
    res.json(recommendationsData); // Send JSON response
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
