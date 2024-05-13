const taskInput = document.querySelector(".task-input input"),
taskList = document.querySelector(".task-list"),
addBtn = document.querySelector(".add-btn"),
filters = document.querySelectorAll(".filters span"),
clearBtn = document.querySelector(".clear-btn");
//Getting the information from local storage

let editId;
let isEdited = false;
let tasks = JSON.parse(localStorage.getItem("todo-list"));

//Automatically Filters on click

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    displayTasks(btn.id);
});
});

//Function  to display Tasks

function displayTasks(filter) {
    let list = "";
    if (tasks) {
    tasks.forEach((task, id) => {
        //if task completed, set isCompleted value to checked
      let isCompleted = task.status == "completed" ? "checked" : "";
      if (filter == task.status || filter == "all") {
        list += `<li class="list">
                          <label for="${id}" id="label">
                              <i class="fa-solid fa-check ${isCompleted}"></i> 
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                              <p class="${isCompleted}">${task.name}</p>
                          </label>
                          <div class="controls">
                          <span onclick="editTask(${id},'${task.name}')"><i class="fa-solid fa-pen"></i></span>
                              <span onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i></span>
                              </div>
                      </li>`;
                }
    });
  }
  taskList.innerHTML = list || `<span>No tasks Here!</span>`;
}

//Function To Delete Task

function deleteTask(deleteId) {
    tasks.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(tasks));
    displayTasks("all");
}


//Function to edit Task

function editTask(taskId, taskName) {
    editId = taskId;
    isEdited = true;
    taskInput.value = taskName;
}

//Functio that updates the status of the selected task

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    let checkbox = selectedTask.parentElement.firstElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        checkbox.classList.add("checked");
        tasks[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    checkbox.classList.remove("checked");
    tasks[selectedTask.id].status = "pending";
}
localStorage.setItem("todo-list", JSON.stringify(tasks));
}

//Function to take input

function takeInput() {
    let definedTask = taskInput.value.trim();
    if (definedTask) {
        if (!isEdited) {
            //if tasks do not exist in local storage create an empty array
            if (!tasks) {
                tasks = [];
      }
      let taskInfo = { name: definedTask, status: "pending" };
      // Appending the list with new tasks
      tasks.push(taskInfo);
    } else {
        isEdited = false;
      tasks[editId].name = definedTask;
    }
    taskInput.value = "";

    //Store the tasks in local storage using JSON

    localStorage.setItem("todo-list", JSON.stringify(tasks));
    displayTasks("all");
  } else {
    alert("Input can't be empty");
}
}

taskInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        takeInput();
    }
});
addBtn.addEventListener("click", takeInput);

clearBtn.addEventListener("click",()=>{
    tasks.splice(0,tasks.length);
    localStorage.setItem("todo-list", JSON.stringify(tasks));
    displayTasks("all");
})

displayTasks("all");

