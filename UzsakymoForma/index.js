const express = require("express");
const index = express();
const port = 3000;

index.get("/prekiu_uzsakymas", (req, res) => {
    res.send("hello world");
  });

index.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });


