const todoItemsContainer = document.getElementById("todoContainer");
todoItemsContainer.classList.add("my-tasks-container");
const addButton = document.getElementById("addButton");
const saveButton = document.getElementById("saveButton");

// setting up todo items in local storage
function getTodoItemFromLocalStorage() {
  const stringifiedTodoList = localStorage.getItem("todoList");
  const parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

// todoItems
let todoItems = getTodoItemFromLocalStorage();
let todoCount = todoItems.length;

// onSave button clicked
saveButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoItems));
};

// crashing label text
function onTodoStatusChange(labelId) {
  const label = document.getElementById(labelId);
  label.classList.toggle("crash-label-text");
}

// deleting todo
function onDeleteTodo(todoId) {
  const todoItem = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoItem);
  const todoIndex = todoItems.findIndex(function (eachItem) {
    if (todoId === eachItem.id) {
      return true;
    } else {
      return false;
    }
  });

  todoItems.splice(todoIndex, 1);
}

function getTodoItems(todoItem) {
  let todoName = todoItem.name;
  let todoId = todoItem.id;
  let checkboxId = "checkbox" + todoItem.id;
  let labelId = "label" + todoItem.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.classList.add("checkbox");

  //  checkbox event
  checkbox.onchange = function () {
    onTodoStatusChange(labelId);
  };

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("tasks-container");
  todoContainer.id = todoId;

  const labelContainer = document.createElement("div");
  labelContainer.style.display = "flex";
  labelContainer.style.flexDirection = "row";
  labelContainer.style.justifyContent = "space-between";
  labelContainer.style.alignItems = "center";
  labelContainer.classList.add("label-container");

  const label = document.createElement("label");
  label.htmlFor = checkboxId;
  label.textContent = todoName;
  label.classList.add("label");
  label.id = labelId;

  const delIcon = document.createElement("i");
  delIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");

  // delete todo functionality
  delIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  todoContainer.appendChild(checkbox);
  labelContainer.appendChild(label);
  labelContainer.appendChild(delIcon);
  todoContainer.appendChild(labelContainer);
  todoItemsContainer.appendChild(todoContainer);
}

for (let item of todoItems) {
  getTodoItems(item);
}

function addTodoItem() {
  const userInput = document.getElementById("userInput");
  let todoInput = userInput.value;
  if (todoInput === "") {
    alert("Please provide todo input");
    return;
  }
  todoCount = todoCount + 1;
  const newTodo = {
    name: todoInput,
    id: todoCount,
  };
  todoItems.push(newTodo);
  getTodoItems(newTodo);
  userInput.value = "";
}

addButton.onclick = function () {
  addTodoItem();
};

const userInput = document.getElementById("userInput");
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && userInput.value !== "") {
    addTodoItem();
  }
});
