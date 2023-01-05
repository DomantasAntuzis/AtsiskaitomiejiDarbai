const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs").promises;
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const DataPath = path.join(__dirname, "/public/data.json");

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

app.get("/", async (req, res) => {
  // let data = JSON.parse(await fs.readFile(DataPath, "utf-8"));
  // const totalVotes = Object.values(data).reduce((total, n) => (total += n), 0);
  // data = Object.entries(data).map(([id, votes]) => {
  //   return {
  //     id,
  //     percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
  //   };
  // });
  // console.log(data[0])
  res.sendFile(path.join(__dirname + "/public/svetaine.html"));

  // res.json(data)
});

app.post("/", function (req, res) {
  // fs.readFile("data.json", function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   }

  //     res.send("gauta");
  //   }
  // });
  res.send("gauta")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
