const icon = document.querySelector(".icon");
const form = document.querySelector(".search-form");
const textVal = document.querySelector(".input-search");
const todoList = document.querySelector(".todo-list");

icon.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "./images/icon-sun.svg";
  } else {
    icon.src = "./images/icon-moon.svg";
  }
});

form.addEventListener("submit", addTodo);

todoList.addEventListener("click", itemHandler);

function addTodo(e) {
  e.preventDefault();
  const todoText = textVal.value;

  const html = `<li class="todo-item">
  <div>
    <div class="circle">
      <img class="check" src="./images/icon-check.svg" />
    </div>
    <p>${todoText}</p>
  </div>

  <img class="cross" src="./images/icon-cross.svg" />
</li>`;

  todoList.insertAdjacentHTML("beforeend", html);
  textVal.value = "";
}

function itemHandler(e) {
  const target = e.target;
  if (target.matches(".circle")) {
    const todoItem = target.closest(".todo-item");
    todoItem.classList.toggle("completed");
  }
  if (target.matches(".cross")) {
    const todoItem = target.closest(".todo-item");
    todoItem.remove();
  }
}
