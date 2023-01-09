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
  if (!todoText) return;

  const html = `<li id = ${todoText} class="todo-item" draggable = "true" ondragstart="drag(event)"  ondragover = "allowDrop(event)" ondrop = "drop(event)">
  <div class="todo-text-cont">
    <div class="circle">
      <img class="check" src="./images/icon-check.svg" alt="check icon" />
    </div>
    <p class="todo-text" >${todoText}</p>
  </div>

  <img class="cross" src="./images/icon-cross.svg" alt="cross icon " />
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

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  const data = e.dataTransfer.getData("text");
  const targetElement = document.getElementById(data);
  const afterElement = getDragAfterElement(targetElement, e.clientY);

  if (afterElement == null) {
    todoList.appendChild(targetElement);
  } else {
    todoList.insertBefore(targetElement, afterElement);
  }
}

function getDragAfterElement(targetEl, y) {
  const draggableElements = [...todoList.querySelectorAll(".todo-item")].filter(
    (el) => el.id != targetEl.id
  );

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
