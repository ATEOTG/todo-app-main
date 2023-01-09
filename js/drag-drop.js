export function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

export function allowDrop(e) {
  e.preventDefault();
}

export function drop(e, todoList) {
  const data = e.dataTransfer.getData("text");
  const targetElement = document.getElementById(data);
  const afterElement = getDragAfterElement(targetElement, e.clientY, todoList);

  if (afterElement == null) {
    todoList.appendChild(targetElement);
  } else {
    todoList.insertBefore(targetElement, afterElement);
  }
}

function getDragAfterElement(targetEl, y, todoList) {
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
