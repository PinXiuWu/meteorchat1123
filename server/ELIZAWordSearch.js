wordSearch = function(msg, engLexicon) {
  var wordSearchResult = "";
  if(msg.indexOf("Which 10")> -1)
  {
    console.log("here");
    var allMatches;
    if(msg.indexOf("verb")> -1)
    {
      allMatches = engLexicon.find({POS: "verb"});
    }
    else if(msg.indexOf("noun")> -1)
    {
      allMatches = engLexicon.find({POS: "noun"});
    }
    else if(msg.indexOf("adjective")> -1)
    {
      allMatches = engLexicon.find({POS: "adjective"});
    }
    if(allMatches !== undefined)
    {
      allMatches = allMatches.fetch();
      for(index=0 ; index<10 ; index++)
      {
        var randomNum = Math.random();
        randomNum = randomNum*allMatches.length;
        randomNum = Math.floor(randomNum);
        wordSearchResult = wordSearchResult+allMatches[randomNum].Word+",";
      }
      wordSearchResult = "There you go: "+wordSearchResult;
    }
    else
    {
      wordSearchResult = "Sorry. I got nothing for you.";
    }
  }
  return wordSearchResult;
};
