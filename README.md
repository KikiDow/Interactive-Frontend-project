########## Application Purpose #################################################
This one page frontend web application was developed as part completion of the 
Code Institute Full Stack Web Developer course. It is the milestone project for the 
Interactive Frontend Development stream.

This file also contains the code logic description requested in the assignment 
outline. This is placed under the heading "Code Logic Description".

########## Application Description #############################################
The application follows the project brief and presents a version of the classic
Simon Says game developed using HTML, CSS & JavaScript.

########## Files Included ######################################################
index.html
README.md
style.css
simon.js
Brain_Image.jpeg
simonIncorrectSound.mp3
simonSound1.mp3
simonSound2.mp3
simonSound3.mp3
simonSound4.mp3

########## Design Decisions & Considerations ###################################
1 - The application has attempted to meet all the requirements laid out in the 
assignment outline and design brief. No additional features were added outside of
the design brief.
2 - Although the original electronic version of the game was released in 1978, the 
Developer decided to use a 1980's themed colour scheme inspired by the movie 
"Ready Player One". This was done to challenge the my own skills and to present a 
different design than that to the countless examples available online.

########## Resources ###########################################################
Code references have been included in the individually referenced files.

The file "Brain_Image.jpeg" was retrieved from:
    Dolgin, E. (2017). "Stimulating the Brain's emotional center enhances memory".
    https://spectrum.ieee.org/the-human-os/biomedical/devices/stimulating-the-brains-emotional-center-enhances-memory
    
The files simonIncorrectSound.mp3, simonSound1.mp3, simonSound2.mp3, simonSound3.mp3, simonSound4.mp3 were retrieved from:
    Blood, B. (n.d.). "JavaScript Simon Game".
    https://codepen.io/BenLBlood/pen/LGLEoJ

########## Code Logic Description ##############################################
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

NEWMEMORY description


