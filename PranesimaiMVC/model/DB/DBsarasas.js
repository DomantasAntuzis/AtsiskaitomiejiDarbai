const connection = require("../DBconnection");

sarasas = async() => {
    let darbai = await connection.query(
        "SELECT vartotojai.vardas, pranesimai.Laikas, pranesimai.Tekstas FROM `vartotojai` INNER JOIN `pranesimai` ON vartotojai.ID = pranesimai.Vartotojo_ID;"
        );
    return darbai;
  };

  exports.NaujasSarasas = async () => {
    let NaujasSarasas = await sarasas();
    let i = 0;
    let newresults = [];
    let result = NaujasSarasas[0];
  
    //Čia per sudėtingai išėjo
  
    for (i; i < result.length; i++) {
      let obj = {};
      obj.VardasSuData = `${result[i].vardas}` + " " + `${result[i].Laikas}`;
      obj.tekstas = result[i].Tekstas;
      newresults.push(obj);
    }
  
    return newresults
  }


