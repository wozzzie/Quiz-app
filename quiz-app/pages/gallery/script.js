import cosmosData from "../data.js";

const galleryItem = document.querySelectorAll(".gallery__item");
const gallery = document.querySelector(".gallery");

const cosmosDataArr = cosmosData.flat();
const galleryArr = [];
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

// setInterval(() => {
//   progressBar.value = audio.currentTime;
//   current.textContent = getTimeCodeFromNum(audio.currentTime);
//   progressBar.max = audio.duration;
// }, 500);

// progressBar.addEventListener("input", () => {
//   audio.currentTime = progressBar.value;
// });

cosmosDataArr.forEach((el) => {
  if (el.id === 1) {
    galleryArr.push(el);
  }
});
console.log(galleryArr);

gallery.innerHTML = galleryArr.map((el) => {
  return `
  <div class="gallery__item">
  <div class="item__block">
    <img class="item__img" src="${el.image}"></img>
    <div class="item__info">
      <p class="item__name">${el.name}</p>
      <p class="item__astronomical-body">${el.astronomicalBodies}</p>
    
    </div>
    
  </div>
  <audio
  class="item__audio"
  controls
  src="${el.audio}">
</audio>
  <p class="item__description">${el.description}</p>
  </div>
  `;
});

{
  /* <div class="item__audio-play">
<div class="item__secret-play">
  <div class="item__play"></div>
  <input
    type="range"
    class="item__progress-bar"
    min="0"
    max="86"
    value="0"
  />
  <div class="item__currentTime"></div>
  <div class="item__durationTime"></div>
</div>
</div> */
}
