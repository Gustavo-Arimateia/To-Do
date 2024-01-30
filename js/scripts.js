const bnt = document.querySelector(".new-task-button");
let taskList = document.getElementById("tasks-container");
let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  taskList.innerHTML = savedTasks;
}

bnt.addEventListener('click', function() {
  let taskInput = document.getElementById("new-task-input");

  if (taskInput.value === "") {
    taskInput.classList.add("error");
    return;
  }
  
  let task = `
    <li>
      <span onclick="markComplete(this)">${taskInput.value}</span>
      <i class="fas fa-check-square" onclick="concluidoTask(this)"></i>
      <i class="delete-icon fas fa-trash-alt" onclick="deleteTask(this)"></i>
    </li>
  `;

  taskList.innerHTML += task;
  taskInput.value = "";
  localStorage.setItem("tasks", taskList.innerHTML);

  if (taskInput.classList.contains("error")) {
    taskInput.classList.remove("error");
  }
});

function deleteTask(task) {
  let taskLi = task.parentElement;
  taskLi.remove();
  localStorage.setItem("tasks", taskList.innerHTML);
}

function concluidoTask(task) {
  let taskSpan = task.previousElementSibling;
  let deleteIcon = task.nextElementSibling;
  if (taskSpan.style.textDecoration === "line-through") {
    taskSpan.style.textDecoration = "none";
    task.classList.remove("fa-check-square");
    task.classList.add("fa-check-square");
    deleteIcon.style.display = "block";
    taskSpan.classList.remove("item-pronto")

  } else {
    taskSpan.classList.add("item-pronto")
    taskSpan.style.textDecoration = "line-through";
    task.classList.remove("fa-square");
    task.classList.add("fa-check-square");
    deleteIcon.style.display = "none";
  }
  localStorage.setItem("tasks", taskList.innerHTML);
}
