const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '4e5ed34c1f838e68944c8480529c754c';

app.use(express.static('public'));
app.use(express.json());

app.post('/getWeather', async (req, res) => {
    const city = req.body.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});