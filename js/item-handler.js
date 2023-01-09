const itemsActive = document.querySelector(".item-length-text");

const items = {
  itemHandler(e) {
    const target = e.target;
    if (
      target.matches(".circle") ||
      target.matches(".todo-text") ||
      target.matches(".todo-text-cont")
    ) {
      const todoItem = target.closest(".todo-item");
      todoItem.classList.toggle("completed");
      todoItem.classList.contains("completed")
        ? items.decreaseItem()
        : items.increaseItem();
    }
    if (target.matches(".cross")) {
      const todoItem = target.closest(".todo-item");
      todoItem.remove();
      if (todoItem.classList.contains("completed")) return;
      items.decreaseItem();
    }
  },

  increaseItem() {
    const itemLengthArr = itemsActive.innerHTML.split("");
    itemLengthArr[0] = +itemLengthArr[0] + 1;
    itemsActive.innerHTML = itemLengthArr.join("");
  },
  decreaseItem() {
    const itemLengthArr = itemsActive.innerHTML.split("");
    itemLengthArr[0] = +itemLengthArr[0] - 1;
    itemsActive.innerHTML = itemLengthArr.join("");
  },
};

export default items;
