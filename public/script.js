document.getElementById('weatherForm').addEventListener('submit',function(event){
    event.preventDefault();
    const city = document.getElementById('cityInput').value;

    fetch('/getWeather',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({city})
    })
    .then(response => response.json())
    .then(data => {
        if(data.cod == '404'){
            document.getElementById('weatherResult').innerHTML = `<p>City not found</p>`;
       }else{
          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;

          document.getElementById('weatherResult').innerHTML=`
          <h2>Weather in ${data.name}</h2>
          <p><strong>Description:</strong> ${weatherDescription}</p>
          <p><strong>Temperature:</strong> ${temperature} °C</p>
          <p><strong>Humidity:</strong> ${humidity} %</p>
          <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
          `;
       }
    })
    .catch(error => {
        console.error('Error fetching weather data:',error);
        document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data</p>`;
       });
    });
