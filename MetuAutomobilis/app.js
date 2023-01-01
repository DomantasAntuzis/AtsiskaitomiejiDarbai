const express = require("express");
const app = express();
const port = 3000;
const path = require('path')
const fs = require("fs");

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/svetaine.html'));
});


app.listen(port, () => {
console.log(`Example app listening on port ${port}`);})
