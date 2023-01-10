import auto from "http://localhost:3000/JSONfailai/automobiliai.JSON" assert { type: "json" };


for (let i = 0; i < auto.length; i++) {
  document.getElementById(`charakteristikos${i + 1}`)
    .addEventListener("click", function () {
      let charakteristiku_lentele = "";
      charakteristiku_lentele += `<p>Variklis: ${auto[i].charakteristikos.Variklis}</p>
      <br><p>Bagažinės_talpa_l: ${auto[i].charakteristikos.Bagažinės_talpa_l}</p>
      <br><p>Ilgis_Plotis_Aukštis_mm: ${auto[i].charakteristikos.Ilgis_Plotis_Aukštis_mm}</p><br>
      <p>Maksimalus_greitis: ${auto[i].charakteristikos.Maksimalus_greitis}</p><br>
      <p>CO2_emisija: ${auto[i].charakteristikos.CO2_emisija}</p><br>
      <p>Pigiausio_modelio_kaina: ${auto[i].charakteristikos.Pigiausio_modelio_kaina}</p><br>`;

      document.getElementById("modal_text").innerHTML =
        charakteristiku_lentele;
      modal.style.display = "block";
    });
}

// Get the modal

var modal = document.getElementById("modal_div");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
