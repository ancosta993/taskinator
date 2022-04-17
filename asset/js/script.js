var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");

var taskFormHandler = function(event){

   event.preventDefault();

   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;
   // pacakge up data as an object
   var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput

   };
   
   // send it as an argument ro createTaskEl
   createTaskEl(taskDataObj);
   
};

var createTaskEl = function(taskDataObj){
   var listItemEl  = document.createElement("li");
   listItemEl.className = "task-item";

   // create div to hold task info and add to list item
   var taskInfoEl = document.createElement("div");
   // give it a class name
   taskInfoEl.className = "task-info";
   // add HTML content to div
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class = 'task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);
   taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', taskFormHandler);