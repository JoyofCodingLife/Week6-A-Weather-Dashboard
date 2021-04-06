// List of all Variables
var apiKey = "34294986534f43665a27b0eb1f9cf2fd";
var currentDay = moment().format("MMM Do YY");
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
         var searchHistory = $(`
         <li>${city}</li>
         `).addClass("list-group-item list-group-item-action");
         $("#searchedCities").append(searchHistory);
     };

     localStorage.setItem("city", JSON.stringify(searchHistoryList));
 });

    

// RESULT SECTION

 // Current Weather
 function currentWeather(city) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    $.ajax({
        url: currentWeatherURL,
        method: "GET",
    }).then (function(weatherResponse) {
        console.log(weatherResponse);

        $("#resultSection").css("display", "block");
        $("#currentWeather").empty();

        var iconID = weatherResponse.weather[0].icon;
        var iconURL = `http://openweathermap.org/img/wn/${iconID}.png`;

        // UV index requires another API data collection plus city geo coordinates
        var lon = weatherResponse.coord.lon;
        var lat = weatherResponse.coord.lat;

        var uviURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
        $.ajax({
            url: uviURL,
            method: "GET",
        }). then (function(uviResponse) {
            console.log(uviResponse);
            var uvIndex = uviResponse.current.uvi;
            console.log(uvIndex);
        });

        var currentCity = $(`
        <h2 id="currentCity">${weatherResponse.name} <img src="${iconURL}" alt="${weatherResponse.weather[0].description}"/> ${currentDay}</h2>
        <p>Country: ${weatherResponse.sys.country}</p>
        <p>Temperature: ${weatherResponse.main.temp} °C</p>
        <p>Humidity: ${weatherResponse.main.humidity} \%</p>
        <p>Wind Speed: ${weatherResponse.wind.speed} MPH</p>
        <p>UV Index: ${uvIndex}</p>

        `);
        $("#currentWeather").append(currentCity);


    });
    
};