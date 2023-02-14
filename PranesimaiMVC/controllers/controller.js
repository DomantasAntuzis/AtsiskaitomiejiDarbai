const DBsarasas = require("../model/DB/DBsarasas");
const DBregister = require("../model/DB/DBregister");
const DBlogin = require("../model/DB/DBlogin");
const twing = require("../view");
const path = require("path");
const DBpranesimas = require("../model/DB/DBpranesimas");
const { cryptPassword, comparePassword } = require("../password");

exports.sarasas = async (req, res) => {
  const darbu_sarasas = await DBsarasas.NaujasSarasas();
  const output = await twing.render("pranesimai.html", {
    darbu_sarasas: darbu_sarasas,
  });
  res.send(output);
};

exports.register = async (req, res) => {
  //  let length = await DBregister.lenght();
  //  let DifUsers = length[0][0].ID;
  //  let newID = DifUsers + 1;
  await cryptPassword(req.body.psw, async (err, hash2) => {
    await DBregister.register([req.body.uname, hash2]);
  });
  // let session = req.session;
  // session.userid = req.body.uname;
  // session.ID = newID;
  // console.log(session)
  res.redirect("/login");
};

exports.login = async (req, res) => {
  let session = req.session;
  const login = await DBlogin.login([req.body.uname]);
  await comparePassword(
    req.body.psw,
    login[0][0].Slaptazodis,
    (err, isPasswordMatch) => {
      // console.log(isPasswordMatch);
      if (isPasswordMatch == true) {
        session.userid = req.body.uname;
        session.ID = login[0][0].ID;
        res.redirect("/pranesimai");
      } else {
        res.send(`Neteisinga prijungimo informacija!`);
      }
      // return isPasswordMatch;
    }
  );

};

exports.titulinis = (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/register.html"));
};

exports.pranesimas = async (req, res) => {
  //error su naujai prisiregistravusiais vartotojais

  let session = req.session;
  console.log(session);
  if (session.ID) {
    console.log(session.ID);
    const atnaujintiDB = await DBpranesimas.pranesimas([
      req.body.pranesimas,
      session.ID,
    ]);
  }
  res.redirect("/pranesimai");
};

exports.loginPage = (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/login.html"));
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
}
