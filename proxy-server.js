/**
 * Backend proxy to avoid CORS issues
 * This is a simple Express server that forwards requests to the Innovamed API
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/api/prescription', async (req, res) => {
    try {
        const response = await fetch('https://apirecipe.qbitos.com/apirecipe/Receta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            success: false,
            error: 'Proxy error',
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
