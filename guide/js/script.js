let para = document.getElementById("couverture-img");
let img = [];
for (let i = 0; i <= 9; i++) {
  let temp = document.getElementById("chapitre" + i + "-couverture");
  img.push(temp);
}
img.forEach((element) => {
  element.backgroundPositionY = "calc(50%)";
});
window.addEventListener("scroll", function () {
  let offset = window.scrollY;
  para.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
});
