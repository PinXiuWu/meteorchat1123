/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Nov 1, 2017
*/

//把msgRecords的mongoDB資料庫連結到msgRecords這個伺服器端的Global Variable
msgRecords = new Mongo.Collection("msgRecords"); //請勿變更此行
var engLexicon = new Mongo.Collection("engLexicon");
Meteor.startup(function(){
  //所有在程式啟動時會在伺服器執行的程式碼都會放在這裡
  var str1 = "Where were you yesterday?";
  var str2 = "Where did you go yesterday?";
  var str3 = "Did you go anywhere yesterday?";
  //var strKeyWord = "microsoft";

  var regexpKeyWord = /where*(.*)you(.*)where*/i;  //括號(.*)表示you之後符合的字
  //var regexpKeyWord = /"Check that song[Hello]!"/g;
  //var regexpKeyWord = /(12)|(67)/g;  //g:global search; i:insensitive(不管大小寫); i,g的位子可以互換;
   //  /./中的.代表任何一個字元; /\w/的\w代表任意字元不含符號; \W2代表任意不是字的字元,可能是空格或符號;
   // \d代表所有是數字的字元; \D代表所有符合不是數字的字元
   //[abc]代表符合abd的字元都可以...; [a-z]表示a到z; /S/代表不是空格的字元; /^[abc]代表排除abc後的字元;
   ///[\w+]代表方括號中實際的"每個字元"
   // /*/代表可以有字元也可以沒有字元
   // /|/代表or的意思,(12)|(67)代表12或67, 如果是12|67只會判斷1後跟著2或6,然後跟著7

//  console.log("String: "+str.replace(strKeyWord, "Ha ha"));
//  console.log("Regexp: "+str.replace(regexpKeyWord, "Ha ha"));
//  console.log("RegExp: "+str.match(regexpKeyWord, "Ha ha"));
//  console.log("RegExp: "+str.match(regexpKeyWord));
  console.log("Str1: "+str1.match(regexpKeyWord));
  console.log("Str2: "+str2.match(regexpKeyWord));
  console.log("Str3: "+str3.match(regexpKeyWord));

  var weatherStr1 = "What is the weather in Taipei tomorrow?";
  var weatherStr2 = "Is the weather going to be bad in Taipei?"
  var weatherStr3 = "I wonder what the temperature will be in Taipei tomorrow."
  var regexpKeyWordOfWeather = /.*(temperature|weather).*in (\w+)/i;
  var regexpKeyWordOfWeather2 = /(temperature|weather).*in (\w+)/i;  //g要去掉 後面才會分別顯示符合的字


  console.log("weatherStr1: "+weatherStr1.match(regexpKeyWordOfWeather));
  console.log("weatherStr2: "+weatherStr2.match(regexpKeyWordOfWeather));
  console.log("weatherStr3: "+weatherStr3.match(regexpKeyWordOfWeather));

  //loadEngLexicon();
});

//所有大腦(伺服器)的功能都會在這裡定義
Meteor.methods({
  //接收訊息的大腦功能msgReceiver，會接收到一個訊息msg。
  /***請勿變更此功能內容***/
  msgReceiver: function(msg) {

    //每一個訊息都會被放進msgRecords資料庫，而每一筆資料都會包含三種資訊：
    //time代表訊息被存入資料庫的時間(new Date()會得到當下的系統時間)、speaker
    //代表說話者(接收到的訊息的說話者是You)、msg則是訊息本身(接收到的msg變數)
    msgRecords.insert({time: new Date(), speaker: "You", msg: msg});

    //呼叫運算接收到的訊息的內部功能processMsg，並傳送msg訊息
    processMsg(msg);
    //回傳一個執行完畢的訊號
    return;
  },
  //重設訊息資料庫的大腦功能resetELIZA。
  /***除預設訊息的內容之外，請勿變更此功能***/
  resetELIZA: function() {
    //移除所有msgRecords資料庫的記憶
    msgRecords.remove({});
    //移除所有資料後放入一筆預設的訊息資料
    msgRecords.insert({time: new Date(), speaker: "ELIZA", msg: "This is ELIZA. How are you doing today?"});
    //回傳一個執行完畢的訊號
    return;
  }
});

//自訂的大腦功能函數，只能在伺服器內部呼叫。在這邊是由msgReceiver這個大腦功能呼叫
//會接收到一個msg訊息並進行訊息運算與處理
var processMsg = function(msg) {  //請勿變更此行
  //建立一個processResults變數儲存訊息運算處理的結果
  var processResults = "";  //請勿變更此行
  var emotion = "", msgWordsPOS = [];
  emotion = emotionChecker(msg);
  msgWordsPOS = posIdentifier(msg, engLexicon);
  //「以下」是你可以編輯的部份，請將你的ELIZA處理訊息的核心程式碼放在以下的段落內
  processResults = socialResponse(msg);

  if (processResults === "")
  {
    processResults = wordSearch(msg, engLexicon);
  }



  if(processResults === "")
  {
    processResults = posSearch(msg, engLexicon);
  }

  if(processResults === "")
  {
    processResults = weatherInfo(msg);
  }
  //目前完全沒有訊息處理。所以processResults一定是空字串
  //這邊在判斷processResults是空字串的時候會放進一個預設的訊息
  if(processResults === "")
  {
    processResults = chooseRandomResponse(msg, msgWordsPOS, emotion, engLexicon);
  }

  //「以上」是你可以編輯的部份，請將你的ELIZA處理訊息的核心程式碼放在以上的段落內

  //在msgRecords資料庫放入運算訊息之後的結果，做為ELIZA的回應，請勿變更此行
  msgRecords.insert({time: new Date(), speaker: 'ELIZA', msg: processResults});
};//請勿變更此行
