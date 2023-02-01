const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
//mysql man neveikia, tai naudoju mysql2
var mysql = require("mysql2");
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
const axios = require("axios").default;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let loader = new TwingLoaderFilesystem(__dirname + "/public");
let twing = new TwingEnvironment(loader, {
  debug: true,
  cache: false,
  auto_reload: true,
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "darbai",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("CREATE DATABASE IF NOT EXISTS darbai", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

var sql =
  "CREATE TABLE IF NOT EXISTS darbai (id int unsigned auto_increment primary key, darbas varchar(255) not null, laikas datetime null, atliktas boolean default(0))";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

app.get("/", (req, res) => {
  res.sendFile("/public/forma.html", { root: __dirname });
});

// app.post("/prideti", (req, res) => {
//   var sql = `INSERT INTO darbai (darbas, laikas) VALUES ('${req.body.darbas}', '${req.body.laikas}')`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     res.send("duomenys sekmingai prideti");
//   });;
// })

app.get("/masyvas", (req, res) => {
  con.query(
    "SELECT * FROM darbai ORDER BY atliktas, CASE WHEN laikas IS null THEN 1 ELSE 0 END ASC, laikas ASC;",
    function (err, result, fields) {
      if (err) throw err;
      let i = 0;
      let newresults = [];

      //Čia per sudėtingai išėjo

      const currentdate = new Date();
      
      for (i; i < result.length; i++) {
        let newdate;
        let obj = {};
        obj.id = result[i].id;
        obj.darbas = result[i].darbas;
        let replace = JSON.stringify(result[i].laikas).replace(/[TZ"_]/g, " ");
        let slice = replace.slice(0, -6);
        if (result[i].laikas != null) {
          newdate = new Date(result[i].laikas);
        }
        let status = result[i].atliktas;
        if (newdate && newdate < currentdate && status == 0) {
          slice += " VĖLUOJI";
        }
        obj.laikas = slice;
        obj.status = result[i].atliktas;
        newresults.push(obj);
      }

      twing.render("masyvas.html", { darbai: newresults }).then((output) => {
        res.send(output);
      });
    }
  );
});

app.get("/atlikta/:id", (req, res) => {

  con.query(
    "UPDATE darbai SET atliktas = 1 WHERE id = ?;",
    [req.params.id],
    function (err, result, fields) {
      res.send(req.params.id);
    }
  );

});

app.get("/darbai", (req, res) => {
  con.query(
    "SELECT * FROM darbai ORDER BY atliktas, CASE WHEN laikas IS null THEN 1 ELSE 0 END ASC, laikas ASC;",
    function (err, result, fields) {
      if (err) throw err;
      let i = 0;
      let newresults = [];

      //Čia per sudėtingai išėjo

      const currentdate = new Date();
      
      for (i; i < result.length; i++) {
        let newdate;
        let obj = {};
        obj.id = result[i].id;
        obj.darbas = result[i].darbas;
        let replace = JSON.stringify(result[i].laikas).replace(/[TZ"_]/g, " ");
        let slice = replace.slice(0, -6);
        if (result[i].laikas != null) {
          newdate = new Date(result[i].laikas);
        }
        let status = result[i].atliktas;

        // console.log('-');
        // console.log(result[i].laikas);
        // console.log(currentdate);
        // console.log(newdate);

        if (newdate && newdate < currentdate && status == 0) {
          slice += " VĖLUOJI";
        }
        obj.laikas = slice;
        obj.status = result[i].atliktas;
        newresults.push(obj);
      }

      twing.render("darbai.html", { darbai: newresults }).then((output) => {
        res.send(output);
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
