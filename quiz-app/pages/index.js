const switchTheme = document.querySelector(".switch-theme");
const body = document.querySelector(".body");

let themeDefault = "dark";

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      if (window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/results/index.html") {
        const resultsBtn = document.querySelector(".results__btn");
        body.style.backgroundImage =
          "url(../../assets/images/results-light-theme.jpeg)";
        resultsBtn.style.background = "rgb(168 180 255";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/game/index.html"
      ) {
        const questionsBlock = document.querySelectorAll(".questions__block");
        const nextRound = document.querySelector(".game__button");
        const planetsVariant = document.querySelectorAll(".planet__variant");
        const planet = document.querySelector(".game__secret-img");

        body.style.backgroundImage =
          "url(../../assets/images/light-theme-bg.jpeg)";
        questionsBlock[0].style.backgroundColor = "rgb(120 171 183)";
        nextRound.classList.add("btn_light");
        planetsVariant.forEach((el) => el.classList.add("btn_light"));
        planet.style.backgroundImage =
          "url(../../assets/images/secret-planet-light.png)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/start/index.html"
      ) {
        body.style.backgroundImage =
          "url(../../assets/images/start-light-theme.jpeg)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/gallery/index.html"
      ) {
        const galleryItem = document.querySelectorAll(".gallery__item");

        body.style.backgroundImage =
          "url(../../assets/images/light-bg-gallery.jpeg)";
        galleryItem.forEach(
          (el) =>
            (el.style.background =
              "linear-gradient(179.96deg, rgba(179, 43, 43, 0.69) 0.04%, rgb(48 50 73 / 98%) 130.08%)")
        );
      }

      switchTheme.style.background = "url(../../assets/icons/moon.svg)";

      themeDefault = "light";
    } else {
      if (window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/results/index.html") {
        const resultsBtn = document.querySelector(".results__btn");
        body.style.backgroundImage = "url(../../assets/images/mars.jpeg)";

        resultsBtn.style.background =
          "linear-gradient( 180deg,rgb(130 21 36) 0%, rgb(31 38 49 / 50%) 100%)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/game/index.html"
      ) {
        const questionsBlock = document.querySelectorAll(".questions__block");
        const nextRound = document.querySelector(".game__button");
        const planetsVariant = document.querySelectorAll(".planet__variant");
        const planet = document.querySelector(".game__secret-img");

        body.style.backgroundImage = "url(../../assets/images/moon.jpeg)";
        questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";
        planetsVariant.forEach((el) => el.classList.remove("btn_light"));
        nextRound.classList.remove("btn_light");
        planet.style.backgroundImage =
          "url(../../assets/images/secret-planet.png)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/start/index.html"
      ) {
        body.style.backgroundImage = "url(../../assets/images/bg.jpeg)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/gallery/index.html"
      ) {
        const galleryItem = document.querySelectorAll(".gallery__item");

        body.style.backgroundImage = "url(../../assets/images/gallery-bg.jpeg)";
        galleryItem.forEach(
          (el) =>
            (el.style.background =
              "linear-gradient(179.96deg, rgba(255, 255, 255, 0.25) 0.04%, rgba(87, 177, 255, 0) 130.08%);")
        );
      }

      switchTheme.style.background = "url(../../assets/icons/sun.svg)";

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
      if (window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/results/index.html") {
        const resultsBtn = document.querySelector(".results__btn");
        body.style.backgroundImage =
          "url(../../assets/images/results-light-theme.jpeg)";
        resultsBtn.style.background = "rgb(168 180 255";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/game/index.html"
      ) {
        const questionsBlock = document.querySelectorAll(".questions__block");
        const nextRound = document.querySelector(".game__button");
        const planetsVariant = document.querySelectorAll(".planet__variant");
        const planet = document.querySelector(".game__secret-img");

        body.style.backgroundImage =
          "url(../../assets/images/light-theme-bg.jpeg)";
        questionsBlock[0].style.backgroundColor = "rgb(120 171 183)";
        nextRound.classList.add("btn_light");
        planetsVariant.forEach((el) => el.classList.add("btn_light"));
        planet.style.backgroundImage =
          "url(../../assets/images/secret-planet-light.png)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/start/index.html"
      ) {
        body.style.backgroundImage =
          "url(../../assets/images/start-light-theme.jpeg)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/gallery/index.html"
      ) {
        const galleryItem = document.querySelectorAll(".gallery__item");

        body.style.backgroundImage =
          "url(../../assets/images/light-bg-gallery.jpeg)";
        galleryItem.forEach(
          (el) =>
            (el.style.background =
              "linear-gradient(179.96deg, rgba(179, 43, 43, 0.69) 0.04%, rgb(48 50 73 / 98%) 130.08%)")
        );
      }
      switchTheme.style.background = "url(../../assets/icons/moon.svg)";
    } else {
      if (window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/results/index.html") {
        const resultsBtn = document.querySelector(".results__btn");
        body.style.backgroundImage = "url(../../assets/images/mars.jpeg)";

        resultsBtn.style.background =
          "linear-gradient( 180deg,rgb(130 21 36) 0%, rgb(31 38 49 / 50%) 100%)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/game/index.html"
      ) {
        const questionsBlock = document.querySelectorAll(".questions__block");
        const nextRound = document.querySelector(".game__button");
        const planetsVariant = document.querySelectorAll(".planet__variant");
        const planet = document.querySelector(".game__secret-img");

        body.style.backgroundImage = "url(../../assets/images/moon.jpeg)";
        questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";
        planetsVariant.forEach((el) => el.classList.remove("btn_light"));
        nextRound.classList.remove("btn_light");
        planet.style.backgroundImage =
          "url(../../assets/images/secret-planet.png)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/start/index.html"
      ) {
        body.style.backgroundImage = "url(../../assets/images/bg.jpeg)";
      } else if (
        window.location.pathname === "https://wozzzie.github.io/Quiz-app/quiz-app/pages/gallery/index.html"
      ) {
        const galleryItem = document.querySelectorAll(".gallery__item");

        body.style.backgroundImage = "url(../../assets/images/gallery-bg.jpeg)";
        galleryItem.forEach(
          (el) =>
            (el.style.background =
              "linear-gradient(179.96deg, rgba(255, 255, 255, 0.25) 0.04%, rgba(87, 177, 255, 0) 130.08%);")
        );
      }
      switchTheme.style.background = "url(../../assets/icons/sun.svg)";
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
