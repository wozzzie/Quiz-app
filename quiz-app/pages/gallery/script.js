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
const astroStarts = document.querySelector(".btn-astroStarts");
const cosVehicle = document.querySelector(".btn-cosVehicle");
const btnPlanets = document.querySelector(".btn-planets");
const popupDescription = document.querySelector(".planet__description");
const galleryName = document.querySelectorAll(".gallery__name");
const galleryImg = document.querySelectorAll(".gallery__img");

const playBtn = document.querySelector(".game__play"),
  planetName = document.querySelector(".game__secret-planet"),
  duration = document.querySelector(".game__durationTime"),
  current = document.querySelector(".game__currentTime"),
  progressBar = document.querySelector(".game__progress-bar"),
  audioPlay = document.querySelector(".game__audio-play"),
  secretPlay = document.querySelector(".planet__play");

const volumeIcon = document.querySelector(".volume-icon"),
  volumeInput = document.querySelector(".volume");

let galleryAudio = new Audio();
let isGalleryPlay = false;

let galleryAudioVolume = 0.5;
galleryAudio.volume = galleryAudioVolume;

function changeVolume() {
  galleryAudio.muted = !galleryAudio.muted;

  if (galleryAudio.muted) {
    galleryAudioVolume = volumeInput.value;
    volumeInput.value = 0;
  } else {
    volumeInput.value = galleryAudioVolume;
  }

  volumeIcon.classList.toggle("mute");
}

function handleGradient(firstVal, secondVal) {
  return `linear-gradient(to right, rgb(189, 174, 130) 0%, 
            rgb(189, 174, 130) ${firstVal}%,
            rgb(200, 200, 200) ${secondVal}%,
            rgb(200, 200, 200) 100%)`;
}

function handleRangeUpdate() {
  galleryAudio.volume = volumeInput.value;

  volumeInput.style.background = handleGradient(
    volumeInput.value * 100,
    volumeInput.value * 100
  );
}

volumeInput.addEventListener("input", () => {
  handleRangeUpdate();

  if (+volumeInput.value === 0) {
    volumeIcon.classList.add("mute");
  } else {
    volumeIcon.classList.remove("mute");
  }
});

volumeIcon.addEventListener("click", () => {
  changeVolume();
  handleRangeUpdate();
});

handleRangeUpdate();

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
console.log(galleryArr)
function setMoreInfo() {
  moreBtn.forEach((item) =>
    item.addEventListener("click", (event) => {
      galleryArr.forEach((el) => {
        if (event.target.id === el.name) {
          console.log(galleryArr)
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

let arrOfNames = Array.from(galleryName);
const arrOfImages = Array.from(galleryImg);
const moreBnts = Array.from(moreBtn)
console.log(moreBnts.forEach(el => console.log(el.id)))
renderNames(galleryData[0]);

function renderNames(data) {
  data.forEach((el, index) => {
    arrOfNames[index].innerHTML = el.name;
    arrOfImages[index].src = el.image;
    moreBnts[index].id = el.id;
  });
}

astroStarts.addEventListener("click", () => {
  renderNames(galleryData[1]);
});

cosVehicle.addEventListener("click", () => {
  renderNames(galleryData[2]);
});

btnPlanets.addEventListener("click", () => {
  renderNames(galleryData[0]);
});

//POPUP

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
