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

var balsai = fs.readFileSync(
  __dirname + "/public/JSONfailai/data.json",
  "utf8"
);
const auto = fs.readFileSync(
  __dirname + "/public/JSONfailai/automobiliai.JSON",
  "utf8"
);
const vartotojai = fs.readFileSync(
  __dirname + "/public/JSONfailai/registracijos.JSON",
  "utf8"
);

// var session;

app.get("/", function (req, res) {
  let session = req.session;
  if (session.userid) {
    res.sendFile(__dirname + "/public/svetaine.html");
  } else {
    res.sendFile("/public/prisijungimas.html", { root: __dirname });
  }
});

app.post("/login", (req, res) => {
  const ParsedVartotojai = JSON.parse(vartotojai);
  let length = ParsedVartotojai.length;
  let mypassword;
  let myusername;
  let userfound = false;

  for (let i = 0; i < length; i++) {
    myusername = ParsedVartotojai[i].username;
    mypassword = ParsedVartotojai[i].password;
    if (req.body.user == myusername && req.body.pass == mypassword) {
      userfound = true;
      break;
    }
  }
  if (userfound) {
    let session = req.session;
    session.userid = req.body.user;
    res.sendFile("/public/svetaine.html", { root: __dirname });
  } else {
    res.send(`Neteisinga prijungimo informacija!`);
  }
});

app.post("/register", (req, res) => {
  let array = JSON.parse(vartotojai);
  let Object = {};
  Object.username = req.body.UserName;
  Object.password = req.body.psw;
  array.push(Object);
  fs.writeFileSync(
    __dirname + "/public/JSONfailai/registracijos.json",
    JSON.stringify(array)
  );
  res.sendFile("public/svetaine.html", { root: __dirname });
});

app.post("/balsuoti", function (req, res) {
  let session = req.session;
  let automobilioID = JSON.parse(req.body.run);
  let ParsedBalsai = JSON.parse(balsai);

  if (session.VoteStatus != 1) {
    ParsedBalsai[automobilioID]++;
  }

  let VotesData = ParsedBalsai;
  let autoParsed = JSON.parse(auto);
  session.VoteStatus = 1;

  const totalVotes = Object.values(ParsedBalsai).reduce(
    (total, n) => (total += n),
    0
  );

  VotesData = Object.entries(VotesData).map(([id, votes]) => {
    return {
      name: autoParsed[id - 1].pavadinimas,
      votes,
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
    };
  });

  let keys;
  let values;
  let rezultataiTEXT = "";

  for (let e = 0; e < VotesData.length; e++) {
    keys = Object.keys(VotesData[e]);
    values = Object.values(VotesData[e]);
    for (let g = 0; g < keys.length; g++) {
      if (g == 2) {
        rezultataiTEXT += `${keys[g]}:` + ` ` + ` ${values[g]}` + `%<br>`;
      } else if (g == 0) {
        rezultataiTEXT += `${values[g]}` + `, `;
      } else {
        rezultataiTEXT += `${keys[g]}:` + ` ` + ` ${values[g]};` + ` `;
      }
    }
  }


  balsai =  JSON.stringify(ParsedBalsai);
  fs.writeFileSync(
    __dirname + "/public/JSONfailai/data.json",
    JSON.stringify(ParsedBalsai)
  );

  res.send(rezultataiTEXT);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/api/automobiliai", (req, res) => {
  res.send(auto);
});

app.get("/api/automobiliai/balsai", (req, res) => {
  let ParsedBalsai = JSON.parse(balsai);

  const totalVotes = Object.values(ParsedBalsai).reduce(
    (total, n) => (total += n),
    0
  );

  let VotesData = ParsedBalsai;

  VotesData = Object.entries(VotesData).map(([id, votes]) => {
    return {
      id,
      votes,
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
    };
  });

  let newVotesData = VotesData.sort((a, b) => (a.votes < b.votes ? 1 : -1));

  let i = 0;
  let l = 1;

  for (i; i < newVotesData.length; i++) {
    if (newVotesData[i].place == undefined) {
      for (let k = 0; k < newVotesData.length; k++) {
        if (k == i) {
          continue;
        } else if (newVotesData[i].votes == newVotesData[k].votes) {
          newVotesData[k].place = newVotesData[i].place;
        } else {
          newVotesData[i].place = l;
        }
      }
      l++;
    }
  }
  res.send(newVotesData);
});

app.get("/api/automobilis/:id/aprasymas", (req, res) => {
  let IDnumber = Number(req.params.id);
  const parsedAuto = JSON.parse(auto);

  let aprasymas;
  for (let i = 0; i < parsedAuto.length; i++) {
    if (parsedAuto[i].id === IDnumber) {
      aprasymas = parsedAuto[i].aprasymas;
    }
  }
  console.log(aprasymas);
  res.redirect(aprasymas);
});

// app.post("/api/automobilis/balsuoti", (req, res) => {

// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
