let para = document.getElementById("couverture-img");
let para0 = document.getElementById("chapitre0-couverture");
let para1 = document.getElementById("chapitre1-couverture");
let para2 = document.getElementById("chapitre2-couverture");
let para3 = document.getElementById("chapitre3-couverture");
let para4 = document.getElementById("chapitre4-couverture");
let para5 = document.getElementById("chapitre5-couverture");
let para6 = document.getElementById("chapitre6-couverture");
let para7 = document.getElementById("chapitre7-couverture");
let para8 = document.getElementById("chapitre8-couverture");
let para9 = document.getElementById("chapitre9-couverture");
para1.style.backgroundPositionY = "-900px";
window.addEventListener("scroll", function () {
  let offset = window.scrollY;
  para.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
  para0.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
  para1.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
  para2.style.backgroundPositionY = "calc(100% + " + offset * 0.5 + "px)";
  para3.style.backgroundPositionY = "calc(-50% + " + offset * 0.5 + "px)";
  para4.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
  para5.style.backgroundPositionY = "calc(150% + " + offset * 0.5 + "px)";
  para6.style.backgroundPositionY = "calc(150% + " + offset * 0.5 + "px)";
  para7.style.backgroundPositionY = "calc(150% + " + offset * 0.5 + "px)";

  para8.style.backgroundPositionY = "calc(0% + " + offset * 0.5 + "px)";
  para9.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
});
