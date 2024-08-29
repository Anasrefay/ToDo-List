let input = document.getElementById("input");
let tasks = document.getElementById("List-container");

let tasksOfArray = [];


if(localStorage.getItem("tasks")){
    tasksOfArray = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

add.onclick = function(){

    if(input.value.trim() !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
    else {
        alert("You must write something!");
    }
    
}

tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteTask(e.target.parentElement.getAttribute("data-id"))
    }
    if(e.target.classList.contains("li")){
        e.target.classList.toggle("checked");
        toggleStatus(e.target.getAttribute("data-id"));   
    }
    console.log(e.target.className);
    
})

function addTaskToArray(ans){

    const task = {
        id: Date.now(),
        title: ans,
        completed: false
    }
    tasksOfArray.push(task);
    addElementsToPage(tasksOfArray);
    addElementToLocalStorage(tasksOfArray);
}




function addElementsToPage(tasksOfArray){
    tasks.innerHTML = "";
    tasksOfArray.forEach((task) => {
        let li = document.createElement("li");
        li.className = "li";
        task.completed ? li.className = "li checked" : li.className = "li";
        li.setAttribute("data-id", task.id);
        li.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("\u00d7"));
        li.appendChild(span);  
        tasks.appendChild(li);

    });
    
}
function addElementToLocalStorage(tasksOfArray){
    window.localStorage.setItem("tasks",JSON.stringify(tasksOfArray));
}



function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
    }
}

function deleteTask(taskId){
    tasksOfArray = tasksOfArray.filter((task) => task.id != taskId);
    addElementToLocalStorage(tasksOfArray);
}

function toggleStatus(taskId){

    for (let i = 0; i < tasksOfArray.length; i++) {
       
        if(tasksOfArray[i].id == taskId){
            tasksOfArray[i].completed == false ? tasksOfArray[i].completed = true : tasksOfArray[i].completed = false;
        }
    }
    addElementToLocalStorage(tasksOfArray);
}

