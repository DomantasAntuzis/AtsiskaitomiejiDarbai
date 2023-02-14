const connection = require("../DBconnection");

exports.login = async (params) => {
  let atnaujinti = await connection.query(
    `SELECT ID ,Vardas, Slaptazodis FROM vartotojai WHERE Vardas = ?`,
    params
  );
  return atnaujinti;
};
