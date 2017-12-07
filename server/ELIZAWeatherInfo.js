weatherInfo = function(msg) {
  var weatherRegex = /(temperature|weather).*in (\w+)/i;
  var weatherRequest = msg.match(weatherRegex);
  if(weatherRequest === null)
  {
    return "";
  }
  else
  {
    console.log(weatherRequest);
    var lastArrayPos = weatherRequest.length-1  //.length-1表示字串最後一個位子
    var targetCity = weatherRequest[lastArrayPos]; //取得weatherRequest最後一個位置的資料
    console.log(targetCity);



  }
};
