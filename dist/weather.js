const apiKey = 'yMTKR3P1svbW1qOPF0r6eBv64Qsh8Xao';

// Function to fetch and display weather data
function fetchWeatherData(location) {
  // Fetch weather data from Tomorrow.io API
  fetch(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=windSpeed,pressure,precipitationProbability,uvIndex&timesteps=1d&units=metric&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Extract relevant weather information
      const windSpeed = data.data.timelines[0].intervals[0].values.windSpeed;
      const pressure = data.data.timelines[0].intervals[0].values.pressure;
      const rainChance = data.data.timelines[0].intervals[0].values.precipitationProbability;
      const uvIndex = data.data.timelines[0].intervals[0].values.uvIndex;

      // Update the weather information in the HTML
      document.getElementById('windSpeed').textContent = `${windSpeed} km/h`;
      document.getElementById('pressure').textContent = `${pressure} hPa`;
      document.getElementById('rainChance').textContent = `${rainChance}%`;
      document.getElementById('uvIndex').textContent = uvIndex;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', function () {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();
  
  if (location !== '') {
    fetchWeatherData(location);
    locationInput.value = '';
  }
});

