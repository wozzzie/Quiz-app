import cosmosData from "./data.js";

const [
  firstRound,
  secondRound,
  thirdRound,
  fourthRound,
  fifthRound,
  sixthRound,
] = cosmosData;

const body = document.querySelector(".body");
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

const switchTheme = document.querySelector(".switch-theme");

nextRound.disabled = true;
nextRound.classList.add("game__button_disabled");
audioPlay.classList.add("hidden");
planet.style.backgroundImage = "url(../../assets/images/secret-planet.png)";

questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";

let score = 0;
let scoreOfGame = 0;
let attempt = 0;
let win = false;
let round = 0;
let isPlay = false;
let isSecretPlay = false;
let audio = new Audio();
let planetAudio = new Audio();
let audioBtn = new Audio();

let themeDefault = "dark";

function random(data) {
  return data[Math.floor(Math.random() * data.length)];
}

let randomObject = random(firstRound);

let arrOfPlanets = Array.from(planetsVariant);

function renderAnswersBtns(data) {
  data.forEach((el, index) => {
    arrOfPlanets[index].innerHTML = el.name;
  });
}

renderAnswersBtns(firstRound);

secretPlay.addEventListener("click", () => {
  playBtn.classList.remove("game__pause");

  console.log("isSecretPlay", isSecretPlay);
  if (!isSecretPlay) {
    audio.pause();
    isPlay = false;
    playPlanetAudio();
    secretPlay.classList.add("game__pause");
  } else {
    planetAudio.pause();
    isSecretPlay = false;

    secretPlay.classList.remove("game__pause");
  }
});

function clickAnswerBtn(event) {
  const eventClassList = [...event.target.classList].flat();
  const isPressedBtn =
    eventClassList.indexOf("planet__variant_wrong") === -1 &&
    eventClassList.indexOf("planet__variant_right") === -1;

  if (isPressedBtn) {
    if (attempt === 0) {
      scoreOfGame += 5;
    }

    if (attempt >= 1 && attempt <= 5) {
      scoreOfGame -= 1;
    }

    console.log(attempt);
    if (event.target.innerHTML === randomObject.name) {
      nextRound.disabled = false;
      nextRound.classList.remove("game__button_disabled");
      win = true;
      attempt = 0;
      score = scoreOfGame;
      event.target.setAttribute("id", "winningItem");

      changeAudio("right");

      scoreNumber.innerHTML = score;

      if (round === 6) {
        return;
      } else if (round === 5) {
        localStorage.setItem("score", score);
        nextRound.innerHTML = "GAME OVER";
        window.location.href = "../results/index.html";
      }

      console.log("YEEYEYYEYEY", win);
      planetName.innerHTML = randomObject.name;
      planet.style.backgroundImage = `url(${randomObject.image})`;
      event.target.classList.add("planet__variant_right");
    } else {
      console.log("NO!", win);

      if (!win) {
        ++attempt;
        event.target.classList.add("planet__variant_wrong");
        changeAudio("wrong");
      }
    }
  }
  console.log("attempt", attempt);

  let cosmosArr = cosmosData[round].flat();

  cosmosArr.forEach((el) => {
    if (event.target.innerHTML === el.name) {
      event.target.disabled = false;

      audioPlay.classList.remove("hidden");
      secretPlay.classList.remove("game__pause");

      planetAudio.src = el.audio;
      console.log(secretPlay);

      console.log(audio.src);
      planetDescription.innerText = "";
      planetDescriptionImg.style.backgroundImage = `url(${el.image})`;
      planetDescriptionName.innerHTML = el.name;
      planetDescriptionAstronomicalBodies.innerHTML = el.astronomicalBodies;
      planetDescriptionText.innerText = el.description;
    }
  });
  planetDescription.innerText = "";
}

function playPause() {
  console.log("audioPlay", isPlay);
  if (!isPlay) {
    planetAudio.pause();
    isSecretPlay = false;
    playAudio();
    secretPlay.classList.remove("game__pause");
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
  audio.volume = 0.1;
  isPlay = true;
  duration.textContent = getTimeCodeFromNum(audio.duration);
}

async function playPlanetAudio() {
  await planetAudio.play();
  planetAudio.volume = 0.1;
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
  playBtn.classList.remove("game__pause");

  randomObject = random(roundData);
  audio.src = randomObject.audio;
  console.log(randomObject.audio);

  renderAnswersBtns(roundData);

  planetsVariant.forEach((planetItem) =>
    planetItem.removeEventListener("click", clickAnswerBtn)
  );
  planetsVariant.forEach((planetItem) =>
    planetItem.addEventListener("click", clickAnswerBtn)
  );

  planetsVariant.forEach((planetItem) => {
    planetItem.classList.remove("planet__variant_wrong");
    planetItem.classList.remove("planet__variant_right");
  });
}

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
      nextRound.disabled = true;
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

// Switch theme

function changeTheme() {
  switchTheme.addEventListener("click", () => {
    if (themeDefault === "dark") {
      body.classList.add("ligth-theme");
      questionsBlock[0].style.backgroundColor = "rgb(120 171 183)";
      nextRound.classList.add("btn_light");
      planetsVariant.forEach((el) => el.classList.add("btn_light"));
      switchTheme.style.background = "url(../../assets/icons/sun.svg)";
      planet.style.backgroundImage =
        "url(../../assets/images/secret-planet-light.png)";
      themeDefault = "light";
    } else {
      body.classList.remove("ligth-theme");
      questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";
      planetsVariant.forEach((el) => el.classList.remove("btn_light"));
      nextRound.classList.remove("btn_light");
      switchTheme.style.background = "url(../../assets/icons/moon.svg)";
      planet.style.backgroundImage =
        "url(../../assets/images/secret-planet.png)";

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
      body.classList.add("ligth-theme");
    } else {
      body.classList.remove("ligth-theme");
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
