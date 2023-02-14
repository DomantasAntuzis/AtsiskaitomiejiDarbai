const connection = require("../DBconnection");

exports.register = async(params) => {
    let atnaujinti = await connection.query(
      `INSERT INTO vartotojai (Vardas, Slaptazodis) VALUES (?, ?);`,
        params
      );
      return atnaujinti;
    };

exports.lenght = async() => {
  let length = await connection.query(
    `SELECT COUNT(*) as ID FROM vartotojai;`
  );
  return length;
};