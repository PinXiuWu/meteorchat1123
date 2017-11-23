var commonGreetings = [
  "Hello", "Hola", "How are you", "Bonjour", "Hey"
];

var commonFarewells = [
  "Bye", "Adios", "See you", "GoodBye"
];

socialResponse = function(msg, engLexicon) {
  var responseType = "";
  var upperCaseMsg = msg.toUpperCase();

  for(index=0 ; index<commonGreetings.length ; index++)
  {
    var greeting = commonGreetings[index].toUpperCase();
    if(upperCaseMsg.indexOf(greeting) > -1)
    {
      responseType = "greetings";
      break;
    }
  }

  for(index=0 ; index<commonFarewells.length ; index++)
  {
    var farewell = commonFarewells[index].toUpperCase();
    if(upperCaseMsg.indexOf(farewell) > -1)
    {
      responseType = "farewells";
      break;
    }
  }

  if(responseType === "greetings")
  {
    return "Hi, nice to meet you.";
  }
  else if(responseType === "farewells")
  {
    return "See you soon again!";
  }
  else
  {
    return "";
  }
};
