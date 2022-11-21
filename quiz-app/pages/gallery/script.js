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

let galleryAudio = new Audio();
let isGalleryPlay = false;

async function playGalleryAudio() {
  await galleryAudio.play();
  galleryAudio.volume = 0.1;
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
        }
      });
    })
  );
}

setMoreInfo();

popupClose.addEventListener("click", () => {
  popup.classList.remove("popup_open");
});

const outsideClick = (e) => {
  if (e.target == popup) {
    popup.classList.remove("popup_open");
  }
};

window.addEventListener("click", outsideClick);
// setInterval(() => {
//   progressBar.value = audio.currentTime;
//   current.textContent = getTimeCodeFromNum(audio.currentTime);
//   progressBar.max = audio.duration;
// }, 500);

// progressBar.addEventListener("input", () => {
//   audio.currentTime = progressBar.value;
// });
