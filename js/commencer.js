let para = document.getElementById("couverture-img");
console.log(para);
let img = [];
window.addEventListener("scroll", function () {
  let offset = window.scrollY;
  para.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
});

for (let i = 0; i < 5; i++) {
  let temp = document.getElementById("sommaire-chapitre" + i);
  temp.addEventListener("click", function () {
    location.href = "#chapitre" + i + "-couverture";
  });
}
function calc() {
  for (let i = 0; i < 30; i = i + 0.5) {
    let temp = (i * 6) / 4.5;
    console.log(i + "=" + temp);
  }
}
calc();
