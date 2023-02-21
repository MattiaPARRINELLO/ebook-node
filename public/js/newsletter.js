function submit() {
  var sujet = document.getElementById("sujet").value;
  var message = document.getElementById("texte").value;
  console.log(sujet);
  console.log(message);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/sendEmail");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ sujet: sujet, message: message }));
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Email sent");
    } else {
      console.error("Unable to send email");
    }
  };
}
