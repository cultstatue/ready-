var apiKey = "PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo";
var searchBox = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var cityContainerEl = document.querySelector('#city-container');

searchBox.addEventListener("submit", function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim().toLowerCase();
    getEventsApi(cityName);

    console.log(searchBox);
    console.log(cityName);
});

var getEventsApi = function(city) {
    // format the github api url
   var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&city=" + city;
    // var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo&stateCode=VA"
  console.log(apiUrl)
    // make a get request to url
    fetch(apiUrl)
    .then(function(response) {
      
      return response.json()
      .then(function(data) {
        console.log(data);
      });
    });
  };
  
  //getEventsApi("Boston");

  // add event listeners to forms
  