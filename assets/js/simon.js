/*

    Author: Blood, B. (n.d.).
    Title: "JavaScript Simon Game"
    Version: Unknown
    Type: HTML, CSS & JavaScript
    Retrieved from: https://codepen.io/BenLBlood/pen/LGLEoJ
    
    Author: Unknown [Root Tech], 2017, September 9.
    Title: "How to Program a Simon Game: JavaScript Part 1" [Video file]
    Version: Unknown
    Type: HTML, CSS & JavaScript.
    Retrieved from: https://www.youtube.com/watch?v=9MTR3V2XpRI
    
    Author: Unknown [Root Tech], 2017, September 9.
    Title: "How to Program a Simon Game: JavaScript Part 2" [Video file]
    Version: Unknown
    Type: HTML, CSS & JavaScript.
    Retrieved from: https://www.youtube.com/watch?v=iXscqYgZ7HQ
    
*/
$(document).ready(function() {
  //Instantiating control variables and accumulators.
  var power = "off";
  var strict = "off";
  //running - Used to indicate if a game is currently running.
  var running = false;
  //memoryArray - Will hold the sequence generated by "Simon" that has to be replicated by the user.
  var memoryArray = []; 
  var memoryArrayCounter = 0;
  //userArray - This array will hold the sequence entered by the user.
  var userArray = []; 
  var userArrayCounter = 0;
  //levelCount - Variable that indicates the level of the game the player has reached so far.
  var levelCount = 1;
  //tempColor - Used to store the colour value of the current index [memoryArrayCounter] in the memoryArray
  var tempColor;
  //runMemory - Used to store the timing intervals and fucntion call to play sequence and sounds.
  var runMemory;
  var matchingArrays = true;
  var tempo;

  //Constructor for colour buttons.
  function colorButton(id, color){
      this.id = id;
      this.color = color;
  }

  //Instantiating the four colour buttons, Navy, Mustard, Pink and Turquoise.
  var nav = new colorButton(1, "nav");
  var mus = new colorButton(2, "mus");
  var pin = new colorButton(3, "pin");
  var tur = new colorButton(4, "tur");

  // Behaviour for Power Button
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
          //Change background colour and remove icon from "Strict" button.
          $("#strictButton").css("background", "#DB9C24");
          $("#strictButton").removeClass("fa fa-check");
          running = false;
          //Change background colour of "Start" button.
          $("#startButton").css("background", "#FF7373");
          //Ensuring game control variables and accumulators are correct for new game.
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

  //Behaviour for Strict Button.
  $("#strictButton").on("click", function(){
      if (power == "on" && running == false){
          if(strict == "off"){
            //Change background colour and add icon to "Strict" button.
              $("#strictButton").css("background", "#63F42A");
              $("#strictButton").addClass("fa fa-check");
              strict = "on";
          }
          else if(strict == "on"){
             //Change background colour and remove icon from "Strict" button.
              $("#strictButton").css("background", "#DB9C24");
              $("#strictButton").removeClass("fa fa-check");
              strict = "off";
          }
      }
  });

  // Behaviour for Start button.
  $("#startButton").on("click", function() {
    if (power == "on") {
       //Change background colour of "Start" button.
      $("#startButton").css("background", "#63F42A");
      //Adjust control variables and accumulators appropirately.
      running = true;
      userArray = [];
      memoryArray = [];
      memoryArrayCounter = 0;
      userArrayCounter = 0;
      levelCount = 1;
      //Change display text.
      $("#displayText").html("--");
      matchingArrays = true;
      clearInterval(runMemory);
      $(".fourButton").css("pointer-events", "none");
      //newMemory() - function call to create new random sequence.
      newMemory();
      console.log(memoryArray);
      //Play sequence to the user.
      setTimeout(function() {runMemory = setInterval(playMemory, 1000);}, 1000);
    }
  });

  // Behaviour for Coloured Buttons.
  //div* - Wildcard operator used to create event listener for all colour buttons.
  $("div[id*='button']").on("click", function() {
    if (power == "on" && running) {
      //Check that left-mouse click has been used to select the colour button.
      if (event.which == 1) {
        /*
        Retrieve id e.g. "buttonNav" and append to #sound to create the appropriate id
        value for the sound to be played, e.g. "#soundbuttonNav".
        */
        $("#sound" + this.id).get(0).cloneNode().play();
        /*
        Slice the last three characters from id "buttonNav", e.g. "Nav" and then
        push this value into the userArray array.
        */
        userArray.push(this.id.slice(6, 9));
        //Increment counter.
        userArrayCounter++;
        
        //For loop used to test if the two sequences are the same.
        for (i = 0; i < userArray.length; i++) {
          if (memoryArray[i] != userArray[i]) {
            matchingArrays = false;
          }
        }
        if (!matchingArrays) {
          /*
          If sequences do not match, update, display, certain control variables,
          accumulators and play error sound.
          */
          $("#displayText").html("!!");
          $("#soundbuttonWrong").get(0).play();
          userArray = [];
          memoryArrayCounter = 0;
          userArrayCounter = 0;
          matchingArrays = true;
          $(".fourButton").css("pointer-events", "none");
          /*
          If the "strict" setting is on, memoryArray is cleared and reinitialised,
          levelCount is reset and newMemory() called to create new sequence.
          */
          if (strict == "on") {
            memoryArray = [];
            levelCount = 1;
            newMemory();
            console.log(memoryArray);
            /*
            setTimeout(), setInterval and runMemory variable used to play sequence
            to user.
            */
            setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
          }
          //Continuing playing game.
          else {
            setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
          }
        }
        else {
          /*
          Nested if's check to see if the conditions that allow a player to win 
          the game have been met. If so, the win() function is called.
          */
          if (userArrayCounter == memoryArrayCounter) {
            if (matchingArrays) {
              if (levelCount == 20) {
                win(); // Player has won so win method is called.
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

  //Randomly generates the next value to be placed in the sequence for each level.
  function newMemory() {
    //A number between 1 and 4 is randomly generated.
    var temp = Math.floor((Math.random() * 4) + 1);
    /*
    Number passed to switch statement and value is then placed in sequence
    which corresponds to button object's id number.
    */
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

  //Plays the sound associated with a button. 
  //Also changes the display and adjusts control variables.
  function playMemory() {
    //Show current level.
    $("#displayText").html(levelCount);
    //Retrieve value from memoryArray at index equivalent to memmoryArrayCounter.
    tempColor = memoryArray[memoryArrayCounter];
    //Play sound by appending value retrieved to generic id tag. 
    $("#soundbutton" + tempColor).get(0).cloneNode().play();
    //Add and remove "activated" class to make button flash.
    $("#button" + tempColor).addClass("activated");
    setTimeout(function() {$("#button" + tempColor).removeClass("activated");}, 250);
    //Increment memoryArrayCounter.
    memoryArrayCounter++;
    //Check to see if the end of the memoryArray has been reached and if so clear 
    //any timers set in runMemory.
    if (memoryArrayCounter == memoryArray.length) {
      clearInterval(runMemory);
      $(".fourButton").css("pointer-events", "auto");
    }
  }

  //Presents a celebratory style sequence to the user upon winning the game.
  //Then resets control variables and accumulators.
  function win() {
    /*
    Update the display and uses the setTimeout, addClass and removeClass methods
    to produce a flashing lights sequence.
    */
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
    
    /*
    setTimeout method is used to to reset control variables and accumulators so 
    that the user can start a new game, three seconds after the end of the winning
    lights display sequence.
    */
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
});