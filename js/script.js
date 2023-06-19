var apiKey = "39d4c29ad2d7cc69817d5de93962e041";
var baseUrl = "https://api.openweathermap.org/data/2.5/";
var searchHistory = [];

// Function to fetch current weather data
function getCurrentWeather(city) {
    var currentWeatherUrl = `${baseUrl}weather?appid=${apiKey}&units=imperial&q=${city},US`;

    $.ajax({
        url: currentWeatherUrl,
        dataType: "json",
        type: "GET",
        success: function (response) {
            var weatherData = response;
            var cityName = weatherData.name;
            var temperature = weatherData.main.temp;
            var humidity = weatherData.main.humidity;
            var windSpeed = weatherData.wind.speed;
            var icon = weatherData.weather[0].icon;
            var date = dayjs().format('MM/DD/YYYY');

            // Display current weather information
            $('#cityName').text(cityName);
            $('#currentDate').text(`Date: ${date}`);
            $('#temperature').text(`Temperature: ${temperature}°F`);
            $('#humidity').text(`Humidity: ${humidity}%`);
            $('#windSpeed').text(`Wind Speed: ${windSpeed} mph`);
            $('#weatherIcon').attr('src', `https://openweathermap.org/img/w/${icon}.png`);

            // Store the searched city in local storage and update search history
            if (!searchHistory.includes(cityName)) {
                searchHistory.push(cityName);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                updateSearchHistory();
            }

            // Forecast data coordinates
            var lat = weatherData.coord.lat;
            var lon = weatherData.coord.lon;
            console.log(lat);
            console.log(lon);

        },
        error: function (error) {
            console.log('Error:', error);
            $('#currentWeather').html('An error occurred while fetching weather data.');
        }
    });
}
// Update search history in the HTML
function updateSearchHistory() {
    $('#searchHistory').empty();
    searchHistory.forEach(function (city) {
        var historyItem = `<li>${city}</li>`;
        $('#searchHistory').append(historyItem);
    });
}

// Search form submission
$("#searchForm").submit(function (event) {
    event.preventDefault();
    var city = $("#searchBar").val();
    getCurrentWeather(city);
});

// Enter button
$("#searchBar").keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var city = $("#searchBar").val();
        getCurrentWeather(city);
    }
});

// Load search history
if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    updateSearchHistory();
}
