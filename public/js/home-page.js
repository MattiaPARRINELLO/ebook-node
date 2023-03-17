let img = document.getElementById("title");
let fontSize = 9.3;
let maxFontSize = window.innerWidth / 99;
if (maxFontSize > 9) img.style.fontSize;

window.addEventListener("resize", function () {
  maxFontSize = window.innerWidth / 99;
  if (maxFontSize > 9) img.style.fontSize = maxFontSize + "em";
});
window.addEventListener("scroll", function () {
  //if not on computer, do nothing
  if (window.innerWidth < 1000) return;
  else {
    let offset = window.pageYOffset;
    img.style.backgroundPositionY = "calc(50% + " + offset * 0.5 + "px)";
    let temp = fontSize + offset * 0.005;
    if (temp > maxFontSize) temp = maxFontSize;
    img.style.fontSize = temp + "em";
  }
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

function openPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

//On page loading
window.addEventListener("load", function () {
  //get url parameters
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  //try to get the name and email parameters
  try {
    let nom = params.get("nom");
    let email = params.get("email");
    if (nom && email) {
      sendEmail(nom, email);
    }
  } catch (e) {
    console.error("Unable to get url parameters", e);
  }

  let author = document.getElementById("author");
  let title = document.getElementById("title");
  let homebtn = document.getElementById("home-btn");
  author.classList.add("authorappear");
  title.classList.add("titleappear");
  homebtn.classList.add("buttonappear");
});

function sendEmail(nom, email) {
  //add to local storage
  localStorage.setItem("inscription", true);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/sendEmail", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  //send to body
  xhr.send(JSON.stringify({ nom: nom, email: email }));
  xhr.onload = function () {
    if (xhr.status == 200) {
      console.log("Email registered");
    } else if (xhr.status == 400) {
      console.error("Email already exists");
    } else {
      console.error("Unable to send email");
    }
  };
}

window.addEventListener("load", function () {
  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let temp = month + "/" + year;
  console.log(temp);
  //si c'est la première fois que l'utilisateur visite le site ce mois-ci
  if (!localStorage.getItem(`${temp}`)) {
    if (!localStorage.getItem("inscription")) {
      //on affiche la popup
      setTimeout(openPopup, 5000);
      //on met visited à true
      localStorage.setItem(`${temp}`, true);
    }
  }
});

function goTo() {
  //go to the section ebooks of the page
  document
    .getElementById("ebook")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

document.getElementById("discord").addEventListener("click", function () {
  window.open("https://discord.gg/MD9e5hjKfd", "_blank");
});
