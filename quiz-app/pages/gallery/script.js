import galleryData from "../gallery.js";

const galleryItem = document.querySelectorAll(".gallery__item");
const gallery = document.querySelector(".gallery");
const moreBtn = document.querySelectorAll(".gallery__extra");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupImg = document.querySelector(".planet__avatar");
const popupName = document.querySelector(".planet__name");
const astronomicalBodies = document.querySelector(
  ".planet__astronomical-bodies"
);
const popupDescription = document.querySelector(".planet__description");
const body = document.querySelector(".body");

const playBtn = document.querySelector(".game__play"),
  planetName = document.querySelector(".game__secret-planet"),
  duration = document.querySelector(".game__durationTime"),
  current = document.querySelector(".game__currentTime"),
  progressBar = document.querySelector(".game__progress-bar"),
  audioPlay = document.querySelector(".game__audio-play"),
  secretPlay = document.querySelector(".planet__play");

let galleryAudio = new Audio();
let isGalleryPlay = false;

function playPause() {
  if (!isGalleryPlay) {
    // isGalleryPlay = false;
    playGalleryAudio();

    playBtn.classList.add("game__pause");
  } else {
    galleryAudio.pause();
    isGalleryPlay = false;

    playBtn.classList.remove("game__pause");
  }
}

playBtn.addEventListener("click", playPause);

async function playGalleryAudio() {
  await galleryAudio.play();
  // galleryAudio.volume = 0.1;
  isGalleryPlay = true;
  duration.textContent = getTimeCodeFromNum(galleryAudio.duration);
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

setInterval(() => {
  progressBar.value = galleryAudio.currentTime;
  current.textContent = getTimeCodeFromNum(galleryAudio.currentTime);
  progressBar.max = galleryAudio.duration;
}, 500);

progressBar.addEventListener("input", () => {
  galleryAudio.currentTime = progressBar.value;
});

function setMoreInfo() {
  moreBtn.forEach((item) =>
    item.addEventListener("click", (event) => {
      galleryData.forEach((el) => {
        if (event.target.id === el.name) {
          popup.classList.add("popup_open");
          popupImg.src = el.image;
          popupName.innerHTML = el.name;
          astronomicalBodies.innerHTML = el.astronomicalBodies;
          popupDescription.innerHTML = el.description;

          galleryAudio.src = el.audio;
        }
      });
    })
  );
}

setMoreInfo();

popupClose.addEventListener("click", () => {
  popup.classList.remove("popup_open");
  galleryAudio.pause();
  isGalleryPlay = false;
  playBtn.classList.remove("game__pause");
});

const outsideClick = (e) => {
  if (e.target == popup) {
    popup.classList.remove("popup_open");
    galleryAudio.pause();
    isGalleryPlay = false;
    playBtn.classList.remove("game__pause");
  }
};

window.addEventListener("click", outsideClick);

// Switch theme
const switchTheme = document.querySelector(".switch-theme");
let themeDefault = "dark";

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      body.style.backgroundImage =
        "url(../../assets/images/light-bg-gallery.jpeg)";
      switchTheme.style.background = "url(../../assets/icons/sun.svg)";
      galleryItem.forEach(
        (el) =>
          (el.style.background =
            "linear-gradient(179.96deg, rgba(179, 43, 43, 0.69) 0.04%, rgb(48 50 73 / 98%) 130.08%)")
      );

      themeDefault = "light";
    } else {
      body.style.backgroundImage = "url(../../assets/images/gallery-bg.jpeg)";
      switchTheme.style.background = "url(../../assets/icons/moon.svg)";

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
        "url(../../assets/images/light-bg-gallery.jpeg)";
    } else {
      body.style.backgroundImage = "url(../../assets/images/gallery-bg.jpeg)";
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
