import galleryData from "../gallery.js";
const body = document.querySelector(".body");

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

let galleryArr = galleryData.flat();
function setMoreInfo() {
  moreBtn.forEach((item) =>
    item.addEventListener("click", (event) => {
      galleryArr.forEach((el) => {
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
