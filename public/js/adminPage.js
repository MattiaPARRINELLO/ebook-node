window.onload = function () {
  //get all buttons
  let buttons = document.querySelectorAll("button");
  buttons.forEach((element) => {
    element.addEvelistener("click", (e) => {
      let password = document.getElementById("password").value;
      //if id of the element
      if (element.id === "ratingCommencer") {
        location.href = "/api/rating/commencer/" + password;
      }
      if (element.id === "ratingGuide") {
        location.href = "/api/rating/guide/" + password;
      }
      if (element.id === "newsletter") {
        location.href = "/newsletter/interface/" + password;
      }
      if (element.id === "listNews") {
        location.href = "/newsletter/list/" + password;
      }
    });
  });
};
