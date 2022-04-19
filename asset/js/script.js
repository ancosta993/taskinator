var taskIdCounter = 0;

var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");

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
   // pacakge up data as an object
   var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput

   };
   
   // send it as an argument ro createTaskEl0
   createTaskEl(taskDataObj);
   
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
   var taskActionsEl = createTaskActions(taskIdCounter);
   listItemEl.appendChild(taskActionsEl);
   taskToDoEl.appendChild(listItemEl);
   taskIdCounter ++;
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
};

var editTask = function(taskId){
   
  // get task list item element
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   // get content from task name and type
   var taskName = taskSelected.querySelector("h3.task-name").textContent;
   var taskType = taskSelected.querySelector("span.task-type").textContent;
   document.querySelector("input[name='task-name']").value = taskName;
   document.querySelector("select[name='task-type']").value = taskType;
   document.querySelector('#saveTask').textContent = "Save Task";
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


pageContentEl.addEventListener('click',taskButtonHandler);


