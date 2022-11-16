import cosmosData from "./data.js";

const planet = document.querySelector(".game__secret-img");

const planetsVariant = document.querySelectorAll(".planet__variant");

const planetChoose = document.querySelector(".planet__choose");

const planetDescription = document.querySelector(".planet__description-choose");

const planetDescriptionImg = document.querySelector(".planet__description-img");

const planetDescriptionName = document.querySelector(
  ".planet__description-name"
);

const planetDescriptionAstronomicalBodies = document.querySelector(
  ".planet__description-astronomical-bodies"
);

const planetDescriptionText = document.querySelector(
  ".planet__description-text"
);

const playBtn = document.querySelector(".game__play"),
  planetName = document.querySelector(".game__secret-planet"),
  duration = document.querySelector(".game__durationTime"),
  current = document.querySelector(".game__currentTime"),
  progressBar = document.querySelector(".game__progress-bar");

planet.style.backgroundImage = `url(../../assets/images/secret-planet.png)`;
// planet.style.backgroundImage = `url(${cosmosData[4][4].image})`;

function random() {
  let item = cosmosData[0][Math.floor(Math.random() * cosmosData[0].length)];
  return item;
}

let randomObject = random();

const audio = new Audio(randomObject.audio);
console.log(audio);

planetChoose.addEventListener("click", (event) => {
  if (event.target.id === randomObject.id) {
    console.log("YEEYEYYEYEY");
    planetName.innerHTML = randomObject.name;
    planet.style.backgroundImage = `url(${randomObject.image})`;
    event.target.style.background =
      "linear-gradient(180deg,rgb(81 155 118) 0%,rgb(29 58 108 / 50%) 100%)";
  } else if (event.target.id !== randomObject.id) {
    event.target.style.background =
      "linear-gradient(180deg,rgb(155 73 73) 0%,rgb(29 58 108 / 50%) 100%)";
  }
  planetDescription.innerText = "";
  planetDescriptionImg.style.backgroundImage = `url(${randomObject.image})`;
  planetDescriptionName.innerText = randomObject.name;
  planetDescriptionAstronomicalBodies.innerText =
    randomObject.astronomicalBodies;
  planetDescriptionText.innerText = randomObject.description;
});

let isPlay = false;

function playPause() {
  if (!isPlay) {
    playAudio();
    playBtn.classList.add("game__pause");
  } else {
    audio.pause();
    isPlay = false;

    playBtn.classList.remove("game__pause");
  }
}

playBtn.addEventListener("click", playPause);

async function playAudio() {
  await audio.play();
  isPlay = true;
  duration.textContent = getTimeCodeFromNum(audio.duration);
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
  progressBar.value = audio.currentTime;
  current.textContent = getTimeCodeFromNum(audio.currentTime);
  progressBar.max = audio.duration;

  if (audio.currentTime === audio.duration) {
    playNext();
  }
}, 500);

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

function randomPlanet(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  console.log(Math.round(rand));
  return Math.round(rand);
}

// randomPlanet(1, 6);

// for (let el of cosmosData[0]) {
//   randomPlanet(1, 6);

//   console.log(el);
// }
