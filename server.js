const express = require("express");
const app = express();
const fs = require("fs");
const nodeMailer = require("nodemailer");
require("dotenv").config();
const password = process.env.PASSWORD;

const port = 3000;
//public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/commencer", (req, res) => {
  res.sendFile("commencer.html", { root: __dirname });
});

app.get("/guide", (req, res) => {
  res.sendFile("guide.html", { root: __dirname });
});

app.get("/statique/:dos/:file", (req, res) => {
  let dos = req.params.dos;
  let file = req.params.file;
  res.sendFile(`/public/statique/${dos}/${file}`, { root: __dirname });
});

app.get("/css/:file", (req, res) => {
  let file = req.params.file;
  res.sendFile(`/public/css/${file}`, { root: __dirname });
});

app.get("/js/:file", (req, res) => {
  let file = req.params.file;
  res.sendFile(`/public/js/${file}`, { root: __dirname });
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.post("/api/sendEmail", (req, res) => {
  //get the body
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    //add this to the emails.json file
  });
  req.on("end", () => {
    let datas = JSON.parse(body);
    //add to the emails.json file
    fs.readFile("public/data/json/emails.json", (err, data) => {
      if (err) {
        console.error("Unable to read emails.json", err);
        res.status(500).send("Unable to read emails.json");
      } else {
        let emails = JSON.parse(data);
        //check if the email is already in the file
        let emailExist = false;
        emails.forEach((email) => {
          if (email.email === datas.email) {
            emailExist = true;
          }
        });
        if (emailExist) {
          res.status(400).send("Email already exist");
          return;
        } else if (!emailExist) {
          emails.push(datas);
          fs.writeFile(
            "public/data/json/emails.json",
            JSON.stringify(emails),
            (err) => {
              if (err) {
                console.error("Unable to write emails.json", err);
                res.status(500).send("Unable to write emails.json");
              } else {
                res.status(200).send("Email sent");
              }
            }
          );
        }
      }
    });
  });
});

app.get("/newsletter/:pas", (req, res) => {
  //add password
  let passwordPage = req.params.pas;
  if (passwordPage === password) {
    res.sendFile("public/newsletter.html", { root: __dirname });
  } else {
    res.send("Mot de passe incorrect");
  }
});
app.post("/api/sendMail", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    //add this to the emails.json file
  });
  req.on("end", () => {
    let datas = JSON.parse(body);
    let sujet = datas.sujet;
    let message = datas.message;
    let emails = fs.readFileSync("public/data/json/emails.json");
    let emailData = JSON.parse(emails);
    let transporter = nodeMailer.createTransport({
      host: "sobot.fr",
      port: 465,
      secure: true,
      auth: {
        user: "contact@sobot.fr", // votre adresse mail
        pass: password,
      },
    });
    for (let i = 0; i < emailData.length; i++) {
      let email = emailData[i].email;
      let nom = emailData[i].nom;
      const mailOptions = {
        from: "contact@sobot.fr", // adresse mail de l'expéditeur
        to: email, // adresse mail du destinataire
        subject: sujet, // sujet du mail
        html: `<h1>Salut ${nom}</h1>
      <p>Aujourd'hui, on se retrouve avec de nouvelles informations sur le StreetWorkout</p>
      <p>${message}</p>

      <p>Vous pouvez vous désinscrire à tout moment en cliquant sur le lien ci-dessous</p>
      <a href="https://calisthenics.sobot.fr/desinscription/${email}">Se désinscrire</a>
      `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  });
  res.send("Emails sent");
});

app.get("/desinscription/:email", (req, res) => {
  let email = req.params.email;
  fs.readFile("public/data/json/emails.json", (err, data) => {
    if (err) {
      console.error("Unable to read emails.json", err);
      res.status(500).send("Unable to read emails.json");
    } else {
      let emails = JSON.parse(data);
      let newEmails = emails.filter((item) => item.email !== email);
      fs.writeFile(
        "public/data/json/emails.json",
        JSON.stringify(newEmails),
        (err) => {
          if (err) {
            console.error("Unable to write emails.json", err);
            res.status(500).send("Unable to write emails.json");
          } else {
            res.status(200).send("Vous avez bien été désinscrit");
          }
        }
      );
    }
  });
});

app.post("/api/rating", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log(body);
  });
  req.on("end", () => {
    let datas = JSON.parse(body);
    let rating = datas.rating;
    let commentaire = datas.commentaire;
    let contact = datas.contact;
    let ebook = datas.ebook;
    //open rating.json
    fs.readFile("public/data/json/rating.json", (err, data) => {
      if (err) {
        console.error("Unable to read rating.json", err);
        res.status(500).send("Unable to read rating.json");
      }
      let ratingData = JSON.parse(data);
      let newRating = {
        rating: rating,
        commentaire: commentaire,
        contact: contact,
        ebook: ebook,
      };
      ratingData.push(newRating);
      fs.writeFile(
        "public/data/json/rating.json",
        JSON.stringify(ratingData),
        (err) => {
          if (err) {
            console.error("Unable to write rating.json", err);
            res.status(500).send("Unable to write rating.json");
          } else {
            res.status(200).send("Rating sent");
          }
        }
      );
    });
  });
});
app.get("/api/rating/:urlEbook/:pas", (req, res) => {
  //add password
  let passwordPage = req.params.pas;
  let urlEbook = req.params.urlEbook;
  if (urlEbook === "commencer" || urlEbook === "guide") {
    if (passwordPage === password) {
      fs.readFile("public/data/json/rating.json", (err, data) => {
        if (err) {
          console.error("Unable to read rating.json", err);
          res.status(500).send("Unable to read rating.json");
        } else {
          //make a html page with the rating data
          let ratingData = JSON.parse(data);
          let ratingAverage = 0;
          let ratingNumber = 0;
          let html = `<h1>Rating du ebook ${urlEbook}</h1>`;
          for (let i = 0; i < ratingData.length; i++) {
            if (ratingData[i].ebook === urlEbook) {
              html += `<h2>Rating: ${ratingData[i].rating}</h2>
            <p>Commentaire: ${ratingData[i].commentaire}</p>
            <p>Contact: ${ratingData[i].contact}</p>
            <hr>`;
              ratingAverage += ratingData[i].rating;
              ratingNumber += 1;
            }
          }
          html += `<h2>Rating moyen: ${ratingAverage / ratingNumber}</h2>`;
          html += `Réinitialiser les données: <a href="https://calisthenics.sobot.fr/api/reset/rating/${urlEbook}/${password}>Réinitialiser</a>`;
          //add style to the html page
          html += `<style>
          body {
            background-color: #f5f5f5;
            font-family: sans-serif;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          h2 {
            color: #333;
          }
          p {
            color: #333;
          }
          hr {
            border: 1px solid #333;
          }
          </style>`;
          res.send(html);
        }
      });
    } else {
      res.send("Mot de passe incorrect");
    }
  }
});

app.get("/api/reset/rating/:urlEbook/:pas", (req, res) => {
  let passwordPage = req.params.pas;
  let urlEbook = req.params.urlEbook;
  if (urlEbook === "commencer" || urlEbook === "guide") {
    if (passwordPage === password) {
      fs.writeFile(
        "public/data/json/rating.json",
        JSON.stringify([]),
        (err) => {
          if (err) {
            console.error("Unable to write rating.json", err);
            res.status(500).send("Unable to write rating.json");
          } else {
            res.status(200).send("Rating reset");
          }
        }
      );
    } else {
      res.send("Mot de passe incorrect");
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
