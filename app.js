$(document).ready(function(){


var randColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

$("#randButton").click(function(){
  // $("#randButton").css("background", randColor());  color changing buttons
  $(".rectangle").each(function() {
    $(this).css("background", randColor());
  })
});

var count = 1;
var playerCaseValue;

$("#addSquares").click(function(){
  if (count < 25) { //limited number of squares for game
  // $("#addSquares").css("background", randColor());   color changing buttons
  var $rect = $("<div>", {id: "rect" + count, class: "rectangle"})
  $(".container").append($rect);
  $("#rect" + count).css("background-color", randColor());
  count++;
  }

});

var cases = [
  [1, "https://i.imgur.com/duLAXL8.jpg"],
  [5, "https://i.imgur.com/CZTEwI3.jpg"],
  [10, "https://i.imgur.com/M5Rh1cn.jpg"],
  [15, "https://i.imgur.com/gsZggyL.jpg"],
  [25, "https://i.imgur.com/SNyxJiy.jpg"],
  [50, "https://i.imgur.com/mTdRcTS.jpg"],
  [75, "https://i.imgur.com/UJridqa.jpg"],
  [100, "https://i.imgur.com/IojY5yn.jpg"],
  [200, "https://i.imgur.com/q3kVqNM.jpg"],
  [300, "https://i.imgur.com/BPUxm4D.jpg"],
  [400, "https://i.imgur.com/9uA22XY.jpg"],
  [500, "https://i.imgur.com/fpKWUsH.jpg"],
  [750, "https://i.imgur.com/x43Fv5F.jpg"],
  [1000, "https://i.imgur.com/e5X0ToS.jpg"],
  [5000, "https://i.imgur.com/gcOpD5Y.jpg"],
  [10000, "https://i.imgur.com/5STfKHn.jpg"],
  [25000, "https://i.imgur.com/pqhnRkH.jpg"],
  [50000, "https://i.imgur.com/shh9HfV.jpg"],
  [75000, "https://i.imgur.com/7agP78q.jpg"],
  [100000, "https://i.imgur.com/UYHtjMg.jpg"],
  [200000, "https://i.imgur.com/zVUI8zp.jpg"],
  [300000, "https://i.imgur.com/HhJQ66c.jpg"],
  [400000, "https://i.imgur.com/jeUKcrc.jpg"],
  [500000, "https://i.imgur.com/9PfGFqA.jpg"],
  [750000, "https://i.imgur.com/LfOlOes.jpg"],
  [1000000, "https://i.imgur.com/RNllA0l.jpg"]
];

$("#startGame").click(function(){

  while (count < 25) {
    var $rect = $("<div>", {id: "rect" + count, class: "rectangle"})
    $(".container").append($rect);
    $("#rect" + count).css("background-color", randColor());
    count++;
  }

  var casesCopy = [...cases];
  var rectCount = 0;
  var shuffledCases = [];
  while (casesCopy.length > 0) {
    let caseIndex = Math.floor(Math.random() * casesCopy.length);
    shuffledCases.push(casesCopy[caseIndex]);
    casesCopy.splice(caseIndex, 1);
    
  }

  var getPlayerCase = (function askPlayerCase(fail) {
    var chooseCase = fail === false ? prompt('Choose a case number between 1 - 26.') :
                                      prompt('Your number was not between 1-26. Please choose again.');
    return (/^\d?\d$/.test(chooseCase) &&
    chooseCase <= 26 && 
    chooseCase >= 1) ?
    chooseCase: askPlayerCase();
  }());

  var playerCaseArr = shuffledCases.splice(getPlayerCase, 1);
  playerCaseValue = playerCaseArr[0][0];

  for (let i = shuffledCases.length - 1; i >= 0; i--) {
    $("#rect" + rectCount).html("<img class= cases " + "id= " + ("case" + shuffledCases[i][0]) + " src=" + shuffledCases[i][1] + ">");
    $("#cases").css("opacity", 0);
    shuffledCases.splice(i, 1);
    rectCount++;
  }

  alert("Pick 5 cases and wait for a call from the banker.")

  var lastPicked;
  var casesLeft = 26;
  var clickCount = 0;
  var clickedAlready = [];
  var valueLeft = 3418431;
  var gameOver;
  var bankerOffer;
  var roundNumber;
  var dealEvent;

 
  
  $("div .rectangle").click(function(){
    $(this).stop(true,false).slideUp("slow", function (){
      $(this).css('display', 'flex');
      $(this).css('background', 'transparent');
      let thisCase = $("#"+$(this).attr("id")+" img:first")  //steven's hacks
      lastPicked = $(thisCase).attr("id");
      var lastPickedNumOnly = Number(lastPicked.substring(4));
      if (!clickedAlready.includes(lastPickedNumOnly)) {
      clickedAlready.push(lastPickedNumOnly);
  
      casesLeft--;
      clickCount++;
      $(thisCase).css('opacity', 1);
      valueLeft -= lastPickedNumOnly;
    
  
      var getOffer = function(remainCaseCount, remainValue, clickCount) {
        roundNumber = clickCount <=  5 ? 1 :
                      clickCount <= 10 ? 2 :
                      clickCount <= 14 ? 3 :
                      clickCount <= 17 ? 4 :
                      clickCount <= 19 ? 5 :
                      clickCount <= 20 ? 6 :
                      clickCount <= 21 ? 7 :
                      clickCount <= 22 ? 8 :
                      clickCount <= 23 ? 9 :
                      10;
  
        dealEvent = [5,10,14,17,19,20,21,22,23].includes(clickCount);
  
        bankerOffer = (remainValue/remainCaseCount * (roundNumber/10)).toFixed(2);
  
        if (dealEvent) {
          var dealOrNoDeal = confirm(`The Banker would like to offer you ${bankerOffer}. \nOr you can keep your case and keep playing. \nDEAL or NO DEAL (OK for DEAL. CANCEL for NO DEAL)?`) ? true : false;
  
          // confirm('Deal or No deal?');
          // if (confirm('Deal or No deal?') == true) {
          //   var userChoice = true;
          // } else {
          //   var userChoice = false;
          // }
          // var dealOrNoDeal = userChoice
          
        }
       
        return dealOrNoDeal;
  
  
  
      };
  
      var gameOver = getOffer(casesLeft, valueLeft, clickCount);
    
      if (gameOver) {
        
        alert("You won $" + bankerOffer + "!!! \n Your chosen case had $" + playerCaseValue + ".");
        count = 0;
        $(".rectangle").remove();
      } else if (roundNumber === 10) {
        alert(`You stuck with your case the entire time! Enjoy your $${playerCaseValue}.`)
      }else if (dealEvent) {
        console.log('test');
        let pickNum = [5,4,3,2,1,1,1,1,1];
        alert(`Pick ${pickNum[roundNumber - 1]} cases and then wait for a call from the banker.`)
      }
  
     
      
      // console.log('last num', lastPickedNumOnly)
      
      // console.log('click count', clickCount);
      // console.log(valueLeft);
      // console.log('round', roundNumber)
      // console.log('cases', casesLeft);
    
      
  
  
  
    }
      
    });
    })



})

});




