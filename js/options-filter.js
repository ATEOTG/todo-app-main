export default function optionSelected(e, options) {
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
