var randomResponses = {
  neutral:
    [
      "Could you tell me more about %w%?", //w代表word, %w%在此代表任何一個字
      /*"I know.", "That's right.", "I understand that.",
      "I know what you're talking about.",
      "Hmm...interesting.", "Yeah yeah yeah.",
      "I've been through the same position.",
      "True.", "You're goddamn right about it!", "Got it!"*/
    ],
  emotional:
    [
      "What are you so surprising about %w%?",
      /*"Calm down.", "Why so emotional?",
      "Why are you so surprising?"*/
    ],
  suspicious:
    [
      "Hmm... %w% is very tricky thing.",
      /*"I don't care.", "So?", "Who knows?", "I have no idea.",
      "Who told you I have the answer?", "Go ask someone else!",
      "I'm the last person who have the answer."*/
    ]
};





chooseRandomResponse = function(msg, msgWordsPOS, emotion, engLexicon) { //接收訊息的類別順序也很重要，和main.js的順序要一樣才能對應
  var finalChoice = "", keyword = ""; synonym = "";

  var emotionResponses = randomResponses[emotion];
  var msgWords = msg.split(" ");

  for(index=msgWordsPOS.length-1 ; index>-1 ; index--) //msgWordsPOS.length-1代表陣列的最後一個位置，此處遞減尋找，找到句首(index>-1)為止
  {
    if(msgWordsPOS[index] === "noun")
    {
      keyword = msgWords[index];
      var searchResult = engLexicon.findOne({Word: keyword}); //word要等於keyword 接著傳送到searchresult
      if(searchResult !== undefined){
        synonym = searchResult.Synonym;
        break;
      }
    }
  }

  var numOfChoices = emotionResponses.length;
  var randomNum = Math.random();
  randomNum = randomNum*numOfChoices;
  randomNum = Math.floor(randomNum);
  finalChoice = emotionResponses[randomNum];

  if(synonym !== "") {
    finalChoice = finalChoice.replace("%w%", synonym); //replace("要換掉什麼", 要用什麼替代),此處代表用synonym代替"%w%"的部分
  }
  else {
    finalChoice = finalChoice.replace("%w%", "this");
  }


  return finalChoice;
};
