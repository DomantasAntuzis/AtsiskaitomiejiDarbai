const express = require("express");
const index = express();
const port = 3000;
const fs = require("fs");

index.use(express.json());

index.use(express.static("public"));

index.use(express.urlencoded({ extended: true }));

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
  miestas1 = "",
  komentaras = "",
  rajonas = "",
  miestas2 = "",
  adresas = "",
  pastokodas = "",
  parduotuve = ""
) {
  let form = "";
  form += `<form action="http://localhost:3000/prekiu_uzsakymas" method="post">
    <label>Vardas: </label><input type="text" name="vardas"  value="${vardas}" placeholder="Vardas" required><br>
    <label>Pavarde: </label><input type="text" name="pavarde" value="${pavarde}" placeholder="Pavardė" required><br>
    <label>El.paštas: </label><input type="text" name="email" value="${el_pastas}" placeholder="Gmail" required><br>
    <label>Tel. nr.: </label><input type="text" name="phone" value="${Tel_nr}" required placeholder="Prašome nenaudoti Fake Filler"><br>
    <label>užsakomos prekės: </label>
    <textarea name="tekstas" required>${uzsakoma_preke}</textarea><br>
    <label>Pristatymo budas</label> 
    <input type="radio" name="radio1" value="Kurjeris" required id="pristatymasRadio1" ${
      pristatymo_budas == "Kurjeris" ? " checked" : ""
    }/>`;
  form += `<span>Kurjeris</span></label><label><input type="radio" required name="radio1" value="Pastomatas" id="pristatymasRadio2" ${
    pristatymo_budas == "Pastomatas" ? " checked" : ""
  }/><span>Paštomatas</span></label><label><input type="radio" required name="radio1" value="Parduotuve" id="pristatymasRadio3" ${
    pristatymo_budas == "Parduotuve" ? " checked" : ""
  }/><span>Parduotuvė</span></label><br>`;

  form += `<div id="pristatymas1"><label>Rajonas: </label> <input type="text" name="rajonas" class="inputsfor1" value="${rajonas}" placeholder="Rajonas"><br>
  <label>Miestas: </label> <input type="text" name="miestas1" value="${miestas1}" class="inputsfor1" placeholder="Miestas"><br>
  <label>Adresas: </label> <input type="text" name="adresas" value="${adresas}" class="inputsfor1" placeholder="Adresas"><br>
  <label>Pašto kodas: </label> <input type="text" name="pastokodas" value="${pastokodas}" class="inputsfor1" placeholder="Pašto kodas">
  </div>`;
  form += `<div id="pristatymas2"><label>Miestas: </label><input type="text" name="miestas2" id="inputsfor2" value="${miestas2}" placeholder="Miestas"></div>`;
  form += `<div id="pristatymas3"><label>Parduotuvė: </label><select name="Parduotuve" id="inputsfor3"><option value="Gargždu IKI" ${
    parduotuve == "Gargždu IKI" ? " selected" : ""
  } >Gardgždų IKI</option>
  <option value="Klaipedos akropolis" ${
    parduotuve == "Klaipedos akropolis" ? " selected" : ""
  } >Klaipėdos akropolis</option>
  <option value="Kretingos LIDL" ${
    parduotuve == "Kretingos LIDL" ? " selected" : ""
  } >Kretingos LIDL</option>
  <option value="Klaipedos molas" ${
    parduotuve == "Klaipedos molas" ? " selected" : ""
  } >Klaipėdos "Molas"</option>
  <option value="Penkta parduotuve" ${
    parduotuve == "Penkta parduotuve" ? " selected" : ""
  } >Penkta parduotuvė</option>
  </select></div>`;

  form += `<label>Komentaras: </label>
    <textarea name="komentaras">${komentaras}</textarea><br>
    <input type="submit" value="Siųsti">
    </form>`;

  form += `<script src="forma.js"></script>`;
  return form;
}

function fullHTML() {
  let form = GenerateForm();
  let html = GenerateHTML(form);
  return html;
}

function escapeHtml(text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

function validate(param) {
  if (param && typeof param == "string") {
    if (param == undefined) {
      param = "";
    } else {
      param = escapeHtml(param.trim());
    }
  }

  return param;
}

index.get("/prekiu_uzsakymas", (req, res) => {
  let Page = fullHTML();
  res.send(Page);
});

index.post("/prekiu_uzsakymas", (req, res) => {
  let vardas = "";
  let pavarde = "";
  let el_pastas = "";
  let Tel_nr = "";
  let uzsakoma_preke = "";
  let pristatymo_budas = "";
  let miestas1 = "";
  let komentaras = "";
  let rajonas = "";
  let miestas2 = "";
  let adresas = "";
  let pastokodas = "";
  let parduotuve = "";

  let emailpattern =
    /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let phonepattern =
    /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/;

  if (req.body.vardas) {
    vardas = validate(req.body.vardas);
    pavarde = validate(req.body.pavarde);
    el_pastas = validate(req.body.email);
    Tel_nr = validate(req.body.phone);
    uzsakoma_preke = validate(req.body.tekstas);
    pristatymo_budas = validate(req.body.radio1);
    miestas1 = validate(req.body.miestas1);
    komentaras = validate(req.body.komentaras);
    rajonas = validate(req.body.rajonas);
    miestas2 = validate(req.body.miestas2);
    adresas = validate(req.body.adresas);
    pastokodas = validate(req.body.pastokodas);
    parduotuve = validate(req.body.Parduotuve);

    if (
      vardas == "" ||
      pavarde == "" ||
      el_pastas == "" ||
      Tel_nr == "" ||
      emailpattern.test(el_pastas) == false ||
      phonepattern.test(Tel_nr) == false
    ) {
      let html = fullHTML();
      res.send(html);
    } else {
      let array = [];


      let object = {};
      object.name = `${vardas}`;
      object.surename = `${pavarde}`;
      object.el_pastas = `${el_pastas}`;
      object.phone = `${Tel_nr}`;
      object.items = `${uzsakoma_preke}`;

      if (pristatymo_budas == "Pastomatas") {
        object.city2 = `${miestas2}`;
      }

      if (pristatymo_budas == "Kurjeris") {
        object.city1 = `${miestas1}`;
        object.district = ` ${rajonas}`;
        object.address = `${adresas}`;
        object.ZIP_code = `${pastokodas}`;
      }

      if (pristatymo_budas == "Parduotuve") {
        object.shop = `${parduotuve}`;
      }
      object.comment = `${komentaras}`;


      fs.readFile("Duomenys.json", function (err, data) {
        if (err) {
          console.log(err);
        } 


      
        let array = [];
        try {
          array = JSON.parse(data);
        } catch (err) {
          console.error(err);
        }
    
        array.push(object);
    

      fs.writeFile("Duomenys.json", JSON.stringify(array), function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
      res.send('Užsakymas gautas');
    }
  } else {
    let html = fullHTML();
    res.send(html);
  }
});

index.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
