// List of all Variables
var apiKey = "34294986534f43665a27b0eb1f9cf2fd"
var currentDay = moment().format("dddd, MMMM Do YYYY");
var searchButton = $("#searchBtn");
var searchHistoryList =[];


// SEARCH SECTION
 
 // Search button event listener
 searchButton.on("click", function(event) {
     event.preventDefault();

     var city = $("#searchCity").val().trim();
     currentWeather(city);

     if (!searchHistoryList.includes(city)){
         searchHistoryList.push(city);
         var searchHistory = $(`<li>${city}</li>`).addClass("list-group-item list-group-item-action");
         $("#searchedCities").append(searchHistory);
     };

     localStorage.setItem("city", JSON.stringify(searchHistoryList));
     console.log(searchHistoryList);
 })

    
//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city


// RESULT SECTION

 // Current Weather
 function currentWeather(city) {
     var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}";

 }

