import cosmosData from "./data.js";

const [
  firstRound,
  secondRound,
  thirdRound,
  fourthRound,
  fifthRound,
  sixthRound,
] = cosmosData;

const planet = document.querySelector(".game__secret-img");
const questionsBlock = document.querySelectorAll(".questions__block");
const nextRound = document.querySelector(".game__button");
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
  progressBar = document.querySelector(".game__progress-bar"),
  audioPlay = document.querySelector(".game__audio-play");

nextRound.disabled = true;
nextRound.classList.add("game__button_disabled");
audioPlay.classList.add("hidden");

questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";

let win = false;
let round = 0;

function random(data) {
  return data[Math.floor(Math.random() * data.length)];
}

let randomObject = random(firstRound);

var arrOfPlanets = Array.from(planetsVariant);

function renderAnswersBtns(data) {
  data.forEach((el, index) => (arrOfPlanets[index].innerHTML = el.name));
}

renderAnswersBtns(firstRound);

function clickAnswerBtn(event) {
  console.log(event.target.innerHTML);
  if (event.target.innerHTML === randomObject.name) {
    nextRound.disabled = false;
    nextRound.classList.remove("game__button_disabled");
    win = true;
    console.log("++round");
    if (round === 6) {
      return;
    } else if (round === 5) {
      nextRound.innerHTML = "GAME OVER";
      window.location.href = "../results/index.html";
    }
    round++;
    console.log("YEEYEYYEYEY", win);
    planetName.innerHTML = randomObject.name;
    planet.style.backgroundImage = `url(${randomObject.image})`;
    event.target.style.background =
      "linear-gradient(180deg,rgb(81 155 118) 0%,rgb(29 58 108 / 50%) 100%)";
  } else if (event.target.innerHTML !== randomObject.name) {
    console.log("NO!");
    event.target.style.background =
      "linear-gradient(180deg,rgb(155 73 73) 0%,rgb(29 58 108 / 50%) 100%)";
  }

  let cosmosArr = cosmosData.flat();

  cosmosArr.forEach((el) => {
    if (event.target.innerHTML === el.name) {
      audioPlay.classList.remove("hidden");
      //todo
      planetDescriptionImg.style.backgroundImage = `url(${el.image})`;
      planetDescriptionName.innerHTML = el.name;
      planetDescriptionAstronomicalBodies.innerHTML = el.astronomicalBodies;
      planetDescriptionText.innerText = el.description;
    }
  });

  planetDescription.innerText = "";
}

function setRound(roundData) {
  randomObject = random(roundData);
  renderAnswersBtns(roundData);

  planetsVariant.forEach((planetItem) =>
    planetItem.removeEventListener("click", clickAnswerBtn)
  );
  planetsVariant.forEach((planetItem) =>
    planetItem.addEventListener("click", clickAnswerBtn)
  );

  planetsVariant.forEach((planetItem) => {
    planetItem.style.background =
      "linear-gradient( 180deg, rgb(129 72 212) 0%, rgb(29 58 108 / 50%) 100% )";
  });
}

const audio = new Audio(randomObject.audio);
// console.log(audio);

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
}, 500);

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// function randomPlanet(min, max) {
//   let rand = min - 0.5 + Math.random() * (max - min + 1);
//   console.log(Math.round(rand));
//   return Math.round(rand);
// }

function setGame() {
  setRound(firstRound);

  const moveTo = (event, delta) => {
    const questions = [...questionsBlock];
    console.log("round", round);
    questions.forEach(
      (el) =>
        (el.style.background =
          "linear-gradient( 96.23deg, rgba(174, 129, 177, 0.5) -10.68%, rgba(254, 247, 245, 0.25) -10.68%, rgba(123, 169, 255, 0.25) 100% )")
    );
    if (round === 6) {
      return;
    }
    questions[round].style.backgroundColor = "rgb(84 73 163)";
  };

  nextRound.addEventListener("click", (e) => {
    moveTo(e);
    if (round === 6) {
      return;
    } else {
      setRound(cosmosData[round]);
      nextRound.classList.add("game__button_disabled");
      planetDescription.innerText =
        "Listen to the player. Select a planet from the list.";
      audioPlay.classList.add("hidden");
      planetDescriptionImg.style.backgroundImage = "";
      planetDescriptionName.innerHTML = "";
      planetDescriptionAstronomicalBodies.innerHTML = "";
      planetDescriptionText.innerText = "";
    }
    console.log("randomObject", randomObject);
  });
}

setGame();
