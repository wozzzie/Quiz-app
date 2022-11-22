// Switch theme
const switchTheme = document.querySelector(".switch-theme");
const body = document.querySelector(".body");

let themeDefault = "dark";

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      body.style.backgroundImage =
        "url(../../assets/images/start-light-theme.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/sun.svg)";

      themeDefault = "light";
    } else {
      body.style.backgroundImage = "url(../../assets/images/bg.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/moon.svg)";

      themeDefault = "dark";
    }
    setTheme(themeDefault);
  });
}
changeTheme();

// Local storage

function getLocalStorage() {
  const theme = localStorage.getItem("theme");

  if (theme) {
    themeDefault = theme;
    if (theme === "light") {
      body.style.backgroundImage =
        "url(../../assets/images/start-light-theme.jpeg)";
    } else {
      body.style.backgroundImage = "url(../../assets/images/bg.jpeg)";
    }
  }
}

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

window.addEventListener("beforeunload", () => {
  setTheme(themeDefault);
});

window.addEventListener("load", getLocalStorage);
