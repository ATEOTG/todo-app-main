import { drag, drop, allowDrop } from "./drag-drop.js";
import optionSelected from "./options-filter.js";
import items from "./item-handler.js";
import cross from "./cross-handler.js";

const icon = document.querySelector(".icon");
const form = document.querySelector(".search-form");
const textVal = document.querySelector(".input-search");
const todoList = document.querySelector(".todo-list");
const clearCompleted = document.querySelector(".clear-text");
const options = document.querySelectorAll(".option");

icon.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "./images/icon-sun.svg";
  } else {
    icon.src = "./images/icon-moon.svg";
  }
});

form.addEventListener("submit", addTodo);
todoList.addEventListener("mouseover", cross.crossAppear);
todoList.addEventListener("mouseout", cross.crossDissappear);
todoList.addEventListener("click", items.itemHandler);
clearCompleted.addEventListener("click", clearItems);
options.forEach((el) =>
  el.addEventListener("click", (e) => optionSelected(e, options))
);

function addTodo(e) {
  e.preventDefault();
  const todoText = textVal.value;
  if (!todoText) return;

  const html = `<li id = ${
    todoText + `${Math.random() * 50}`
  } class="todo-item" draggable = "true">
  <div class="todo-text-cont">
    <div class="circle">
      <img class="check" src="./images/icon-check.svg" alt="check icon" />
    </div>
    <p class="todo-text" >${todoText}</p>
  </div>

  <img class="cross" src="./images/icon-cross.svg" alt="cross icon " />
</li>`;

  todoList.insertAdjacentHTML("beforeend", html);

  const element = todoList.lastChild;
  element.addEventListener("dragstart", drag);
  element.addEventListener("dragover", allowDrop);
  element.addEventListener("drop", function (e) {
    drop(e, todoList);
  });

  items.increaseItem();
  textVal.value = "";
}

function clearItems() {
  const todoItems = document.querySelectorAll(".todo-item");
  for (const item of todoItems) {
    if (item.classList.contains("completed")) item.remove();
  }
}
