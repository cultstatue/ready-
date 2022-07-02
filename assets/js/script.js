var apiKey = "PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo";
var searchBox = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var cityContainerEl = document.querySelector('#city-container');
var mainContainerEl = document.querySelector('#main-container');


searchBox.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim().toLowerCase();
    //getEventsApi(cityName);
    getGeoData(cityName);

    console.log(searchBox);
    console.log(cityName);
});

var getEventsApi = function (city) {
    // format the github api url
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&city=" + city;
    // var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo&postalCode="
    console.log(apiUrl)
    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {

            return response.json()
                .then(function (data) {
                    displayEvents(data);
                });
        });
};


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

                    getWeatherdata(cityLat, cityLon, cityNameState);
                    getEventsApi(cityNameState);

                }
            })
        });
};

// function to get weather info from location
var getWeatherdata = function (lat, lon, cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=f36d17786468fcf6dab864e03af92392"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

            });
        } else {

            alert('City location not found');

        }
    })
        .catch(function (error) {

            alert("Unable to connect to OpenWeather");

        });
}

var displayEvents = function (eventData) {
    console.log(eventData);
    for (var i = 0; i < eventData._embedded.events.length; i++) {
        var eventCard = document.createElement("div");
        eventCard.className = "card";
        eventCard.innerHTML = "<div class='card-image'><figure class='image is-4by3'><img src=" + eventData._embedded.events[i].images[0].url + " alt='Placeholder image'></figure></div><div class='content'>Name of event: " + eventData._embedded.events[i].name + " <br> Date of event: " + eventData._embedded.events[i].dates.start.localDate +" <br> Event Type: " + eventData._embedded.events[i]._embedded.venues[0].address.line1 + " <br> Event Type: " + eventData._embedded.events[i].priceRanges[0].min + "-" + eventData._embedded.events[i].priceRanges[0].max +" <br> buy your tickets here: <a href=" + eventData._embedded.events[i].url + ">Click here </a> </div></div>";
        
        mainContainerEl.appendChild(eventCard); 
    }
}