const cross = {
  getCross(e) {
    return e.target.closest(".todo-item").childNodes[3];
  },

  crossAppear(e) {
    const crossElement = cross.getCross(e);
    crossElement.style.opacity = 1;
  },
  crossDissappear(e) {
    const crossElement = cross.getCross(e);
    crossElement.style.opacity = 0;
  },
};

export default cross;
