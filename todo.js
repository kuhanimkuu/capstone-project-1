let todos = JSON.parse(localStorage.getItem('todos')) || [];
let isLatestFirst = JSON.parse(localStorage.getItem('isLatestFirst')) || true;

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function toggleSection(section) {
    const content = document.getElementById(`${section}-section`);
    const header = content.previousElementSibling;
    content.classList.toggle('expanded');
    header.classList.toggle('active');
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            timestamp: new Date()
        };
        
        todos.push(todo);
        saveTodos();
        input.value = '';
        renderTodos();
    } 
}
// Delete to-do form list
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(); 
    renderTodos();
}
// change uncompleted todo into completed
function toggleComplete(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    saveTodos(); 
    renderTodos();
}
// Toggle sort list
function toggleSort() {
    isLatestFirst = !isLatestFirst;
    localStorage.setItem('isLatestFirst', JSON.stringify(isLatestFirst)); // Save sort preference
    const button = document.querySelector('.sort-button');
    button.innerHTML = isLatestFirst ? "Sort by Oldest <i class='bx bx-sort' ></i>" : "Sort by Latest <i class='bx bx-sort' ></i>";
    renderTodos();
}
// Display todos
function renderTodos() {
    const uncompletedList = document.getElementById('uncompletedList');
    const completedList = document.getElementById('completedList');
    uncompletedList.innerHTML = '';
    completedList.innerHTML = '';
    
    const sortedTodos = [...todos].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        return isLatestFirst ? 
            dateB - dateA : 
            dateA - dateB;
    });

    let completedCount = 0;
    let uncompletedCount = 0;

    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" 
                   class="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onclick="toggleComplete(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})"><i class='bx bx-trash' ></i></button>
        `;
        
        if (todo.completed) {
            completedList.appendChild(li);
            completedCount++;
        } else {
            uncompletedList.appendChild(li);
            uncompletedCount++;
        }
    });

    // Update counters
    document.getElementById('completed-count').textContent = completedCount;
    document.getElementById('uncompleted-count').textContent = uncompletedCount;

    // Update the sort button label on render
    const button = document.querySelector('.sort-button');
    button.innerHTML = isLatestFirst ? "Sort by Oldest <i class='bx bx-sort' ></i>" : "Sort by Latest <i class='bx bx-sort' ></i>";
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('isLatestFirst', JSON.stringify(isLatestFirst));
}

// Initial load from local storage and render
// renderTodos();
window.onload = function() {
    renderTodos();
    // restoreSectionStates();
};

// calendar
const monthName = document.getElementById("month-name");
const dayName = document.getElementById("day-name");
const dayNum = document.getElementById("day-number");
const year = document.getElementById("year");
const uncompletedList = document.getElementById('uncompletedList');
const date = new Date();
let dateNo = date.getDate();
let month= date.getMonth();
monthName.innerText = date.toLocaleString("en",{month:"long"}); 
dayName.innerText = date.toLocaleString("en", {weekday:"long"});
dayNum.innerText = date.toLocaleString("en",{day:"2-digit"});
year.innerText = date.toLocaleString("en",{year:"numeric"})


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
    secs.innerHTML=i + " "+"s";
    mins.innerHTML=j + " "+ "min";
    hours.innerHTML=k + " " + "hr";
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
