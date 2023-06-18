

var baseURL = "https://api.openweathermap.org/data/2.5/";
var apiKey = "39d4c29ad2d7cc69817d5de93962e041";
var cityName = "New York";
var specialURL = `weather?appid=${apiKey}&units=imperial&q=${cityName},US`;
//get from user input to search box

var weatherURL = baseURL + specialURL;

console.log(weatherURL);




function pageInitialize () {


//button click to get weather city

//store in local storage the last X cities from local storage

//request to get weather data

//process data to get the current weather and 5 day forecast

//output the data to display in the HTML

}


$(document).ready(pageInitialize());

