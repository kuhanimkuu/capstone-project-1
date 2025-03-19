// timer
function timer(){
    var hr = document.getElementById("hour").value;
    var min = document.getElementById("min").value;
    var sec = document.getElementById("sec").value;
    const error = document.getElementById("usernameError");
    
    var hrs = document.getElementById("hours");
    var mins = document.getElementById("mins");
    var secs = document.getElementById("secs");
    
   

    if (hr > 24 || hr < 0){
        error.style.display = "block";
        hr.innerHTML = " ";
        hrs.innerHTML = " ";
    }  
    else if(min > 59 ||min < 0){
        error.style.display = "block";
        min.innerHTML = " ";
        mins.innerHTML = " ";
    }
    else if(sec > 59 ||sec < 0){
        error.style.display = "block";
        sec.innerHTML = " ";
        secs.innerHTML = " ";
    }
    else{
        error.style.display = "none";
        
    }
   
    setTimeout(timer, 10);
}

let i = sec.value;
let j = min.value;
let k = hour.value;
document.getElementById("sub").addEventListener("click", function twink(){   
    if(i > 0){
    i-=1;
    j=j;
    k=k;
    secs.innerHTML=i;
    mins.innerHTML=j;
    hours.innerHTML=k;
   }
   if ( i == 0 && j > 0){
    i = 59;
    j-=1;
   }
   if (j == 0 && k > 0){
    j = 59;
    k-=1;
   }
   if (k==0 && j==0 && i==0){
    const timeup = document.getElementById("timeup");
    timeup.style.display = "block";
    secs.innerHTML = "00";
    mins.innerHTML = "00";
    hours.innerHTML = "00";
   }
  
     setTimeout(twink, 1000);
});

timer();















// clock
function showTime(){
    var dating = new Date();
    var h = dating.getHours(); 
    var m = dating.getMinutes(); 
    var s = dating.getSeconds(); 
    var session = "AM";
  
    if(h == 0){
        h = 12;
    }
  
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
  
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
  
    setTimeout(showTime, 1000);
  }
  
  showTime();