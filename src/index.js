import _, { head } from "lodash";
import "./style.css";

let myTodo = [];

class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

if (localStorage.getItem("todos") === null) {
  myTodo = [];
} else {
  const todoFromStorage = JSON.parse(localStorage.getItem("todos"));
  myTodo = todoFromStorage;
}

function showTodo() {
  localStorage.setItem("todos", JSON.stringify(myTodo));
  const todoList = document.querySelector("#table-body");
  todoList.textContent = "";
  for (let i = 0; i < myTodo.length; i += 1) {
    const todoRow = document.createElement("tr");
    todoRow.classList.add("todo-info");
    todoList.appendChild(todoRow);
    // Todo Title
    const todoTitle = document.createElement("td");
    todoTitle.textContent = myTodo[i].title;
    todoRow.appendChild(todoTitle);
    // Todo Description
    const todoDesc = document.createElement("td");
    todoDesc.textContent = myTodo[i].description;
    todoRow.appendChild(todoDesc);
    // Todo Date
    const todoDate = document.createElement("td");
    todoDate.textContent = myTodo[i].dueDate;
    todoRow.appendChild(todoDate);
    // Todo Removal button
    const todoDelete = document.createElement("td");
    const deleteSymbol = document.createElement("i");
    deleteSymbol.classList.add("fas", "fa-trash-alt");
    todoDelete.appendChild(deleteSymbol);
    todoRow.appendChild(todoDelete);
  }
}

function addTodo(title, description, dueDate) {
  const todo = new Todo(title, description, dueDate);
  myTodo.push(todo);
  showTodo();
}

function validateForm(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const titleErr = document.querySelector(".title");
  const descInput = document.querySelector("#description");
  const descErr = document.querySelector(".description");
  const dateInput = document.querySelector("#date");
  const dateErr = document.querySelector(".date");

  if (titleInput.value === "") {
    titleErr.style.display = "block";
  } else {
    titleErr.style.display = "block";
  }
  if (descInput.value === "") {
    descErr.style.display = "block";
  } else {
    descErr.style.display = "block";
  }
  if (
    titleInput.value !== "" &&
    descInput.value !== "" &&
    dateInput.value !== ""
  ) {
    addTodo(titleInput.value, descInput.value, dateInput.value, true);
  } else {
    addTodo(titleInput.value, descInput.value, dateInput.value, false);
  }
  form.reset();
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "addbook") {
      validateForm(event);
    } else if (target.classList.contains("fa-trash-alt")) {
      myTodo.splice(tr, 1);
    }
    showTodo();
  });
}

showTodo();
listenClicks();
