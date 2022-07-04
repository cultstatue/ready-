// define hard coded elements
var apiKey = "PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo";
var searchBox = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var cityContainerEl = document.querySelector('#city-container');
var mainContainerEl = document.querySelector('#main-container');
var headerContentEl = document.querySelector('#header');

// function to convert unix time to a date
var convertDate = function (unixInput) {
    var milliseconds = unixInput * 1000;
    var dateObject = new Date(milliseconds);
    var parseDateObject = dateObject.toLocaleDateString();
    return parseDateObject;
}

// function to remove all parents children
var removeChildren = function (parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

// function to get weather info from location
var getWeatherdata = function (lat, lon, cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=f36d17786468fcf6dab864e03af92392"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)
                displayWeather(data);

            });
        } else {

            alert('City location not found');

        }
    })
        .catch(function (error) {

            alert("Unable to connect to OpenWeather");

        });
};

// function to access ticketmaster api
var getEventsApi = function (city, lon, lat) {

    // format the github api url
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&city=" + city;
    
    // make a get request to url
    fetch(apiUrl)
    .then(function (response) {

    return response.json()
        .then(function (data) {

            if(!data._embedded) {

                alert("events for this location were not found!");

                return false;
            }

            getWeatherdata(lat, lon, city);

            displayEvents(data);

            createNavBar();

        });
    });
};


// function to get geolocation based on entered zip code
var getGeoData = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + cityName + ",US&limit=1&appid=f36d17786468fcf6dab864e03af92392";

    fetch(apiUrl)
        .then(function (response) {
            response.json().then(function (data) {

                console.log(data)

                if (data === undefined || data.length == 0) {

                    alert("City location not found")
                    return false;

                } else {

                    var cityNameState = data.name;
                    var cityLat = data.lat;
                    var cityLon = data.lon;

                    getEventsApi(cityNameState, cityLon, cityLat);

                }
            })
        });
};

// function to create the navigation bar
var createNavBar = function () {
    
    var navBar = document.createElement("nav");
    navBar.classList.add('navbar', 'is-primary');
    navBar.setAttribute("role", "navigation");
    navBar.setAttribute("aria-label", "main-navigation");
    navBar.innerHTML = "<div class='navbar-brand'>" +
    "<a class='navbar-item page-font' href='/'>Ready?</a>" +

    "<div class='navbar-start'> </div>" +

    "<div class='navbar-end'>" +
        "<div class='navbar-item'>" +
        " <form id='nav-form'>" +
        "<input class='input is-rounded' id='nav-city-name' type='text' placeholder='Search'>" +
        "</form>" +
        "</div>" +
    "</div>" +
"</div>"

    headerContentEl.appendChild(navBar);

};

// function to display events
var displayEvents = function (eventData) {

    console.log(eventData);
    removeChildren(mainContainerEl);

    var eventsContainerEl = document.createElement('div');
    eventsContainerEl.classList.add('columns', 'is-mobile', 'is-multiline', 'events-container');   
    mainContainerEl.appendChild(eventsContainerEl);

    // loops through objects based on event data we concluded to display
    for (var i = 0; i < eventData._embedded.events.length; i++) {
        var columnDiv = document.createElement("div");
        columnDiv.classList.add('column', 'is-3');
        eventsContainerEl.appendChild(columnDiv);
        
        var eventCard = document.createElement("div");
        eventCard.classList.add('card');
        eventCard.innerHTML = "<div class='card-image'><figure class='image is-4by3'><img src=" + eventData._embedded.events[i].images[0].url + " alt='Placeholder image'></figure></div><div class='content'>Name of event: " + eventData._embedded.events[i].name + " <br> Date of event: " + eventData._embedded.events[i].dates.start.localDate + " <br> Event Type: " + eventData._embedded.events[i]._embedded.venues[0].address.line1 + " <br> Event Type: " + eventData._embedded.events[i].priceRanges[0].min + "-" + eventData._embedded.events[i].priceRanges[0].max + " <br> buy your tickets here: <a href=" + eventData._embedded.events[i].url + ">Click here </a> </div></div>";

        columnDiv.appendChild(eventCard);
    }
};

// function to display weather elements
var displayWeather = function (weatherData) {

    console.log(weatherData);

    var weatherContainerEl = document.createElement('div');
    weatherContainerEl.classList.add('columns', 'is-mobile', 'is-multiline', 'weather-container');   
    mainContainerEl.appendChild(weatherContainerEl);

    // loops through objects based on event data we concluded to display
    for (var i = 0; i < weatherData.daily.length; i++) {

        var weatherDiv = document.createElement("div");
        weatherDiv.classList.add('column', 'is-3');
        weatherContainerEl.appendChild(weatherDiv);

        var weatherCard = document.createElement("div");
        weatherCard.className = "card";
        weatherCard.innerHTML = "<div class='card-image'><figure class='image is-64x64'><img src=http://openweathermap.org/img/wn/" + weatherData.daily[i].weather[0].icon + '@2x.png' + " alt='Placeholder image'></figure></div><div class='content'>Date: " + convertDate(weatherData.daily[i].dt) + " <br> Temperature: " + weatherData.daily[i].temp.min + " - " + weatherData.daily[i].temp.max + " <br> Feels like: " + weatherData.daily[i].feels_like.day + " - " + weatherData.daily[i].feels_like.night + " <br> Humidity: " + weatherData.daily[i].humidity + " <br> UV index: " + weatherData.daily[i].uvi + " <br> Description: " + weatherData.daily[i].weather[0].description + "</div></div>";

        weatherDiv.appendChild(weatherCard);
    }

    mainContainerEl.prepend(weatherContainerEl);

};

// delegate search submit to landing page
searchBox.addEventListener("submit", function (event) {
    event.preventDefault();
    // converts city name to lower case
    var cityName = cityInputEl.value.trim().toLowerCase();
    //getEventsApi(cityName);
    getGeoData(cityName);

    console.log(searchBox);
    console.log(cityName);
});

// delgate search submit to navigation bar in header
headerContentEl.addEventListener('submit', function(event) {
    event.preventDefault();

    var navForm = document.querySelector('#nav-city-name');
    console.log(navForm.value);
    var navCityName = navForm.value.trim().toLowerCase();
    getGeoData(navCityName);
    console.log("submit");
    

});

