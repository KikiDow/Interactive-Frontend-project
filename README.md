# SIMON SAYS GAME

This one page frontend web application was developed as part completion of the 
Code Institute Full Stack Web Developer course. It is the milestone project for the 
Interactive Frontend Development stream.The application follows the project brief and presents a version of the classic
Simon Says game developed using HTML, CSS & JavaScript.

This file also contains the code logic description requested in the assignment 
outline. This is placed under the heading "Code Logic Description".

## UX
1. The application has attempted to meet all the requirements laid out in the 
assignment outline and design brief. No additional features were added outside of
the design brief.
2. Although the original electronic version of the game was released in 1978, the 
Developer decided to use a 1980's themed colour scheme inspired by the movie 
"Ready Player One". This was done to challenge the my own skills and to present a 
different design than that to the countless examples available online.

## GitHub Repository
The GitHub Repository for this project is located [here](https://github.com/KikiDow/Interactive-Frontend-project)

## Features

## Tecnologies Used
- HTML
- CSS
- JavaScript
- jQuery

## Files Included
- index.html
- README.md
- style.css
- simon.js
- Brain_Image.jpeg
- simonIncorrectSound.mp3
- simonSound1.mp3
- simonSound2.mp3
- simonSound3.mp3
- simonSound4.mp3


## Testing

## Deployment

## Credits

### Content

### Media
* The file "Brain_Image.jpeg" used as the background image was retrieved from 
[here](https://spectrum.ieee.org/the-human-os/biomedical/devices/stimulating-the-brains-emotional-center-enhances-memory)
* The files; simonIncorrectSound.mp3, simonSound1.mp3, simonSound2.mp3, simonSound3.mp3, simonSound4.mp3 were retrieved from
[here](https://codepen.io/BenLBlood/pen/LGLEoJ)

### Acknowledgements
* Author: Unknown [Root Tech], 2017, September 9.
Title: "How to Program a Simon Game: HTML" [Video file]
Retrieved from: https://www.youtube.com/watch?v=zwKoo7VDj44
* Author: Unknown [Root Tech], 2017, September 9.
Title: "How to Program a Simon Game: CSS" [Video file]
Retrieved from: https://www.youtube.com/watch?v=muPIIfjazcU
* Author: Unknown [Root Tech], 2017, September 9.
Title: "Speed Styling Simon Game: CSS" [Video file]
Retrieved from: https://www.youtube.com/watch?v=fJQtc24sCJ8
* Blood, B. (n.d.). "JavaScript Simon Game".
https://codepen.io/BenLBlood/pen/LGLEoJ
* Dolgin, E. (2017). "Stimulating the Brain's emotional center enhances memory".
https://spectrum.ieee.org/the-human-os/biomedical/devices/stimulating-the-brains-emotional-center-enhances-memory


## Code Logic Description
    The code begins by declaring and in some cases assigning values to a number of 
key control variables and instantiating a number of accumulator variables to which 
values will be added and referenced throughout the running of the program. Lines 24-35.

    Next, a contructor for the colour button object is defined and four instances of
this object are instantiated for each of the four different colours used in the game.
Lines 38-47.

    In lines 50-77, the behavior of the power button is defined. It begins by using
the built in JavaScript on click function to respond to the user event. Inside this
function an if-else if structure is used to check whether the power button is currently
set to ON or OFF. If in the OFF setting, the css function is used to change the display 
and the "power" control variable is changed. If in the ON setting, the display and "power"
control variable are changed, plus a number of other control variables and accumulator are reset
to their original settings. The "clearInterval" method clears the timer set by the setInterval
method inside the colour buttons event handler on lines 141 and 144.

    In lines 79-93, the behaviour of the Strict button is defined. Again the on click 
function is used to respond to the user event. It first checks that the game is switched on 
and running, as the strict button can only be selected if these two conditions are met. 
Again an if-else if structure is used in comnbination with the built-in css function to change
the display. This also uses the built-in addClass and removeClass function to utilise a font-awesome
icon in the display. Finally, the "strict" control variable is changed.
    
    The behaviour for the "Start" button is defined next. It begins by checking that the power is 
set to ON. If this condition is met, the appropriate display elements are updated and all the
variables and accumulators required to play the game are set. In line 107, "clearInterval" is 
called to ensure that any timer set from previous games is cleared from memory. The "newMemory"
method is called to randomly create the sequence that the player must replicate. It then uses
the built-in "setTimeout" method to set the "runMemory" variable once every second, which in turn
uses the built-in "setInterval" method to call the "playMemory" method to play the sequence created 
in from when "newMemory" was called.

    The behaviour for the coloured buttons is defined next in lines 116-185. The on click function 
is used to respond to the user event. An if statement is used to check that an instance of the game
has been started and is running. If this condition is met, the button on the mouse pressed by the
is checked using the jQuery built-in function "event.which", which compares the key pressed on a
mouse or keyboard against set values. This is done to ensure the user has selected the colour button
with the correct mouse key. Once these conditions have been met the id of the div of the specific colour 
button selected is appended to the to the string "#sound" to create the id of the matching audio 
element in the "index.html" file. A chain of the built-in "cloneNode" and "play" methods are used to
play the mp3 file associated with that colour button. The final three characters of the selected div
id of the colour selected are sliced and pushed to the "userArray" and the userArrayCounter is
incremented. A for loop is then used to iterate through the userArray and compares the userArray to
the memoryArray. An if-else statement is then used to check if the two arrays match. If they don't, 
the display is updated appropriately and control variables and accumulators reset. The if statement 
also contains a nested if-else statement that checks whether the "strict" setting is on and makes 
the approrpriate changes to certain control variables that enforces the strict conditions of the game.
Both the nested if and else statments finish with the same combination described in line 77 of this file
to continue the game. The else of the main if-else, line 147, contains a number of nested if and one
if-else statement. The first if checks that both the "userArrayCounter" and "memoryArrayCounter" are equal.
If this condition is met, the "matchingArrays" value is then checked. The next nested statement being
the if-else, lines 150-178, firstly checks the "levelCount". If this is 20, the "win" method is called
as the player has won the game. Else, control variables are reset and the game continues on line 177.

    The newMemory function declared on lines 190-206 creates at random the next colour/sound that is placed
in the "memoryArray" to create the sequence played by "Simon" that the user must replicate. The temp variable 
is set by calling the built-in "Math.random" method to generate a random number between 0 and 1. This 
is then multiplied by 4, with 1 added to the result. The result is then entered as an argument into the 
"Math.floor" method to remove any decimal places to produce an integer result. The result will be a random 
number between 1 and 4. Once assigned, the "temp" variable is passed into a switch statement. Depending on the
value passed, a short string value will be appended to the "memoryArray", creating the sequence.

    The playMemory function declared on lines 208-219 is used to play the sequence held in "memoryArray".
It begins by changing the display to show the value of the  variable "levelCount". The "tempColor" variable is then 
assigned the short string value from the position of the "memoryArrayCounter" in the "memoryArray". The "tempColor"
value is then appended to the id "#soundbutton" and then in conjunction with the "cloneNode" and "play" methods 
are used to play the associated mp3 file. The "tempColor" value is then appended to the "#button" id and then 
the "addClass" method is used to add the css "activated" class to produce the flashing effect. The "activated"
class is then removed from the button by using the "setTimeout" and "removeClass" methods after a defined period
of time. The "memoryArrayCounter" is then incremented so that the next sound/button in the sequence will be called.
An if statement is then used to check whether the end of the "memoryArray" has been reached by comparing the 
"memoryArrayCounter" to the length of the "memoryArray". If this is the case, then the "clearInterval" method is
used to clear any timers set in the "runMemory" variable.

    The "win" method is defined in lines 221-264. This changes the display if the player has met the conditions
to win the game. A combination of alternating "addClass" and "removeClass" methods are used in conjunction with
the "setTimeout" method to create a celebratory flashing light sequence as a reward for the user. It does so by
adding and removing the css "activated" class. Lastly, a final nested "setTimeout" methods is defined, lines 250-263,
to change the display, reset some of the control variables and the accumulators used in the game. This is done so that
the user can start a new game.

    


