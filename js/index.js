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
    
sesDec.onclick = function(){
    sessionValue.innerHTML--;
   sesIncDecHandler();
}


const breakIncDecHandler = () => {
    if(breakValue.innerHTML>25){
        breakValue.innerHTML = 25;
        alert('You Reach The Limit!')
    } 
    if(breakValue.innerHTML < 1)
        breakValue.innerHTML = 1;
}

breakInc.onclick = function(){
    breakValue.innerHTML++;
    breakIncDecHandler();
  
}
breakDec.onclick = function(){
    breakValue.innerHTML--;
    breakIncDecHandler();

}

startTimer.addEventListener('click',  () => {
    disableButtons(true);
    minutes= sessionValue.innerText-1;
    seconds = 60;
    timer = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            seconds = 59;
            minutes--;
            if(minutes < 0){
                clearInterval(timer)
                breakHandler();
            }
        }
        if(minutes < 10 && minutes >= 0){
            timeLeft.innerHTML = 
            `${timeLeft.innerHTML.substr(0,1).includes(0) && '0'+minutes} :
             ${seconds < 10 ? seconds = '0' + seconds : seconds}`
        } else 
            timeLeft.innerHTML = `${minutes} : ${seconds < 10 ? seconds = '0' + seconds : seconds}`
    },1000)
})  

const resetFoo = () => {
    defTimerState();
    disableButtons(false);
}

const breakHandler = () => {
    label.innerText = 'Break';
    audio.play();
    minutes= breakValue.innerText-1;
    seconds = 59;
    breakTimer = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            seconds = 59;
            minutes--;
            if(minutes < 0){
                clearInterval(breakTimer)
                resetFoo();
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

reset.addEventListener('click', ()=>{
    clearInterval(timer);
    resetFoo();
})