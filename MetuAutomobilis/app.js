const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const axios = require("axios");

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// let rawdata =fs.readFileSync(__dirname + '/public/svetaine.html', 'utf8')
// console.log(rawdata);

const test = fs.readFileSync(__dirname + "/public/data.json", "utf8");
const auto = fs.readFileSync(__dirname + "/public/JSONfailai/automobiliai.JSON", "utf8");

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/svetaine.html");
});

app.post("/", async (req, res) => {
  let automobilioID = JSON.parse(req.body.run);

  let parsed = JSON.parse(test);

  parsed[automobilioID]++;

  let duomenys = parsed;

  let autoParsed = JSON.parse(auto);

  const totalVotes = Object.values(parsed).reduce(
    (total, n) => (total += n),
    0
  );

  duomenys = Object.entries(duomenys).map(([id, votes]) => {
    return {
      pavadinimas: autoParsed[id - 1].pavadinimas,
      votes,
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
    };
  });
  let keys;
  let values;

  let rezultatai = "";

  for (let e = 0; e < duomenys.length; e++) {
    keys = Object.keys(duomenys[e]);
            values = Object.values(duomenys[e]);
            for (let g = 0; g < keys.length; g++) {
              if (g == 2) {
                rezultatai +=`${keys[g]}:` + ` ` + ` ${values[g]}` +  `%<br>`;
              } else {
                rezultatai += `${keys[g]}:` + ` ` + ` ${values[g]};` + ` `;
              }
            }
          }
  


  fs.writeFileSync(__dirname + "/public/data.json", JSON.stringify(parsed));

  res.send(rezultatai);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
