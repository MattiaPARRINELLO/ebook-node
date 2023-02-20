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

for (let i = 0; i < 10; i++) {
  let temp = document.getElementById("sommaire-chapitre" + i);
  console.log(temp);
  temp.addEventListener("click", function () {
    console.log("click");
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
