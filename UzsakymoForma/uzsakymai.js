const express = require("express");
const uzsakymai = express();
const port = 3001;
const fs = require("fs");

fs.readFile("Duomenys.json", "utf8", (err, data) => {
  if (err) throw err;

  let DataArray = JSON.parse(data);

  function GenerateHTML() {
    let txt = "";
   txt += `<!doctype html>
   <html lang="en">
   
   <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>Užsakymų sąrašas</title>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   </head>
   
   <body>
       <main class="container">
           <h1>Užsakymai</h1>`
let i = 0;
for (i; i < DataArray.length; i++){
           for (let x in DataArray[i]) {
            txt += DataArray[i][x] + "<br>";
            }};

      txt += `</main>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
   </body>
   
   </html>`
    return txt;
  }

  console.log(DataArray.length);

  uzsakymai.get("/", (req, res) => {
    let html = GenerateHTML();

    res.send(html);
  });
});

uzsakymai.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
