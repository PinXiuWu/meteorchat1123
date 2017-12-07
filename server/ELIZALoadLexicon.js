loadEngLexicon = function() {
  engLexicon.remove({});

  var lexiconList = Assets.getText("engLexicon_1000.csv");

  if(lexiconList.indexOf("\r\n") > -1) {
    lexiconList.replace(/\r\n/g, "\n");
  }
  lexiconList = lexiconList.split("\r\n");
  for(index=0 ; index<lexiconList.length ; index++)
  {
     lexiconList[index] = lexiconList[index].split(",");
  }

  var colNames = lexiconList[0];
  for(row=1 ; row<lexiconList.length ; row++)
  {
    var word = {};
    for(col=0 ; col<lexiconList[row].length ; col++)
    {
      var colName = colNames[col];
      word[colName] = lexiconList[row][col];
    }
    engLexicon.insert(word);
  };
};
