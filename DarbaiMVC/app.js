const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app. use(express.urlencoded({ extended: true }));

const DarbaiController = require("./controller/DBcontroller");

app.get("/", DarbaiController.sarasas);

app.get("/atlikta/:id", DarbaiController.update);

app.post("/", DarbaiController.post);

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

