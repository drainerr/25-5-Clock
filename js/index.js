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

///seting default minutes and seconds
let defminutes = "25";
let defsecs = "00";
let defTimerState = ()=> {timeLeft.innerHTML = defminutes + ":" + defsecs;
}
defTimerState;

///////////////////////////////////

//function to disable buttons while timer is active
function disableButtons(bool){
    breakInc.disabled = bool;
    breakDec.disabled = bool;
    sesInc.disabled = bool;
    sesDec.disabled = bool;
}

///////////////////////////////////

// onclick events for increase-decrease buttons
defTimerState();
let sessions =() => {
sesInc.onclick = function(){
    sessionValue.innerHTML++;
    if(sessionValue.innerHTML>60){
        sessionValue.innerHTML = 60;
        alert('You Reach The Limit!')
    }
}
sesDec.onclick = function(){
    sessionValue.innerHTML--;
    if(sessionValue.innerHTML < 1){
        sessionValue.innerHTML = 1;
    }
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

///////////////////////////////////


///declaring variables for setIntervals 

let interval;
let secsInterval;
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

///////////////////////////////////


/// setinterval for minutes

let minsInterval =() =>{
    defminutes = sessions()-1;
    interval = setInterval(function(){
        defminutes--;
        if (defminutes <= '0') {   
            if(defsecs <= '59'){
                breakFoo();
            }
        }
        timeLeft.innerHTML = defminutes + ":" + defsecs;    
    },60000); 
} 

///////////////////////////////////


///break function (needs to be fixed)

let breakFoo =()=>{
    label.innerHTML = "Break";
    defminutes = breaks()-1;
    // audio.play();
    breakInterval();
}

let breakInterval = () =>{
    setInterval(() => {
        defminutes--; 
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
    }, 60000);  
}

/// start event


startTimer.onclick = function (){
    disableButtons(true);
    if(isStarted==false) {
        secInterval();
        minsInterval();
     isStarted=true;      
    } 
};
///////////////////////////////////

///reset event

reset.onclick = function(){
    breakValue.innerHTML = 5;
    sessionValue.innerHTML = 25;
    timeLeft.innerHTML = "25" + ":" +"00";
    clearInterval(secsInterval)
    clearInterval(interval);
    disableButtons(false);
    isStarted=false;
};
///////////////////////////////////