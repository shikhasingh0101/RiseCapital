const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/recommendations', (req, res) => {
    // Your logic to send back recommendations as JSON
    res.json(["Tip 1", "Tip 2", "Tip 3"]); // Example response
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
