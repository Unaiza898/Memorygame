/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi")
//Global Variables
// global constants
var numberofstrikes ;
var clueHoldTime = 500; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var pattern= [];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var guessCounter = 0;
// var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0

 for(let i = 0 ; i <= 8; i ++)
    {
      pattern.push(randomnum());
      
      console.log("play random " + pattern[i] )
    } 


function startGame(){
    //initialize game variables
 numberofstrikes = 3;
    progress = 0;
    gamePlaying = true;
  // swap the Start and Stop buttons
document.getElementById("startBtn").classList.add("hidden");
document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}
function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
document.getElementById("stopBtn").classList.add("hidden");

}
// Sound Synthesis Functions
const freqMap = {
   1:261.6,
   2:329.6,
   3:392,
   4:466.2,
  5:499,
  6: 523,
  7: 783,
  8:900

}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    clueHoldTime  += 5;
    delay += clueHoldTime ;
    delay += cluePauseTime;
  }
}
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You Won!!");
}
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return 
; }
  if(pattern[guessCounter] == btn) 
    {
      if( guessCounter == progress) {
        if ( pattern.length - 1 == progress  ) 
        {
          winGame();
          
        }
      else{
        progress ++;
        playClueSequence();
        
      }
      }else{
     guessCounter++;
  }
    } else{
      alert("Oops wrong button, you got " + numberofstrikes+ " more strikes to go!!");
      numberofstrikes--
      playClueSequence();
      ;
    }
  if(numberofstrikes == 0) // it counts mistakes
    {
      loseGame();
    }

  // add game logic here
}

function randomnum(){
  
var max = 8
return  Math.floor(Math.random() * (max - 1) + 1)
      

}