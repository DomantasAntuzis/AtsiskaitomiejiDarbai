const express = require("express");
const index = express();
const port = 3000;

index.use(express.static('public'))

function GenerateHTML(content = "") {
  let txt = "";
  txt += `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>`;
  txt += content;
  txt += `</body>
    </html>`;

  return txt;
}

function GenerateForm(
  vardas = "",
  pavarde = "",
  el_pastas = "",
  Tel_nr = "",
  uzsakoma_preke = "",
  pristatymo_budas = "",
  komentaras = ""
) {
  let form = "";
  form += `<form action="http://localhost:3000/prekiu_uzsakymas" method="post">
  <label>Vardas: </label><input type="text" name="vardas"  value="${vardas}" required><br>
  <label>Pavarde: </label><input type="text" name="pavarde" value="${pavarde}" required><br>
  <label>El.paštas: </label><input type="text" name="email" value="${el_pastas}" required><br>
  <label>Tel. nr.: </label><input type="text" name="phone" value="${Tel_nr}" required placeholder="+370 *** *****"><br>
  <label>užsakomos prekės: </label>
  <textarea name="tekstas">${uzsakoma_preke}</textarea><br>
  <label>Pristatymo budas</label> 
  <input type="radio" name="radio1" value="r1"${
    pristatymo_budas == "option1" ? " checked" : ""
  }><span>Kurjeris</span></label><label><input type="radio" name="radio1" value="r2"${
    pristatymo_budas == "option2" ? " checked" : ""
  }><span>Paštomatas</span></label><label><input type="radio" name="radio1" value="r3"${
    pristatymo_budas == "option3" ? " checked" : ""
  }><span>Parduotuvė</span></label><br>
  <label>Komentaras: </label>
  <textarea name="komentaras">${komentaras}</textarea><br>
  <input type="submit" value="Siųsti"></input>
  </form>`;

  return form;
}

index.get("/prekiu_uzsakymas", (req, res) => {
  let form = GenerateForm();
  let html = GenerateHTML(form);
  res.send(html);
});

index.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
