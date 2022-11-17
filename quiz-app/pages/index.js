import cosmosData from "./data.js";

const firstRound = cosmosData[0];
const secondRound = cosmosData[1];
const thirdRound = cosmosData[2];
const fourthRound = cosmosData[3];
const fifthRound = cosmosData[4];
const sixthRound = cosmosData[5];

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
  progressBar = document.querySelector(".game__progress-bar");

planet.style.backgroundImage = `url(../../assets/images/secret-planet.png)`;
nextRound.disabled = true;
questionsBlock[0].style.backgroundColor = "rgb(84 73 163)";
let win = false;

let round = firstRound;

function random() {
  let item = cosmosData[0][Math.floor(Math.random() * cosmosData[0].length)];
  return item;
}

let randomObject = random();

var arrOfPlanets = Array.from(planetsVariant);

arrOfPlanets.forEach((el) => {
    console.log(el)
  for (let index = 0; index < firstRound.length; index++) {
    let element = firstRound[index];
    // console.log(firstRound[0]);
    // console.log(element.name)
    el.innerHTML = element.name;
  }
});

function setRound(round) {
  for (let el of planetsVariant) {
    el.addEventListener("click", (event) => {
      console.log(event.target.innerHTML);
      if (event.target.innerHTML === randomObject.name) {
        nextRound.disabled = false;
        win = true;
        console.log("YEEYEYYEYEY");
        planetName.innerHTML = randomObject.name;
        planet.style.backgroundImage = `url(${randomObject.image})`;
        event.target.style.background =
          "linear-gradient(180deg,rgb(81 155 118) 0%,rgb(29 58 108 / 50%) 100%)";
      } else if (event.target.id !== randomObject.id) {
        console.log("NO!");
        event.target.style.background =
          "linear-gradient(180deg,rgb(155 73 73) 0%,rgb(29 58 108 / 50%) 100%)";
      }
      planetDescription.innerText = "";
    });
  }
  //   planetChoose.addEventListener("click", (event) => {
  //     if (event.target.id === randomObject.id) {
  //       nextRound.disabled = false;
  //       win = true;
  //       console.log("YEEYEYYEYEY");
  //       planetName.innerHTML = randomObject.name;
  //       planet.style.backgroundImage = `url(${randomObject.image})`;
  //       event.target.style.background =
  //         "linear-gradient(180deg,rgb(81 155 118) 0%,rgb(29 58 108 / 50%) 100%)";
  //     } else if (event.target.id !== randomObject.id) {
  //       console.log("NO!");
  //       event.target.style.background =
  //         "linear-gradient(180deg,rgb(155 73 73) 0%,rgb(29 58 108 / 50%) 100%)";
  //     }
  //     console.log(event.target.id);
  //     planetDescription.innerText = "";
  //     //   planetDescriptionImg.style.backgroundImage = `url(${randomObject.image})`;
  //     //   planetDescriptionName.innerText = randomObject.name;
  //     //   planetDescriptionAstronomicalBodies.innerText =
  //     //     randomObject.astronomicalBodies;
  //     //   planetDescriptionText.innerText = randomObject.description;

  //     //   cosmosData.filter((el) => {
  //     //     for (let item in el) {
  //     //       //   console.log(el[item].id);
  //     //       let idItem = el[item].id;
  //     //       if (idItem === event.target.id) {
  //     //         planetDescriptionImg.style.backgroundImage = `url(${idItem.image})`;
  //     //         planetDescriptionName.innerText = idItem.name;
  //     //         planetDescriptionAstronomicalBodies.innerText =
  //     //           idItem.astronomicalBodies;
  //     //         planetDescriptionText.innerText = idItem.description;
  //     //       }
  //     //     }
  //     //   });
  //   });
}

// function random(round) {
//   let item;
//   switch (round) {
//     case firstRound:
//       return (item =
//         cosmosData[0][Math.floor(Math.random() * cosmosData[0].length)]);
//     case secondRound:
//       return (item =
//         cosmosData[1][Math.floor(Math.random() * cosmosData[0].length)]);
//     case thirdRound:
//       return (item =
//         cosmosData[2][Math.floor(Math.random() * cosmosData[0].length)]);
//     case fourthRound:
//       return (item =
//         cosmosData[3][Math.floor(Math.random() * cosmosData[0].length)]);
//     case fifthRound:
//       return (item =
//         cosmosData[4][Math.floor(Math.random() * cosmosData[0].length)]);
//     case sixthRound:
//       return (item =
//         cosmosData[5][Math.floor(Math.random() * cosmosData[0].length)]);
//   }
// }

// let selectedRound = setRound(firstRound);

const audio = new Audio(randomObject.audio);
console.log(audio);

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

// function setGame() {
//   setRound(firstRound);

//   const moveTo = (event, delta) => {
//     event.stopPropagation();

//     const size = questionsBlock.length,
//       currIndex = [...questionsBlock].findIndex(
//         (q) => (q.style.backgroundColor = "rgb(84 73 163)")
//       ),
//       nextIndex = (currIndex + delta + size) % size;
//     questionsBlock[currIndex].style.background =
//       "linear-gradient( 96.23deg, rgba(174, 129, 177, 0.5) -10.68%, rgba(254, 247, 245, 0.25) -10.68%, rgba(123, 169, 255, 0.25) 100% )";

//     questionsBlock[nextIndex].style.backgroundColor = "rgb(84 73 163)";
//   };

//   nextRound.addEventListener("click", (e) => {
//     moveTo(e, +1);
//     setRound(secondRound);
//   });
// }

// setGame();
