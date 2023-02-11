const DBmodel = require("../models/DB");
const twing = require("../view");

exports.sarasas = async (req, res) => {
const darbu_sarasas = await DBmodel.NaujasSarasas();
const output = await twing.render("masyvas.html", {
    darbu_sarasas: darbu_sarasas,
});
res.send(output)
}

exports.update = async (req, res) => {
    const  atnaujintiDB = await DBmodel.update([req.params.id]);
    res.send(req.params.id)
}