const express = require("express");
const app = express();
const port = 3000;
const DarbaiController = require("./controllers/controller");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.get("/", DarbaiController.titulinis);

app.post("/login", DarbaiController.login);

app.post("/register", DarbaiController.register);

app.get("/pranesimai", DarbaiController.sarasas);

app.post("/pranesimas", DarbaiController.pranesimas);

app.get("/login", DarbaiController.loginPage);

app.get("/logout", DarbaiController.logout);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
