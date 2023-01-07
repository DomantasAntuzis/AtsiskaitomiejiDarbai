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

const balsai = fs.readFileSync(__dirname + "/public/data.json", "utf8");
const auto = fs.readFileSync(__dirname + "/public/JSONfailai/automobiliai.JSON", "utf8");

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/svetaine.html");
});

app.post("/", async (req, res) => {
  let automobilioID = JSON.parse(req.body.run);

  let ParsedBalsai = JSON.parse(balsai);

  ParsedBalsai[automobilioID]++;

  let VotesData = ParsedBalsai;

  let autoParsed = JSON.parse(auto);

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
      } else {
        rezultataiTEXT += `${keys[g]}:` + ` ` + ` ${values[g]};` + ` `;
      }
    }
  }

  fs.writeFileSync(__dirname + "/public/data.json", JSON.stringify(ParsedBalsai));

  res.send(rezultataiTEXT);
});

app.get("/api/automobiliai", (req, res) => {
  res.send(auto);
})

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
      percentage: ((100 * votes) / totalVotes || 0).toFixed(0)
    };
  });


  let newVotesData = VotesData.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

let i = 0;
let l = 1;

for( i; i < newVotesData.length; i++){
  if (newVotesData[i].place==undefined){
  for(let k = 0; k < newVotesData.length; k++){
    if(k==i){
      continue
    }
    else if(newVotesData[i].votes==newVotesData[k].votes){
      newVotesData[k].place = newVotesData[i].place
    }else{
    newVotesData[i].place = l;
}
}
l++}
}
  res.send(newVotesData);
})

// app.get("/api/automobilis/:id/aprasymas", (req, res) => {
// console.log(auto[id].aprasymas)
//   res.send()
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
