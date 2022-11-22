const resultsBtn = document.querySelector(".results__btn");
const resultsScore = document.querySelector(".results__score");

resultsBtn.disable = false;

const score = localStorage.getItem("score");

resultsScore.innerHTML = score;

if (resultsScore.innerHTML === "30") {
  resultsBtn.innerHTML = "GAME OVER";
  resultsBtn.disable = true;
} else {
  resultsBtn.innerHTML = "Play again";
  resultsBtn.addEventListener("click", () => {
    window.location.href = "../game/index.html";
  });
}

// Switch theme
const switchTheme = document.querySelector(".switch-theme");
const body = document.querySelector(".body");

let themeDefault = "dark";

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      body.style.backgroundImage =
        "url(../../assets/images/results-light-theme.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/sun.svg)";
      resultsBtn.style.background = "rgb(168 180 255";

      themeDefault = "light";
    } else {
      body.style.backgroundImage = "url(../../assets/images/mars.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/moon.svg)";
      resultsBtn.style.background =
        "linear-gradient( 180deg,rgb(130 21 36) 0%, rgb(31 38 49 / 50%) 100%)";
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
        "url(../../assets/images/results-light-theme.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/sun.svg)";
      resultsBtn.style.background = "rgb(168 180 255";
    } else {
      body.style.backgroundImage = "url(../../assets/images/mars.jpeg)";
      switchTheme.style.backgroundImage = "url(../../assets/icons/moon.svg)";
      resultsBtn.style.background =
        "linear-gradient( 180deg,rgb(130 21 36) 0%, rgb(31 38 49 / 50%) 100%)";
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
