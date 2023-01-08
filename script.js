const icon = document.querySelector(".icon");
const form = document.querySelector(".search-form");
const textVal = document.querySelector(".input-search");
const todoList = document.querySelector(".todo-list");
const itemsActive = document.querySelector(".item-length-text");
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
todoList.addEventListener("mouseover", crossAppear);
todoList.addEventListener("mouseout", crossDissappear);
todoList.addEventListener("click", itemHandler);
clearCompleted.addEventListener("click", clearItems);
options.forEach((el) => el.addEventListener("click", optionSelected));

function addTodo(e) {
  e.preventDefault();
  const todoText = textVal.value;

  const html = `<li class="todo-item">
  <div class="todo-text-cont">
    <div class="circle">
      <img class="check" src="./images/icon-check.svg" />
    </div>
    <p class="todo-text">${todoText}</p>
  </div>

  <img class="cross" src="./images/icon-cross.svg" />
</li>`;

  todoList.insertAdjacentHTML("beforeend", html);
  increaseItem();
  textVal.value = "";
}

function itemHandler(e) {
  const target = e.target;
  if (
    target.matches(".circle") ||
    target.matches(".todo-text") ||
    target.matches(".todo-text-cont")
  ) {
    const todoItem = target.closest(".todo-item");
    todoItem.classList.toggle("completed");
    todoItem.classList.contains("completed") ? decreaseItem() : increaseItem();
  }
  if (target.matches(".cross")) {
    const todoItem = target.closest(".todo-item");
    todoItem.remove();
    if (todoItem.classList.contains("completed")) return;
    decreaseItem();
  }
}

function increaseItem() {
  const itemLengthArr = itemsActive.innerHTML.split("");
  itemLengthArr[0] = +itemLengthArr[0] + 1;
  itemsActive.innerHTML = itemLengthArr.join("");
}
function decreaseItem() {
  const itemLengthArr = itemsActive.innerHTML.split("");
  itemLengthArr[0] = +itemLengthArr[0] - 1;
  itemsActive.innerHTML = itemLengthArr.join("");
}

function clearItems() {
  const todoItems = document.querySelectorAll(".todo-item");
  for (const item of todoItems) {
    if (item.classList.contains("completed")) item.remove();
  }
}

function crossAppear(e) {
  const target = e.target.closest(".todo-item");
  const cross = target.childNodes[3];
  cross.style.opacity = 1;
}

function crossDissappear(e) {
  const target = e.target.closest(".todo-item");
  const cross = target.childNodes[3];
  cross.style.opacity = 0;
}

function optionSelected(e) {
  const id = e.target.id;
  for (const option of options) {
    if (option.id != id) {
      option.classList.remove("selected");
      continue;
    }
    option.classList.add("selected");
  }

  filterItems(id);
}

function filterItems(id) {
  const todoItems = document.querySelectorAll(".todo-item");
  if (id === "all") {
    for (const item of todoItems) {
      item.style.display = "flex";
    }
  } else if (id === "active") {
    for (const item of todoItems) {
      if (item.classList.contains("completed")) item.style.display = "none";
      else {
        item.style.display = "flex";
      }
    }
  } else {
    for (const item of todoItems) {
      if (!item.classList.contains("completed")) item.style.display = "none";
      else {
        item.style.display = "flex";
      }
    }
  }
}
