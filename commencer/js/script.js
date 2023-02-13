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
