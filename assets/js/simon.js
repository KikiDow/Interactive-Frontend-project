//Author: Blood, B.
//Title: JavaScript Simon Game.
//Version: Unknown
//Type:HTML, CSS & JavaScript
//Source: https://codepen.io/BenLBlood/pen/LGLEoJ

//
var power = "off";
var strict = "off";
var running = false;
var memoryArray = [];
var memoryArrayCounter = 0;
var userArray = [];
var userArrayCounter = 0;
var levelCount = 1;
var tempColor;
var runMemory;
var matchingArrays = true;
var tempo;

function colorButton(id, color){
    this.id = id;
    this.color = color;
}

var nav = new colorButton(1, "nav");
var mus = new colorButton(2, "mus");
var pin = new colorButton(3, "pin");
var tur = new colorButton(4, "tur");

// Power Button
$("#powerSwitch").on("click", function(){
    if(power == "off") {
        $("#buttonOn").css("visibility", "visible");
        $("#buttonOff").css("visibility", "hidden");
        $("#displayText").css("opacity", "1");
        power = "on";
    }
    else if (power == "on") {
        $("#buttonOn"). css("visibility", "hidden");
        $("#buttonOff").css("visibility", "visible");
        $("#displayText").css("opacity", "0.3");
        power = "off";
        strict = "off";
        $("#strictButton").css("background", "#DB9C24");
        $("#strictButton").removeClass("fa fa-check");
        running = false;
        $("#startButton").css("background", "#FF7373");
        memoryArray = [];
        userArray = [];
        levelCount = 1;
        $("#displayText").html("--");
        memoryArrayCounter = 0;
        userArrayCounter = 0;
        matchingArrays = true;
        clearInterval(runMemory);
        $(".fourButton").css("pointer-events", "none");
    }
});

//Strict Button
$("#strictButton").on("click", function(){
    if (power == "on" && running == false){
        if(strict == "off"){
            $("#strictButton").css("background", "#63F42A"); //CHANGE TO FLOURESCENT GREEN
            $("#strictButton").addClass("fa fa-check");
            strict = "on";
        }
        else if(strict == "on"){
            $("#strictButton").css("background", "#DB9C24");
            $("#strictButton").removeClass("fa fa-check");
            strict = "off";
        }
    }
});

// Start Button
$("#startButton").on("click", function() {
  if (power == "on") {
    $("#startButton").css("background", "#63F42A");
    running = true;
    userArray = [];
    memoryArray = [];
    memoryArrayCounter = 0;
    userArrayCounter = 0;
    levelCount = 1;
    $("#displayText").html("--");
    matchingArrays = true;
    clearInterval(runMemory);
    $(".fourButton").css("pointer-events", "none");
    newMemory();
    console.log(memoryArray);
    setTimeout(function() {runMemory = setInterval(playMemory, 1000);}, 1000);
  }
});

// Coloured Buttons
$("div[id*='button']").on("click", function() {
  if (power == "on" && running) {
    if (event.which == 1) {
      $("#sound" + this.id).get(0).cloneNode().play();
      userArray.push(this.id.slice(6, 9));
      userArrayCounter++;
      
      for (i = 0; i < userArray.length; i++) {
        if (memoryArray[i] != userArray[i]) {
          matchingArrays = false;
        }
      }
      if (!matchingArrays) {
        $("#displayText").html("!!");
        $("#soundbuttonWrong").get(0).play();
        userArray = [];
        memoryArrayCounter = 0;
        userArrayCounter = 0;
        matchingArrays = true;
        $(".fourButton").css("pointer-events", "none");
        if (strict == "on") {
          memoryArray = [];
          levelCount = 1;
          newMemory();
          console.log(memoryArray);
          setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
        }
        else {
          setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
        }
      }
      else {
        if (userArrayCounter == memoryArrayCounter) {
          if (matchingArrays) {
            if (levelCount == 20) {
              win();
            }
            else {
              userArray = [];
              memoryArrayCounter = 0;
              userArrayCounter = 0;
              newMemory();
              levelCount++;

              switch(levelCount) {
                case 1:
                case 2:
                case 3:
                case 4:
                  tempo = 1000;
                    break;
                case 5:
                  tempo = 700;
                  break;
                case 9:
                  tempo = 500;
                  break;
                case 13:
                  tempo = 300;
                  break;
              }
              setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
              $(".fourButton").css("pointer-events", "none");
            }
          }
        }
      }
    }
  }
});

//Randomly selects a number for each level count and
//Adds it to the memoryArray.  Numbers correspond to 
//colors depending on the color's object.id
function newMemory() {
  var temp = Math.floor((Math.random() * 4) + 1);
  switch(temp) {
    case 1:
      memoryArray.push("Nav");
      break;
    case 2:
      memoryArray.push("Mus");
      break;
    case 3:
      memoryArray.push("Pin");
      break;
    case 4:
      memoryArray.push("Tur");
      break;
  }
}

function playMemory() {
  $("#displayText").html(levelCount);
  tempColor = memoryArray[memoryArrayCounter];
  //$("#soundbutton" + tempColor).get(0).play();
  $("#soundbutton" + tempColor).get(0).cloneNode().play();
  $("#button" + tempColor).addClass("activated");
  setTimeout(function() {$("#button" + tempColor).removeClass("activated");}, 250);
  memoryArrayCounter++;
  if (memoryArrayCounter == memoryArray.length) {
    clearInterval(runMemory);
    $(".fourButton").css("pointer-events", "auto");
  }
}

function win() {
  $("#displayText").html("WIN");
  $("#buttonNav").addClass("activated");
  setTimeout(function() {$("#buttonNav").removeClass("activated");}, 250);
  setTimeout(function() {$("#buttonMus").addClass("activated");}, 250);
  setTimeout(function() {$("#buttonMus").removeClass("activated");}, 500);
  setTimeout(function() {$("#buttonPin").addClass("activated");}, 500);
  setTimeout(function() {$("#buttonPin").removeClass("activated");}, 750);
  setTimeout(function() {$("#buttonTur").addClass("activated");}, 750);
  setTimeout(function() {$("#buttonTur").removeClass("activated");}, 1000);
  
  setTimeout(function() {$("#buttonNav").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonMus").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonPin").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonTur").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonNav").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonMus").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonPin").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonTur").removeClass("activated");}, 1500);
  
  setTimeout(function() {$("#buttonNav").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonMus").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonPin").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonTur").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonNav").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonMus").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonPin").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonTur").removeClass("activated");}, 2000);
  
  setTimeout(function() {
    userArray = [];
    memoryArray = [];
    memoryArrayCounter = 0;
    userArrayCounter = 0;
    levelCount = 1;
    $("#displayText").html("--");
    matchingArrays = true;
    clearInterval(runMemory);
    $(".fourButton").css("pointer-events", "none");
    newMemory();
    console.log(memoryArray);
    setTimeout(function() {runMemory = setInterval(playMemory, 1000);}, 1000);
  }, 3000);
}