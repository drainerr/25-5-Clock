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

/// default minutes and seconds
let defminutes = "25";
let defsecs = "00";
let defTimerState = ()=> {
    timeLeft.innerHTML = defminutes + ":" + defsecs;
}
defTimerState;
///////////////////

// to disable buttons while timer is active
function disableButtons(bool){
    breakInc.disabled = bool;
    breakDec.disabled = bool;
    sesInc.disabled = bool;
    sesDec.disabled = bool;
}

///////////////////

// onclick events for increase-decrease buttons
defTimerState();
let sessions =() => {
sesInc.onclick = function(){
    sessionValue.innerHTML++;
    defminutes = sessionValue.innerHTML;
    if(sessionValue.innerHTML > 60){
        sessionValue.innerHTML = 60;
        defminutes = sessionValue.innerHTML;
        alert('You Reach The Limit!')
    }
    timeLeft.innerHTML = defminutes + ":" + "00";
}
sesDec.onclick = function(){
    sessionValue.innerHTML--;
    defminutes = sessionValue.innerHTML;
    if(sessionValue.innerHTML < 1){
        sessionValue.innerHTML = 1;
        defminutes = sessionValue.innerHTML;
    }
    timeLeft.innerHTML = defminutes + ":" + "00";
}
    return sessionValue.innerHTML;

};
sessions();


let breaks = () => {
breakInc.onclick = function(){
    breakValue.innerHTML++;
    if(breakValue.innerHTML>25){
        breakValue.innerHTML = 25;
        alert('You Reach The Limit!')
    }
}
breakDec.onclick = function(){
    breakValue.innerHTML--;
    if(breakValue.innerHTML < 1){
        breakValue.innerHTML = 1;
    }
}
    return breakValue.innerHTML;
};
breaks();

///////////////////

/// variables for setIntervals 

let interval;
let secsInterval;
let breaksInterval;
let isStarted = false;


//setInterval for seconds

let secInterval = ()=>{
    if(defsecs == "00")   
    defsecs=59;
    defminutes--;
    secsInterval = setInterval(function(){
        defsecs--;
        timeLeft.innerHTML = defminutes + ":" +defsecs;
        if(defsecs <= 0){
            defsecs= 60;       
        }
    },1000);
}
///////////////////

let flag = false;
/// setinterval for minutes

let minsInterval =() =>{
    defminutes = sessions()-1;
    interval = setInterval(function(){
        defminutes--;
        if (defminutes <= '0') {   
            if(defsecs <= '59'){
                if(flag == false){
                breakFoo();
            }
            }
        }
        timeLeft.innerHTML = defminutes + ":" + defsecs;    
    },60000); 
} 

///////////////////

///break function 

let breakFoo =()=>{
    label.innerHTML = "Break";
    audio.play();
    breakInterval();
    flag=true;
}

let breakInterval = () =>{
    defminutes = breaks()-1;
    if(defminutes >= '0'){
    setInterval(() => {
            if(defminutes <= '0'){
                if(defsecs <= '59'){
                    label.innerHTML = "Session";
                    breakValue.innerHTML = 5;
                    sessionValue.innerHTML = 25;
                    timeLeft.innerHTML = "25" + ":" +"00";
                    clearInterval(secsInterval);
                    clearInterval(interval);     
                } 
            }
    }, 60000);  isStarted = true;
} else {
    clearInterval(minsInterval);
    setInterval(() => {
        if(defminutes <= '0'){
            if(defsecs <= '59'){
                label.innerHTML = "Session";
                breakValue.innerHTML = 5;
                sessionValue.innerHTML = 25;
                timeLeft.innerHTML = "25" + ":" +"00";
                clearInterval(secsInterval);
                clearInterval(interval);     
            } 
        }
    }, 60000);  isStarted = true;
}
}

/// start Timer


startTimer.onclick = function (){
    disableButtons(true);
    if(isStarted==false) {
        secInterval();
        minsInterval();
     isStarted=true;      
    } 
};
///////////////////

/// reset Timer

reset.onclick = function(){
    breakValue.innerHTML = 5;
    sessionValue.innerHTML = 25;
    timeLeft.innerHTML = "25" + ":" +"00";
    clearInterval(secsInterval)
    clearInterval(interval);
    defsecs = '00'; ///   <---- fixed
    disableButtons(false);
    isStarted=false;
};
///////////////////
