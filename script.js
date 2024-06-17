document.addEventListener('DOMContentLoaded', function () {
    const countryContainer = document.getElementById('country-cards');
    
    // Fetch country data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {

                const countryCard = document.createElement('div');
                countryCard.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
                countryCard.innerHTML = `
                    <div class="card h-100" style="width: 20rem;">
                        <div class="card-header">
                            <h5 class="card-title">${country.name.common}</h5>
                        </div>
                        <img src="${country.flags ? country.flags.svg : ''}" class="card-img-top" alt="${country.name.common} flag">
                        <div class="card-body">
                            <div class="card-text">
                                <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}<br>
                                <strong>Region:</strong> ${country.region}<br>
                                <strong>Country Code:</strong> ${country.cca3}
                            </div>
                            <button class="btn btn-outline-light" onclick="fetchWeather('${country.capital ? country.capital[0] : ''}', '${country.name.common}')">Click for Weather</button>
                        </div>
                    </div>
                `;
                countryContainer.appendChild(countryCard);
            });
        });

    // Fetch weather data from OpenWeatherMap API
    window.fetchWeather = function (capital, countryName) {
        if (!capital) {
            alert(`Capital not found for ${countryName}`);
            return;
        }
        
        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`)
            .then(response => response.json())
            .then(weather => {
                alert(`Weather in ${capital}, ${countryName}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}K`);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    };
});
