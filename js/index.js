const breakValue = document.getElementById('break-length');
const sessionValue = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const startTimer = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const breakInc = document.getElementById('break-increment');
const breakDec = document.getElementById('break-decrement');
const sesInc = document.getElementById('session-increment');
const sesDec =document.getElementById('session-decrement');
const label = document.getElementById('timer-label');

let minutes,seconds;
let clockSound = new Audio('./audio/Clock.mp3')
let breakIsOver = new Audio('./audio/Break.mp3');
let sessionIsOver = new Audio('./audio/Session.mp3')

const defTimerState = ()=> {
    label.innerHTML = 'Session';
    timeLeft.innerHTML = '25 : 00';
    breakValue.innerHTML = 5;
    sessionValue.innerHTML = 25;
    minutes=25;
    seconds=0;
}
defTimerState();

const disableButtons = (bool) => {
    breakInc.disabled = bool;
    breakDec.disabled = bool;
    sesInc.disabled = bool;
    sesDec.disabled = bool;
    startTimer.disabled = bool;
}

const sesIncDecHandler = ()=> {
    if(sessionValue.innerHTML > 60){
        sessionValue.innerHTML = 60;
        alert('You Reach The Limit!')
    } 
    if(sessionValue.innerHTML < 1) 
        sessionValue.innerHTML = 1;
    minutes = sessionValue.innerHTML;
    timeLeft.innerHTML = `${minutes < 10 && minutes > 0 ? minutes = '0' + minutes : minutes} : 00`; 
}

sesInc.addEventListener('click', ()=>{
    sessionValue.innerHTML++;
    sesIncDecHandler();

})
    
sesDec.addEventListener('click', () => {
    sessionValue.innerHTML--;
   sesIncDecHandler();
}) 

const breakIncDecHandler = () => {
    if(breakValue.innerHTML>25){
        breakValue.innerHTML = 25;
        alert('You Reach The Limit!')
    } 
    if(breakValue.innerHTML < 1)
        breakValue.innerHTML = 1;
}

breakInc.addEventListener('click', () => {
    breakValue.innerHTML++;
    breakIncDecHandler();
})
breakDec.addEventListener('click', () => {
    breakValue.innerHTML--;
    breakIncDecHandler();
})

/* Implementing a function for Session and Break timers.
        The first parameter will represent the value of Session/Break in minutes,
        the second one - a callback function (if it's not clear),
        the third one - audio that will notify the user that Session/Break is over,
        and the last one - clock sound that will be heared after the timer finally does its job and stops.
*/
const timerFoo = (sesBreakVal, callBack, audio, clockS) => {
    disableButtons(true);
    minutes= sesBreakVal.innerText-1;
    seconds = `${isBreakStarted ? 59 : 60}`
    isBreakStarted && !isBreakStarted;
    timer = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            seconds = 59;
            minutes--;
            if(minutes < 0){
                clearInterval(timer)
                audio.play()
                // If  the fourth argument(clock Sound) is passed, then play it after a sec
                clockS != undefined && setTimeout(()=>  clockS.play(),1000)
                callBack()
            }
        }
        // If the number of mins/secs is a one-digit number, then add 0 before it
        if(minutes < 10 && minutes >= 0){
            timeLeft.innerHTML = `${timeLeft.innerHTML.substr(0,1).includes(0) && '0'+minutes} : ${seconds < 10 ? seconds = '0' + seconds : seconds}`
        } else 
            timeLeft.innerHTML = `${minutes} : ${seconds < 10 ? seconds = '0' + seconds : seconds}`
    },1000)
}

startTimer.addEventListener('click',  () => {
    timerFoo(sessionValue, breakHandler, sessionIsOver)
})  

const resetHandler = () => {
    defTimerState();
    disableButtons(false);
}

let isBreakStarted = false;

const breakHandler = () => {
    isBreakStarted = true;
    label.innerText = 'Break';
    timerFoo(breakValue, resetHandler, breakIsOver, clockSound);
}

reset.addEventListener('click', ()=>{
    clearInterval(timer);
    resetHandler();
    disableButtons(false);
})