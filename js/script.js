

var baseURL = "https://api.openweathermap.org/data/2.5/";
var apiKey = "39d4c29ad2d7cc69817d5de93962e041";
var cityName = "New York";
var specialURL = `weather?appid=${apiKey}&units=imperial&q=${cityName},US`;
//get from user input to search box

var weatherURL = baseURL + specialURL;

console.log(weatherURL);