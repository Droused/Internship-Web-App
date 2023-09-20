const express = require('express');
const { getInternshipData } = require('./+server');

const app = express();
const port = 3000;

app.get('/internships', async (req, res) => {
    try {
        const data = await getInternshipData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
