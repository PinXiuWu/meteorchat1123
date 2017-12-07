weatherInfo = function(msg) {
  var time = "present";
  var weatherRegex = /(temperature|weather).*in (\w+)/i;
  var timeRegex = /ll|will|tomorrow/ig;
  var weatherRequest = msg.match(weatherRegex);
  if(weatherRequest === null)
  {
    return "";
  }
  else
  {
    if(msg.match(timeRegex) !== null)
    {
      time = "future";
    }
    console.log(weatherRequest);
    var lastArrayPos = weatherRequest.length-1  //.length-1表示字串最後一個位子
    var targetCity = weatherRequest[lastArrayPos]; //取得weatherRequest最後一個位置的資料
    var wtInfoURL;
    var APIKey = "f9a75b02e32f6c73861ab707824ec144";
    if(time === "present")
    {
      wtInfoURL = "http://api.openweathermap.org/data/2.5/weather?APPID="+
       APIKey+"&q="+targetCity+"&units=metric";
    }
    else
    {
      wtInfoURL = "http://api.openweathermap.org/data/2.5/forecast?APPID="+
       APIKey+"&q="+targetCity+"&units=metric&cnt=24";
    }

    HTTP.get(wtInfoURL, processWtData);
  }
};


var processWtData = function(error, result) {
  var wtData;
  if(error !== null)
  {
    wtData = error.response.data;
    if(wtData.cod === "404")
    {
      console.log("Sorry, but where the hell is this city?");
      return "Sorry, but where the hell is this city?";
    }
    else
    {
      console.log("Sorry, there's an internet connection issue.");
      return "Sorry, there's an internet connection issue."
    }
  }
  else
  {
     wtData = result.data;
     console.log("It's "+wtData.weather[0].description+
     ", and the current temperature is "+wtData.main.temp+
     "C.. The temp min is "+wtData.main.temp_min+
     ". The temp max is "+wtData.main.temp_max+"."
     +" The wind is "+wtData.wind.speed+" m/ps.");
  }
};
