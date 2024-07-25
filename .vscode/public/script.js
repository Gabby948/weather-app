document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = '4e5ed34c1f838e68944c8480529c754c'; // Reemplaza con tu clave de API de OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weatherResult').innerHTML = `<p>City not found</p>`;
            } else {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                document.getElementById('weatherResult').innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <p><strong>Description:</strong> ${weatherDescription}</p>
                    <p><strong>Temperature:</strong> ${temperature} °C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data</p>`;
        });
});