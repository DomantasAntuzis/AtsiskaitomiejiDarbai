const connection = require("../DBconnection");

exports.pranesimas = async(params) => {
    let atnaujinti = await connection.query(
      `INSERT INTO pranesimai (Tekstas, Vartotojo_ID) VALUES (?,?);`,
        params
      );
      return atnaujinti
    };
