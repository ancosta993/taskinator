var taskIdCounter = 0;
var tasks = [];
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedEl = document.querySelector('#tasks-completed');
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#task-to-do");

var completeEditTask = function(taskName, taskType, taskId){
   // find the matching task list item
   var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId + "']");
   
   // set new values
   taskSelected.querySelector("h3.task-name").textContent = taskName;
   taskSelected.querySelector("span.task-type").textContent = taskType;

   // loop through tasks array and task object with new content
   for(var i=0;i<tasks.length;i++){
      if(tasks[i].id === parseInt(taskId)){
         tasks[i].name = taskName;
         tasks[i].type = taskType;
      }
   };

   alert("Task Updated!");
   formEl.removeAttribute("data-task-id");
   document.querySelector("#save-task").textContent = "Add Task";

   // save to the localStorage
   saveTasks();

}

var taskFormHandler = function(event){

   event.preventDefault();

   var taskNameInput = document.querySelector("input[name='task-name']").value;
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

   // check if input value are empty strings
   if (!taskNameInput || !taskTypeInput){
      alert("You need to fill out the task form!");
      return false;
   }
   // reset the form
   formEl.reset();
   var isEdit = formEl.hasAttribute('data-task-id');

   if (isEdit){
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput,taskId);
   } else{// pacakge up data as an object
   
   var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"

   };
   
   // send it as an argument to createTaskEl
   createTaskEl(taskDataObj);
   }
   
};

var createTaskEl = function(taskDataObj){
   var listItemEl  = document.createElement("li");
   listItemEl.className = "task-item";

   // add task id as a custom attribute
   listItemEl.setAttribute("data-task-id", taskIdCounter);

   // create div to hold task info and add to list item
   var taskInfoEl = document.createElement("div");
   // give it a class name
   taskInfoEl.className = "task-info";
   // add HTML content to div
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class = 'task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);

   // add the task action buttons in the task item.
   var taskActionsEl = createTaskActions(taskIdCounter);
   listItemEl.appendChild(taskActionsEl);
   taskDataObj.id = taskIdCounter;
   tasks.push(taskDataObj);
   tasksToDoEl.appendChild(listItemEl);
   taskIdCounter ++;

   // save to the localStorage
   saveTasks();
};

var createTaskActions = function(taskId){
   var actionContainerEl = document.createElement("div");
   actionContainerEl.className = 'task-actions';
   // create edit button
   var editButtonEl = document.createElement("button");
   editButtonEl.textContent = "Edit";
   editButtonEl.className = "btn edit-btn";
   editButtonEl.setAttribute('data-task-id', taskId);

   actionContainerEl.appendChild(editButtonEl);

   // create delete button
   var deleteButtonEl = document.createElement("button");
   deleteButtonEl.textContent = "Delete";
   deleteButtonEl.className = "btn delete-btn";
   deleteButtonEl.setAttribute("data-task-id", taskId);

   actionContainerEl.appendChild(deleteButtonEl);

   // create dropdown
   var statusSelectEl = document.createElement("select");
   statusSelectEl.className = "select-status";
   statusSelectEl.setAttribute("name", "status-change");
   statusSelectEl.setAttribute("data-task-id", taskId);

   var statusChoices = ["To Do", "In Progress", "Completed"];

   for (var i=0; i<statusChoices.length;i++){
      var statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute("value", statusChoices[i]);
      statusSelectEl.appendChild(statusOptionEl);
   }

   actionContainerEl.appendChild(statusSelectEl);
   return actionContainerEl;
};

formEl.addEventListener('submit', taskFormHandler);

var deleteTask = function(taskId){
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   taskSelected.remove();

   var updatedTaskArr = [];
   for (var i=0;i<tasks.length;i++){
      if(tasks[i].id !== parseInt(taskId)){
         updatedTaskArr.push(tasks[i])
      }

   };
   tasks = updatedTaskArr;
   saveTasks();
};

var editTask = function(taskId){
   
  // get task list item element
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   // get content from task name and type
   var taskName = taskSelected.querySelector("h3.task-name").textContent;
   var taskType = taskSelected.querySelector("span.task-type").textContent;
   document.querySelector("input[name='task-name']").value = taskName;
   document.querySelector("select[name='task-type']").value = taskType;
   document.querySelector('#save-task').textContent = "Save Task";
   formEl.setAttribute("data-task-id", taskId);


}

var taskButtonHandler = function(event){
   // get target element from event
   var targetEl = event.target;

   // if edit button is clicked
   if (targetEl.matches(".edit-btn")){
      var taskId = targetEl.getAttribute("data-task-id", taskId);
      editTask(taskId);
   
      // if delete button was clicked
   } else if (targetEl.matches(".delete-btn")){
      // get the element's task id
      var taskId = targetEl.getAttribute('data-task-id');
      deleteTask(taskId);
   }
};

var  taskStatusChangeHandler=function(event){
   // get the task item's id
   var taskId = event.target.getAttribute("data-task-id");

   // get the currenly selected option's value and covert to lowercase
   var statusValue = event.target.value.toLowerCase();

   // find the parent taks item element based on the id
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   if (statusValue === "to do"){
      tasksToDoEl.appendChild(taskSelected);
   }
   else if (statusValue === "in progress"){
      tasksInProgressEl.appendChild(taskSelected);
   }
   else if (statusValue === "completed"){
      tasksCompletedEl.appendChild(taskSelected);
   }
   // update task's in tasks array
   for (var i=0;i<tasks.length;i++){
      if (tasks[i].id === parseInt(taskId)){
         tasks[i].status = statusValue;
      }
   };

   // save to the localStorage
   saveTasks();
};

var saveTasks = function(){
   localStorage.setItem('tasks', JSON.stringify(tasks));
};

pageContentEl.addEventListener('click',taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);




