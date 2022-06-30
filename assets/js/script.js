var apiKey = "PEXCtwTSHSAIjA1qUOIJkDGGqhUR7GPo";

var getUserRepos = function(city) {
    // format the github api url
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?"  + city + "&appid=" + apiKey;
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      
      return response.json().then(function(data) {
        console.log(data);
      });
    });
  };
  
  getUserRepos("Boston");
  