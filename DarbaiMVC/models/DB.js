const mysql = require("mysql2/promise");

let connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "darbai",
});

sarasas = async() => {
  let darbai = await connection.query(
    "SELECT * FROM darbai ORDER BY atliktas, CASE WHEN laikas IS null THEN 1 ELSE 0 END ASC, laikas ASC;",
  );
  return darbai;
};

exports.NaujasSarasas = async () => {
  let NaujasSarasas = await sarasas();
  let i = 0;
  let newresults = [];
  let result = NaujasSarasas[0];

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

  // console.log('nuo cia')
  // console.log(newresults)
  return newresults
}

exports.update = async(params) => {
let atnaujinti = await connection.query(
    "UPDATE darbai SET atliktas = 1 WHERE id = ?;",
    params
  );
  return atnaujinti
};

exports.PostWithTime = async(params) => {
let atnaujinti = await connection.query(
  `INSERT INTO darbai (darbas, laikas) VALUES (?, ?);`,
    params
  );
  return atnaujinti
};

exports.Post = async(params) => {
let atnaujinti = await connection.query(
  `INSERT INTO darbai (darbas) VALUES (?);`,
    params
  );
  return atnaujinti
};

