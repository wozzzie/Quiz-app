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
    <div class="parent">
        <div class="child">a</div>
        <div class="child">+</div>
        <div class="child">b</div>
        <div class="child">=</div>
        <div class="child">a+b</div>
    </div>
`;
