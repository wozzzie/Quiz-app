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
const scoreNumber = document.querySelector(".score-number");
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
  audioPlay = document.querySelector(".game__audio-play"),
  secretPlay = document.querySelector(".planet__play"),
  planetCurrent = document.querySelector(".planet__currentTime"),
  planetDuration = document.querySelector(".planet__durationTime"),
  planetProgressBar = document.querySelector(".planet__progress-bar");

nextRound.disabled = true;
nextRound.classList.add("game__button_disabled");
audioPlay.classList.add("hidden");
planet.style.backgroundImage = "url(../../assets/images/secret-planet.png)";

questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";

let score = 0;
let attempt = 0;
let win = false;
let round = 0;
let isPlay = false;
let isSecretPlay = false;
let audio = new Audio();
let planetAudio = new Audio();
let audioBtn = new Audio();

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
    event.target.setAttribute("id", "winningItem");
    changeAudio("right");
    // audioBtn.paused();
    attempt++;
    console.log(attempt);
    // if(){

    // }
    scoreNumber.innerHTML = attempt;

    if (round === 6) {
      return;
    } else if (round === 5) {
      localStorage.setItem("score", attempt);
      nextRound.innerHTML = "GAME OVER";
      window.location.href = "../results/index.html";
    }

    console.log("YEEYEYYEYEY", win);
    planetName.innerHTML = randomObject.name;
    planet.style.backgroundImage = `url(${randomObject.image})`;
    event.target.style.background =
      "linear-gradient(180deg,rgb(81 155 118) 0%,rgb(29 58 108 / 50%) 100%)";
  } else {
    console.log("NO!", win);

    if (!win) {
      attempt++;
      event.target.style.background =
        "linear-gradient(180deg,rgb(155 73 73) 0%,rgb(29 58 108 / 50%) 100%)";
      changeAudio("wrong");
    }
  }

  let cosmosArr = cosmosData.flat();
  cosmosArr.forEach((el) => {
    if (event.target.innerHTML === el.name) {
      event.target.disabled = false;

      audioPlay.classList.remove("hidden");
      secretPlay.classList.remove("game__pause");

      planetAudio.src = el.audio;
      secretPlay.addEventListener("click", () => {
        audio.pause();
        playBtn.classList.remove("game__pause");

        if (!isSecretPlay) {
          playPlanetAudio();
          secretPlay.classList.add("game__pause");
        } else {
          planetAudio.pause();
          isSecretPlay = false;

          secretPlay.classList.remove("game__pause");
        }
      });
      console.log(audio.src);
      //todo
      planetDescriptionImg.style.backgroundImage = `url(${el.image})`;
      planetDescriptionName.innerHTML = el.name;
      planetDescriptionAstronomicalBodies.innerHTML = el.astronomicalBodies;
      planetDescriptionText.innerText = el.description;
    }
  });

  planetDescription.innerText = "";
}

function playPause() {
  if (!isPlay) {
    planetAudio.pause();

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
  // audio.volume = 0.1;
  isPlay = true;
  duration.textContent = getTimeCodeFromNum(audio.duration);
}

async function playPlanetAudio() {
  await planetAudio.play();
  // planetAudio.volume = 0.1;
  isSecretPlay = true;
  planetDuration.textContent = getTimeCodeFromNum(planetAudio.duration);
}

async function changeAudio(sound) {
  audioBtn.volume = 0.4;

  if (sound === "right") {
    audioBtn.src = "../../assets/audio/right-sound.mp3";
    await audioBtn.play();
  } else if (sound === "wrong") {
    audioBtn.src = "../../assets/audio/wrong-sound.mp3";
    await audioBtn.play();
  }

  // audioBtn.autoplay = playAudio;
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

setInterval(() => {
  planetProgressBar.value = planetAudio.currentTime;
  planetCurrent.textContent = getTimeCodeFromNum(planetAudio.currentTime);
  planetProgressBar.max = planetAudio.duration;
}, 500);

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

planetProgressBar.addEventListener("input", () => {
  planetAudio.currentTime = planetProgressBar.value;
});

function setRound(roundData) {
  randomObject = random(roundData);
  playBtn.classList.remove("game__pause");

  console.log(randomObject.audio);
  audio.src = randomObject.audio;

  // function playPause() {
  //   if (!isPlay) {
  //     playAudio();
  //     playBtn.classList.add("game__pause");
  //   } else {
  //     audio.pause();
  //     isPlay = false;

  //     playBtn.classList.remove("game__pause");
  //   }
  // }

  // playBtn.addEventListener("click", playPause);

  // async function playAudio() {
  //   await audio.play();
  //   audio.volume = 0.1;
  //   isPlay = true;
  //   duration.textContent = getTimeCodeFromNum(audio.duration);
  // }

  // function getTimeCodeFromNum(num) {
  //   let seconds = parseInt(num);
  //   let minutes = parseInt(seconds / 60);
  //   seconds -= minutes * 60;
  //   const hours = parseInt(minutes / 60);
  //   minutes -= hours * 60;

  //   if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  //   return `${String(hours).padStart(2, 0)}:${minutes}:${String(
  //     seconds % 60
  //   ).padStart(2, 0)}`;
  // }

  // setInterval(() => {
  //   progressBar.value = audio.currentTime;
  //   current.textContent = getTimeCodeFromNum(audio.currentTime);
  //   progressBar.max = audio.duration;
  // }, 500);

  // progressBar.addEventListener("input", () => {
  //   audio.currentTime = progressBar.value;
  // });

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

// let audio = new Audio(randomObject.audio);
// console.log(audio);

// let isPlay = false;

// function playPause() {
//   if (!isPlay) {
//     playAudio();
//     playBtn.classList.add("game__pause");
//   } else {
//     audio.pause();
//     isPlay = false;

//     playBtn.classList.remove("game__pause");
//   }
// }

// playBtn.addEventListener("click", playPause);

// async function playAudio() {
//   await audio.play();
//   isPlay = true;
//   duration.textContent = getTimeCodeFromNum(audio.duration);
// }

// function getTimeCodeFromNum(num) {
//   let seconds = parseInt(num);
//   let minutes = parseInt(seconds / 60);
//   seconds -= minutes * 60;
//   const hours = parseInt(minutes / 60);
//   minutes -= hours * 60;

//   if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//   return `${String(hours).padStart(2, 0)}:${minutes}:${String(
//     seconds % 60
//   ).padStart(2, 0)}`;
// }

// setInterval(() => {
//   progressBar.value = audio.currentTime;
//   current.textContent = getTimeCodeFromNum(audio.currentTime);
//   progressBar.max = audio.duration;
// }, 500);

// progressBar.addEventListener("input", () => {
//   audio.currentTime = progressBar.value;
// });

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
    ++round;
    win = false;
    isSecretPlay = false;
    planetAudio.pause();
    moveTo(e);
    if (round === 6) {
      return;
    } else {
      setRound(cosmosData[round]);
      planetName.innerHTML = "*********";
      planet.style.backgroundImage =
        "url(../../assets/images/secret-planet.png)";
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
