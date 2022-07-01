var apiKey = "PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo";

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
  
  getEventsApi("Boston");
  