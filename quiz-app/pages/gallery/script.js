import cosmosData from "../data.js";

const galleryItem = document.querySelectorAll(".gallery__item");
const gallery = document.querySelector(".gallery");
const cosmosDataArr = cosmosData.flat();
const galleryArr = [];

cosmosDataArr.forEach((el) => {
  if (el.id === 1) {
    galleryArr.push(el);
  }
});
console.log(galleryArr);

gallery.innerHTML = `
<div class="gallery__item">
<div class="item__block">
  <div class="item__img"></div>
  <div class="item__info">
    <p class="item__name"></p>
    <p class="item__astronomical-body">klknl</p>
    <div class="item__audio-play">
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
    </div>
  </div>
</div>
<p class="item__description"></p>
</div>
<div class="gallery__item"></div>
<div class="gallery__item"></div>
<div class="gallery__item"></div>
<div class="gallery__item"></div>
<div class="gallery__item"></div>
`;
