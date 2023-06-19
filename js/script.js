var apiKey = "39d4c29ad2d7cc69817d5de93962e041";
var baseUrl = "https://api.openweathermap.org/data/2.5/";
var searchHistory = [];

// Function to fetch current weather data
function getCurrentWeather(city, state) {
    var currentWeatherUrl = `${baseUrl}weather?appid=${apiKey}&units=imperial&q=${city},${state},US`;

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
            $('#cityName').text(cityName, state);
            $('#currentDate').text(`Date: ${date}`);
            $('#temperature').text(`Temperature: ${temperature}°F`);
            $('#humidity').text(`Humidity: ${humidity}%`);
            $('#windSpeed').text(`Wind Speed: ${windSpeed} mph`);
            $('#weatherIcon').attr('src', `https://openweathermap.org/img/w/${icon}.png`);

            // Store the searched city in local storage and update search history
            if (!searchHistory.includes(cityName)) {
                searchHistory.push(cityName + ", " + state);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                updateSearchHistory(cityName, state);
            }

            // Forecast data coordinates
            var lat = weatherData.coord.lat;
            var lon = weatherData.coord.lon;
            console.log(lat);
            console.log(lon);
            getForecast(lat, lon);
        },
        error: function (error) {
            console.log('Error:', error);
            $('#currentWeather').html('An error occurred while fetching weather data.');
        }
    });
}

// Function to fetch 5-day forecast data
function getForecast(lat, lon) {
    var forecastUrl = `${baseUrl}forecast?appid=${apiKey}&units=imperial&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: forecastUrl,
        dataType: "json",
        type: "GET",
        success: function (response) {
            var forecastData = response.list;

            // Clear previous forecast data
            $('#forecast').empty();

            // Loop over forecast data and display forecast blocks
            forecastData.forEach(function (forecast) {
                var date = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
                var temperature = forecast.main.temp;
                var humidity = forecast.main.humidity;
                var icon = forecast.weather[0].icon;
                if (forecast.dt_txt.includes("12:00:00")) {
                    // Display forecast information
                    var forecastBox = `
          <div class="forecast-box">
            <p>Date: ${date}</p>
            <p>Temperature: ${temperature}°F</p>
            <p>Humidity: ${humidity}%</p>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
          </div>
        `;
                    console.log(forecast.dt_txt);
                    $('#forecast').append(forecastBox);
                };
            })
        },
        //error response
        error: function (error) {
            console.log('Error:', error);
            $('#forecast').html('An error occurred while fetching forecast data.');
        }
    });
}


// Update search history in the HTML

function updateSearchHistory() {
    $('#searchHistory').empty();
    searchHistory.forEach(function (entry) {
      var [city, state] = entry.split(","); // Split the entry into city and state
      var historyItem = `<li><button class="searchBtn">${city}, ${state}</button></li>`;
      $('#searchHistory').append(historyItem);
    });
  
    // Add click event listener to the search buttons
    $('.searchBtn').click(function () {
      var buttonText = $(this).text();
      var [cityHistory, stateHistory] = buttonText.split(","); // Extract the city and state from the button text
      $("#searchBar").val(cityHistory.trim());
      $("#stateCode").val(stateHistory.trim());
      $("#currentWeather").removeClass("invisible");
      getCurrentWeather(cityHistory.trim(), stateHistory.trim());
    });
  }

// Search form submission
$("#searchForm").submit(function (eventObject) {
    eventObject.preventDefault();
    var city = $("#searchBar").val();
    var state = $("#stateCode").val();
    console.log(city);
    console.log(state);
    $("#currentWeather").removeClass("invisible");
    getCurrentWeather(city, state);
});

// Enter button
$("#searchBar").keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var city = $("#searchBar").val();
        var state = $("#stateCode").val();
        console.log(city);
        console.log(state);
        $("#currentWeather").removeClass("invisible");
        getCurrentWeather(city, state);

    }
});

// Load search history
if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(searchHistory);
    var lastSearch = searchHistory[searchHistory.length - 1];
    var [city, state] = lastSearch.split(",");
    updateSearchHistory(city, state);
}


//current time
function displayCurrentTime() {
    var currentTime = dayjs().format("h:mm A");
    $("#displayTime").text(currentTime);
    $("#displayTime").removeClass("invisible");
    var currentDate = dayjs().format('MM/DD/YYYY');
    $("#displayDate").text(currentDate);
    $("#displayDate").removeClass("invisible");
}

setInterval(displayCurrentTime, 1000);