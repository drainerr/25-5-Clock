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
const audio = document.getElementById('audio');

let minutes,seconds;
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
}

const sesIncDecHandler = ()=> {
    if(sessionValue.innerHTML > 60){
        sessionValue.innerHTML = 60;
        alert('You Reach The Limit!')
    } 
    if(sessionValue.innerHTML < 1) 
        sessionValue.innerHTML = 1;
    minutes = sessionValue.innerHTML;
    timeLeft.innerHTML = 
    `${minutes < 10 && minutes > 0 ? minutes = '0' + minutes : minutes} : 00`;
    
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

const timerFoo = (sesBreakVal, callBack) => {
    disableButtons(true);
    minutes= sesBreakVal.innerText-1;
    seconds = `${isBreakStarted ? 59 : 60}`
    isBreakStarted = !isBreakStarted;
    timer = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            seconds = 59;
            minutes--;
            if(minutes < 0){
                clearInterval(timer)
                callBack();
            }
        }
        if(minutes < 10 && minutes >= 0){
            timeLeft.innerHTML = 
            `${timeLeft.innerHTML.substr(0,1).includes(0) && '0'+minutes} :
             ${seconds < 10 ? seconds = '0' + seconds : seconds}`
        } else 
            timeLeft.innerHTML = `${minutes} : ${seconds < 10 ? seconds = '0' + seconds : seconds}`
    },1000)
}

startTimer.addEventListener('click',  () => {
    timerFoo(sessionValue, breakHandler)
})  

const resetFoo = () => {
    defTimerState();
    disableButtons(false);
}

let isBreakStarted = false;

const breakHandler = () => {
    isBreakStarted = true;
    label.innerText = 'Break';
    audio.play();
    timerFoo(breakValue,resetFoo);
}

reset.addEventListener('click', ()=>{
    clearInterval(timer);
    resetFoo();
})