posSearch = function(msg, engLexicon) {
  var posQ = "What's the POS of the word ";
  var posSearchResults = "";
  if(msg.indexOf(posQ) > -1)
  {
   var targetWord = "";
   var startPos = posQ.length;
   var endPos;
   if(msg.indexOf("?" > -1))
   {
    endPos = msg.indexOf("?");

   }
   else
   {
     endPos = msg.length;
   }
   targetWord = msg.substring(startPos, endPos);
   var wordInfo = engLexicon.findOne({Word: targetWord});
   if(wordInfo !== undefined)
   {
     if(wordInfo.POS.indexOf("ad") === 0)
     {
       posSearchResults = "It's an "+wordInfo.POS+".";
     }
     else
     {
       posSearchResults = "It's a "+wordInfo.POS+".";
     }

   }
   else
   {
     posSearchResults = "Sorry. I can not find this word.";
   }
 }
   //回傳搜尋結果
  return posSearchResults;
};
