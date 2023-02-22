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

// Affiche la popup lorsque la page est chargée
window.onload = function () {
  setTimeout(() => {
    document.querySelector(".popup").style.display = "block";
    document.querySelector("couverture-container3").style.display = "none";
  }, 300000);
  // }, 30);
};
function evalPopup() {
  document.querySelector(".popup").style.display = "block";
  document.querySelector("couverture-container3").style.display = "none";
}

// Ferme la popup lorsque l'utilisateur clique sur le bouton de fermeture
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
  document.querySelector("couverture-container3").style.display = "flex";
});

// Gère la sélection de l'évaluation
const stars = document.querySelectorAll(".star");
let selectedRating = 0;

stars.forEach(function (star) {
  // Pour chaque étoile
  star.addEventListener("click", function () {
    // Lorsqu'on clique dessus
    selectedRating = this.getAttribute("data-rating"); // Récupère la valeur de l'évaluation
    stars.forEach(function (s) {
      // Pour chaque étoile
      s.classList.remove("active"); // Supprime la classe "active"
    });
    this.classList.add("active"); // Ajoute la classe "active" à l'étoile sélectionnée
    for (let i = 1; i <= selectedRating; i++) {
      // Pour chaque étoile
      document
        .querySelector(".star[data-rating='" + i + "']")
        .classList.add("active"); // Ajoute la classe "active"
    }
  });
  star.addEventListener("mouseenter", function () {
    // Lorsqu'on clique dessus
    selectedRating = this.getAttribute("data-rating"); // Récupère la valeur de l'évaluation
    stars.forEach(function (s) {
      // Pour chaque étoile
      s.classList.remove("active"); // Supprime la classe "active"
    });
    this.classList.add("active"); // Ajoute la classe "active" à l'étoile sélectionnée
    for (let i = 1; i <= selectedRating; i++) {
      // Pour chaque étoile
      document
        .querySelector(".star[data-rating='" + i + "']")
        .classList.add("active"); // Ajoute la classe "active"
    }
  });
});

// Envoie l'évaluation lorsqu'on clique sur le bouton d'envoi
document.querySelector(".submit").addEventListener("click", function () {
  // Vérifie si une évaluation a été sélectionnée
  if (selectedRating > 0) {
    let commentaire = prompt(
      "Ajouter un commentaire a votre note(facultatif) :"
    );
    let contact = prompt(
      "Ajouter votre instagram ou mail pour pouvoir vous recontacter si besoin (facultatif) :"
    );
    //send to server
    let ebook = "guide";
    let data = {
      rating: selectedRating,
      commentaire: commentaire,
      contact: contact,
      ebook: ebook,
    };
    fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    alert("Merci pour votre évaluation de " + selectedRating + " étoiles !");
    document.querySelector(".popup").style.display = "none";
    document.querySelector("couverture-container3").style.display = "flex";
  } else {
    alert("Veuillez sélectionner une évaluation avant d'envoyer.");
  }
});
