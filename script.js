const icon = document.querySelector(".icon");

icon.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "./images/icon-sun.svg";
  } else {
    icon.src = "./images/icon-moon.svg";
  }
});
