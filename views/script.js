let img = document.getElementById("title");
let fontSize = 9;
let maxFontSize = window.innerWidth / 99;
if (maxFontSize > 9) img.style.fontSize;

window.addEventListener("resize", function () {
  maxFontSize = window.innerWidth / 99;
  if (maxFontSize > 9) img.style.fontSize = maxFontSize + "em";
});
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  img.style.backgroundPositionY = "calc(50% + " + (offset * 0.5 + -90) + "px)";
  let temp = fontSize + offset * 0.005;
  if (temp > maxFontSize) temp = maxFontSize;
  img.style.fontSize = temp + "em";
});

function startAnimation(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.toggle("fadeIn", entry.isIntersecting);
      }, 500);
    } else {
      entry.target.classList.remove("fadeIn");
    }
  });
}

const observer = new IntersectionObserver(startAnimation, {
  root: null,
  threshold: 0.1,
});
const options = { root: null, rootMargin: "0px", threshold: 1 };

const popUpElements = document.querySelectorAll(".pop-up");
popUpElements.forEach((el) => {
  try {
    observer.observe(el, options);
  } catch (e) {
    console.error("Unable to observe pop-up elements", e);
  }
});
