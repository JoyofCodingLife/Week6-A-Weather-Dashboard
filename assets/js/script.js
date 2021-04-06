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

    

// RESULT SECTION

 // Current Weather
 function currentWeather(city) {
     var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}";

 }

