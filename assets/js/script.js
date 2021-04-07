// List of all Variables
var apiKey = "34294986534f43665a27b0eb1f9cf2fd";
var currentDay = moment().format("MMM Do YYYY");
var searchButton = $("#searchBtn");
var searchHistoryList =[];

// RESULT SECTION

// Current Weather
 function currentWeather(city) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    $.ajax({
        url: currentWeatherURL,
        method: "GET",
    }).then (function(weatherResponse) {;
        $("#resultSection").css("display", "block");
        $("#currentWeather").empty();

        var iconID = weatherResponse.weather[0].icon;
        var iconURL = `http://openweathermap.org/img/wn/${iconID}.png`;

        var currentCity = $(`
        <h2 id="currentCity">${weatherResponse.name} <img src="${iconURL}" alt="${weatherResponse.weather[0].description}"/> ${currentDay}</h2>
        <p>Country: ${weatherResponse.sys.country}</p>
        <p>Temperature: ${weatherResponse.main.temp} °C</p>
        <p>Humidity: ${weatherResponse.main.humidity} \%</p>
        <p>Wind Speed: ${weatherResponse.wind.speed} MPH</p>
        `);
        $("#currentWeather").append(currentCity);

        // UV Index requires another API data collection plus city geo coordinates
        var lat = weatherResponse.coord.lat;
        var lon = weatherResponse.coord.lon;

        var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
        $.ajax({
            url: oneCallURL,
            method: "GET",
        }). then (function(oneCallResponse) {
            var uvIndex = oneCallResponse.daily[0].uvi;
            $("#currentWeather").append($(`
            <p>UV Index: 
            <span id="uviColor">${uvIndex}</span>
            </p>`));

            forecast(lat, lon);

            // UV Index color-coding

            if (uvIndex >= 0 && uvIndex <= 2.99){
                $("#uviColor").css("background-color", "#65cc1e");
            } else if (uvIndex >= 3 && uvIndex <= 5.99){
                $("#uviColor").css("background-color", "#ffde32");
            } else if (uvIndex >= 6 && uvIndex <= 7.99){
                $("#uviColor").css("background-color", "#ffa500");
            } else if (uvIndex >= 8 && uvIndex <= 10.99){
                $("#uviColor").css("background-color", "#e60073");
            } else {
                $("#uviColor").css("background-color", "#9572ff");
            };
        });
    });
};

// 5-day Forecast
 function forecast(lat, lon) {
    var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    $.ajax({
        url: oneCallURL,
        method: "GET",
    }). then (function(oneCallResponse) {
        $("#forecast").empty();
        for (var i = 1; i < 6; i++) {
            var cityInfo = {
                date: oneCallResponse.daily[i].dt,
                icon: oneCallResponse.daily[i].weather[0].icon,
                description: oneCallResponse.daily[i].weather[0].description,
                temperature: oneCallResponse.daily[i].temp.day,
                humidity: oneCallResponse.daily[i].humidity,
                uvindex: oneCallResponse.daily[i].uvi,
            };
            var cardDate = moment.unix(cityInfo.date).format("DD/MM/YYYY");
            var weatherIcon = `<img src="http://openweathermap.org/img/wn/${cityInfo.icon}.png" alt="${cityInfo.description}"/>`;
            var forecastCard = $(`
                   <div class="col">
                       <div class="card bg-info text-light" style="width: 12rem";>
                           <div class="card-body">
                               <h6>${cardDate}</h6>
                               <p>${weatherIcon}</p>
                               <p>Temp: ${cityInfo.temperature} °C</p>
                               <p>Humidity: ${cityInfo.humidity}\%</p>                         
                           </div>
                       </div>
                   <div>
               `);
               $("#forecast").append(forecastCard);
        }
    }); 
};


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

   

