posIdentifier = function(msg, engLexicon) {
  var msgWords = msg.split(" "); //依照split後面括號內的""來斷開，這裡是有空格就斷開的意思
  var msgWordsPOS = [];
  for(index=0 ; index<msgWords.length ; index++) {
    var currentWord = msgWords[index];
    var wordInfo = engLexicon.findOne({Word: currentWord});
    if(wordInfo !== undefined) { //!==undefined代表有資料
      msgWordsPOS.push(wordInfo.POS)  //push的功能是把資料加入到陣列的最後一個位子，push是新增資料最簡單的方式，這邊是把知道的詞類push到msgWordsPOS
    }
    else {
      msgWordsPOS.push("na");//不知道詞類，push到na
    }
  }
  return msgWordsPOS;
};
